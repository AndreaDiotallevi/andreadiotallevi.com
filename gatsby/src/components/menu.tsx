import React from "react"

import MenuItem from "./menuItem"
import routes from "../utils/routes"

import * as menuStyles from "./menu.module.scss"

type DataProps = {
    open: boolean
    onClick: () => void
}

const Menu = ({ open, onClick }: DataProps) => {
    if (!open) {
        return null
    }

    return (
        <div className={menuStyles.menu}>
            <ul>
                {routes.map((item, index) => (
                    <MenuItem key={index} onClick={onClick} item={item} />
                ))}
            </ul>
        </div>
    )
}

export default Menu
