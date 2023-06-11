import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { confirmSignUp } from "../data"

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const { email, confirmationCode } = JSON.parse(event.body as string)

    const { error } = await confirmSignUp({ email, confirmationCode })

    const statusCode = error ? 500 : 200
    const body = error ? JSON.stringify({ error }) : JSON.stringify("OK")

    return {
        statusCode,
        body,
    }
}
