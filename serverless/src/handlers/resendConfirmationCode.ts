import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { resendConfirmationCode } from "../data"

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const { email } = JSON.parse(event.body as string)

    const { error } = await resendConfirmationCode({ email })

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
