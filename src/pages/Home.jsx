import { useState, useContext } from "react"
import {Link} from "react-router-dom"
import { CreatePost, EditModal } from "../components/index"
import { PostContext } from "../contexts/index"
import { IcRoundFavoriteBorder, IcRoundFavorite, IcRoundComment } from "../assets/index"
import { likePostApiCall, deletePostApiCall } from "../utils/postApiCalls"

const Home = () => {
    const { postsState, dispatchPost } = useContext(PostContext)
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

    return (
        <div className="home px-3 py-2">

            <button type="button" class="button rounded-3xl py-2" onClick={() => setIsCreatePostVis(true)}>Create New Post</button>

            {isCreatePostVis && <CreatePost props={{ postsState, setIsCreatePostVis, dispatchPost }} />}

            {showEditModal && <EditModal props={{ postsState, showEditModal, setShowEditModal, dispatchPost }} />}

            <label for='trending-filter'><input type='checkbox' name='trending-filter' onChange={(e) =>
                e.target.checked ? dispatchPost({ type: 'FILTER_TRENDING', payload: { ...postsState, filterTrending: true } }) : dispatchPost({ type: '', payload: { ...postsState, filterTrending: false } })
            } />Trending</label>

            <label for='date-sort'><input type='radio' name='date-sort' onChange={(e) => {
                e.target.checked && dispatchPost({ type: 'SORT_BY_DATE', payload: { ...postsState, sortByDate: 'mostRecent' } })
            }
            } />Most Recent</label>
            <label for='date-sort'><input type='radio' name='date-sort' onChange={(e) =>
                e.target.checked && dispatchPost({ type: 'SORT_BY_DATE', payload: { ...postsState, sortByDate: 'leastRecent' } })
            } />Least Recent</label>

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

export default Home