import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

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
		featuredImage {
			childImageSharp {
				fluid(maxWidth: 750) {
					...GatsbyImageSharpFluid
				}
			}
		}
      }
      html
    }
  }
`

const Blog = (props) => {
	const { title, description, date, featuredImage } = props.data.markdownRemark.frontmatter

	return (
		<Layout>
			<Seo
				title={title + " | Andrea Diotallevi"}
				description={description}
				image={featuredImage.childImageSharp.fluid.src}
				article={true}
			/>
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
			<h1 className={blogStyles.title}>{title}</h1>
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
			<p className={blogStyles.date}>{date}</p>
			<Img fluid={featuredImage.childImageSharp.fluid} />
			<div
				dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }}
				className={blogStyles.blog}
			/>
		</Layout>
	)
}

export default Blog
