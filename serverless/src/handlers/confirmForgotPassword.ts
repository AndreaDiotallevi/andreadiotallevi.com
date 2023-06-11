import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { confirmForgotPassword } from "../data"

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const { email, confirmationCode, password } = JSON.parse(event.body as string)

    const { error } = await confirmForgotPassword({ email, confirmationCode, password })

    const statusCode = error ? 500 : 200
    const body = error ? JSON.stringify({ error }) : JSON.stringify("OK")

    return {
        statusCode,
        body,
        headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
        },
    }
}
