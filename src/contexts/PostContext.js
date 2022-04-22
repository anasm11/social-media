import axios from "axios"
import {useEffect,useReducer,createContext} from "react"

const PostContext=createContext()

const postReducer=(state,{type,payload})=>{
    switch(type){
        case ('UPDATE'):{
            return payload
        }
        default :{
            return payload
        }
    }
}


const PostProvider=({children})=>{
    useEffect(()=>{
        (async()=>{
            const res=await axios({
                method:'get',
                url:'/api/posts',
                headers:{
                    authorization:localStorage.getItem('token')
                }
            })
            dispatchPost({type:'UPDATE',payload:res.data.posts})
        })()
    },[])
    const [postsState,dispatchPost]=useReducer(postReducer,[])
    return<PostContext.Provider value={{postsState,dispatchPost}}>{children}</PostContext.Provider>
}

export {PostContext,PostProvider}