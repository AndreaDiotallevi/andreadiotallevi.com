import React from "react"
import { graphql, PageProps } from "gatsby"
import { GatsbyImage, IGatsbyImageData, getSrc } from "gatsby-plugin-image"

import ButtonMainExternal from "../components/buttonMainExternal"
import Layout from "../components/layout"
import Newsletter from "../components/newsletter"
import Seo from "../components/seo"
import Tag from "../components/tag"
import Time from "../components/time"

import * as blogStyles from "./blog.module.scss"

type DataProps = {
    markdownRemark: {
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
        html: string
        fields: {
            slug: string
        }
    }
    site: {
        siteMetadata: {
            twitterUsername: string
        }
    }
}

const Blog = (props: PageProps<DataProps>) => {
    const {
        data: {
            markdownRemark: {
                frontmatter: {
                    title,
                    description,
                    date,
                    tags,
                    featuredImage: {
                        childImageSharp: { gatsbyImageData },
                    },
                    color,
                },
                html,
                fields: { slug },
            },
            site: {
                siteMetadata: { twitterUsername },
            },
        },
    } = props

    return (
        <Layout color={color}>
            <Seo
                title={title + " | Andrea Diotallevi"}
                description={description}
                image={getSrc(gatsbyImageData)}
                article={true}
                tags={tags}
            />
            <article className={blogStyles.container}>
                <h1>{title}</h1>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "1.45rem",
                    }}
                >
                    <Time color={color} />
                    <p
                        style={{
                            marginBottom: 0,
                            marginLeft: "8px",
                            fontWeight: 700,
                        }}
                    >
                        {date}
                    </p>
                </div>
                <ul
                    style={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        margin: 0,
                        marginBottom: "1.45rem",
                    }}
                >
                    {props.data.markdownRemark.frontmatter.tags.map(tag => (
                        <Tag key={tag} name={tag} />
                    ))}
                </ul>
                <GatsbyImage image={gatsbyImageData} alt={title} />
                <div
                    dangerouslySetInnerHTML={{ __html: html }}
                    className={blogStyles.blog}
                />
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        marginTop: "80px",
                    }}
                >
                    <ButtonMainExternal
                        additionalStyles={{ marginRight: "20px" }}
                        color={color}
                        href={`https://twitter.com/intent/tweet?url=https://www.andreadiotallevi.com/blog/${slug}&text=I+just+read "${title}" by ${twitterUsername}`}
                        primary
                    >
                        Tweet this article
                    </ButtonMainExternal>
                    <ButtonMainExternal
                        color={color}
                        href={`https://github.com/AndreaDiotallevi/andreadiotallevi.com/edit/main/src/posts/${slug}/${slug}.md`}
                    >
                        Edit on GitHub
                    </ButtonMainExternal>
                </div>
            </article>
            <Newsletter color={color} />
        </Layout>
    )
}

export default Blog

export const query = graphql`
    query($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
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
                color
            }
            html
            fields {
                slug
            }
        }
        site {
            siteMetadata {
                twitterUsername
            }
        }
    }
`
