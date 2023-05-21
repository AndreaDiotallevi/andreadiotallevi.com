import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { getBlogBySlug } from "../data"
import { Blog } from "../entities"

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const { blogSlug }: { blogSlug: string } = event.pathParameters as { blogSlug: string }
    const blogObj = new Blog({ slug: blogSlug })

    const { blog, error } = await getBlogBySlug({ blog: blogObj })

    const statusCode = error ? 500 : 200
    const body = error ? JSON.stringify({ error }) : JSON.stringify({ blog })

    return {
        statusCode,
        body,
        headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
        },
    }
}
