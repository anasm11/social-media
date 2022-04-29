import axios from "axios"
import { useState,useEffect,useRef } from "react"

const Profile = () => {
    const [url, setURL] = useState('')
    const [bio, setBio] = useState('')
    const [user, setUser] = useState('')
    const [isEditState, setIsEditState] = useState(false)

    const inputFile=useRef(null)
    const [image,setImage]=useState(null)
    
    useEffect(()=>{

        (async()=>{
            const token = localStorage.getItem('token')
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            const selfname=JSON.parse(window.atob(base64)).username;

            const res = await axios({
                method: 'get',
                url: `/api/users`
            })

            const user=res.data.users.find((user)=>user.username===selfname )
            setBio(user.bio)
            setURL(user.url)
            setImage(user.img)
            setUser(user)
        })()
    },[])

    return (<div className='flex relative gap-5'>
        <input
        type="file"
        name="myImage"
        ref={inputFile}
        onChange={(event) => {
        
          var reader = new FileReader();
            reader.onloadend = function() {
              setImage(reader.result)
            }
            reader.readAsDataURL(event.target.files[0]);
        }}
        style={{display: 'none'}}
      />
        <span className='edit-photo-container bg-gray-300 flex' onClick={(event) => {
            inputFile.current.click()            
          }}>
        
            <img className='edit-profile-photo' width={'200px'} src={image} />
            <div className='overlay-text'>Upload new photo</div>
        </span>

        <button className='absolute button top-0 right-0' onClick={() => setIsEditState(true)}>Edit</button>
        <div className='flex flex-col gap-10'>
            <div>
                <h2>Bio</h2>
                {isEditState ?
                    <label for='input-bio'>
                        <input type="text" name='input-bio' value={bio} onChange={(e) => { setBio(e.target.value) }} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="bio" required />
                    </label>
                    : <p>{bio}</p>}
            </div>

            <div className="flex flex-col gap-2">
                <h2>Portfolio URL</h2>
                {isEditState ?
                    <label for='input-url'>
                        <input type="url" name='input-url' value={url} onChange={(e) => { setURL(e.target.value) }} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="url" required />
                    </label>
                    : <a className='link'>{url}</a>}
            </div>
            <button className='button' onClick={async()=>{
                setIsEditState(false)

                const res=await axios({
                    method: 'POST',
                    url:'/api/users/edit',
                    headers:{
                        authorization:localStorage.getItem('token')
                    },
                    data:{userData:{...user,bio:bio,url:url,img:image}}
                })
                }}>Save</button>
        </div>
    </div>)

}

export default Profile