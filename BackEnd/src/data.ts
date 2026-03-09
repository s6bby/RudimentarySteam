import * as WriteUtils from './json-manipulation';
import { z } from "zod";
import { Application, RawApplicationSchema } from "./application";
import { User, RawUserSchema } from "./user";

export class Data
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
