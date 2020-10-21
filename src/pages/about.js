import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"

const AboutPage = () => {
    return (
        <Layout>
            <h1>About</h1>
            <p>This is my story.</p>
            <p>This it the <Link to="/contact">link</Link> to the contact page.</p>
        </Layout>
    )
}

export default AboutPage
