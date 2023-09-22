import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { initiateAuth } from "../data"

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log("BEFORE", event.body)
    const { clientId, username } = JSON.parse(event.body as string)
    console.log("LOGGGG")
    console.log("handler", clientId)

    const { error, authenticationResult } = await initiateAuth({ clientId, username })

    const statusCode = error ? 500 : 200
    const body = error ? JSON.stringify({ error }) : JSON.stringify({ authenticationResult })

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
