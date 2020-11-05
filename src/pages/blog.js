import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"

import blogStyles from "./blog.module.scss"

const BlogPage = () => {
    const data = useStaticQuery(graphql`
        query {
            allMarkdownRemark {
                edges {
                    node {
                        frontmatter {
                            title
                            description
                            date
                            thumbnailImage {
                                childImageSharp {
                                    fluid(maxWidth: 175) {
                                        ...GatsbyImageSharpFluid
                                    }
                                }
                            }
                        }
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `)

    return (
        <Layout>
            <ol className={blogStyles.posts}>
                {data.allMarkdownRemark.edges.map(edge => (
                    <li className={blogStyles.post} key={edge.node.frontmatter.title}>
                        {/* <div style={{ position: "relative", top: -16, left: -16 }}>
                            <div
                                style={{
                                    position: "absolute",
                                    width: 8,
                                    height: 54,
                                    backgroundColor: "rgba(0, 0, 255, 0.25)",
                                }}
                            />
                        </div>
                        <div style={{ position: "relative", top: -16, left: -16 }}>
                            <div
                                style={{
                                    position: "absolute",
                                    width: 54,
                                    height: 8,
                                    backgroundColor: "rgba(0, 0, 255, 0.25)",
                                }}
                            />
                        </div> */}


                        {/* <div style={{ position: "relative", top: -16, left: -16 }}>
                            <div
                                style={{
                                    position: "absolute",
                                    width: 54,
                                    height: 54,
                                    backgroundColor: "rgba(0, 0, 255, 0.25)",
                                }}
                            />
                        </div> */}
                        <Link to={`/blog/${edge.node.fields.slug}`}>
                            <h2>{edge.node.frontmatter.title}</h2>
                            <div className={blogStyles.flexContainer}>
                                <div className={blogStyles.imageContainer}>
                                    <Img fluid={edge.node.frontmatter.thumbnailImage.childImageSharp.fluid} className={blogStyles.image} />
                                </div>
                                <div className={blogStyles.descriptionDateDiv}>
                                    <p>{edge.node.frontmatter.description}</p>
                                    <p className={blogStyles.date}>{edge.node.frontmatter.date}</p>
                                </div>
                            </div>
                        </Link>
                        {/* <div style={{ position: "relative", top: -38, left: "calc(100% + 8px)" }}>
                            <div
                                style={{
                                    position: "absolute",
                                    width: 8,
                                    height: 54,
                                    backgroundColor: "rgba(0, 0, 255, 0.25)",
                                }}
                            />
                        </div>
                        <div style={{ position: "relative", top: 8, left: "calc(100% - 38px)" }}>
                            <div
                                style={{
                                    position: "absolute",
                                    width: 54,
                                    height: 8,
                                    backgroundColor: "rgba(0, 0, 255, 0.25)",
                                }}
                            />
                        </div> */}
                    </li>
                ))}
            </ol>
        </Layout>
    )
}

export default BlogPage
