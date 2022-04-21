import axios from "axios"
import { useState } from "react"
import { createPostApiCall } from "../utils/postApiCalls"


const CreatePost = ({ methods }) => {
    const { setIsCreatePostVis, dispatchPost } = methods
    const [postContent, setPostContent] = useState('')

    return (
        <div className='p-3 bg-gray-100 rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700'>

            <textarea className='textarea p-2 w-full bg-white rounded border border-black' onChange={(e) => setPostContent(e.target.value)}></textarea>
            <button className='button' onClick={async () => {
                setIsCreatePostVis(false)
                const res = await createPostApiCall(postContent);
                dispatchPost({ type: 'UPDATE', payload: res.data.posts })
                console.log(res.data)
            }}>Post</button>
        </div>
    )
}

export default CreatePost