import * as WriteUtils from './json-manipulation';

class Library
{
    private applications: Application[];
    static applications: any;
    
    constructor()
    {
        this.applications = [];
    }

    public async loadFromFile(filePath: string = '../data/data.json'): Promise<void>
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
            this.applications = applications;
        }
    }

    async writeToFile(filePath: string = '../data/data.json'): Promise<void>
    {
        await WriteUtils.saveToJsonFile(this, filePath);
    }

    addApplication(id: number, name: string, description: string): void
    {
        const application = new Application(id, name, description);
        if (this.applications.some(app => app.applicationId === application.applicationId))
        {
            console.error(`Application with ID ${application.applicationId} already exists.`);
            return;
        }
        this.applications.push(application);
    }

    removeApplication(applicationId: number): void
    {
        this.applications = this.applications.filter(app => app.applicationId !== applicationId);
    }

    getApplicationById(applicationId: number): Application | undefined
    {
        return this.applications.find(app => app.applicationId === applicationId);
    }

    getAllApplications(): Application[]
    {
        return this.applications;
    }
}

class Application
{
    applicationId: number;
    name: string;
    description: string;
    downloads: number;
    upvotes: number;
    reviews: Review[];
    
    constructor(applicationId: number, name: string, description: string, downloads: number = 0, upvotes: number = 0, reviews: Review[] = [])
    {
        this.applicationId = applicationId;
        this.name = name;
        this.description = description;
        this.downloads = downloads;
        this.upvotes = upvotes;
        this.reviews = reviews;
    }

    addReview(review: string, user: User): void
    {
        this.reviews.push(new Review(user, review));
    }

    upvote(): void
    {
        this.upvotes++;
    }
}

class Review
{
    User: User; 
    comment: string;

    constructor(user: User, comment: string)
    {
        this.User = user;
        this.comment = comment;
    }
}

class User
{
    userId: number;
    username: string;
    email: string;

    constructor(userId: number, username: string, email: string)
    {
        this.userId = userId;
        this.username = username;
        this.email = email;
    }
}

// Test data loading data and adding some applications
const library = new Library();

(async () => {
    await library.loadFromFile();
    library.addApplication(1, 'App One', 'Description for App One');
    library.addApplication(2, 'App Two', 'Description for App Two');
    await library.writeToFile();
    console.log(library);
    library.addApplication(3, 'App Three', 'Description for App Three');
    library.addApplication(4, 'App Four', 'Description for App Four');
    await library.writeToFile();
    console.log(library);
    library.removeApplication(3);
    library.removeApplication(4);
    await library.writeToFile();
    console.log(library);
})();

