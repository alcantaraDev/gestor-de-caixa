import { user } from "@/model/notion/auth/utils";
import axios from "axios";
import { createContext, useContext, useState } from "react";

type signInData = {
    username: string
    pass: string
}

type authContext = {
    isAuthenticated?: boolean
    user?: user
    token?:string
    signIn: ({}: signInData) => Promise<void>
}

const AuthContext = createContext<authContext>({
    signIn: async ({}: signInData) => {}
})

type authProviderProps = {
    children: string | JSX.Element | JSX.Element[]
}

export function AuthProvider({children}:authProviderProps) {
    const [user, setUser] = useState<user | undefined>(undefined)
    const [token, setToken] = useState<string | undefined>(undefined)

    let isAuthenticated = !!user
    
    async function signIn({username, pass}:signInData) {
        const response = await axios.post("/api/auth", {username, pass})
        setUser(response.data)
        setToken(response.data.tokens)
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, user, token, signIn}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}