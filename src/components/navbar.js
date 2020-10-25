import React from "react"
import { Link } from "gatsby"

import MenuToggleButton from "./MenuToggleButton"
import routes from "../utils/routes"

import navbarStyles from "./navbar.module.scss"

const Navbar = ({ open, onClick }) => {
    return (
        <nav className={navbarStyles.navbar}>
            <div>
                {!open && (
                    <Link to="/">
                        <h2>Andrea Diotallevi</h2>
                    </Link>
                )}
            </div>
            <ul>
                {routes.map((route) => (
                    <li key={route.menuName}>
                        <Link to={route.baseUrl}>
                            {route.menuName}
                        </Link>
                    </li>
                ))}
            </ul>
            <MenuToggleButton open={open} onClick={onClick} />
        </nav>
    )
}

export default Navbar
