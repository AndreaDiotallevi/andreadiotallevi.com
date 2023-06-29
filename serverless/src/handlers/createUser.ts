import { createUser } from "../data"
import { User } from "../entities"

export const handler = async (event: {
    version: string
    region: string
    userPoolId: string
    userName: string
    request: { userAttributes: { sub: string; email_verified: string; email: string } }
}) => {
    const userAttributes = event.request.userAttributes
    const userName = event.userName
    const userEmail = userAttributes.email

    const userObj = new User({ id: userName, email: userEmail })

    await createUser({ user: userObj })

    return event
}
