import React, { useState } from "react"

import Navbar from "./navbar"
import Menu from "./menu"
// import Footer from "./footer"

import "../styles/index.scss"
import "../styles/prism-tomorrow-modified.css"
import layoutWideStyles from "./layoutWide.module.scss"

const Layout = (props) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <div className={layoutWideStyles.container}>
            <div className={layoutWideStyles.content}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Navbar
                        open={isMenuOpen}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    />
                </div>
                <Menu
                    open={isMenuOpen}
                    onClick={() => setIsMenuOpen(false)}
                />
                {!isMenuOpen && props.children}
            </div>
            {/* {!isMenuOpen && <Footer />} */}
        </div>
    )
}

export default Layout
