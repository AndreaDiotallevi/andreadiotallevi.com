import React from "react"
import { graphql, PageProps } from "gatsby"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"

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
                    fixed: {
                        src: string
                    }
                }
            }
        }
        html: string
    }
}

const Blog = ({ data: { markdownRemark } }: PageProps<DataProps>) => {
    const { frontmatter, html } = markdownRemark
    const { title, description, date, tags, featuredImage } = frontmatter

    return (
        <Layout>
            <React.Fragment>
                <Seo
                    title={title + " | Andrea Diotallevi"}
                    description={description}
                    image={featuredImage.childImageSharp.fixed.src}
                    article={true}
                    tags={tags}
                />
                <article className={blogStyles.container}>
                    <h1 className={blogStyles.title}>{title}</h1>
                    <div className={blogStyles.dateAndReadingTimeDiv}>
                        <p>{date}</p>
                        {/* <p style={{ margin: "0 10px" }}>·</p> */}
                        {/* <p>{props.data.markdownRemark.fields.readingTime.text}</p> */}
                    </div>
                    <GatsbyImage
                        image={featuredImage.childImageSharp.gatsbyImageData}
                        alt={title}
                        style={{ borderRadius: 4 }}
                    />
                    <div
                        dangerouslySetInnerHTML={{
                            __html: html,
                        }}
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
                            width: 710
                            quality: 99
                            layout: CONSTRAINED
                            placeholder: BLURRED
                        )
                        fixed {
                            src
                        }
                    }
                }
            }
            html
        }
    }
`
