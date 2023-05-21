import React from "react"

import * as styles from "./time.module.scss"

type Props = {
    color?: string
}

const Time = (props: Props) => {
    return (
        <svg
            width="18px"
            height="18px"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.svg}
            fill={props.color || "var(--text-primary)"}
        >
            <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-7.59V4h2v5.59l3.95 3.95-1.41 1.41L9 10.41z" />
        </svg>
    )
}

export default Time
