import { createContext, useContext, useEffect, useReducer } from "react"
import axios from "axios"

const LoginUserContext = createContext()

const loginReducer = (state, { action, payload }) => {
    switch (action) {
        case ('UPDATE'): {
            return payload
        }
    }
}

const LoginUserProvider = ({ children }) => {
    const [loggedUserState, loginDispatch] = useReducer(loginReducer, {})
    useEffect(() => {
        (async () => {
            const token = localStorage.getItem('token')
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            const selfname=JSON.parse(window.atob(base64)).username;

            const res=await axios({
                method:'get',
                url:`/api/users`
            })

            const self=res.data.users.find((user)=>user.username===selfname)
            loginDispatch({action:'UPDATE',payload:self})
        })()
    }, [])

    

    return <LoginUserContext.Provider value={{ loggedUserState, loginDispatch }}>{children}</LoginUserContext.Provider>
}

const useLoginUser = () => useContext(LoginUserContext)

export { LoginUserProvider, useLoginUser }