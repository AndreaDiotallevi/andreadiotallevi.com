// const path = require("path")

// module.exports.onCreateNode = ({ node, actions }) => {
//     const { createNodeField } = actions

//     if (node.internal.type === "MarkdownRemark") {
//         const slug = path.basename(node.fileAbsolutePath, ".md")

//         createNodeField({
//             node,
//             name: "slug",
//             value: slug,
//         })
//     }
// }

// module.exports.createPages = async ({ graphql, actions }) => {
//     const { createPage } = actions
//     const blogTemplate = path.resolve("./src/templates/blog.tsx")
//     const res = await graphql(`
//         query {
//             allMarkdownRemark {
//                 edges {
//                     node {
//                         fields {
//                             slug
//                         }
//                     }
//                 }
//             }
//         }
//     `)

//     res.data.allMarkdownRemark.edges.forEach(edge => {
//         createPage({
//             component: blogTemplate,
//             path: `/blog/${edge.node.fields.slug}`,
//             context: {
//                 slug: edge.node.fields.slug,
//             },
//         })
//     })
// }

// /////////

import type { GatsbyNode } from "gatsby"
import path from "path"

// export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = ({
//     actions: { createTypes }, getNodesByType,
// }) => {
//     const nodes = getNodesByType("MarkdownRemark")
//     const typeDefs = `
//         type MarkdownRemark implements Node {
//             fields {
//                 slug: String
//             }
//         }
//     `
//     createTypes(typeDefs)
// }

export const onCreateNode: GatsbyNode["onCreateNode"] = async ({
    node,
    actions: { createNodeField },
}) => {
    console.log("before", node)
    if (node.internal.type === "MarkdownRemark") {
        console.log("after", node)
        const slug = path.basename(node.fileAbsolutePath, ".md")

        createNodeField({
            node,
            name: "slug",
            value: slug,
        })
    }
}

export const createPages: GatsbyNode["createPages"] = async ({
    graphql,
    actions: { createPage },
}) => {
    const blogTemplate = path.resolve("./src/templates/blog.tsx")

    const res: {
        errors?: unknown
        data?: {
            allMarkdownRemark: {
                edges: [
                    {
                        node: {
                            fields: { slug: string }
                        }
                    }
                ]
            }
        }
    } = await graphql(`
        query {
            allMarkdownRemark {
                edges {
                    node {
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `)

    res.data.allMarkdownRemark.edges.forEach(edge => {
        createPage({
            component: blogTemplate,
            path: `/blog/${edge.node.fields.slug}`,
            context: {
                slug: edge.node.fields.slug,
            },
        })
    })
}
