import axios from "axios"

export type Blog = {
    slug: string
    createdAt: string
    viewsCount: number
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
