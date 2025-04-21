import React, {useState} from 'react'

const Secdapipost = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading]= useState(true);
    const [formData, setFormData] = useState({
                                        name: "",
                                        age: "",
                                        marks: "",
                                        subject: ""
                                    });
    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const saveData = () => {
        setLoading(true);
        console.log(JSON.stringify(formData), formData);
        fetch("https://seca.vercel.app/save/data", {
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
                <th>Age</th>
                <th><input type="text" name="age" value={formData.age} onChange={handleChange}/></th>
            </tr>
            <tr>
                <th>Subject</th>
                <th><input type="text" name="subject" value={formData.subject} onChange={handleChange}/></th>
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
