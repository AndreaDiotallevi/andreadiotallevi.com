import React from "react"

type Props = {
    name: string
}

const Tag = (props: Props) => {
    return (
        <div
            style={{
                borderRadius: "var(--border-radius)",
                backgroundColor: "var(--border)",
                padding: "4px 8px",
                fontSize: "14px",
                fontWeight: 500,
                marginRight: "8px",
                marginBottom: "8px",
                whiteSpace: "nowrap",
                width: "fit-content",
            }}
        >
            {props.name}
        </div>
    )
}

export default Tag
