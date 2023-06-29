import axios, { AxiosError } from "axios"

export type Blog = {
    slug: string
    createdAt: string
    viewsCount: number
}

export type User = {
    email: string
}

export const getBlogs = async (): Promise<Blog[]> => {
    const res = await axios<{ blogs: Blog[] }>({
        method: "GET",
        url: process.env.GATSBY_API_URL + "/blogs",
    })

    return res.data.blogs
}

export const getBlogBySlug = async (slug: string): Promise<Blog> => {
    const res = await axios<{ blog: Blog }>({
        method: "GET",
        url: process.env.GATSBY_API_URL + `/blogs/${slug}`,
    })

    return res.data.blog
}

export const signUp = async ({ email }: { email: string }): Promise<string> => {
    try {
        const res = await axios<string>({
            method: "POST",
            url: process.env.GATSBY_API_URL + `/sign-up`,
            data: {
                email,
                password: "thepassworD1@",
            },
        })

        console.log(res.data)

        return res.data
    } catch (err) {
        console.log(err)
        return "Error"
    }
}

export const confirmSignUp = async ({
    email,
    confirmationCode,
}: {
    email: string
    confirmationCode: string
}): Promise<string> => {
    try {
        const res = await axios<string>({
            method: "POST",
            url: process.env.GATSBY_API_URL + `/confirm-sign-up`,
            data: {
                email,
                confirmationCode,
            },
        })

        console.log(res.data)

        return res.data
    } catch (err) {
        console.log(err)
        return "Error"
    }
}

export const initiateAuth = async ({
    email,
}: {
    email: string
}): Promise<string> => {
    try {
        const res = await axios<string>({
            method: "POST",
            url: process.env.GATSBY_API_URL + `/initiate-auth`,
            data: {
                email,
                password: "thepassworD1@",
            },
        })

        console.log(res.data)

        return res.data
    } catch (err) {
        console.log(err)
        return "Error"
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
                    "Bearer eyJraWQiOiJiY21vcDZqempvdUNIRVFcL2Y2VmF1YzExRVwvdkVpYUxJcWdtQmxhN2VKWDQ9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJmNmEyODJkNC1mMDExLTcwNGUtNmQ5NS05Nzc2NTljNmZjM2YiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMl80VlR0a1c0TTAiLCJjbGllbnRfaWQiOiIyMG52OGo5dmtqbmQyaDNxOGVybnNpZGJ2ZSIsIm9yaWdpbl9qdGkiOiJkMGMzNDI0Mi0wMmQ0LTRlZTMtYmEyMC0xODVlMGY5NGQwOWMiLCJldmVudF9pZCI6ImFhNzY4Y2I2LTdiN2YtNDM3Ny05NTZmLWRhZmEzZDBkMTRmMyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2ODc5NjYyMTgsImV4cCI6MTY4Nzk2OTgxOCwiaWF0IjoxNjg3OTY2MjE4LCJqdGkiOiIzMDgyOWI2Zi0zYjljLTQzOTQtODE1YS04ZDg5ODY2MzhkODEiLCJ1c2VybmFtZSI6ImY2YTI4MmQ0LWYwMTEtNzA0ZS02ZDk1LTk3NzY1OWM2ZmMzZiJ9.SSW4XQoOFMFpOL84aqJhixmVypbKdfzk07n4sU-pNyP-RAs4EzuXiAG510Vkf_gKQkDM4_e9e8dqNWBMXYHGIboL1xBC9i9pXqYZfDI_6pheC9yDZ9D6kHgo6c7jLgINhYn38rz_541gTB4wACIT2rhCjm7bsMQqHkBn--lLojK3jdvCANFr95XZrK3lnzd8LLvejvwIK-X5hn0lOdlcZRbbmiu3FaiJ_LhKG5AheYUUke3D9xXy7S1dIPeYrkJzavndYxZSYV-m1AzRj428NX-mZr0n5PnfArOvsS-YbMGfX0_PtbTRuoh9wfuYlmAg6PW-i951Ft6imIvds4hgFQ",
            },
        })

        return {
            user: res.data.user,
        }
    } catch (err) {
        let errorMessage

        if (err instanceof AxiosError) {
            errorMessage = err.response?.data.error
        } else {
            errorMessage = "Error"
        }

        console.error(errorMessage)

        return { error: errorMessage }
    }
}
