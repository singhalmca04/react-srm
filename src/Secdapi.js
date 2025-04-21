import React, {useState, useEffect} from 'react'

const Secdapi = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading]= useState(true);
    useEffect(()=>{
        fetch("https://seca.vercel.app/find/student")
        .then(res => res.json())
        .then(data => {
            setUsers(data.data)
            setLoading(false)
            console.log(data.data)
        })
        .catch(err => {
            console.log("Error " + err);
            setLoading(false);
        })
    },[])
    if (loading) return <p>Loading...</p>;

  return (
    <div>
      <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Marks</th>
                <th>Age</th>
                <th>Subject</th>
            </tr>
        </thead>
        <tbody>
            {
                users.map((user)=>
                    <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.marks}</td>
                        <td>{user.age}</td>
                        <td>{user.subject}</td>
                    </tr>
                )
            }
        </tbody>
      </table>
    </div>
  )
}

export default Secdapi
