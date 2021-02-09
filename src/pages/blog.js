import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

import blogStyles from "./blog.module.scss"
// import templateBlogStyles from "../templates/blog.module.scss"

const BlogPage = () => {
    const data = useStaticQuery(graphql`
        query {
            allMarkdownRemark(sort:{ order: DESC, fields: [frontmatter___date] }) {
                edges {
                    node {
                        frontmatter {
                            title
                            description
                            date(formatString: "MMMM Do, YYYY")
                            tags
                            featuredImage {
                                childImageSharp {
                                    fluid(maxWidth: 710) {
                                        ...GatsbyImageSharpFluid
                                    }
                                }
                            }
                        }
                        fields {
                            slug
                            readingTime {
                                text
                            }
                        }
                    }
                }
            }
        }
    `)

    return (
        <Layout className={blogStyles.layout}>
            <Seo
                title="Blog | Andrea Diotallevi"
                description="Andrea Diotallevi's blog posts"
            />
            <div className={blogStyles.container}>
                <h1>Blog</h1>
                <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                    <ol className={blogStyles.posts}>
                        {data.allMarkdownRemark.edges.map(edge => (
                            <li className={blogStyles.post} key={edge.node.frontmatter.title}>
                                <Link to={`/blog/${edge.node.fields.slug}`}>
                                    <div className={blogStyles.imageContainer}>
                                        <Img fluid={edge.node.frontmatter.featuredImage.childImageSharp.fluid} className={blogStyles.image} />
                                    </div>
                                    <div className={blogStyles.dateAndReadingTimeDiv}>
                                        <p>{edge.node.frontmatter.date}</p>
                                        <p style={{ margin: "0 10px" }}>·</p>
                                        <p>{edge.node.fields.readingTime.text}</p>
                                    </div>
                                    <h2>{edge.node.frontmatter.title}</h2>
                                    <p>{edge.node.frontmatter.description}</p>
                                </Link>
                                {/* <ul className={blogStyles.tags}>
                                    {edge.node.frontmatter.tags.map(tag => (
                                        <li key={tag}>
                                            {tag}
                                        </li>
                                    ))}
                                </ul> */}
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </Layout>
    )
}

export default BlogPage
