import {useReducer} from "react"

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


const usePostReducer=()=>{
    const [postsState,dispatchPost]=useReducer(postReducer,{displayPosts:[],allPosts:[]})
    return [postsState,dispatchPost]
}

export default usePostReducer