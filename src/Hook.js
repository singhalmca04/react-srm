import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';


const Hook = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};

  useEffect(() => {
    fetch("https://seca.vercel.app/delete/"+id, {
      method: "DELETE"
    })
    .then((res)=> res.json())
    .then((data)=>{
      console.log(data);
      setTimeout(navigate('/'), 1000);
    })
  }, [])
  return (
    <div>
      <h1>Deleted.... </h1>
    </div>
  )
}

export default Hook;
