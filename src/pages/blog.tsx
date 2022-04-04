import React from "react"
import { Link, graphql, PageProps } from "gatsby"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

import * as blogStyles from "./blog.module.scss"

type DataProps = {
    allMarkdownRemark: {
        edges: [
            {
                node: {
                    frontmatter: {
                        title: string
                        description: string
                        date: string
                        tags: string[]
                        featuredImage: {
                            childImageSharp: {
                                gatsbyImageData: IGatsbyImageData
                            }
                        }
                    }
                    fields: {
                        slug: string
                    }
                }
            }
        ]
    }
}

const BlogPage = ({ data: { allMarkdownRemark } }: PageProps<DataProps>) => {
    return (
        <Layout>
            <React.Fragment>
                <Seo
                    title="Blog | Andrea Diotallevi"
                    description="Andrea Diotallevi's blog posts"
                    tags={[
                        "JavaScript",
                        "React",
                        "Python",
                        "Django",
                        "GraphQL",
                        "Software Development",
                        "Andrea Diotallevi's Blog",
                    ]}
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
                            {allMarkdownRemark.edges.map(edge => (
                                <Link
                                    to={`/blog/${edge.node.fields.slug}`}
                                    className={blogStyles.post}
                                    key={edge.node.frontmatter.title}
                                >
                                    <div
                                        className={
                                            blogStyles.dateAndReadingTimeDiv
                                        }
                                    >
                                        <p>{edge.node.frontmatter.date}</p>
                                        <div
                                            className={
                                                blogStyles.imageContainer
                                            }
                                        >
                                            <GatsbyImage
                                                image={
                                                    edge.node.frontmatter
                                                        .featuredImage
                                                        .childImageSharp
                                                        .gatsbyImageData
                                                }
                                                alt={
                                                    edge.node.frontmatter.title
                                                }
                                                className={blogStyles.image}
                                            />
                                        </div>
                                    </div>
                                    <div style={{ width: "100%" }}>
                                        <h2>{edge.node.frontmatter.title}</h2>
                                        <p>
                                            {edge.node.frontmatter.description}
                                        </p>
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
            </React.Fragment>
        </Layout>
    )
}

export default BlogPage

export const query = graphql`
    {
        allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
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
                                    width: 310
                                    quality: 99
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
`
