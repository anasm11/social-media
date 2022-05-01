import { Link } from "react-router-dom"
import { useState } from "react"
import { IcRoundAccountCircle } from "../assets/index"

const Navigation = () => {
    const [isAccDetVis, setIsAccDetVis] = useState(false)
    return (
        <div className="sticky top-0 navigation">
            <nav className="flex justify-between">
                <h1 className="font-medium leading-tight text-3xl mt-0 mb-2 text-blue-400">
                    TownSquare
                </h1>
                <span className="flex space-x-4">{[
                    ['Home', '/']
                ].map(([title, url]) =>
                    <Link to={url} className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900">{title}</Link>
                )}
                    <div className="profile-icon">
                        <IcRoundAccountCircle onClick={() => { setIsAccDetVis(true) }}
                            className=" rounded-lg text-slate-700 font-large hover:bg-slate-100 hover:text-slate-900" />
                        {isAccDetVis &&
                            <ul className='profile-dropdown divide-y divide-gray-100' onClick={() => { setIsAccDetVis(false) }}>
                                <li ><Link to='/login'>Login</Link></li>
                                <li >Signup</li>
                            </ul>}
                    </div>
                </span>

            </nav>


        </div>
    )
}

export default Navigation