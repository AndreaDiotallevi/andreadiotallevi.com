import {
    CognitoIdentityProviderClient,
    ConfirmSignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider"

const client = new CognitoIdentityProviderClient({ region: process.env.AWS_REGION })

export const confirmSignUp = async ({
    email,
    confirmationCode,
}: {
    email: string
    confirmationCode: string
}) => {
    try {
        const confirmSignUpCommand = new ConfirmSignUpCommand({
            ClientId: process.env.USER_POOL_CLIENT_ID,
            Username: email,
            ConfirmationCode: confirmationCode,
        })

        const response = await client.send(confirmSignUpCommand)
        console.log(response)

        return {}
    } catch (error) {
        console.log("Error confirming sign up")
        console.log(error)

        const errorMessage = error instanceof Error ? error.message : "Could not confirm sign up"

        return {
            error: errorMessage,
        }
    }
}
