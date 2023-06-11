import {
    CognitoIdentityProviderClient,
    ConfirmForgotPasswordCommand,
} from "@aws-sdk/client-cognito-identity-provider"

const client = new CognitoIdentityProviderClient({ region: process.env.AWS_REGION })

export const confirmForgotPassword = async ({
    email,
    confirmationCode,
    password,
}: {
    email: string
    confirmationCode: string
    password: string
}) => {
    try {
        const confirmForgotPasswordCommand = new ConfirmForgotPasswordCommand({
            ClientId: process.env.USER_POOL_CLIENT_ID,
            Username: email,
            ConfirmationCode: confirmationCode,
            Password: password,
        })

        const response = await client.send(confirmForgotPasswordCommand)
        console.log(response)

        return {}
    } catch (error) {
        console.log("Error confirming forgot password")
        console.log(error)
        const errorMessage = "Could not confirm forgot password"

        return {
            error: errorMessage,
        }
    }
}
