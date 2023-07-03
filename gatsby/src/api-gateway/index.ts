import axios, { AxiosError } from "axios"
import {
    SignUpResponse,
    InitiateAuthResponse,
} from "@aws-sdk/client-cognito-identity-provider"

export type Blog = {
    slug: string
    createdAt: string
    viewsCount: number
}

export type User = {
    email: string
}

export const getBlogs = async () => {
    try {
        const res = await axios<{ blogs: Blog[] }>({
            method: "GET",
            url: process.env.GATSBY_API_URL + "/blogs",
        })

        return { blogs: res.data.blogs }
    } catch (err) {
        const errorMessage = err instanceof AxiosError ? err.message : "Error"
        console.error(errorMessage)

        return { error: errorMessage }
    }
}

export const getBlogBySlug = async (slug: string) => {
    try {
        const res = await axios<{ blog: Blog }>({
            method: "GET",
            url: process.env.GATSBY_API_URL + `/blogs/${slug}`,
        })

        return { blog: res.data.blog }
    } catch (err) {
        const errorMessage = err instanceof AxiosError ? err.message : "Error"
        console.error(errorMessage)

        return { error: errorMessage }
    }
}

export const signUp = async ({ email }: { email: string }) => {
    try {
        const res = await axios<{
            userConfirmed: SignUpResponse["UserConfirmed"]
        }>({
            method: "POST",
            url: process.env.GATSBY_API_URL + `/sign-up`,
            data: {
                email,
                password: "thepassworD1@",
            },
        })

        console.log(res.data)

        return { userConfirmed: res.data.userConfirmed }
    } catch (err) {
        const errorMessage = err instanceof AxiosError ? err.message : "Error"
        console.error(errorMessage)

        return { error: errorMessage }
    }
}

export const confirmSignUp = async ({
    email,
    confirmationCode,
}: {
    email: string
    confirmationCode: string
}) => {
    try {
        const res = await axios({
            method: "POST",
            url: process.env.GATSBY_API_URL + `/confirm-sign-up`,
            data: {
                email,
                confirmationCode,
            },
        })

        console.log(res.data)

        return {}
    } catch (err) {
        const errorMessage = err instanceof AxiosError ? err.message : "Error"
        console.error(errorMessage)

        return { error: errorMessage }
    }
}

export const initiateAuth = async ({ email }: { email: string }) => {
    try {
        const res = await axios<{
            authenticationResult: InitiateAuthResponse["AuthenticationResult"]
        }>({
            method: "POST",
            url: process.env.GATSBY_API_URL + `/initiate-auth`,
            data: { email, password: "thepassworD1@" },
        })

        console.log(res.data)

        return { authenticationResult: res.data.authenticationResult }
    } catch (err) {
        const errorMessage = err instanceof AxiosError ? err.message : "Error"
        console.error(errorMessage)

        return { error: errorMessage }
    }
}

export const getUser = async (): Promise<{
    user?: User
    error?: string
}> => {
    try {
        const res = await axios<{ user: User }>({
            method: "GET",
            url: process.env.GATSBY_API_URL + `/get-user`,
            headers: {
                Authorization:
                    "Bearer eyJraWQiOiJiY21vcDZqempvdUNIRVFcL2Y2VmF1YzExRVwvdkVpYUxJcWdtQmxhN2VKWDQ9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJmNmEyODJkNC1mMDExLTcwNGUtNmQ5NS05Nzc2NTljNmZjM2YiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMl80VlR0a1c0TTAiLCJjbGllbnRfaWQiOiIyMG52OGo5dmtqbmQyaDNxOGVybnNpZGJ2ZSIsIm9yaWdpbl9qdGkiOiJmZGM0YWE4ZS0yYTI0LTQ2ODYtODk5YS0zYmVhZjQ5NzQzNmEiLCJldmVudF9pZCI6ImM4MmMwY2JmLTNmOWMtNDczMS05YTNiLTE1ZTFjMzg1NWFiZCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2ODg0MTUwMTUsImV4cCI6MTY4ODQxODYxNSwiaWF0IjoxNjg4NDE1MDE1LCJqdGkiOiIyMmY4NGJjZS00Zjc5LTQwNjktODI4Yy0xNzM5YjFlOTI2YjYiLCJ1c2VybmFtZSI6ImY2YTI4MmQ0LWYwMTEtNzA0ZS02ZDk1LTk3NzY1OWM2ZmMzZiJ9.nlNtxzP65iwEpu4JmQid1AxIQxB5ZaOKqT6mnxsX3PyD2qRqVTk3_2XEH2McDIMVG56jrqMwU8g7orp1L72OF6-_XGBjShLwAXpULR7JCxJPZKe6vlA7olbtbPl9zqdGCgPMrZ5xMPfjhY3TXTGsrmRmGPl4LMahpBE4YmqaCRNHetUU8aXyX3SSgQZ6VZe9uudKaypO2X3UuPjmRwRF981OLHO_9lGmRSQh46VPPEQrPIoCJ7K0TY8kkvE4R7XeHrgsIUoW9r1tPyOqYzmrxFvmZsaM9xaS1JT0EkSJidZKCyEe3_H47I4J_GC-hBqD866Dlhx63yRVwR31tUePFw",
            },
        })

        return {
            user: res.data.user,
        }
    } catch (err) {
        const errorMessage = err instanceof AxiosError ? err.message : "Error"
        console.error(errorMessage)

        return { error: errorMessage }
    }
}
