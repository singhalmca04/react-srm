import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL;

const Hook = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};

  useEffect(() => {
    fetch(apiUrl + "/delete/"+id, {
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
