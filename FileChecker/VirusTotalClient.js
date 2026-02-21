require('dotenv').config();
const virustotal = require('@api/virustotal');
const fs = require('fs').promises;
const axios = require('axios');
const FormData = require('form-data');
const cliProgress = require('cli-progress');
const Bottleneck = require('bottleneck');
const { createReadStream, statSync } = require('fs');
const { setTimeout: sleep } = require('timers/promises');
const path = require('path');

const API_KEY = process.env.API_KEY;
const FILE_PATH = './filepath';

virustotal.auth(API_KEY);

const limiter = new Bottleneck({
    minTime: 15250,
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
        console.error('\nScan Error:', error.message);
  }
}

async function scanSmallFile() {
    try {
        const form = new FormData();
        form.append('file', createReadStream(FILE_PATH));

        const response = await limiter.schedule(() =>
            axios.post('https://www.virustotal.com/api/v3/files', form, {
                headers: { ...form.getHeaders(), 'x-apikey': API_KEY}
            })
        );

        console.log('Analysis ID:', response.data.data.id);
        const results = await pollForResults(response.data.data.id);

        console.log('\nScan Results');
        console.log(`Status: ${results.status}`);
        console.log(`Harmless: ${results.stats.harmless}`);
        console.log(`Malicious: ${results.stats.malicious}`);
        console.log(`Undetected: ${results.stats.undetected}`);
        
    } catch (error) {
        console.error('\nScan Error:', error.message);
    }
}

async function getUploadUrl() {
    const {data} = await axios.get('https://www.virustotal.com/api/v3/files/upload_url', {headers: {'x-apikey': API_KEY}});
    return data.data;
}

async function uploadFileWithProgress(url, filePath) {
    const stats = statSync(filePath);
    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

    const form = new FormData();
    const stream = createReadStream(filePath);

    try {
        progressBar.start(stats.size, 0);

        stream.on('data', (chunk) => { 
            progressBar.increment(chunk.length);
        });
        
        form.append('file', stream);

        const response = await axios.post(url, form, {
            headers: {...form.getHeaders(), 'x-apikey': API_KEY},
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
        });

        return response.data.data.id;

    } catch (error) {
        const message = error.response ? JSON.stringify(error.response.data) : error.message;
        throw new Error(`Upload failed: ${message}`); 
    } finally {
         progressBar.stop();
    }
}

async function pollForResults(analysisId) {
    while (true) {
        const {data: {data}} = await limiter.schedule(() => axios.get(`https://www.virustotal.com/api/v3/analyses/${analysisId}`, {
            headers: { 'x-apikey': API_KEY }})
        );

        if (data.attributes.status === 'completed') {
            return data.attributes;
        }

        console.log(`Status: ${data.attributes.status}. Checking again in 15 seconds.`);
        await sleep(15000);
    }
}

/* Main Execution Block */
(async () => {
    try {
        // make sure API_KEY exists
        if (!API_KEY) throw new Error("API_KEY is missing from .env file");

        // make sure file exists
        const stats = await fs.stat(FILE_PATH);
        const fileSizeMB = stats.size / (1024 * 1024);

        console.log(`File: ${path.basename(FILE_PATH)} (${fileSizeMB.toFixed(2)} MB)`);

        // routing logic based on VirusTotal's API limits
        if (fileSizeMB < 32) {
            console.log('Small File: Using Standard Upload');
            await scanSmallFile();
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
