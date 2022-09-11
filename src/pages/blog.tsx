import React from "react"
import { Link, graphql, PageProps } from "gatsby"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Tag from "../components/tag"

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
                    <div>
                        {allMarkdownRemark.edges.map(
                            ({ node: { fields, frontmatter } }) => (
                                <li
                                    key={frontmatter.title}
                                    style={{ listStyle: "none" }}
                                >
                                    <Link to={`/blog/${fields.slug}`}>
                                        <div>
                                            {/* <p>{frontmatter.date}</p> */}
                                            <GatsbyImage
                                                image={
                                                    frontmatter.featuredImage
                                                        .childImageSharp
                                                        .gatsbyImageData
                                                }
                                                alt={frontmatter.title}
                                            />
                                        </div>
                                        <div>
                                            <p>{frontmatter.date}</p>
                                            <h2>{frontmatter.title}</h2>
                                            {/* <p>{frontmatter.description}</p> */}
                                            <ul
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    flexWrap: "wrap",
                                                    margin: 0,
                                                    marginBottom: "1.45rem",
                                                }}
                                            >
                                                {frontmatter.tags.map(tag => (
                                                    <Tag key={tag} name={tag} />
                                                ))}
                                            </ul>
                                        </div>
                                    </Link>
                                </li>
                            )
                        )}
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
                        date(formatString: "MMMM Do, YYYY")
                        tags
                        featuredImage {
                            childImageSharp {
                                gatsbyImageData(
                                    width: 718
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
