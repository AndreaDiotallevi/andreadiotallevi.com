import React, { useState } from "react"

import { IntlProvider } from "react-intl"

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
        <IntlProvider locale="en-GB">
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
            </div>
        </IntlProvider>
    )
}

export default Layout
