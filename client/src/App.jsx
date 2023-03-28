import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Deshboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header'
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
      </Routes>
    </div>
    </BrowserRouter>
    </>
  )
}

export default App
