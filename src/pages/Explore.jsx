import { useState, useContext, useEffect,useReducer } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { CreatePost, EditModal } from "../components/index"
import { PostContext, useLoginUser } from "../contexts/index"
import { IcRoundFavoriteBorder, IcRoundFavorite, IcRoundComment, IcRoundBookmarkBorder, IcRoundBookmark } from "../assets/index"
import { likePostApiCall, deletePostApiCall } from "../utils/postApiCalls"
import usePostReducer from "../reducers/postDisplayReducer"

const Explore = () => {
    const [postsState,dispatchPost]=usePostReducer()

    const { loggedUserState, loginDispatch } = useLoginUser()
    const [isCreatePostVis, setIsCreatePostVis] = useState(false)
    const [showEditModal, setShowEditModal] = useState(null)

    const likeHandler = async (post) => {
        const res = await likePostApiCall(post)
        dispatchPost({ type: 'UPDATE', payload: { ...postsState, allPosts: res.data.posts } })
    }

    const deleteHandler = async (post) => {
        const res = await deletePostApiCall(post)
        dispatchPost({ type: 'UPDATE', payload: { ...postsState, allPosts: res.data.posts } })
    }

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

    return (
        <div className="home px-3 py-2">

            {isCreatePostVis && <CreatePost props={{ postsState, setIsCreatePostVis, dispatchPost }} />}

            {showEditModal && <EditModal props={{ postsState, showEditModal, setShowEditModal, dispatchPost }} />}

            <label htmlFor='trending-filter'><input type='checkbox' name='trending-filter' onChange={(e) => {
                e.target.checked ? dispatchPost({ type: 'FILTER_TRENDING', payload: { ...postsState, filterTrending: true } }) : dispatchPost({ type: '', payload: { ...postsState, filterTrending: false } })
            }} />Trending</label>

            <label htmlFor='date-sort'><input type='radio' name='date-sort' onChange={(e) => {
                e.target.checked && dispatchPost({ type: 'SORT_BY_DATE', payload: { ...postsState, sortByDate: 'mostRecent' } })
            }
            } />Most Recent</label>
            <label htmlFor='date-sort'><input type='radio' name='date-sort' onChange={(e) =>
                e.target.checked && dispatchPost({ type: 'SORT_BY_DATE', payload: { ...postsState, sortByDate: 'leastRecent' } })
            } />Least Recent</label>

            {/* {displayPosts.map((post) => */}
            {postsState.displayPosts.map((post) =>
                <div key={post._id}>
                    <hr />
                    <div><Link to={`/user/${post.username}`}>{post.username}</Link></div>

                    <p>{post.content}</p>

                    <div className='footer flex items-center justify-around'>
                        <div className="action-icons items-center flex gap-4">
                            <span className="flex items-center">
                                {post.likes.likedBy.find((person) => person.firstName === 'a') ? <IcRoundFavorite /> : <IcRoundFavoriteBorder onClick={() => likeHandler(post)} />}
                                {post.likes.likeCount}
                            </span>
                            <span>
                                <IcRoundComment onClick={() => setIsCreatePostVis(true)} />
                            </span>

                            <span>
                                {loggedUserState?.bookmarks?.find((bookmark) => bookmark._id === post._id) ? <IcRoundBookmark /> : <IcRoundBookmarkBorder onClick={async () => {
                                    const res = await axios({
                                        method: 'post',
                                        url: `/api/users/bookmark/${post._id}`,
                                        headers: {
                                            authorization: localStorage.getItem('token')
                                        }
                                    })
                                    loginDispatch({ action: 'UPDATE', payload: { ...loggedUserState, bookmarks: [...loggedUserState.bookmarks, post] } })
                                }
                                } />}
                            </span>

                        </div>
                        <div className='flex gap-4'>
                            <button className='button' onClick={() => { setShowEditModal(post) }}>Edit</button>
                            <button className='button' onClick={() => deleteHandler(post)}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Explore