import { APIGatewayProxyResult } from "aws-lambda"
import { updateBlogsViewsCount } from "../data/updateBlogsViewsCount"

export const handler = async (): Promise<APIGatewayProxyResult> => {
    const { blogs, error } = await updateBlogsViewsCount()

    const statusCode = error ? 500 : 200
    const body = error ? JSON.stringify({ error }) : JSON.stringify({ blogs })

    return {
        statusCode,
        body,
    }
}
