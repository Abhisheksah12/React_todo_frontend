import React, { useEffect, useState , useContext } from 'react'
import "./Home.css"
import axios from 'axios';
import { server, Context } from './index';
import { toast } from 'react-hot-toast';
import TodoItem from './TodoItem';
import { Navigate } from 'react-router-dom';


const Home = () => {

  const[title, setTitle] = useState("");
  const [description , setDescription ] = useState( "");
  const [loading , setLoading ] = useState( false);
  const [ tasks , setTasks ] = useState ([]);
  const [refersh, setRefresh] = useState (false);

  const {isAuthenticated  }= useContext(Context);


  const updateHandler = async(id) => {
    try {
      const {data} = await axios.put(`${server}/task/${id}`,
        {},
        {
          withCredentials:true,
        }
      );
      toast.success(data.message);
      setRefresh(prev => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
    
}

const deleteHandler = async(id) => {
  try {
    const {data} = await axios.delete(`${server}/task/${id}`,

      {
        withCredentials:true,
      }
    );
    toast.success(data.message);
    setRefresh(prev => !prev);
  } catch (error) {
    toast.error(error.response.data.message);
  }
}



  const submitHandler = async(e) =>{
    e.preventDefault();
    setLoading(true);
    try {
      const {data} = await axios.post(`${server}/task/new`,{
        title,
        description,
      },{
        withCredentials:true,
        headers:{
          "Content-Type" : "application/json"
        }
      });
      setTitle("");
      setDescription("");
      toast.success(data.message);
      setLoading(false);
      setRefresh(prev => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(()=>{

    axios.get(`${server}/task/my`,{
      withCredentials: true,
    }).then(res => {
      setTasks(res.data.tasks);
    }).catch( e => {
      toast.error(e.response.data.message);
    })


  },[refersh])

  if(!isAuthenticated) return <Navigate to={"/login"}/>


  return (
    <div className='container'>
      

      <div className='login'>
        <section>
            <from className="form">
            <input className='input'
                 type='text'
                  placeholder='Title'
                  value={title}
                   onChange={(e)=>setTitle(e.target.value)}
                   required
                   />
                   <input className='input'
                 type='text'
                  placeholder='Description'
                  value={description}
                   onChange={(e)=>setDescription(e.target.value)}
                   required
                   />
                
                
                <button disabled={loading} className="btn" onClick={submitHandler} type="submit">Add Task</button>
                
            </from>
        </section>
    </div>

    <section className='todoscontainer'>
      {
          tasks.map((i) => (
            <TodoItem 
            title={i.title}
            description={i.description}
            isCompleted={i.isCompleted}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            id={i._id}
            key={i._id}
             />
          ))

      }

      
    </section>
    </div>
  )
}

export default Home