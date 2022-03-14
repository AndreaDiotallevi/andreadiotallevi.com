import React from "react"
import { Link } from "gatsby"

import * as menuItemStyles from "./menuItem.module.scss"

const MenuItem = ({ item, onClick }) => {
    return (
        <Link
            to={`${item.baseUrl}`}
            onClick={onClick}
            className={menuItemStyles.link}
        >
            <h1>{item.menuName}</h1>
        </Link>
    )
}

export default MenuItem
