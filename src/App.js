import {BrowserRouter as Router, Route , Routes }  from "react-router-dom";
import Home from "./Home"
import Header from "./Header";

import Login from "./Login";
import Register from "./Register";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import axios from "axios";
import { Context, server } from "./index";
import Face from "./Face";


function App() {
  const {  setUser, setIsAuthenticated , setLoading} = useContext(Context);

  useEffect(() =>{
     setLoading(true);
    axios.get( `${server}/users/me`,{
      withCredentials: true,
    }).then(res =>{
      setUser(res.data.user)
      setIsAuthenticated(true);
      setLoading(false);
    })
    .catch((error) => {
      setUser({});
      setIsAuthenticated(false);
      setLoading(false);
    })

  },[])


  return <Router>
    <Routes>
      <Route path="/" element={<div><Header/><Home/></div>}/>
      <Route path="/profile" element={<div><Header/><Face/></div>}/>
      <Route path="/login" element={<div><Header/><Login/></div>} />
      <Route path="/register" element={<div><Header/><Register/></div>} />
    </Routes>
    <Toaster/>
  </Router>
}

export default App;
