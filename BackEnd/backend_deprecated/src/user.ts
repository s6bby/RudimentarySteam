import { z } from "zod";

export class User
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

    getUsername(): string
    {
        return this.username;
    }

    getEmail(): string
    {
        return this.email;
    }

    updateEmail(newEmail: string): void
    {
        this.email = newEmail;
    }
}

export const RawUserSchema = z.object({
    userId: z.number(),
    username: z.string(),
    email: z.string()
});