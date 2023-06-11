import {
    CognitoIdentityProviderClient,
    ForgotPasswordCommand,
} from "@aws-sdk/client-cognito-identity-provider"

const client = new CognitoIdentityProviderClient({ region: process.env.AWS_REGION })

export const forgotPassword = async ({ email }: { email: string }) => {
    try {
        const forgotPasswordCommand = new ForgotPasswordCommand({
            ClientId: process.env.USER_POOL_CLIENT_ID,
            Username: email,
        })

        const response = await client.send(forgotPasswordCommand)
        console.log(response)

        return {}
    } catch (error) {
        console.log("Error sending forgot password confirmation code")
        console.log(error)
        const errorMessage = "Could not send forgot password confirmation code"

        return {
            error: errorMessage,
        }
    }
}
