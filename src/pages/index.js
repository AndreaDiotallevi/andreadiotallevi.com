import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

import indexStyles from "./blog.module.scss"

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
            <ol className={indexStyles.posts}>
                {data.allMarkdownRemark.edges.map(edge => (
                    <li className={indexStyles.post} key={edge.node.frontmatter.title}>
                        <Link to={`/blog/${edge.node.fields.slug}`}>
                            <h2>{edge.node.frontmatter.title}</h2>
                            <p className={indexStyles.date}>{edge.node.frontmatter.date}</p>
                            <div className={indexStyles.flexContainer}>
                                <div className={indexStyles.descriptionDateDiv}>
                                    <p>{edge.node.frontmatter.description}</p>
                                </div>
                                <div className={indexStyles.imageContainer}>
                                    <Img fluid={edge.node.frontmatter.featuredImage.childImageSharp.fluid} className={indexStyles.image} />
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
