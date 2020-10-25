import React from "react"
import { Link } from "gatsby"

const MenuItem = ({ item, onClick }) => {
    const getLinkClassName = () => {
        return null
    }

    return (
        <Link
            to={`${item.baseUrl}`}
            className={`menu-item ${getLinkClassName()}`}
            onClick={onClick}
        >
            {item.menuName}
        </Link>
    )
}

export default MenuItem
