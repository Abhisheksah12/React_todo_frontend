import React, { useState, useContext } from 'react';
import "./Register.css";
import {Link ,Navigate} from "react-router-dom";
import { server , Context } from './index.js';
import axios from "axios";
import toast from "react-hot-toast";

const Register= () => {

    const [name ,setName]= useState("");
    const [email , setEmail] =useState("");
    const [password , setPassword] = useState("");
    const {isAuthenticated , setIsAuthenticated  ,loading , setLoading }= useContext(Context);
 



    const submitHandler = async (e) => {
     setLoading(true);
      e.preventDefault();
      try {
        const { data } = await axios.post(
          `${server}/users/new`,
          {
            name,
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
  
        toast.success(data.message);
        setIsAuthenticated(true);
        setLoading(false);

       
      } catch (error) {
        toast.error(error.response.data);
        setIsAuthenticated(false);
        setLoading(false);
        
      }
    };

    if (isAuthenticated) return <Navigate to ={"/"} />
  return (
   
    <div className='register'>
        
         <section>
            <from className="form" >
                <input  className='input' 
                type='text'
                 placeholder='Name'
                  value={name}
                   onChange={(e)=>setName(e.target.value) }
                   required
                   />
                <input className='input'
                 type='email'
                  placeholder='Email'
                  value={email}
                   onChange={(e)=>setEmail(e.target.value)}
                   required
                   />
                <input className='input'
                 type="password"
                  placeholder='Password'
                  value={password}
                   onChange={(e)=>setPassword(e.target.value)}
                   required
                   />
                <button disabled={loading} className="btn" type="submit" onClick={submitHandler}>Sign Up</button>
                <h4>Or</h4>
                <Link className="sign__up" to="/login">Login</Link>
            </from>
            
        </section>
    </div>
  )
}

export default Register