import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

import blogStyles from "./blog.module.scss"
// import templateBlogStyles from "../templates/blog.module.scss"

const IndexPage = () => {
    const data = useStaticQuery(graphql`
        query {
            allMarkdownRemark(sort:{ order: DESC, fields: [frontmatter___date] }) {
                edges {
                    node {
                        frontmatter {
                            title
                            description
                            date(formatString: "MMMM Do, YYYY")
                            featuredImage {
                                childImageSharp {
                                    fluid(maxWidth: 750) {
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
        <Layout>
            <Seo
                title="Andrea Diotallevi | Software Developer"
                description="I am a full-stack software developer at Ripple Energy, where I contribute to the renewable energy transformation allowing people to part-own a new wind farm to power their homes with clean electricity. To improve my skills, I enjoy writing articles about algorithms and software development best practices sharing what I learn with our great software community."
            />
            <div className={blogStyles.container}>
                {/* <div style={{ position: "relative", top: -16, left: -16 }}>
                    <div
                        style={{ position: "absolute" }}
                        className={templateBlogStyles.titleSquaredDiv}
                    />
                </div> */}
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
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </Layout>
    )
}

export default IndexPage
