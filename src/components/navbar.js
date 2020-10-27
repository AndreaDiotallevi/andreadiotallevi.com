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
                        <p>Andrea Diotallevi</p>
                    </Link>
                )}
            </div>
            <ul>
                {routes.map(({ menuName, baseUrl }) => (
                    <li key={menuName}>
                        <Link to={baseUrl} activeClassName={navbarStyles.activeNavItem}>
                            {menuName}
                        </Link>
                    </li>
                ))}
            </ul>
            <MenuToggleButton open={open} onClick={onClick} />
        </nav>
    )
}

export default Navbar
