import React, { ReactNode, useState, Component } from "react"
import ReactDOM from "react-dom"

import * as styles from "./portal.module.scss"

const portalRoot: HTMLElement | null =
    typeof document !== "undefined" ? document.getElementById("portal") : null

interface PortalProps {
    children: ReactNode
}

class Portal extends Component<PortalProps> {
    el: HTMLDivElement | null = null

    constructor(props: PortalProps) {
        super(props)
        this.el =
            typeof document !== "undefined"
                ? document.createElement("div")
                : null
    }

    componentDidMount(): void {
        if (portalRoot && this.el) {
            portalRoot.appendChild(this.el)
            // document.body.classList.add(styles.modalOpen)
        }
    }

    componentWillUnmount(): void {
        if (portalRoot && this.el) {
            portalRoot.removeChild(this.el)
            // document.body.classList.remove(styles.modalOpen)
        }
    }

    render(): ReactNode {
        const { children } = this.props

        if (this.el) {
            return ReactDOM.createPortal(
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>{children}</div>
                </div>,
                this.el
            )
        } else {
            return null
        }
    }
}

export default Portal
