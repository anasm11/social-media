import { Routes, Route } from "react-router-dom"
import './App.css'
import './index.css'
import { CreatePost, EditModal,Navigation,Sidebar } from "./components/index"
import { Home, Login } from "./pages/index"

const App = () => {
    return <div className='App'>
        <Navigation />
        <Sidebar />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
        </Routes>
    </div>
}

export default App