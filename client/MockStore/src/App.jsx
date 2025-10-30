import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from './components/Navbar'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard';
import Payment from './pages/payment';
const App = () => {
  return (
    <div>
       <ToastContainer
  position="top-center"
  autoClose={1500}
  toastClassName="custom-toast"
  style={{ width: "auto", maxWidth: "90%" }}
/>

      <div>
      <Navbar/>
      </div>
     <Routes>
      <Route path='/Register' element={<Register/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/payment' element={<Payment/>}/>
     </Routes>

    </div>
  )
}

export default App
