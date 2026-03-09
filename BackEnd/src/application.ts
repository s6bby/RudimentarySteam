import { z } from "zod";
import { Review, RawReviewSchema } from "./review";

export class Application
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

export const RawApplicationSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    downloads: z.number(),
    upvotes: z.number(),
    reviews: z.array(RawReviewSchema)
});