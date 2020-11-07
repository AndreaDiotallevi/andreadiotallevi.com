import React from "react"

import menuToggleButtonStyles from "./menuToggleButton.module.scss"

const MenuToggleButton = ({ open, onClick }) => {
    return (
        <button
            className={`${menuToggleButtonStyles.toggleButton} ${open ? menuToggleButtonStyles.menuOpen : ""}`}
            onClick={onClick}
            ariaLabel="menu-toggle"
        >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </button>
    )
}

export default MenuToggleButton
