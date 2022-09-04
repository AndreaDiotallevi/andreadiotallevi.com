import React, { useState } from "react"
import { Link } from "gatsby"

import * as buttonStyles from "./buttonMain.module.scss"

type DataProps = {
    additionalStyles?: React.CSSProperties
    children: string
    color: string
    primary?: boolean
    to: string
}

const ButtonMain = (props: DataProps) => {
    const { additionalStyles, children, color, primary, to } = props
    const [isHover, setIsHover] = useState(false)

    const varyingStyles: React.CSSProperties = {
        color: primary ? "white" : isHover ? "white" : "var(--text-primary)",
        backgroundColor: primary ? color : isHover ? color : "white",
        border: `1px solid ${color}`,
    }

    return (
        <Link
            to={to}
            className={buttonStyles.link}
            style={{ ...additionalStyles, ...varyingStyles }}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            {children}
        </Link>
    )
}

export default ButtonMain
