import * as WriteUtils from './json-manipulation';

class Library
{
    private applications: Application[];
    
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
        if (this.applications.some(app => app.getId() === application.getId()))
        {
            console.error(`Application with ID ${application.getId()} already exists.`);
            return;
        }
        this.applications.push(application);
    }

    removeApplication(id: number): void
    {
        this.applications = this.applications.filter(app => app.getId() !== id);
    }

    getApplicationById(id: number): Application | undefined
    {
        return this.applications.find(app => app.getId() === id);
    }

    getAllApplications(): Application[]
    {
        return this.applications;
    }
}

class Application
{
    private id: number;
    private name: string;
    private description: string;
    private downloads: number;
    private upvotes: number;
    private reviews: Review[];
    
    constructor(id: number, name: string, description: string, downloads: number = 0, upvotes: number = 0, reviews: Review[] = [])
    {
        this.id = id;
        this.name = name;
        this.description = description;
        this.downloads = downloads;
        this.upvotes = upvotes;
        this.reviews = reviews;
    }

    getId(): number
    {
        return this.id;
    }

    addReview(review: string, user: User): void
    {
        this.reviews.push(new Review(user, review));
    }

    removeReview(index: number): void
    {
        if (index >= 0 && index < this.reviews.length)
        {
            this.reviews.splice(index, 1);
        }
    }

    upvote(): void
    {
        this.upvotes++;
    }
}

class Review
{
    private user: User; 
    private comment: string;

    constructor(user: User, comment: string)
    {
        this.user = user;
        this.comment = comment;
    }
}

class User
{
    private userId: number;
    private username: string;
    private email: string;

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
    library.getApplicationById(1)?.addReview('Great app!', new User(1, 'UserOne', 'userone@example.com'));
    library.addApplication(3, 'App Three', 'Description for App Three');
    library.addApplication(4, 'App Four', 'Description for App Four');
    await library.writeToFile();
    console.dir(library, { depth: null });
    library.getApplicationById(1)?.removeReview(0);
    library.removeApplication(3);
    library.removeApplication(4);
})();
