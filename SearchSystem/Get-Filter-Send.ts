/* 
This file is for our backend person to implement into the server and for our frontend person to communicate with 

****************************************************************************************************
Nick, before you can use this code, add the getter below into your Application class 
so that the filter can get the names of apps (since the apps are private)

class Application {
    .
    .
    .
    Existing code
    .
    .
    .
    getName(): string {
        return this.name;
    }
}

****************************************************************************************************
Sebastian, to fetch the results for the frontend you can implement a function such as the one below:

async function searchApps(name) {
    const response = await fetch(`http://localhost:3000/applications?name=${name}`);
    const results = await response.json();

    // "results" will be an array of application objects that matched the name   
}  
*/

// Needed import to represent the incoming http request from the client
import express from 'express';

const app = express();
const port = 3000;

// Initializing database (reusing Nick's logic)
let database: Data;

(async () => {
    try {
        const rawData = await WriteUtils.loadFromJsonFile();
        database = DataSchema.parse(rawData);
    } catch (error) {
        database = new Data();
    }
})();

// processing the fetch request
app.get('/applications', (req, res) => {
    // Getting the query parameter: /applications?name=AppOne
    const nameFilter = req.query.name?.toString().toLowerCase();
    
    // Getting all apps from your existing Map-based method
    const allApps = database.getAllApplications();

    // if no filter is requested then send back all the apps 
    if (!nameFilter) {
        return res.json(allApps);
    }

    // Filtering based on the name getter
    const filteredApps = allApps.filter(app => 
        app.getName().toLowerCase().includes(nameFilter)
    );

    // Taking the filtered JS objects, converting them into a JSON string, and sending them off     
    res.json(filteredApps);
});

// starts serv and listens for the front end
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});