import React from "react"

export enum ButtonVariant {
    Primary = "primary",
    Secondary = "secondary",
}

interface Props {
    children: JSX.Element | string
    variant?: ButtonVariant
    onClick: () => void
}

const Button = (props: Props) => {
    const { variant = "primary", children, onClick } = props

    const variants: Record<ButtonVariant, React.CSSProperties> = {
        primary: {},
        secondary: {
            color: "var(--primary-color)",
            backgroundColor: "white",
        },
    }

    return (
        <div>
            <button
                onClick={() => onClick()}
                className={variant}
                type="button"
                style={{
                    ...{
                        cursor: "pointer",
                        textAlign: "center",
                        color: "white",
                        backgroundColor: "var(--primary-color)",
                        boxShadow: "none",
                        fontSize: "18px",
                        padding: "13px 0",
                        width: "100%",
                        border: "1px solid var(--primary-color)",
                        marginTop: "16px",
                        fontWeight: 500,
                        borderRadius: "var(--border-radius)",
                    },
                    ...variants[variant],
                }}
            >
                {children}
            </button>
        </div>
    )
}

export default Button
