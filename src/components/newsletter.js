import React, { useState } from "react"
import addToMailchimp from "gatsby-plugin-mailchimp"
import { useLocation } from "@reach/router"

import * as newsletterStyles from "./newsletter.module.scss"

const Newsletter = () => {
    const { pathname } = useLocation()
    const [firstName, setFirstName] = useState("")
    const [email, setEmail] = useState("")
    const [result, setResult] = useState(null)

    const handleSubmit = async e => {
        e.preventDefault()

        if (!firstName) {
            setResult({ result: "error", msg: "Please enter your first name." })
            return
        }

        const result = await addToMailchimp(email, {
            PATHNAME: pathname,
            FNAME: firstName,
        })
        setResult(result)
    }

    return (
        <div className={newsletterStyles.container}>
            <div>
                <h2>Get my new blog posts to your inbox</h2>
                <p>
                    Every few months I write a new blog post about software
                    development here, on my blog. It might be on JavaScript,
                    React, GraphQL, Python, Django or personal development
                    topics.
                </p>
                <p>
                    My goal is to share my daily learnings as a software
                    developer, with the hope this will help some of you out
                    there!
                </p>
                <form onSubmit={handleSubmit} noValidate>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <button type="submit">Subscribe!</button>
                    {result?.result === "error" ? (
                        <p className={newsletterStyles.error}>
                            {result.msg.includes("already subscribed")
                                ? "The email you entered is already subscribed."
                                : result.msg}
                        </p>
                    ) : null}
                    {result?.result === "success" ? (
                        <p className={newsletterStyles.success}>{result.msg}</p>
                    ) : null}
                </form>
            </div>
        </div>
    )
}

export default Newsletter
