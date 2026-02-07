import virustotal from '@api/virustotal';

const fs = require('fs').promises;

async function getFileSize(filepath) {
    try {
        const stats = await fs.stat(filePath);
        const fileSizeInBytes = stats.size;
        const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
        return fileSizeInMegabytes
    } catch (err) {
        console.error(err);
    }
}

fileSize = getFileSize(/*insert pathname*/)

if (fileSize<32){
    virustotal.postFiles()
        .then(({data}) => console.log(data))
        .catch(err => console.error(err)); 
}

else if(fileSize<650){
    virustotal.filesUploadUrl()
        .then(({data}) => console.log(data))
        .catch(err => console.error(err));
}

else {
    /* file is too big and must be split up to test in batches
       or it needs to be manually inspected... */ 
}
