import { generateKSUID } from "./utils"

export class Blog {
    slug: string
    likesCount: number
    viewsCount: number
    createdAt: Date
    updatedAt: Date

    constructor({
        slug,
        likesCount = 0,
        viewsCount = 0,
        createdAt = new Date(),
        updatedAt = new Date(),
    }: {
        slug: string
        likesCount?: number
        viewsCount?: number
        createdAt?: Date
        updatedAt?: Date
    }) {
        this.slug = slug || generateKSUID(createdAt)
        this.likesCount = likesCount
        this.viewsCount = viewsCount
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

    key() {
        return {
            PK: { S: `BLOG#${this.slug}` },
            SK: { S: `BLOG#${this.slug}` },
        }
    }

    gsi1() {
        return {
            GSI1PK: { S: `BLOGS` },
            GSI1SK: { S: `BLOG#${this.slug}` },
        }
    }

    toItem() {
        return {
            ...this.key(),
            ...this.gsi1(),
            Type: { S: "Blog" },
            Slug: { S: this.slug },
            LikesCount: { N: this.likesCount.toString() },
            ViewsCount: { N: this.viewsCount.toString() },
            CreatedAt: { S: this.createdAt.toISOString() },
            UpdatedAt: { S: this.updatedAt.toISOString() },
        }
    }
}

export type BlogItem = ReturnType<Blog["toItem"]>

export const blogFromItem = (item: BlogItem) => {
    return new Blog({
        slug: item.Slug.S,
        likesCount: parseInt(item.LikesCount.N),
        viewsCount: parseInt(item.ViewsCount.N),
        createdAt: new Date(item.CreatedAt.S),
        updatedAt: new Date(item.UpdatedAt.S),
    })
}
