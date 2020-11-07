import React, { useState } from "react"

import Navbar from "./navbar"
import Menu from "./menu"
// import Footer from "./footer"

import "../styles/index.scss"
import layoutStyles from "./layout.module.scss"

const Layout = (props) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <div className={layoutStyles.container}>
            <div className={layoutStyles.content}>
                <Navbar
                    open={isMenuOpen}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                />
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
