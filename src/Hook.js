import React, {useEffect, useState} from 'react'

const Hook = () => {
    const [name, setName] = useState("Ajay");
    const [age, setAge] = useState(22);
    useEffect(()=>{
        console.log("Use Effect called");
    }, [name, age])

  return (
    <div>
        <h3>{name}</h3>
        <h3>{age}</h3>
        <button onClick={()=>{setName("Vijay")}}>Change Name</button>
        <button onClick={()=>{setAge(age+1)}}>Change Age</button>
    </div>
  )
}

export default Hook;
