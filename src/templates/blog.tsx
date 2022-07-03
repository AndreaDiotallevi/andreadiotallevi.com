import React from "react"
import { graphql, PageProps } from "gatsby"
import { GatsbyImage, IGatsbyImageData, getSrc } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Newsletter from "../components/newsletter"

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
                },
                html,
            },
        },
    } = props

    return (
        <Layout color={props.data.markdownRemark.frontmatter.color}>
            <React.Fragment>
                <Seo
                    title={title + " | Andrea Diotallevi"}
                    description={description}
                    image={getSrc(gatsbyImageData)}
                    article={true}
                    tags={tags}
                />
                <article className={blogStyles.container}>
                    <h1>{title}</h1>
                    <p>{date}</p>
                    <GatsbyImage image={gatsbyImageData} alt={title} />
                    <div
                        dangerouslySetInnerHTML={{ __html: html }}
                        className={blogStyles.blog}
                    />
                </article>
                <Newsletter />
            </React.Fragment>
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
        }
    }
`
