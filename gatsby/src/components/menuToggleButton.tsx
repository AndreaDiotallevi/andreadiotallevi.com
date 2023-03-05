import React from "react"

import * as menuToggleButtonStyles from "./menuToggleButton.module.scss"

type DataProps = {
    open: boolean
    onClick: () => void
}

const MenuToggleButton = ({ open, onClick }: DataProps) => {
    return (
        <button
            className={`${menuToggleButtonStyles.toggleButton} ${
                open ? menuToggleButtonStyles.menuOpen : ""
            }`}
            onClick={onClick}
            aria-label="menu-toggle"
        >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </button>
    )
}

export default MenuToggleButton
