import {
    CognitoIdentityProviderClient,
    ResendConfirmationCodeCommand,
} from "@aws-sdk/client-cognito-identity-provider"

const client = new CognitoIdentityProviderClient({ region: process.env.AWS_REGION })

export const resendConfirmationCode = async ({ email }: { email: string }) => {
    try {
        const resendConfirmationCodeCommand = new ResendConfirmationCodeCommand({
            ClientId: process.env.USER_POOL_CLIENT_ID,
            Username: email,
        })

        const response = await client.send(resendConfirmationCodeCommand)
        console.log(response)

        return {}
    } catch (error) {
        console.log("Error resending confirmation code")
        console.log(error)
        const errorMessage = "Could not resend confirmation code"

        return {
            error: errorMessage,
        }
    }
}
