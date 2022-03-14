import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

import * as blogStyles from "./blog.module.scss"

const BlogPage = () => {
    const data = useStaticQuery(graphql`
        {
            allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date] }
            ) {
                edges {
                    node {
                        frontmatter {
                            title
                            description
                            date(formatString: "MMM Do, YYYY")
                            tags
                            featuredImage {
                                childImageSharp {
                                    gatsbyImageData(
                                        width: 710
                                        quality: 100
                                        layout: CONSTRAINED
                                        placeholder: BLURRED
                                    )
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
            <Seo
                title="Blog | Andrea Diotallevi"
                description="Andrea Diotallevi's blog posts"
            />
            <div className={blogStyles.container}>
                <h1>Blog</h1>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                    }}
                >
                    <ol className={blogStyles.posts}>
                        {data.allMarkdownRemark.edges.map(edge => (
                            <Link
                                to={`/blog/${edge.node.fields.slug}`}
                                className={blogStyles.post}
                                key={edge.node.frontmatter.title}
                            >
                                <div
                                    className={blogStyles.dateAndReadingTimeDiv}
                                >
                                    <p>{edge.node.frontmatter.date}</p>
                                    <div className={blogStyles.imageContainer}>
                                        <GatsbyImage
                                            image={
                                                edge.node.frontmatter
                                                    .featuredImage
                                                    .childImageSharp
                                                    .gatsbyImageData
                                            }
                                            alt={edge.node.frontmatter.title}
                                            className={blogStyles.image}
                                        />
                                    </div>
                                </div>
                                <div style={{ width: "100%" }}>
                                    <h2>{edge.node.frontmatter.title}</h2>
                                    <p>{edge.node.frontmatter.description}</p>
                                    {/* <ul className={blogStyles.tags}>
                              {edge.node.frontmatter.tags.map(tag => (
                              <li key={tag}>{tag}</li>
                              ))}
                          </ul> */}
                                </div>
                                {/* </li> */}
                            </Link>
                        ))}
                    </ol>
                </div>
            </div>
        </Layout>
    )
}

export default BlogPage
