// src/contextApi.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios"
export const AuthContext = createContext();

const ContextApi = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userExist,setExistUser]=useState(null);

const handleUserExist = async () => {
    try {
      const result = await axios.get("https://mock-commerce-backend.onrender.com/api/user", {
        withCredentials: true,
      });
      setExistUser(result.data);
      console.log("User data:", result.data);
    } catch (err) {
      console.error("Error fetching user:", err.message);
    }
  };
 useEffect(() => {
    handleUserExist();
  }, []);
  
  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, handleUserExist, userExist }}>
      {children}
    </AuthContext.Provider>
  );
  
};

export default ContextApi;
