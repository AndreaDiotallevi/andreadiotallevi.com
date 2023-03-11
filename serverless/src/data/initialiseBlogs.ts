import { Blog } from "../entities/blogs"
import { createBlog } from "./createBlog"

const blogObjects = [
    {
        slug: "how-to-incrementally-develop-an-algorithm-using-test-driven-development",
        createdAt: new Date("Feb 20 2020"),
    },
    {
        slug: "big-o-notation-and-the-magic-of-time-complexity",
        createdAt: new Date("Apr 15 2020"),
    },
    {
        slug: "how-to-use-the-property-decorator-in-python-and-django",
        createdAt: new Date("Jan 31 2021"),
    },
    {
        slug: "how-to-format-a-well-formed-response-to-a-graphql-request",
        createdAt: new Date("Feb 28 2021"),
    },
    {
        slug: "how-to-handle-multiple-set-state-calls-on-the-same-object-in-react",
        createdAt: new Date("Mar 30 2021"),
    },
    {
        slug: "the-3-types-of-errors-you-need-to-handle-to-help-your-users-submit-a-web-form",
        createdAt: new Date("Aug 26 2022"),
    },
    {
        slug: "3-reasons-why-refactoring-your-code-before-submission-will-make-you-stand-out-as-a-software-developer",
        createdAt: new Date("Sep 2 2022"),
    },
    {
        slug: "how-to-build-and-validate-a-form-with-react-and-typescript",
        createdAt: new Date("Sep 9 2022"),
    },
    {
        slug: "5-benefits-of-typing-v-copy-pasting-when-working-on-new-code",
        createdAt: new Date("Sep 16 2022"),
    },
    {
        slug: "how-to-create-a-production-image-for-a-node-typescript-app-using-docker-multi-stage-builds",
        createdAt: new Date("Oct 6 2022"),
    },
    {
        slug: "lessons-learned-working-as-an-architect-you-can-apply-in-software-development",
        createdAt: new Date("Oct 14 2022"),
    },
    {
        slug: "how-to-implement-client-side-redirects-in-next-js",
        createdAt: new Date("Oct 31 2022"),
    },
    {
        slug: "why-you-should-use-sam-to-test-and-deploy-cloud-resources-in-aws",
        createdAt: new Date("Dec 8 2022"),
    },
]

export const initialiseBlogs = async () => {
    try {
        const blogs: Blog[] = []

        for (let i = 0; i < blogObjects.length; i++) {
            const blogObj = new Blog(blogObjects[i])
            const { blog } = await createBlog({ blog: blogObj })
            blog && blogs.push(blog)
        }

        return { blogs }
    } catch (error) {
        console.log("Error initialising blogs")
        console.log(error)
        const errorMessage = "Could not initialise blogs"

        return {
            error: errorMessage,
        }
    }
}
