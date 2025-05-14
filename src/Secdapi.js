import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL;
const Secdapi = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id, name, semester, section, batch, subcode, regno } = location.state || {};
    const [users, setUsers] = useState({ name, semester, section, batch, subcode, regno });
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
                <th>Semester</th>
                <th><input type="text" name="semester" value={users.semester} onChange={handleChange}/></th>
            </tr>
            <tr>
                <th>Section</th>
                <th><input type="text" name="section" value={users.section} onChange={handleChange}/></th>
            </tr>
            <tr>
                <th>Batch</th>
                <th><input type="text" name="batch" value={users.batch} onChange={handleChange}/></th>
            </tr>
            <tr>
                <th>Subject Code</th>
                <th><textarea cols="80" name="subcode" value={users.subcode} onChange={handleChange}></textarea> </th>
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
