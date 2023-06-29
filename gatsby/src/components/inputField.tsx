import React from "react"
import * as styles from "./inputField.module.scss"

interface Props {
    name: string
    value: string
    label: string
    type: "number" | "email" | "text" | "password"
    onChange: (value: string) => void
}

const InputField = (props: Props) => {
    const { name, value, label, type = "text", onChange } = props

    return (
        <div className={styles.container}>
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                type={type}
                name={name}
                value={value}
                onChange={e => onChange(e.target.value)}
                autoComplete="off"
            />
        </div>
    )
}

export default InputField
