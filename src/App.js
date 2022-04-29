import { Routes, Route } from "react-router-dom"
import './App.css'
import './index.css'
import { Navigation,Sidebar } from "./components/index"
import { Home, Login,Profile,User } from "./pages/index"

const App = () => {
    return <div className='App'>
        <Navigation />
        <Sidebar />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/user/:username' element={<User/>}/>
        </Routes>
    </div>
}

export default App