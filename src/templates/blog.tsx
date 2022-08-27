import React from "react"
import { graphql, PageProps } from "gatsby"
import { GatsbyImage, IGatsbyImageData, getSrc } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Newsletter from "../components/newsletter"

import * as blogStyles from "./blog.module.scss"
import Tag from "../components/tag"
import Time from "../components/time"

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
                <div className={blogStyles.sharesDiv}>
                    <a
                        href={`https://twitter.com/intent/tweet?url=https://www.andreadiotallevi.com/blog/${slug}&text=I+just+read "${title}" by @a_diotallevi_`}
                        target="_blank"
                        rel="noreferrer"
                        className={blogStyles.anchor}
                    >
                        Tweet this article
                    </a>
                    <a
                        href={`https://github.com/AndreaDiotallevi/andreadiotallevi.com/edit/main/src/posts/${slug}/${slug}.md`}
                        target="_blank"
                        rel="noreferrer"
                        className={blogStyles.anchor}
                    >
                        Edit on GitHub
                    </a>
                </div>
            </article>
            <Newsletter />
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
    }
`
