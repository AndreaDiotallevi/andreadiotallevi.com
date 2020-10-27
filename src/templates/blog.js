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
			<div style={{ position: "relative", top: -16, left: -16 }}>
				<div
					style={{
						position: "absolute",
						width: 54,
						height: 54,
						backgroundColor: "rgba(0, 0, 255, 0.25)",
					}}
				/>
			</div>

			<h1 className={blogStyles.title}>{props.data.markdownRemark.frontmatter.title}</h1>

			<div style={{ position: "relative", top: -14, left: -16 }}>
				<div
					style={{
						position: "absolute",
						width: 8,
						height: 54,
						backgroundColor: "rgba(0, 0, 255, 0.25)",
					}}
				/>
			</div>

			<p className={blogStyles.date}>{props.data.markdownRemark.frontmatter.date}</p>

			<div
				dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }}
				className={blogStyles.blog}
			/>
		</Layout>
	)
}

export default Blog
