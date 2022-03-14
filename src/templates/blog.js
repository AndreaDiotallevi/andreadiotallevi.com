import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Newsletter from "../components/newsletter"

import * as blogStyles from "./blog.module.scss"

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
                            quality: 100
                            layout: CONSTRAINED
                            placeholder: BLURRED
                        )
                    }
                }
            }
            html
        }
    }
`

const Blog = props => {
    const {
        title,
        description,
        date,
        tags,
        featuredImage,
    } = props.data.markdownRemark.frontmatter

    return (
        <Layout>
            <Seo
                title={title + " | Andrea Diotallevi"}
                description={description}
                image={featuredImage.childImageSharp.gatsbyImageData.src}
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
                        __html: props.data.markdownRemark.html,
                    }}
                    className={blogStyles.blog}
                />
            </article>
            <Newsletter />
        </Layout>
    )
}

export default Blog
