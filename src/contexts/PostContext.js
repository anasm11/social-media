import axios from "axios"
import {useEffect,useReducer,createContext} from "react"

const PostContext=createContext()

//str of payload=state payload:{allposts,displayposts,filterTrending,sortByDate}
const postReducer=(state,{type,payload})=>{
    const minLikesToTrend=1
    switch(type){
        case ('UPDATE'):{
            return {...payload,displayPosts:payload['allPosts']}
        }

        case('SORT_BY_DATE'):{
            let displayPosts=state['displayedPosts'];
            if(payload.sortByDate==='mostRecent'){
                displayPosts=payload.displayPosts.sort((a,b)=>Math.floor(new Date(b.createdAt))-Math.floor(new Date(a.createdAt)))
            }
            else if(payload.sortByDate==='leastRecent'){
                displayPosts=payload.displayPosts.sort((a,b)=>Math.floor(new Date(a.createdAt))-Math.floor(new Date(b.createdAt)))
            }
            return {...payload,displayPosts}
        }

        case('FILTER_TRENDING'):{
            const displayPosts= payload.allPosts.filter((post)=>post.likes.likeCount>=minLikesToTrend)
            return {...payload,displayPosts}
        }

        //this handles cases when filter is unchecked from checked state
        default:{
            
            let displayPosts=payload['allPosts']
            
            if(payload.filterTrending===true){
                displayPosts= payload.allPosts.filter((post)=>post.likes.likeCount>=minLikesToTrend)
            }
            if(payload.sortByDate==='mostRecent'){
                displayPosts=displayPosts.sort((a,b)=>Math.floor(new Date(b.createdAt))-Math.floor(new Date(a.createdAt)))
            }
            else if(payload.sortByDate==='leastRecent'){
                displayPosts=displayPosts.sort((a,b)=>Math.floor(new Date(a.createdAt))-Math.floor(new Date(b.createdAt)))
            }
            
            return {...payload,displayPosts}
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
            dispatchPost({type:'UPDATE',payload:{displayPosts:res.data.posts,allPosts:res.data.posts}})

        })()
    },[])

    //allposts is all the posts in the db; displayposts are the ones only which are displayed
    //filtertrending is added to payload so that if trending is unselected, display needs to get allposts and then sort/not sort depending on if sort is checked
    const [postsState,dispatchPost]=useReducer(postReducer,{displayPosts:[],allPosts:[]})
    return<PostContext.Provider value={{postsState,dispatchPost}}>{children}</PostContext.Provider>
}

export {PostContext,PostProvider}