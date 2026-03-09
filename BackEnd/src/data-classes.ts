import * as WriteUtils from './json-manipulation';
import { z } from "zod";

class Data
{
    private applications: Map<number, Application> = new Map<number, Application>();
    private users: Map<number, User> = new Map<number, User>();

    async writeToFile(filePath: string = '../data/data.json'): Promise<void>
    {
        await WriteUtils.saveToJsonFile(this, filePath);
    }

    addApplication(id: number, name: string, description: string): void
    {
        const application = new Application(id, name, description);
        if (this.applications.has(application.getId()))
        {
            console.error(`Application with ID ${application.getId()} already exists.`);
            return;
        }
        this.applications.set(application.getId(), application);
    }

    removeApplication(id: number): void
    {
        this.applications.delete(id);
    }

    getApplicationById(id: number): Application | undefined
    {
        return this.applications.get(id);
    }

    getAllApplications(): Application[]
    {
        return Array.from(this.applications.values());
    }
    
    addUser(userId: number, username: string, email: string): void
    {
        const user = new User(userId, username, email);
        if (this.users.has(user.getUserId()))
        {
            console.error(`User with ID ${user.getUserId()} already exists.`);
            return;
        }
        this.users.set(user.getUserId(), user);
    }

    removeUser(userId: number): void
    {
        this.users.delete(userId);
    }

    getUserById(userId: number): User | undefined
    {
        return this.users.get(userId);
    }

    getAllUsers(): User[]
    {
        return Array.from(this.users.values());
    }

    toJSON()
    {
        return {
            applications: Array.from(this.applications.values()),
            users: Array.from(this.users.values())
        };
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

    addReview(review: string, userId: number): void
    {
        this.reviews.push(new Review(userId, review));
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
    private userId: number; 
    private comment: string;

    constructor(userId: number, comment: string)
    {
        this.userId = userId;
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

    getUserId(): number
    {
        return this.userId;
    }
}

const RawUserSchema = z.object({
    userId: z.number(),
    username: z.string(),
    email: z.string()
});

const RawReviewSchema = z.object({
    userId: z.number(),
    comment: z.string()
});

const RawApplicationSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    downloads: z.number(),
    upvotes: z.number(),
    reviews: z.array(RawReviewSchema)
});

const DataSchema = z.object({
    users: z.array(RawUserSchema),
    applications: z.array(RawApplicationSchema)
}).transform((data) => {
    const database = new Data();

    data.users.forEach(u => {
        database.addUser(u.userId, u.username, u.email);
    });

    data.applications.forEach(appData => {
        database.addApplication(
            appData.id, 
            appData.name, 
            appData.description
        );
        const app = database.getApplicationById(appData.id);
        if (app)
        {
            appData.reviews.forEach(revData => {
                    app.addReview(revData.comment, revData.userId);
            });
        }
    });
    return database;
});
