import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

import blogStyles from "./blog.module.scss"

export const query = graphql`
query (
    $slug: String!
  ) {
    markdownRemark (
      fields: {
        slug: {
          eq: $slug
        }
      }
    ) {
      frontmatter {
        title
        description
        date
      }
      html
    }
  }
`

const Blog = (props) => {
  return (
    <Layout>
      <h1>{props.data.markdownRemark.frontmatter.title}</h1>
      {/* <h4>{props.data.markdownRemark.frontmatter.description}</h4> */}
      <p className={blogStyles.date}>{props.data.markdownRemark.frontmatter.date}</p>
      <div
        dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }}
        className={blogStyles.blog}
      />
    </Layout>
  )
}

export default Blog
