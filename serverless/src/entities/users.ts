import { generateKSUID } from "./utils"

export class User {
    email: string
    createdAt: Date
    updatedAt: Date

    constructor({
        email,
        createdAt = new Date(),
        updatedAt = new Date(),
    }: {
        email: string
        likesCount?: number
        viewsCount?: number
        createdAt?: Date
        updatedAt?: Date
    }) {
        this.email = email || generateKSUID(createdAt)
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

    key() {
        return {
            PK: { S: `USER#${this.email}` },
            SK: { S: `USER#${this.email}` },
        }
    }

    toItem() {
        return {
            ...this.key(),
            Type: { S: "User" },
            Email: { S: this.email },
            CreatedAt: { S: this.createdAt.toISOString() },
            UpdatedAt: { S: this.updatedAt.toISOString() },
        }
    }
}

export type UserItem = ReturnType<User["toItem"]>

export const userFromItem = (item: UserItem) => {
    return new User({
        email: item.Email.S,
        createdAt: new Date(item.CreatedAt.S),
        updatedAt: new Date(item.UpdatedAt.S),
    })
}
