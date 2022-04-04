import React, { useState } from "react"

import Navbar from "./navbar"
import Menu from "./menu"

import "../styles/index.scss"
import "../styles/prism-modified.css"
import * as layoutStyles from "./layout.module.scss"

type DataProps = {
    children: JSX.Element
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
                <header className={layoutStyles.header}>
                    <Navbar
                        open={isMenuOpen}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    />
                    <Menu
                        open={isMenuOpen}
                        onClick={() => setIsMenuOpen(false)}
                    />
                </header>
            </div>
            {!isMenuOpen && props.children}
        </div>
    )
}

export default Layout
