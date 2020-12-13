import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

import aboutStyles from "./about.module.scss"
import templateBlogStyles from "../templates/blog.module.scss"

export const query = graphql`
  query {
    fileName: file(relativePath: { eq: "assets/profile-photo.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 170) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

const AboutPage = (props) => {
	return (
		<Layout>
			<Seo
				title="About | Andrea Diotallevi"
				description="All about Andrea Diotallevi"
			/>
			<div style={{ position: "relative", top: -16, left: -16 }}>
				<div
					style={{ position: "absolute" }}
					className={templateBlogStyles.titleSquaredDiv}
				/>
			</div>
			<h1 className={aboutStyles.title}>About</h1>
			<div className={aboutStyles.flexDiv}>
				<div className={aboutStyles.imageContainer}>
					<Img fluid={props.data.fileName.childImageSharp.fluid} />
				</div>
				<div className={aboutStyles.aboutTextDiv}>
					<p>I am a full-stack software developer at <a href="https://rippleenergy.com/" target="_blank" rel="noreferrer">Ripple Energy</a> based in London.</p>
					<p>I enjoy writing about algorithms and software development best practices to improve my skills and share what I learn with our amazing software community.</p>
					<p>Before moving into software development, I worked as a residential architect for five years, which has helped me every day to communicate with clarity with my teammates and contribute to the company with my design sensibility.</p>
					<p>As a pianist, music has always been an integral part of my life. The habit of practicing and composing pieces of music has taught me how to concentrate for long hours and build a balanced and grounded mindset.</p>
				</div>
			</div>
		</Layout>
	)
}

export default AboutPage
