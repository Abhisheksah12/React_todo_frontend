import React from 'react'
import { useContext } from 'react';
import { Context } from './index';
import Loader from "./Loader.js"

const Face = () => {

    const {isAuthenticated ,  loading , user}= useContext(Context);
    console.log(user)
  return (
    
        loading ? <Loader/> :(<div> 
              <h1>{user?.name}</h1>
                <p>{user?.email}</p>

             </div>)
     
  )
}

export default Face;