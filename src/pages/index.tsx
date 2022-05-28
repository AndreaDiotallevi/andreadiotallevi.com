import React from "react"
import { Link, graphql, PageProps } from "gatsby"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

import * as indexStyles from "./index.module.scss"

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

const IndexPage = ({ data: { allMarkdownRemark } }: PageProps<DataProps>) => {
    return (
        <Layout>
            <React.Fragment>
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
                        I am a full-stack software engineer, generative artist
                        and pianist, living in London. I am currently working
                        with Ripple Energy enabling people to part-own a wind
                        farm for the first time.
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
                        to={`/blog/${allMarkdownRemark.edges[0].node.fields.slug}`}
                    >
                        <div style={{ marginBottom: "20px" }}>
                            <GatsbyImage
                                image={
                                    allMarkdownRemark.edges[0].node.frontmatter
                                        .featuredImage.childImageSharp
                                        .gatsbyImageData
                                }
                                alt={
                                    allMarkdownRemark.edges[0].node.frontmatter
                                        .title
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
                            {allMarkdownRemark.edges[0].node.frontmatter.title}
                        </h2>
                        <p
                            style={{
                                lineHeight: "1.7em",
                            }}
                        >
                            {
                                allMarkdownRemark.edges[0].node.frontmatter
                                    .description
                            }
                        </p>
                    </Link>
                    <div style={{ display: "flex" }}>
                        <Link to="/blog" className={indexStyles.link}>
                            Read all posts
                        </Link>
                    </div>
                </div>
            </React.Fragment>
        </Layout>
    )
}

export default IndexPage

export const query = graphql`
    {
        allMarkdownRemark: allMarkdownRemark(
            limit: 1
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
