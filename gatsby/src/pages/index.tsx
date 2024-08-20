import React from "react"
import { Link, graphql, PageProps, navigate } from "gatsby"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import { GoogleLogin } from "@react-oauth/google"

import ButtonMain from "../components/buttonMain"
import ButtonMainExternal from "../components/buttonMainExternal"
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
                        color: string
                    }
                    fields: {
                        slug: string
                    }
                }
            }
        ]
    }
    site: {
        siteMetadata: {
            twitterUsername: string
        }
    }
}

const IndexPage = ({
    data: { allMarkdownRemark, site },
}: PageProps<DataProps>) => {
    const { node } = allMarkdownRemark.edges[0]

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
                <button
                    onClick={() => {
                        navigate(
                            `${process.env.GATSBY_COGNITO_DOMAIN}/oauth2/authorize?identity_provider=Google&response_type=code&client_id=${process.env.GATSBY_USER_POOL_CLIENT_ID}&redirect_uri=http://localhost:8000`
                        )
                    }}
                >
                    Login
                </button>
                <button
                    onClick={() => {
                        navigate(
                            `${process.env.GATSBY_COGNITO_DOMAIN}/logout?response_type=code&client_id=${process.env.GATSBY_USER_POOL_CLIENT_ID}&redirect_uri=http://localhost:8000`
                        )
                    }}
                >
                    Logout
                </button>
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        console.log("111")
                        console.log(credentialResponse)
                    }}
                    onError={() => {
                        console.log("Login Failed")
                    }}
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
                        <ButtonMain
                            additionalStyles={{ marginRight: "20px" }}
                            color={node.frontmatter.color}
                            primary
                            to="/about"
                        >
                            Learn more about me
                        </ButtonMain>
                        <ButtonMainExternal
                            additionalStyles={{ marginRight: "20px" }}
                            color={node.frontmatter.color}
                            href={`https://twitter.com/${site.siteMetadata.twitterUsername}`}
                        >
                            Follow me on Twitter
                        </ButtonMainExternal>
                    </div>
                    <h1 style={{ marginTop: "4rem" }}>Blog</h1>
                    <Link
                        className={indexStyles.blogLink}
                        to={`/blog/${node.fields.slug}`}
                    >
                        <div style={{ marginBottom: "20px" }}>
                            <GatsbyImage
                                image={
                                    node.frontmatter.featuredImage
                                        .childImageSharp.gatsbyImageData
                                }
                                alt={node.frontmatter.title}
                                style={{ borderRadius: "var(--border-radius)" }}
                                loading="eager"
                            />
                        </div>
                        <h2
                            style={{
                                marginBottom: "0.85rem",
                                fontSize: "24px",
                                lineHeight: 1.2,
                            }}
                        >
                            {node.frontmatter.title}
                        </h2>
                        <p
                            style={{
                                lineHeight: "1.7em",
                            }}
                        >
                            {node.frontmatter.description}
                        </p>
                    </Link>
                    <div style={{ display: "flex" }}>
                        <ButtonMain
                            color={node.frontmatter.color}
                            to="/blog"
                            primary
                        >
                            Read all posts
                        </ButtonMain>
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
                        color
                    }
                    fields {
                        slug
                    }
                }
            }
        }
        site {
            siteMetadata {
                twitterUsername
            }
        }
    }
`
