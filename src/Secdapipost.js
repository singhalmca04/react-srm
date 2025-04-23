import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Secdapipost = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading]= useState(true);
    const [formData, setFormData] = useState({
                                        name: "",
                                        regno: "",
                                        marks: ""
                                    });
    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const saveData = () => {
        setLoading(true);
        console.log(JSON.stringify(formData), formData);
        fetch("https://seca.vercel.app/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData),
        })
        .then((res)=> res.json())
        .then(data => {
            setUsers(data.data)
            setLoading(false)
            console.log(data.msg)
            navigate('/')
        })
        .catch(err => {
            console.log("Error " + err);
            setLoading(false);
        })
    }
  return (
    <div>
      <table>
        <tbody>
        <tr>
                <th>Name</th>
                <th><input type="text" name="name" value={formData.name} onChange={handleChange}/></th>
            </tr>
            <tr>
                <th>Reg NO</th>
                <th><input type="text" name="regno" value={formData.regno} onChange={handleChange}/></th>
            </tr>
            <tr>
                <th>Marks</th>
                <th><input type="text" name="marks" value={formData.marks} onChange={handleChange}/></th>
            </tr>
            <tr>
                <td><button onClick={saveData}>Save Data</button></td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Secdapipost
