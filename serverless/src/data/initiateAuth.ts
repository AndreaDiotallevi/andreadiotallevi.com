import {
    CognitoIdentityProviderClient,
    InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider"

const client = new CognitoIdentityProviderClient({ region: process.env.AWS_REGION })

export const initiateAuth = async ({ email, password }: { email: string; password: string }) => {
    try {
        const initiateAuthCommand = new InitiateAuthCommand({
            AuthFlow: "USER_PASSWORD_AUTH",
            ClientId: process.env.USER_POOL_CLIENT_ID,
            AuthParameters: {
                USERNAME: email,
                PASSWORD: password,
            },
        })

        const response = await client.send(initiateAuthCommand)
        console.log(response)

        return {
            authenticationResult: response.AuthenticationResult,
        }
    } catch (error) {
        console.log("Error initiating auth")
        console.log(error)

        const errorMessage = error instanceof Error ? error.message : "Could not initiate auth"

        return {
            error: errorMessage,
        }
    }
}
