import React, { useState, useEffect } from "react"
import { Link, graphql, PageProps } from "gatsby"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import { FormattedNumber } from "react-intl"

import { getBlogs } from "../api-gateway"
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
    type Edge = (typeof allMarkdownRemark.edges)[0]
    type ExtendedEdge = Edge & { dynamicData?: { viewsCount: number } }
    const [edges, setEdges] = useState<ExtendedEdge[]>(allMarkdownRemark.edges)

    useEffect(() => {
        const fetchBlogsDynamicData = async () => {
            const data = await getBlogs()

            const extendedEdges: ExtendedEdge[] = allMarkdownRemark.edges.map(
                edge => {
                    const blog = data.find(
                        blog => blog.slug === edge.node.fields.slug
                    )

                    return {
                        ...edge,
                        dynamicData: { viewsCount: blog?.viewsCount || 0 },
                    }
                }
            )

            setEdges(extendedEdges)
        }

        fetchBlogsDynamicData()
    }, [])

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
                    <ol>
                        {edges.map(
                            (
                                { node: { fields, frontmatter }, dynamicData },
                                index
                            ) => (
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
                                                loading="eager"
                                            />
                                        </div>
                                        <div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-between",
                                                }}
                                            >
                                                <p style={{ fontSize: "14px" }}>
                                                    {frontmatter.date}
                                                </p>
                                                {dynamicData?.viewsCount ? (
                                                    <p
                                                        style={{
                                                            fontSize: "14px",
                                                        }}
                                                    >
                                                        <FormattedNumber
                                                            value={
                                                                dynamicData.viewsCount
                                                            }
                                                        />{" "}
                                                        Views
                                                    </p>
                                                ) : null}
                                            </div>
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
                                                    <li
                                                        key={tag}
                                                        style={{
                                                            listStyle: "none",
                                                            margin: 0,
                                                            padding: 0,
                                                        }}
                                                    >
                                                        <Tag name={tag} />
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </Link>
                                </li>
                            )
                        )}
                    </ol>
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
