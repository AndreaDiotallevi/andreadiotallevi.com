import React from "react"
import { Link } from "gatsby"

import { Route } from "../utils/routes"

import * as menuItemStyles from "./menuItem.module.scss"

type DataProps = {
    item: Route
    onClick: () => void
}

const MenuItem = ({ item, onClick }: DataProps) => {
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
