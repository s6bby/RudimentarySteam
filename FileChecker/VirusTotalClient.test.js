const axios = require('axios');
const { getUploadUrl, pollForResults, uploadFileWithProgress } = require('./VirusTotalClient');

jest.useFakeTimers();
jest.mock('axios');
jest.mock('cli-progress', () => ({
  SingleBar: jest.fn().mockImplementation(() => ({
    start: jest.fn(),
    increment: jest.fn(),
    stop: jest.fn(),
  })),
  Presets: { shades_classic: {} }
}));

jest.mock('timers/promises', () => ({
  setTimeout: jest.fn(() => Promise.resolve()),
}));

// -------------------------------------------------------------------------
// 1. Black box unit test
// Requirement: System must retrieve a specialized upload URL for files > 32MB.
// -------------------------------------------------------------------------
describe('Black Box Tests', () => {
    test('getUploadUrl properly fetches and returns the proxy URL string', async () => {
        const mockUrl = 'https://virustotal.com';
        axios.get.mockResolvedValue({ data: { data: mockUrl } });

        const result = await getUploadUrl();

        // 4 assertions:
        // Checking if we successfully extract the string from TotalVirus's response
        expect(typeof result).toBe('string'); 
        // Checking if the get request is targeting the correct VirusTotal endpoint for large file URLs
        expect(result).toBe(mockUrl); 
        // Checking if the function's return value matches the expected URL string
        expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/files/upload_url'), expect.any(Object)); 
        // Checking that the API Key from the environment is included in the request headers
        expect(axios.get).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({
            headers: expect.objectContaining({ 'x-apikey': process.env.API_KEY })
        }));
    });
});

// -------------------------------------------------------------------------
// 2. White-box unit test
// 100% Branch Coverage
// Function being tested:
/*
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
*/
// -------------------------------------------------------------------------
describe('White Box Tests', () => {
    test('pollForResults continues loop on "queued" and terminates on "completed"', async () => {
        axios.get
            .mockResolvedValueOnce({ data: { data: { attributes: { status: 'queued' } } } })
            .mockResolvedValueOnce({ data: { data: { attributes: { status: 'completed', stats: { harmless: 10 } } } } });

        const result = await pollForResults('mock_analysis_id');

        // 4 assertions
        // testing if loop continues past 'queued'
        expect(axios.get).toHaveBeenCalledTimes(2); 
        // testing if branch logic exits correctly
        expect(result.status).toBe('completed'); 
        // testing data integrity through the loop
        expect(result.stats.harmless).toBe(10);    
        // testing if pollForResults function is dynamic and correctly targets the analysis ID it was assigned
        expect(axios.get).toHaveBeenLastCalledWith(expect.stringContaining('mock_analysis_id'), expect.any(Object));
    });
});

// -------------------------------------------------------------------------
// 3. Integration tests
// Units being tested: getUploadUrl AND uploadFileWithProgress
// -------------------------------------------------------------------------
describe('Integration Tests', () => {
    test('Output from getUploadUrl is successfully consumed by uploadFileWithProgress', async () => {
        const dynamicProxyUrl = 'https://vt.upload.proxy';
        axios.get.mockResolvedValue({ data: { data: dynamicProxyUrl } });
        axios.post.mockResolvedValue({ data: { data: { id: 'final_analysis_id' } } });

        // Execute integration flow
        const fetchedUrl = await getUploadUrl();
        const analysisId = await uploadFileWithProgress(fetchedUrl, '../../Database_System_Concepts.pdf');

        // 4 assertions 
        // Checking if the returned URL matches the mock destination provided by the API
        expect(fetchedUrl).toBe(dynamicProxyUrl);
        // Checking if there's a usable ID after the chain of functions (for the next step/polling)
        expect(analysisId).toBe('final_analysis_id');
        // Checking if upload function actually sent the file to the generated proxy URL
        expect(axios.post).toHaveBeenCalledWith(dynamicProxyUrl, expect.any(Object), expect.any(Object));
        // Checking if config obj sent to axios has maxContentLength set to infinity (to bypass the default max file upload size of 10MB)
        expect(axios.post).toHaveBeenCalledWith(expect.anything(), expect.anything(), expect.objectContaining({
            maxContentLength: Infinity
        }));
    });
});