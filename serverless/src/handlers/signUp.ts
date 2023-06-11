import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { signUp } from "../data"

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const { email, password } = JSON.parse(event.body as string)

    const { error } = await signUp({ email, password })

    const statusCode = error ? 500 : 200
    const body = error ? JSON.stringify({ error }) : JSON.stringify("OK")

    return {
        statusCode,
        body,
    }
}
