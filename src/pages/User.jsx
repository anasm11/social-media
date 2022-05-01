import { useLocation } from "react-router-dom"
import { useEffect, useState, useContext } from "react"

import { PostContext, useLoginUser } from "../contexts/index"
import { Link } from "react-router-dom"
import axios from "axios"
import { likePostApiCall, deletePostApiCall } from "../utils/postApiCalls"
import { IcRoundFavoriteBorder, IcRoundFavorite } from "../assets/index"


const User = () => {
    const { loggedUserState, loginDispatch } = useLoginUser()
    const { postsState, dispatchPost } = useContext(PostContext)
    const location = useLocation()
    const username = location.pathname.split('/')[2]
    const [isFollowing, setIsFollowing] = useState(false)
    let selfname

    useEffect(() => {
        (async () => {

            const token = localStorage.getItem('token')
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            selfname = JSON.parse(window.atob(base64)).username;

            const res1 = await axios({
                method: 'get',
                url: `/api/users`
            })
            res1.data.users.find((user) => user.username === username && user.followers.find((user1) => user1.username === selfname)) && setIsFollowing(true)
        })()
    }, [])


    const likeHandler = async (post) => {
        const res = await likePostApiCall(post)
        dispatchPost({ type: 'UPDATE', payload: { ...postsState, allPosts: res.data.posts } })
    }

    return (
        <div>
            <div className="flex gap-4">
                <span>{username}</span>
                <button className="button" onClick={async () => {
                    const res = await axios({
                        method: 'get',
                        url: `/api/users`
                    })

                    const followUserId = res.data.users.find((user) => user.username === username)._id

                    let url
                    url = isFollowing ? `/api/users/unfollow/${followUserId}/` : `/api/users/follow/${followUserId}/`
                    const res1 = await axios({
                        method: 'post',
                        url: url,
                        headers: {
                            authorization: localStorage.getItem('token')
                        }
                    })

                    if (isFollowing)
                        setIsFollowing(false);

                    else {
                        setIsFollowing(true);
                        
                        (async () => {
                            const token = localStorage.getItem('token')
                            const base64Url = token.split('.')[1];
                            const base64 = base64Url.replace('-', '+').replace('_', '/');
                            const selfname=JSON.parse(window.atob(base64)).username;
                
                            const res=await axios({
                                method:'get',
                                url:`/api/users`
                            })
                
                            const self=res.data.users.find((user)=>user.username===selfname)
                            loginDispatch({action:'UPDATE',payload:self})
                        })()
                    }
                }}>{isFollowing ? 'Unfollow' : 'Follow'}</button>
            </div>
            {postsState.allPosts.filter((post) => post.username === username).map((post) =>
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

                        </div>
                    </div>
                </div>

            )}
        </div>
    )
}

export default User