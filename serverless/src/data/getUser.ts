import { CognitoIdentityProviderClient, GetUserCommand } from "@aws-sdk/client-cognito-identity-provider"

const client = new CognitoIdentityProviderClient({ region: process.env.AWS_REGION })

export const getUser = async ({ accessToken }: { accessToken: string }) => {
    try {
        const getUserCommand = new GetUserCommand({ AccessToken: accessToken })

        const response = await client.send(getUserCommand)

        const userAttributes = response.UserAttributes
        if (!userAttributes) {
            return { error: "" }
        }
        const username = userAttributes.find((attribute) => attribute.Name === "sub")?.Value
        const email = userAttributes.find((attribute) => attribute.Name === "email")?.Value

        console.log(response)
        console.log(username)
        console.log(email)

        return {}
    } catch (error) {
        console.log("Error getting user")
        console.log(error)
        const errorMessage = "Could not get user"

        return {
            error: errorMessage,
        }
    }
}
