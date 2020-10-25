import React from "react"

import menuToggleButtonStyles from "./menuToggleButton.module.scss"

const MenuToggleButton = ({ open, onClick }) => {
    return (
        <button
            className={menuToggleButtonStyles.toggleButton}
            // className={`toggle-button ${open ? "menu-open" : undefined}`}
            onClick={onClick}
        >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </button>
    )
}

export default MenuToggleButton
