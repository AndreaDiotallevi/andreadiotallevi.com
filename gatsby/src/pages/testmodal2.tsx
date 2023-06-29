import React, { ReactNode, useState, Component } from "react"

import * as styles from "./testmodal2.module.scss"
import InputField from "../components/inputField"
import Button, { ButtonVariant } from "../components/button"
import { confirmSignUp, initiateAuth, signUp } from "../api-gateway"
import Portal from "../components/portal"

const Index = () => {
    const [isPortalOpen, setIsPortalOpen] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmationCode, setConfirmationCode] = useState("")

    const openPortal = () => {
        setIsPortalOpen(true)
    }

    const closePortal = () => {
        setIsPortalOpen(false)
    }

    return (
        <div>
            <button onClick={openPortal}>Open Portal</button>
            {isPortalOpen && (
                <Portal>
                    <div style={{ marginBottom: "48px" }}>
                        <h2>Sign up</h2>
                        <div style={{ marginBottom: 0 }}>
                            <InputField
                                name="email"
                                value={email}
                                label="Email"
                                type="email"
                                onChange={value => setEmail(value)}
                            />
                            <InputField
                                name="password"
                                value={password}
                                label="Password"
                                type="password"
                                onChange={value => setPassword(value)}
                            />
                            <Button
                                onClick={async () => {
                                    await signUp({ email })
                                }}
                            >
                                Create account
                            </Button>
                            {/* <Button
                                onClick={() => closePortal()}
                                variant={ButtonVariant.Secondary}
                            >
                                Cancel
                            </Button> */}
                        </div>
                    </div>
                    <div style={{ marginBottom: "48px" }}>
                        <h2>Confirm sign up</h2>
                        <div style={{ marginBottom: 0 }}>
                            <InputField
                                name="confirmationCode"
                                value={confirmationCode}
                                label="Confirmation code"
                                type="text"
                                onChange={value => setConfirmationCode(value)}
                            />
                            <Button
                                onClick={async () => {
                                    await confirmSignUp({
                                        email,
                                        confirmationCode,
                                    })
                                }}
                            >
                                Verify
                            </Button>
                            {/* <Button
                                onClick={() => closePortal()}
                                variant={ButtonVariant.Secondary}
                            >
                                Cancel
                            </Button> */}
                        </div>
                    </div>
                    <div>
                        <h2>Log in</h2>
                        <div style={{ marginBottom: 0 }}>
                            {/* <InputField
                                name="confirmationCode"
                                value={confirmationCode}
                                label="Password"
                                type="text"
                                onChange={value => setConfirmationCode(value)}
                            /> */}
                            <Button
                                onClick={async () => {
                                    await initiateAuth({ email })
                                }}
                            >
                                Log in
                            </Button>
                            {/* <Button
                                onClick={() => closePortal()}
                                variant={ButtonVariant.Secondary}
                            >
                                Cancel
                            </Button> */}
                        </div>
                    </div>
                </Portal>
            )}
        </div>
    )
}

export default Index
