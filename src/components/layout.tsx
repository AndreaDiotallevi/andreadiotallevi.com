import React, { useState } from "react"

import Navbar from "./navbar"
import Menu from "./menu"

import "../styles/index.scss"
import "../styles/prism-modified.css"
import * as layoutStyles from "./layout.module.scss"

type DataProps = {
    children: JSX.Element
    color?: string
}

const Layout = (props: DataProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <div className={layoutStyles.container}>
            <div
                className={`${layoutStyles.headerContainer} ${
                    isMenuOpen ? layoutStyles.isOpen : ""
                }`}
            >
                <header
                    className={layoutStyles.header}
                    // style={{
                    //     boxShadow: `0 2px 2px 0 ${
                    //         props.color || "var(--border)"
                    //     }`,
                    // }}
                >
                    <Navbar
                        open={isMenuOpen}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        color={props.color}
                    />
                    <Menu
                        open={isMenuOpen}
                        onClick={() => setIsMenuOpen(false)}
                    />
                </header>
            </div>
            <div
                style={{ marginTop: "var(--navbar-height)", maxWidth: "100%" }}
            >
                {!isMenuOpen && props.children}
            </div>
        </div>
    )
}

export default Layout
