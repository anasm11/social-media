import axios from "axios"

const createPostApiCall=async(postContent)=>{
    try{const res = await axios({
        method: 'post',
        url: '/api/posts/',
        headers: {
            authorization: localStorage.getItem('token')
        },
        data: { postData: { content: postContent } }
    
        
    })
    return res
}
    catch(e){
        console.error(e)
    }

    
}

const updatePostApiCall=async(postId,postContent)=>{
    
    const res = await axios({
        method: 'post',
        url: `/api/posts/edit/${postId}`,
        headers: {
            authorization: localStorage.getItem('token')
        },
        data:{
            postData:{content:postContent}
        }
    })
    return res
}

const likePostApiCall=async(post)=>{
    const res = await axios({
        method: 'post',
        url: `/api/posts/like/${post._id}`,
        headers: {
            authorization: localStorage.getItem('token')
        }
    })
    return res
}

const deletePostApiCall=async(post)=>{
    const res = await axios({
        method: 'delete',
        url: `/api/posts/${post._id}`,
        headers: {
            authorization: localStorage.getItem('token')
        }
    })
    return res
}

export {createPostApiCall,likePostApiCall,deletePostApiCall,updatePostApiCall}