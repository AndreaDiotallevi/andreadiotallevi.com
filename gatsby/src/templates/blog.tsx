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
            featuredImageUrl: string
            featuredImageAuthor: string
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
    file: {
        childImageSharp: {
            gatsbyImageData: IGatsbyImageData
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
                    featuredImageUrl,
                    featuredImageAuthor,
                    color,
                },
                html,
                fields: { slug },
            },
            site: {
                siteMetadata: { twitterUsername },
            },
            file: profileImageFile,
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
                            fontWeight: 500,
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
                        <li
                            key={tag}
                            style={{ listStyle: "none", margin: 0, padding: 0 }}
                        >
                            <Tag name={tag} />
                        </li>
                    ))}
                </ul>
                <GatsbyImage
                    image={gatsbyImageData}
                    alt={title}
                    loading="eager"
                />
                <figcaption
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "0.3rem",
                    }}
                >
                    <p>
                        Photo by{" "}
                        <a href={featuredImageUrl} target="_blank">
                            {featuredImageAuthor}
                        </a>
                    </p>
                </figcaption>
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
                        href={`https://twitter.com/intent/tweet?url=https://www.andreadiotallevi.com/blog/${slug}&text=I+just+read "${title}" by @${twitterUsername}`}
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
            <Newsletter color={color} file={profileImageFile} />
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
                featuredImageUrl
                featuredImageAuthor
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
        file(relativePath: { eq: "assets/about.jpg" }) {
            childImageSharp {
                gatsbyImageData(
                    width: 140
                    quality: 99
                    layout: CONSTRAINED
                    placeholder: BLURRED
                )
            }
        }
    }
`