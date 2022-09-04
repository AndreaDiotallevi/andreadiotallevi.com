import React, { useState } from "react"
import addToMailchimp from "gatsby-plugin-mailchimp"
import { useLocation } from "@reach/router"

import * as newsletterStyles from "./newsletter.module.scss"

type DataProps = {
    color: string
}

const Newsletter = (props: DataProps) => {
    const { pathname } = useLocation()
    const [firstName, setFirstName] = useState("")
    const [email, setEmail] = useState("")
    const [result, setResult] = useState<{
        result: string
        msg: string
    } | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
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
        <div
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <div className={newsletterStyles.container}>
                <div
                    style={{
                        borderTop: "1px solid var(--border)",
                        paddingTop: "40px",
                    }}
                >
                    <h2>Stay up to date</h2>
                    <p>
                        Once a month I send an email about what I learn on my
                        daily job as a fullstack software developer - about
                        TypeScript, React, GraphQL, Python, Django or Personal
                        Development.
                    </p>
                    <form onSubmit={handleSubmit} noValidate>
                        <div>
                            <div>
                                <label>First name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            style={{ backgroundColor: props.color }}
                        >
                            Sign me up
                        </button>
                        {result?.result === "error" ? (
                            <p className={newsletterStyles.error}>
                                {result.msg.includes("already subscribed")
                                    ? "The email you entered is already subscribed."
                                    : result.msg}
                            </p>
                        ) : null}
                        {result?.result === "success" ? (
                            <p className={newsletterStyles.success}>
                                {result.msg}
                            </p>
                        ) : null}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Newsletter
