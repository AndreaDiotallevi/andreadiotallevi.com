import React, { useContext, useEffect } from "react"
import { createContext, useState } from "react"
import { User, getUser } from "../api-gateway"

interface AuthContext {
    user: User | null
    login: (args: { email: string; password: string }) => void
    logout: () => void
}

const AuthContext = createContext<AuthContext>({
    user: null,
    login: () => undefined,
    logout: () => undefined,
})

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
    const [user, setUser] = useState<User | null>(null)
    console.log(user)

    useEffect(() => {
        const currentUser = async () => {
            const { user } = await getUser()
            user && setUser(user)
        }

        currentUser()
    }, [])

    const login = ({
        email,
        password,
    }: {
        email: string
        password: string
    }) => {}

    const logout = () => {}

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
