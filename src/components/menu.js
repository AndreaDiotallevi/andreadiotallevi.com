import React from "react"

import MenuItem from "./MenuItem"
import routes from "../utils/routes"

import menuStyles from "./menu.module.scss"

const Menu = ({ open, onClick }) => {
    const renderList = () => {
        if (open) {
            return (
                <div className={menuStyles.menu}>
                    <ul>
                        {routes.map((item, index) => (
                            <MenuItem
                                key={index}
                                onClick={onClick}
                                item={item}
                            />
                        ))}
                    </ul>
                </div>
            )
        } else {
            return null
        }
    }

    return renderList()
}

export default Menu
