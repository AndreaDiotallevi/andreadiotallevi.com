import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb"
import { CognitoIdentityProviderClient, GetUserCommand } from "@aws-sdk/client-cognito-identity-provider"
import { User, UserItem, userFromItem } from "../entities"

const dynamodb = new DynamoDBClient({ region: process.env.AWS_REGION })
const client = new CognitoIdentityProviderClient({ region: process.env.AWS_REGION })

export const getUser = async ({ accessToken }: { accessToken: string }) => {
    try {
        const getUserCommand = new GetUserCommand({ AccessToken: accessToken })

        const response = await client.send(getUserCommand)
        console.log(response)

        const userAttributes = response.UserAttributes
        if (!userAttributes) throw new Error("No user attributes")

        const username = response.Username
        console.log(username)
        const email = userAttributes.find((attribute) => attribute.Name === "email")?.Value
        console.log(email)

        if (!username) throw new Error("No username")
        if (!email) throw new Error("No email")

        const user = new User({ id: username, email })
        console.log(user)

        const command = new GetItemCommand({ TableName: process.env.TABLE_NAME, Key: user.key() })
        console.log(user.key())
        console.log("com", command)

        const response2 = await dynamodb.send(command)
        console.log("res", response2)

        console.log("item", response2.Item)

        return {
            user: userFromItem(response2.Item as UserItem),
        }
    } catch (error) {
        console.log("Error getting user")
        console.log(error)

        const errorMessage = error instanceof Error ? error.message : "Could not get user"

        return {
            error: errorMessage,
        }
    }
}
