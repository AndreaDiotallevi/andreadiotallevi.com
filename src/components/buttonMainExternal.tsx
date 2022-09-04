import React, { useState } from "react"

import * as buttonStyles from "./buttonMain.module.scss"

type DataProps = {
    additionalStyles?: React.CSSProperties
    children: string
    color: string
    primary?: boolean
    href: string
}

const ButtonMainExternal = (props: DataProps) => {
    const { additionalStyles, children, color, href, primary } = props
    const [isHover, setIsHover] = useState(false)

    const varyingStyles: React.CSSProperties = {
        color: primary ? "white" : isHover ? "white" : "var(--text-primary)",
        backgroundColor: primary ? color : isHover ? color : "white",
        border: `1px solid ${color}`,
    }

    return (
        <a
            href={href}
            className={buttonStyles.link}
            style={{ ...additionalStyles, ...varyingStyles }}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            target="_blank"
            rel="noopener noreferrer"
        >
            {children}
        </a>
    )
}

export default ButtonMainExternal
