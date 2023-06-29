import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { getUser } from "../data"

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const accessToken = (event.headers.Authorization ?? "").split(" ")[1]

    const { user, error } = await getUser({ accessToken })

    const statusCode = error ? 500 : 200
    const body = error ? JSON.stringify({ error }) : JSON.stringify({ user })

    return {
        statusCode,
        body,
        headers: {
            "Access-Control-Allow-Headers": "Authorization, Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
        },
    }
}
