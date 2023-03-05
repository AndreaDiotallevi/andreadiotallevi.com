import { generateKSUID } from "./utils"

export class Comment {
    blogSlug: string
    commentId: string
    likesCount: number
    createdAt: Date
    updatedAt: Date

    constructor({
        blogSlug,
        commentId,
        likesCount = 0,
        createdAt = new Date(),
        updatedAt = new Date(),
    }: {
        blogSlug: string
        commentId?: string
        likesCount?: number
        createdAt?: Date
        updatedAt?: Date
    }) {
        if (!blogSlug) {
            throw new Error("Comment requires blog id.")
        }
        this.blogSlug = blogSlug
        this.commentId = commentId || generateKSUID(createdAt)
        this.likesCount = likesCount
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

    key() {
        return {
            PK: { S: `BLOG#${this.blogSlug}` },
            SK: { S: `COMMENT#${this.commentId}` },
        }
    }

    toItem() {
        return {
            ...this.key(),
            Type: { S: "Comment" },
            BlogId: { S: this.blogSlug },
            CommentId: { S: this.commentId },
            LikesCount: { N: this.likesCount.toString() },
            CreatedAt: { S: this.createdAt.toISOString() },
            UpdatedAt: { S: this.updatedAt.toISOString() },
        }
    }
}

export type CommentItem = ReturnType<Comment["toItem"]>

export const commentFromItem = (item: CommentItem) => {
    return new Comment({
        blogSlug: item.BlogId.S,
    })
}
