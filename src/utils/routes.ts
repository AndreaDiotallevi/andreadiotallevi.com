export type Route = {
    menuName: string
    baseUrl: string
}

const routes: Route[] = [
    {
        menuName: "Blog",
        baseUrl: "/blog",
    },
    {
        menuName: "About",
        baseUrl: "/about",
    },
]

export default routes
