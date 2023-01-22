import { generateKSUID } from "./utils"

export class Comment {
    blogId: string
    commentId: string
    likesCount: number
    createdAt: Date
    updatedAt: Date

    constructor({
        blogId,
        commentId,
        likesCount = 0,
        createdAt = new Date(),
        updatedAt = new Date(),
    }: {
        blogId: string
        commentId?: string
        likesCount?: number
        createdAt?: Date
        updatedAt?: Date
    }) {
        if (!blogId) {
            throw new Error("Comment requires blog id.")
        }
        this.blogId = blogId
        this.commentId = commentId || generateKSUID(createdAt)
        this.likesCount = likesCount
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

    key() {
        return {
            PK: { S: `BLOG#${this.blogId}` },
            SK: { S: `COMMENT#${this.commentId}` },
        }
    }

    toItem() {
        return {
            ...this.key(),
            Type: { S: "Comment" },
            BlogId: { S: this.blogId },
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
        blogId: item.BlogId.S,
    })
}
