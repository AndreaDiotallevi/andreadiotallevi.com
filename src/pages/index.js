import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

import blogStyles from "./blog.module.scss"

const IndexPage = () => {
    const data = useStaticQuery(graphql`
        query {
            allMarkdownRemark {
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
                description="Andrea Diotallevi's website"
            />
            <ol className={blogStyles.posts}>
                {data.allMarkdownRemark.edges.map(edge => (
                    <li className={blogStyles.post} key={edge.node.frontmatter.title}>
                        <div style={{ position: "relative", top: -16, left: -16 }}>
                            <div
                                style={{ position: "absolute", }}
                                className={blogStyles.titleSquaredDiv}
                            />
                        </div>
                        <Link to={`/blog/${edge.node.fields.slug}`}>
                            <h2>{edge.node.frontmatter.title}</h2>
                            {/* <div style={{ position: "relative", top: -8, left: -16 }}>
                                <div
                                    style={{
                                        position: "absolute",
                                        width: 8,
                                        height: 42,
                                    }}
                                    className={blogStyles.dateRectangularDiv}
                                />
                            </div> */}
                            <div className={blogStyles.dateAndReadingTimeDiv}>
                                <p>{edge.node.frontmatter.date}</p>
                                <p style={{ margin: "0 10px" }}>·</p>
                                <p>{edge.node.fields.readingTime.text}</p>
                            </div>
                            <div className={blogStyles.flexContainer}>
                                <div className={blogStyles.descriptionDateDiv}>
                                    <p>{edge.node.frontmatter.description}</p>
                                </div>
                                <div className={blogStyles.imageContainer}>
                                    <Img fluid={edge.node.frontmatter.featuredImage.childImageSharp.fluid} className={blogStyles.image} />
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ol>
        </Layout>
    )
}

export default IndexPage
