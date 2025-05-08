import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL;
const Secdapi = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id, name, marks, regno } = location.state || {};
    const [users, setUsers] = useState({ name, marks, regno });
    const [loading, setLoading] = useState(false);
    function handleChange(e) {
        setUsers({ ...users, [e.target.name]: e.target.value });
    }
    const saveData = () => {
        setLoading(true);
        fetch(apiUrl + "/update/"+id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(users),
        })
        .then((res)=> res.json())
        .then(data => {
            setLoading(false)
            console.log(data);
            navigate('/');
        })
        .catch(err => {
            console.log("Error " + err);
            setLoading(false);
        })
    }
    if (loading) return <p>Loading...</p>;

    return (
        <div>
      <table>
        <tbody>
            <tr>
                <th>Name</th>
                <th><input type="text" name="name" value={users.name} onChange={handleChange}/></th>
            </tr>
            <tr>
                <th>Reg NO</th>
                <th><input type="text" name="regno" value={users.regno} onChange={handleChange}/></th>
            </tr>
            <tr>
                <th>Marks</th>
                <th><input type="text" name="marks" value={users.marks} onChange={handleChange}/></th>
            </tr>
            <tr>
                <td><button onClick={saveData}>Save Data</button></td>
            </tr>
        </tbody>
      </table>
    </div>
    )
}

export default Secdapi
