import * as WriteUtils from './json-manipulation';

class Library
{
    applications: Application[];
    
    constructor(applications: Application[] = [])
    {
        this.applications = applications;
    }

    public static async loadFromFile(filePath: string = '../data/data.json'): Promise<Library>
    {
        const data = await WriteUtils.loadFromJsonFile(filePath);
        if (data) {
            const applications = data.applications.map((appData: any) => new Application(
                appData.applicationId,
                appData.name,
                appData.description,
                appData.downloads,
                appData.upvotes,
                appData.reviews
            ));
            return new Library(applications);
        }
        return new Library();
    }

    async writeToFile(filePath: string = '../data/data.json'): Promise<void>
    {
        await WriteUtils.saveToJsonFile(this, filePath);
    }

    addApplication(application: Application): void
    {
        if (this.applications.some(app => app.applicationId === application.applicationId))
        {
            console.error(`Application with ID ${application.applicationId} already exists.`);
            return;
        }
        this.applications.push(application);
    }

    getApplicationById(applicationId: number): Application | undefined
    {
        return this.applications.find(app => app.applicationId === applicationId);
    }

    removeApplication(applicationId: number): void
    {
        this.applications = this.applications.filter(app => app.applicationId !== applicationId);
    }
}

class Application
{
    applicationId: number;
    name: string;
    description: string;
    downloads: number;
    upvotes: number;
    reviews: string[];
    
    constructor(applicationId: number, name: string, description: string, downloads: number = 0, upvotes: number = 0, reviews: string[] = [])
    {
        this.applicationId = applicationId;
        this.name = name;
        this.description = description;
        this.downloads = downloads;
        this.upvotes = upvotes;
        this.reviews = reviews;
    }

    addReview(review: string): void
    {
        this.reviews.push(review);
    }

    upvote(): void
    {
        this.upvotes++;
    }
}

// Test data loading data and adding some applications
(async () => {
    const library = await Library.loadFromFile();
    library.addApplication(new Application(1, 'App One', 'Description for App One'));
    library.addApplication(new Application(2, 'App Two', 'Description for App Two'));
    await library.writeToFile();
    console.log(library);
    library.addApplication(new Application(3, 'App Three', 'Description for App Three'));
    library.addApplication(new Application(4, 'App Four', 'Description for App Four'));
    await library.writeToFile();
    console.log(library);
    library.removeApplication(3);
    library.removeApplication(4);
    await library.writeToFile();
    console.log(library);
})();

