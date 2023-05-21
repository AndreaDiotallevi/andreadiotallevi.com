import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb"
import { Blog, blogFromItem, BlogItem } from "../entities"

const dynamodb = new DynamoDBClient({ region: process.env.AWS_REGION })

export const getBlogBySlug = async ({ blog }: { blog: Blog }) => {
    try {
        const command = new GetItemCommand({
            TableName: process.env.TABLE_NAME,
            Key: blog.key(),
        })

        const response = await dynamodb.send(command)

        return {
            blog: blogFromItem(response.Item as BlogItem),
        }
    } catch (error) {
        console.log("Error getting blog by slug")
        console.log(error)
        const errorMessage = "Could not get blog by slug"

        return {
            error: errorMessage,
        }
    }
}
