import React from "react"
import { graphql, Link, PageProps } from "gatsby"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

import * as aboutStyles from "./about.module.scss"

type DataProps = {
    file: {
        childImageSharp: {
            gatsbyImageData: IGatsbyImageData
        }
    }
}

const AboutPage = ({ data: { file } }: PageProps<DataProps>) => {
    return (
        <Layout>
            <React.Fragment>
                <Seo
                    title="About | Andrea Diotallevi"
                    description="All about Andrea Diotallevi"
                    tags={["About, Andrea Diotallevi, About Andrea Diotallevi"]}
                />
                <div className={aboutStyles.container}>
                    <h1 className={aboutStyles.title}>About</h1>
                    <div className={aboutStyles.flexDiv}>
                        <div className={aboutStyles.imageContainer}>
                            <GatsbyImage
                                image={file.childImageSharp.gatsbyImageData}
                                alt="about page image"
                                style={{ borderRadius: "var(--border-radius)" }}
                            />
                        </div>
                        <div className={aboutStyles.aboutTextDiv}>
                            <p>
                                I am a Full Stack Developer at{" "}
                                <a
                                    href="https://www.theguardian.com"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    The Guardian
                                </a>
                                , where I contribute to shaping the future of
                                digital journalism.
                            </p>
                            <p>
                                To improve my skills, I enjoy writing{" "}
                                <Link to="/blog">articles</Link> about
                                algorithms and software development best
                                practices sharing what I learn with our great
                                software community.
                            </p>
                            <p>
                                Before moving into software development, I
                                worked as a residential architect for five
                                years, which has helped me every day to
                                communicate with clarity with my teammates and
                                contribute to the company with my design
                                sensibility.
                            </p>
                            <p>
                                As a pianist, music has always been an integral
                                part of my life. The habit of practicing and
                                composing pieces of music has taught me how to
                                concentrate for long hours and build a balanced
                                and grounded mindset.
                            </p>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        </Layout>
    )
}

export default AboutPage

export const query = graphql`
    {
        file(relativePath: { eq: "assets/about.jpg" }) {
            childImageSharp {
                gatsbyImageData(
                    width: 718
                    quality: 99
                    layout: CONSTRAINED
                    placeholder: BLURRED
                )
            }
        }
    }
`
