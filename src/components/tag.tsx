import React from "react"

type Props = {
    name: string
}

const Tag = (props: Props) => {
    return (
        <div
            style={{
                borderRadius: "8px",
                backgroundColor: "var(--border)",
                padding: "4px 8px",
                fontSize: "14px",
                fontWeight: 700,
                marginRight: "8px",
                marginBottom: "8px",
                whiteSpace: "nowrap",
            }}
        >
            {props.name}
        </div>
    )
}

export default Tag
