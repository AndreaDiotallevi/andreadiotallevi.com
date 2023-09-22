import React, { useState } from "react"

import { IntlProvider } from "react-intl"
import { AuthProvider } from "../contexts/authContext"
import { GoogleOAuthProvider } from "@react-oauth/google"

import Footer from "./footer"
import Navbar from "./navbar"
import Menu from "./menu"

import "../styles/index.scss"
import "../styles/prism-modified.css"
import * as layoutStyles from "./layout.module.scss"

type DataProps = {
    children: JSX.Element | JSX.Element[]
    color?: string
}

const Layout = (props: DataProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <GoogleOAuthProvider clientId="242260039632-ao8vp32d8su6c2n041jdacd6cpdkvcm8.apps.googleusercontent.com">
            <IntlProvider locale="en-GB">
                <AuthProvider>
                    <div className={layoutStyles.container}>
                        <div
                            className={`${layoutStyles.headerContainer} ${
                                isMenuOpen ? layoutStyles.isOpen : ""
                            }`}
                        >
                            <header className={layoutStyles.header}>
                                <Navbar
                                    open={isMenuOpen}
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    // color={props.color}
                                />
                                <Menu
                                    open={isMenuOpen}
                                    onClick={() => setIsMenuOpen(false)}
                                />
                            </header>
                        </div>
                        <div className={layoutStyles.childrenContainer}>
                            {!isMenuOpen && props.children}
                        </div>
                        <Footer />
                    </div>
                </AuthProvider>
            </IntlProvider>
        </GoogleOAuthProvider>
    )
}

export default Layout
