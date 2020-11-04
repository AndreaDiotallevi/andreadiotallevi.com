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
                        <Link to={`/blog/${edge.node.fields.slug}`}>
                            <div>
                                <h2>{edge.node.frontmatter.title}</h2>
                                <div style={{ minWidth: 150 }}>
                                    <Img fluid={edge.node.frontmatter.featuredImage.childImageSharp.fluid} />
                                </div>
                                <p>{edge.node.frontmatter.description}</p>
                            </div>
                            <p className={blogStyles.date}>{edge.node.frontmatter.date}</p>
                        </Link>
                    </li>
                ))}
            </ol>
        </Layout>
    )
}

export default BlogPage
