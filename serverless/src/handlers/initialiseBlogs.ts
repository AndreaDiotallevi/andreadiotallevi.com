import { APIGatewayProxyResult } from "aws-lambda"
import { initialiseBlogs } from "../data"

export const handler = async (): Promise<APIGatewayProxyResult> => {
    const { blogs, error } = await initialiseBlogs()

    const statusCode = error ? 500 : 200
    const body = error ? JSON.stringify({ error }) : JSON.stringify({ blogs })

    return {
        statusCode,
        body,
    }
}
