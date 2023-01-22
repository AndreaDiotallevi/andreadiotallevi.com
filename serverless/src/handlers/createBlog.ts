import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { createBlog } from "../data"
import { Blog } from "../entities/blogs"

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const blogObj = new Blog({})

    const { blog, error } = await createBlog({ blog: blogObj })

    const statusCode = error ? 500 : 200
    const body = error ? JSON.stringify({ error }) : JSON.stringify({ blog })

    return {
        statusCode,
        body,
    }
}
