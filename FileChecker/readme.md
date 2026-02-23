# FileChecker integrates with VirusTotal's API to check RudimentarySteam's game/software candidates for any malicious or suspicious content. This process is done before a game or piece of software can become public in the platform.

## Prerequisites & Version Check
This project requires **Node.js v18+** and **npm v9+**

How to check your versions:
Open your terminal and run:
```bash
# Verify Node.js
node -v

# Verify npm
npm -v
```

## 🛠 Setup & Installation

### 1. Initialize API SDK
This project uses the `api` library to manage the VirusTotal SDK. You must generate the local SDK folder before installing other dependencies.

Generate the .api/ directory:
```bash
npx api install "@virustotal/v3.0#40nj53llc655dro"
```

### 2. Create .env file
You will need a .env file to store an API Key from VirusTotal. Without it, FileChecker won't work. 

Now, create .env file and insert the two lines below into it:
API_KEY=YourApiKey
PORT=30000

Replace 'YourApiKey' with your API KEY (see directions on how to get one below). For the port, note that you can choose any available port, and 30000 is just my default. 

**Getting a VirusTotal API KEY:**
a. Go to https://www.virustotal.com. 
b. Create an account, or log in if you already have an account. 
c. Next, go to https://www.virustotal.com/gui/my-apikey. 
d. At the top of the page you will be see your blurred API KEY. Click the copy to clipboard button and paste it into the appropriate line in the .env file.

### 3. Install Core Dependencies (Axios, Bottleneck, & Dotenv)
The next step is to install all other dependencies. To ensure the exact same version tree, we will do npm ci.

Install the other dependencies:
```bash
# Strict install from package-lock.json
npm ci
```

## Troubleshooting

### "Missing local dependency" Error
Issue: You see an error like ENOENT: no such file or directory pointing to .api/apis/virustotal when running npm ci.
Solution: The npx api install command must be run before npm
Fix: Run npx api install "@virustotal/v3.0#40nj53llc655dro" and then retry the installation

### Lockfile Mismatch
Issue: npm ci fails with an error stating package-lock.json is out of sync with package.json
Solution: This happens if someone updated the dependencies in package.json manually without running npm install to update the lockfile.
Fix: If you are sure the package.json changes are correct, run npm install once to sync the files, then commit the updated package-lock.json.
Otherwise, track the changes to undo them then retry the installation.

### VirusTotal API Limiting
Issue: You are getting 429 Too Many Requests even though Bottleneck is installed.
Check: Ensure you haven't initialized multiple Bottleneck limiters for the same API key. Bottleneck only works if all Axios calls are routed through a single instance of the limiter.
Resource: Refer to the Bottleneck Documentation on how to wrap Axios calls correctly.

### "Command not found: npx"
Issue: Terminal doesn't recognize npx.
Solution: npx comes bundled with Node.js (v5.2.0+). If it's missing, you may have a corrupted Node installation.
Verification: Check your version with node -v and npm -v. Use the Official Node.js Downloader to reinstall if necessary.