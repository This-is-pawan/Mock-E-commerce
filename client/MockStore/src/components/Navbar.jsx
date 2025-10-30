import React, { useContext } from 'react'
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../contextApi.jsx";
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const { isAuth, setIsAuth , userExist} = useContext(AuthContext);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "https://mock-commerce-backend.onrender.com/api/logout",
        {},
        { withCredentials: true }
      );

      toast.success(result?.data?.message || "Logout successfully");
      setIsAuth(!isAuth);
      navigate('/');
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };
 const userInitial =
    typeof userExist?.data?.name === "string"
      ? userExist.data.name.charAt(0).toUpperCase()
      : "D";
  return (
    <div className='bg-pink-200 p-3 flex items-center justify-around'>
      <h1 className='text-xl font-mono font-bold'>MockE-com</h1>
       <p className="w-10 h-10 rounded-full bg-white text-black capitalize font-bold text-center leading-[2.5rem]">
        {userInitial}
      </p>

      <div className='bg-white text-black rounded p-2 text-sm'>
        <ul>
          {!isAuth ? (
            <li>
              <Link to='/Register' className='font-serif capitalize tracking-wide'>
                signup/login
              </Link>
            </li>
          ) : (
            <li>
              <button
                className='font-serif capitalize tracking-wide'
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Navbar
