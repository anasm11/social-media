import {createContext} from "react"

const LoginUserContext=createContext()

const LoginUserProvider=({children})=>{
    useEffect(()=>{

    })
    const [loggedUserState,loginDispatch]=useReducer(loginReducer,{})
    return <LoginUserContext.Provider>{children}</LoginUserContext.Provider>
}

export {LoginUserProvider}