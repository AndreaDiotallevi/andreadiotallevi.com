import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

import * as aboutStyles from "./about.module.scss"

export const query = graphql`
    {
        fileName: file(relativePath: { eq: "assets/about.jpg" }) {
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
`

const AboutPage = props => {
    return (
        <Layout>
            <Seo
                title="About | Andrea Diotallevi"
                description="All about Andrea Diotallevi"
            />
            <div className={aboutStyles.container}>
                <h1 className={aboutStyles.title}>About</h1>
                <div className={aboutStyles.flexDiv}>
                    <div className={aboutStyles.imageContainer}>
                        <GatsbyImage
                            image={
                                props.data.fileName.childImageSharp
                                    .gatsbyImageData
                            }
                            alt="about page image"
                            style={{ borderRadius: 4 }}
                        />
                    </div>
                    <div className={aboutStyles.aboutTextDiv}>
                        <p>
                            I am a full-stack software developer at{" "}
                            <a
                                href="https://rippleenergy.com/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Ripple Energy
                            </a>
                            , where I contribute to the renewable energy
                            transformation allowing people to part-own a new
                            wind farm to power their homes with clean
                            electricity.
                        </p>
                        <p>
                            To improve my skills, I enjoy writing{" "}
                            <Link to="/blog">articles</Link> about algorithms
                            and software development best practices sharing what
                            I learn with our great software community.
                        </p>
                        <p>
                            Before moving into software development, I worked as
                            a residential architect for five years, which has
                            helped me every day to communicate with clarity with
                            my teammates and contribute to the company with my
                            design sensibility.
                        </p>
                        <p>
                            As a pianist, music has always been an integral part
                            of my life. The habit of practicing and composing
                            pieces of music has taught me how to concentrate for
                            long hours and build a balanced and grounded
                            mindset.
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AboutPage
