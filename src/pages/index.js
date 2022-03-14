import React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

import * as indexStyles from "./index.module.scss"

export const query = graphql`
    {
        allMarkdownRemark: allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
        ) {
            edges {
                node {
                    frontmatter {
                        title
                        description
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
`

const IndexPage = props => {
    return (
        <Layout>
            <Seo
                title="Andrea Diotallevi | Software Developer"
                description="I am a full-stack software engineer, generative artist and pianist,
        living in London. I am currently working with Ripple Energy enabling
        people to part-own a wind farm for the first time."
                tags={[
                    "Learn JavaScript",
                    "Learn React",
                    "Learn Python",
                    "Learn Django",
                    "Learn GraphQL",
                    "Software Development",
                    "Andrea Diotallevi's Website",
                ]}
            />
            <div className={indexStyles.container}>
                <h1>Hi, I'm Andrea Diotallevi</h1>
                <p style={{ lineHeight: "1.7em" }}>
                    I am a full-stack software engineer, generative artist and
                    pianist, living in London. I am currently working with
                    Ripple Energy enabling people to part-own a wind farm for
                    the first time.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <Link
                        to="/about"
                        className={indexStyles.link}
                        style={{ marginRight: "20px" }}
                    >
                        Learn more about me
                    </Link>
                    <a
                        href="https://twitter.com/a_diotallevi_"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={indexStyles.link}
                    >
                        Follow me on Twitter
                    </a>
                </div>
                <h1 style={{ marginTop: "4rem" }}>Writing</h1>
                <Link
                    className={indexStyles.blogLink}
                    to={`/blog/${props.data.allMarkdownRemark.edges[0].node.fields.slug}`}
                >
                    <div style={{ marginBottom: "20px" }}>
                        <GatsbyImage
                            image={
                                props.data.allMarkdownRemark.edges[0].node
                                    .frontmatter.featuredImage.childImageSharp
                                    .gatsbyImageData
                            }
                            alt={
                                props.data.allMarkdownRemark.edges[0].node
                                    .frontmatter.title
                            }
                            style={{ borderRadius: 4 }}
                        />
                    </div>
                    <h2
                        style={{
                            marginBottom: "0.85rem",
                            fontSize: "24px",
                            lineHeight: 1.2,
                        }}
                    >
                        {
                            props.data.allMarkdownRemark.edges[0].node
                                .frontmatter.title
                        }
                    </h2>
                    <p
                        style={{
                            color: "rgb(110, 110, 110)",
                            lineHeight: "1.7em",
                        }}
                    >
                        {
                            props.data.allMarkdownRemark.edges[0].node
                                .frontmatter.description
                        }
                    </p>
                </Link>
                <div style={{ display: "flex" }}>
                    <Link to="/blog" className={indexStyles.link}>
                        Read all posts
                    </Link>
                </div>
            </div>
        </Layout>
    )
}

export default IndexPage
