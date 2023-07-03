import { CognitoIdentityProviderClient, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider"

const client = new CognitoIdentityProviderClient({ region: process.env.AWS_REGION })

export const signUp = async ({ email, password }: { email: string; password: string }) => {
    try {
        const signUpCommand = new SignUpCommand({
            ClientId: process.env.USER_POOL_CLIENT_ID,
            Username: email,
            Password: password,
            UserAttributes: [{ Name: "email", Value: email }],
        })

        const response = await client.send(signUpCommand)
        console.log(response)

        return {
            userConfirmed: response.UserConfirmed,
        }
    } catch (error) {
        console.log("Error signing up user")
        console.log(error)

        const errorMessage = error instanceof Error ? error.message : "Could not sign up user"

        return {
            error: errorMessage,
        }
    }
}
