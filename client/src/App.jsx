import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Deshboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import MyPosts from './pages/MyPosts'
import EditPost from './pages/EditPost'
import Header from './components/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

function App() {

  return (
    <>
    <BrowserRouter>
    <div className="container">
      <Header/>
      <Routes>
        <Route path="/" element={<Deshboard />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/myposts" element={<MyPosts />} />
        <Route path="/api/post/:id" element={<EditPost />} />
      </Routes>
    </div>
    </BrowserRouter>
    <ToastContainer /> 
    </>
  )
}

export default App
