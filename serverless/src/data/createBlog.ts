import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb"
import { Blog } from "../entities/blogs"

const dynamodb = new DynamoDBClient({ region: process.env.AWS_REGION })

export const createBlog = async ({ blog }: { blog: Blog }) => {
    try {
        const command = new PutItemCommand({
            TableName: process.env.TABLE_NAME,
            Item: blog.toItem(),
            ConditionExpression: "attribute_not_exists(PK)",
        })

        await dynamodb.send(command)

        return {
            blog,
        }
    } catch (error) {
        console.log("Error creating blog")
        console.log(error)
        const errorMessage = "Could not create blog"

        return {
            error: errorMessage,
        }
    }
}
