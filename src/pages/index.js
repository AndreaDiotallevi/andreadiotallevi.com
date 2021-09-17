import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

import indexStyles from "./index.module.scss"

export const query = graphql`
  query {
    fileName1: file(relativePath: { eq: "assets/35-sandstorm-1400x840.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 710) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    fileName2: file(
      relativePath: { eq: "assets/dariusz-sankowski-1400x840.jpg" }
    ) {
      childImageSharp {
        fluid(maxWidth: 710) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    allMarkdownRemark: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          frontmatter {
            title
            description
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 710) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

const IndexPage = props => {
  return (
    <Layout>
      <Seo
        title="Andrea Diotallevi | Software Developer"
        description="I am a full-stack software engineer, generative artist and pianist,
        living in London. I am currently working with Ripple Energy enabling
        people to part-own a wind farm for the first time."
      />
      <div className={indexStyles.container}>
        <h1>Hi, I'm Andrea Diotallevi</h1>
        <p style={{ lineHeight: "1.7em" }}>
          I am a full-stack software engineer, generative artist and pianist,
          living in London. I am currently working with Ripple Energy enabling
          people to part-own a wind farm for the first time.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <Link
            to="/about"
            className={indexStyles.link}
            style={{ marginRight: "20px" }}
          >
            Learn more about me
          </Link>
          <a
            href="https://twitter.com/a_diotallevi_"
            target="_blank"
            rel="noopener noreferrer"
            className={indexStyles.link}
          >
            Follow me on Twitter
          </a>
        </div>
        <h1 style={{ marginTop: "4rem" }}>Writing</h1>
        <Link
          className={indexStyles.blogLink}
          to={`/blog/${props.data.allMarkdownRemark.edges[0].node.fields.slug}`}
        >
          <div style={{ marginBottom: "20px" }}>
            <Img
              fluid={
                props.data.allMarkdownRemark.edges[0].node.frontmatter
                  .featuredImage.childImageSharp.fluid
              }
              className={indexStyles.image}
            />
          </div>
          <h2
            style={{
              marginBottom: "0.85rem",
              fontSize: "24px",
              lineHeight: 1.2,
            }}
          >
            {props.data.allMarkdownRemark.edges[0].node.frontmatter.title}
          </h2>
          <p style={{ color: "rgb(110, 110, 110)", lineHeight: "1.7em" }}>
            {props.data.allMarkdownRemark.edges[0].node.frontmatter.description}
          </p>
        </Link>
        <Link to="/blog" className={indexStyles.link}>
          Read all posts
        </Link>
      </div>
    </Layout>
  )
}

export default IndexPage
