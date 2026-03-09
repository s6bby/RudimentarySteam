import { z } from "zod";

export class Review
{
    private userId: number; 
    private comment: string;

    constructor(userId: number, comment: string)
    {
        this.userId = userId;
        this.comment = comment;
    }
}

export const RawReviewSchema = z.object({
    userId: z.number(),
    comment: z.string()
});