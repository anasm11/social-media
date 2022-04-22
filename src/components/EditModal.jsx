import { useState } from "react"
import { updatePostApiCall } from "../utils/postApiCalls"


const EditModal = ({ props }) => {
    const {postsState, showEditModal: post, setShowEditModal, dispatchPost } = props
    const [postToBeEdited, setPostToBeEdited] = useState(post)

    const editPostHandler=async(post) => {
        setShowEditModal(null)
        const res = await updatePostApiCall(post._id, postToBeEdited.content);
        dispatchPost({ type: 'UPDATE', payload: {...postsState,allPosts:res.data.posts} })
    }

    return (
        <div className='p-3 bg-gray-100 rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700'>

            <textarea className='textarea p-2 w-full bg-white rounded border border-black'
                onChange={(e) => setPostToBeEdited((post) => { return { ...post, content: e.target.value } })} value={postToBeEdited.content}></textarea>
            <button className='button' onClick={()=>editPostHandler(post)}>Save</button>
        </div>
    )
}

export default EditModal