import { useLoginUser } from "../contexts/index"


const Bookmarks = () => {
    const { loggedUserState, loginDispatch } = useLoginUser()

    return (<div>
       {loggedUserState.bookmarks.map((post)=><div>{post.content}{post.username}</div>)}
    </div>)
}

export default Bookmarks