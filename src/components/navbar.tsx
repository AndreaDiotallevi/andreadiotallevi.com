import React from "react"
import { Link } from "gatsby"

import routes from "../utils/routes"

import * as navbarStyles from "./navbar.module.scss"
import Logo from "./logo"

type DataProps = {
    open: boolean
    onClick: () => void
    color?: string
}

const Navbar = (props: DataProps) => {
    return (
        <nav className={navbarStyles.navbar}>
            {/* <div>{!open && <Link to="/">andreadiotallevi</Link>}</div> */}
            <Link to="/" style={{ display: "flex", alignItems: "center" }}>
                <Logo color={props.color} />
            </Link>
            <ul>
                {routes.map(({ menuName, baseUrl }) => (
                    <li key={menuName}>
                        <Link
                            to={baseUrl}
                            activeClassName={navbarStyles.activeNavItem}
                        >
                            {menuName}
                        </Link>
                    </li>
                ))}
            </ul>
            {/* <MenuToggleButton open={open} onClick={onClick} /> */}
        </nav>
    )
}

export default Navbar
