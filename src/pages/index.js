import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

import indexStyles from "./index.module.scss"

export const query = graphql`
  	query {
    	fileName1: file(relativePath: { eq: "assets/about.jpg" }) {
      		childImageSharp {
        		fluid(maxWidth: 710) {
          			...GatsbyImageSharpFluid
        		}
      		}
    	}
        fileName2: file(relativePath: { eq: "assets/dariusz-sankowski-1400x1400.jpg" }) {
      		childImageSharp {
        		fluid(maxWidth: 710) {
          			...GatsbyImageSharpFluid
        		}
      		}
    	}
        # allMarkdownRemark: allMarkdownRemark(sort:{ order: DESC, fields: [frontmatter___date] }) {
        #         edges {
        #             node {
        #                 frontmatter {
        #                     title
        #                     featuredImage {
        #                         childImageSharp {
        #                             fluid(maxWidth: 710) {
        #                                 ...GatsbyImageSharpFluid
        #                             }
        #                         }
        #                     }
        #                 }
        #             }
        #         }
        #     }
  	}
`

const IndexPage = (props) => {
    return (
        <Layout>
            <Seo
                title="Andrea Diotallevi | Software Developer"
                description="I am a full-stack software developer at Ripple Energy, where I contribute to the renewable energy transformation allowing people to part-own a new wind farm to power their homes with clean electricity. To improve my skills, I enjoy writing articles about algorithms and software development best practices sharing what I learn with our great software community."
            />
            <div className={indexStyles.container}>
                {/* <h1>Hello! My name is Andrea Diotallevi</h1> */}
                <h1>Welcome!</h1>
                <div className={indexStyles.flexDiv}>
                    <Link to="/blog">
                        <div className={indexStyles.imageContainer}>
                            <Img
                                fluid={props.data.fileName2.childImageSharp.fluid}
                                className={indexStyles.image}
                                alt="blog"
                            />
                        </div>
                        <h2>Blog</h2>
                        <p>All my blog posts and recent learnings.</p>
                    </Link>
                    <Link to="/about">
                        <div className={indexStyles.imageContainer}>
                            <Img
                                fluid={props.data.fileName1.childImageSharp.fluid}
                                className={indexStyles.image}
                                alt="about"
                            />
                        </div>
                        <h2>About</h2>
                        <p>My professional history and passions.</p>
                    </Link>
                </div>
            </div>
        </Layout>
    )
}

export default IndexPage
