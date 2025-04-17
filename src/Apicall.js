import React, { useState } from "react";

const Apicall = () => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        regno: "",
        marks: 0,
    });

    const handleSubmit = async () => {
        setLoading(true);
        const postData = {
            regno: formData.regno,
            name: formData.name,
            marks: formData.marks,
        };
        try {
            const res = await fetch("https://seca.vercel.app/save", {
                method: "POST",
                body: JSON.stringify(postData),
            });
            const data = await res.json();
            setResponse(data.data);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            
            <h1>POST API Call in React</h1>
            Name: <input type="text" name="name" value={formData.name}
                onChange={handleChange}></input><br />
            Reg No.: <input type="text" name="regno" value={formData.regno}
                onChange={handleChange}></input><br />
            Marks: <input type="text" name="marks" value={formData.marks}
                onChange={handleChange}></input><br />
            <button onClick={handleSubmit} disabled={loading}>
                {loading ? "Submitting..." : "Submit Data"}
            </button>
            <h2>User Table List</h2>
            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Marks</th>
                        <th>Reg No</th>
                    </tr>
                </thead>
                <tbody>
                    {response ? response.map((user, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.marks}</td>
                            <td>{user.regno}</td>
                        </tr>
                    )) : <h1>No data found</h1>}
                </tbody>
            </table>
            <hr style={{marginTop: "40px"}}/>
        </div>
    );
};

export default Apicall;
