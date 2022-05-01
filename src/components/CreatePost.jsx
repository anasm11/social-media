import axios from "axios"
import { useState } from "react"
import { createPostApiCall } from "../utils/postApiCalls"


const CreatePost = ({ props }) => {
    const { postsState, setIsCreatePostVis, dispatchPost } = props
    const [postContent, setPostContent] = useState('')

    const createPostHandler = async (postContent) => {
        setIsCreatePostVis(false)
        const res = await createPostApiCall(postContent);
        dispatchPost({ type: 'UPDATE', payload: { ...postsState, allPosts: res.data.posts } })
    }

    return (
        <div className='p-3 bg-gray-100 rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700'>

            <textarea className='textarea p-2 w-full bg-white rounded border border-black' onChange={(e) => setPostContent(e.target.value)}></textarea>
            <button className='button' onClick={() => createPostHandler(postContent)}>Post</button>
        </div>
    )
}

export default CreatePost