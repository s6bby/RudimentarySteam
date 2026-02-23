const virustotal = require('@api/virustotal');
const fs = require('fs').promises;
const axios = require('axios');
const FormData = require('form-data');
const cliProgress = require('cli-progress');
const Bottleneck = require('bottleneck');
const { createReadStream, createWriteStream, statSync } = require('fs');
const { pipeline } = require('stream/promises');
const path = require('path');

const API_KEY = '18a3357d9e144da4804a3d7951a03feee49611701851324d3d6bcf7bfc15639f';
const FILE_PATH = '<filePath>';

const limiter = new Bottleneck({
    minTime: 15000,
    maxConcurrent: 1
});

async function scanLargeFile() {
    try {
        console.log('Getting Upload URL');
        const uploadUrl = await limiter.schedule(() => getUploadUrl());

        console.log('\nUploading File');
        const analysisId = await uploadFileWithProgress(uploadUrl, FILE_PATH);

        console.log('\nWaiting for Results');
        const results = await pollForResults(analysisId);

        console.log('\nScan Results');
        console.log(`Status: ${results.status}`);
        console.log(`Harmless: ${results.stats.harmless}`);
        console.log(`Malicious: ${results.stats.malicious}`);
        console.log(`Undetected: ${results.stats.undetected}`);

    } catch (error) {
        console.error('\nError:', error.message);
  }
}

async function getUploadUrl() {
    const {data} = await axios.get('https://www.virustotal.com/api/v3/files/upload_url', {headers: {'x-apikey': API_KEY}});
    return data.data;
}

async function uploadFileWithProgress(url, filePath) {
    const stats = statSync(filePath);

    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    progressBar.start(100, 0);

    const form = new FormData();
    form.append('file', createReadStream(filePath));

    const response = await axios.post(url, form, {
        headers: {...form.getHeaders(), 'x-apikey': API_KEY},
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        onUploadProgress: (progress) => {
            const total = progress.total || stats.size;
            const percent = Math.round((progress.loaded * 100) / total);
            progressBar.update(percent);
        }
    });

    progressBar.stop();
    return response.data.data.id;
}

async function pollForResults(analysisId) {
    while (true) {
        const {data: {data}} = await limiter.schedule(() => axios.get(`https://www.virustotal.com/api/v3/analyses/${analysisId}`, {
            headers: { 'x-apikey': API_KEY }})
        );

        if (data.attributes.status === 'completed') return data.attributes;
        await sleep(30000);
    }
}

/* Main Execution Block */
(async () => {
    try {
        // make sure file exists
        const stats = await fs.stat(FILE_PATH);
        const fileSizeMB = stats.size / (1024 * 1024);

        console.log(`File: ${path.basename(FILE_PATH)} (${fileSizeMB.toFixed(2)} MB)`);

        // routing logic based on VirusTotal's API limits
        if (fileSizeMB < 32) {
            console.log('Small File: Using Standard Upload');
            const response = await virustotal.postFiles({ file: FILE_PATH });
            console.log('Analysis ID:', response.data.data.id);
            await pollForResults(response.data.data.id);
        } 
        else if (fileSizeMB < 650) {
            console.log('Large File: Using Upload URL');
            await scanLargeFile(); 
        } 
        else {
            console.log('Very Large File: Manual Inspection is required...');
        }

    } catch (err) {
        console.error('Execution Error:', err.message);
    }
})();
