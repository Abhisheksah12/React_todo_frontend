import React, { useContext } from 'react'
import "./Header.css"
import { Link } from 'react-router-dom'
import { server,Context } from "./index";
import axios from 'axios';
import toast from "react-hot-toast";


const Header =() => {

  const {isAuthenticated , setIsAuthenticated ,loading , setLoading }= useContext(Context);

  const logoutHandler = async (e) => {
     setLoading(true);
  
    try {
       await axios.get(
        `${server}/users/logout`,
      
        {
         
          withCredentials: true,
        }
      );

      toast.success("Logged Out Successful");
      setIsAuthenticated(false);
      setLoading(false);

      } catch (error) {
      toast.error(error.response.data);
      setIsAuthenticated(true);
      setLoading(false);
      
    }
  };

 

  return (
    <div>
      <nav className='header'>
        <div>
          <h2>Todo App.</h2>
        </div>
        <article >
          <Link className='link' to={"/"}>Home</Link>
          <Link className='link' to={"/profile"}>Profile</Link>
          { isAuthenticated ? 
            <button disabled={loading} onClick={logoutHandler} className='btn_logout'>Logout</button> : 
            <Link className="link" to={"/login"}>Login</Link>
          }
          
          
        </article>
      </nav>
    </div>
  )
}

export default Header