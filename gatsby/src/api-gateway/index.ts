import axios from "axios"

export type Blog = {
    slug: string
    createdAt: string
    viewsCount: number
}

export const getBlogs = async () => {
    const res = await axios<{ blogs: Blog[] }>({
        method: "GET",
        url: process.env.GATSBY_API_URL + "/blogs",
    })

    return res.data.blogs
}
