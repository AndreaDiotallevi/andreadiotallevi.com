import { generateKSUID } from "./utils"

export class Blog {
    blogId: string
    likesCount: number
    createdAt: Date
    updatedAt: Date

    constructor({
        blogId,
        likesCount = 0,
        createdAt = new Date(),
        updatedAt = new Date(),
    }: {
        blogId?: string
        likesCount?: number
        createdAt?: Date
        updatedAt?: Date
    }) {
        this.blogId = blogId || generateKSUID(createdAt)
        this.likesCount = likesCount
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

    key() {
        return {
            PK: { S: `BLOG#${this.blogId}` },
            SK: { S: `BLOG#${this.blogId}` },
        }
    }

    gsi1() {
        return {
            GSI1PK: { S: `BLOGS` },
            GSI1SK: { S: `BLOG#${this.blogId}` },
        }
    }

    toItem() {
        return {
            ...this.key(),
            ...this.gsi1(),
            Type: { S: "Blog" },
            BlogId: { S: this.blogId },
            LikesCount: { N: this.likesCount.toString() },
            CreatedAt: { S: this.createdAt.toISOString() },
            UpdatedAt: { S: this.updatedAt.toISOString() },
        }
    }
}

export type BlogItem = ReturnType<Blog["toItem"]>

export const blogFromItem = (item: BlogItem) => {
    return new Blog({
        blogId: item.BlogId.S,
        likesCount: parseInt(item.LikesCount.N),
        createdAt: new Date(item.CreatedAt.S),
        updatedAt: new Date(item.UpdatedAt.S),
    })
}
