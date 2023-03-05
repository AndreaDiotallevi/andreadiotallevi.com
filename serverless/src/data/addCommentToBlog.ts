import { DynamoDBClient, TransactWriteItemsCommand } from "@aws-sdk/client-dynamodb"
import { Blog } from "../entities/blogs"
import { Comment } from "../entities/comments"

const dynamodb = new DynamoDBClient({ region: process.env.AWS_REGION })

export const addCommentToBlog = async ({ blogComment }: { blogComment: Comment }) => {
    const blog = new Blog({ slug: blogComment.blogSlug })

    try {
        const command = new TransactWriteItemsCommand({
            TransactItems: [
                {
                    Put: {
                        TableName: process.env.TABLE_NAME,
                        Item: blogComment.toItem(),
                        ConditionExpression: "attribute_not_exists(PK)",
                    },
                },
                {
                    ConditionCheck: {
                        TableName: process.env.TABLE_NAME,
                        Key: blog.key(),
                        ConditionExpression: "attribute_exists(PK)",
                    },
                },
            ],
        })

        await dynamodb.send(command)

        return {
            blogComment,
        }
    } catch (error) {
        console.log("Error adding comment to blog")
        console.log(error)
        const errorMessage = "Could not add comment to blog"

        return {
            error: errorMessage,
        }
    }
}
