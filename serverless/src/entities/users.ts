export class User {
    id: string
    email: string
    createdAt: Date
    updatedAt: Date

    constructor({
        id,
        email,
        createdAt = new Date(),
        updatedAt = new Date(),
    }: {
        id: string
        email: string
        likesCount?: number
        viewsCount?: number
        createdAt?: Date
        updatedAt?: Date
    }) {
        this.id = id
        this.email = email
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

    key() {
        return {
            PK: { S: `USER#${this.id}` },
            SK: { S: `USER#${this.id}` },
        }
    }

    toItem() {
        return {
            ...this.key(),
            Type: { S: "User" },
            Id: { S: this.id },
            Email: { S: this.email },
            CreatedAt: { S: this.createdAt.toISOString() },
            UpdatedAt: { S: this.updatedAt.toISOString() },
        }
    }
}

export type UserItem = ReturnType<User["toItem"]>

export const userFromItem = (item: UserItem) => {
    return new User({
        id: item.Id.S,
        email: item.Email.S,
        createdAt: new Date(item.CreatedAt.S),
        updatedAt: new Date(item.UpdatedAt.S),
    })
}
