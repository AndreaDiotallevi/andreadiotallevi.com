import crypto from "crypto"
import KSUID from "ksuid"

export const generateKSUID = (timestamp: Date) => {
    const payload = crypto.randomBytes(16)
    return KSUID.fromParts(timestamp.getTime(), payload).string
}

export const zeroPadNumber = (number: number) => {
    return ("0000" + number).slice(-4)
}
