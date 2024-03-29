import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { addCommentToBlog } from "../data"
import { Comment } from "../entities"

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // const { blogId }: { blogId: string } = JSON.parse(event.body as string)
    const blogId = event.pathParameters?.blogId as string
    const blogCommentObj = new Comment({ blogId })

    const { blogComment, error } = await addCommentToBlog({ blogComment: blogCommentObj })

    const statusCode = error ? 500 : 200
    const body = error ? JSON.stringify({ error }) : JSON.stringify({ blogComment })

    return {
        statusCode,
        body,
    }
}
