import React , { useContext , useState }from 'react';
import "./Login.css";
import {Link , Navigate}  from "react-router-dom";
import { server,Context } from './index';
import axios from 'axios';
import toast from 'react-hot-toast';


const Login = () =>{
 
const {isAuthenticated , setIsAuthenticated  ,loading , setLoading  }= useContext(Context);

const [email , setEmail] =useState("");
const [password , setPassword] = useState("");


const submitHandler = async (e) => {
     
  e.preventDefault();
  setLoading(true);
  try {
    const { data } = await axios.post(
      `${server}/users/login`,
      {
        
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
    toast.error(error.response.data.message);
    setIsAuthenticated(false);
    setLoading(false);
    
  }
};


if (isAuthenticated) return <Navigate to ={"/"} />



  return (
    <div className='login'>
        <section>
            <from className="form">
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
                <button disabled={loading} className="btn" onClick={submitHandler} type="submit">Login</button>
                <h4>Or</h4>
                <Link className="sign__up" to="/register">Sign Up</Link>
            </from>
        </section>
    </div>
  )

}

export default Login