import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb"
import { blogFromItem, BlogItem } from "../entities/blogs"

const dynamodb = new DynamoDBClient({ region: process.env.AWS_REGION })

export const getBlogs = async () => {
    try {
        const command = new QueryCommand({
            TableName: process.env.TABLE_NAME,
            IndexName: "GSI1",
            KeyConditionExpression: "#gsi1pk = :gsi1pk",
            ExpressionAttributeNames: {
                "#gsi1pk": "GSI1PK",
            },
            ExpressionAttributeValues: {
                ":gsi1pk": { S: `BLOGS` },
            },
            ScanIndexForward: false,
        })

        const response = await dynamodb.send(command)

        return {
            blogs: (response.Items as BlogItem[]).map((item) => {
                return blogFromItem(item)
            }),
        }
    } catch (error) {
        console.log("Error getting blogs")
        console.log(error)
        const errorMessage = "Could not get blogs"

        return {
            error: errorMessage,
        }
    }
}
