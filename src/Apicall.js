import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

const Apicall = () => {
    const navigate = useNavigate();
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        async function getData() {
            setLoading(true);
            try {
                const res = await fetch("https://seca.vercel.app/finduser");
                const data = await res.json();
                setResponse(data.data);

            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        }
        getData();
    }, []);
    async function downloadData() {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:4000/downloaduser");
            const blob = await res.blob();

            // Create a link and simulate click to download
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'generated.pdf';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    }
    async function downloadDatax() {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:4000/downloaduserx");
            const blob = await res.blob();

            // Create a link and simulate click to download
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'students.xlsx';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    }

    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    async function uploadPics(id) {
        const formData = new FormData();
        formData.append('image', file);

        const res = await fetch('http://localhost:4000/uploadpics/'+id, {
            method: 'POST',
            body: formData,
        });

        await res.json();
        navigate(0);
    }
    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-6">
                        <h2>User Table List</h2>
                    </div>
                    <div className="col-md-2">
                        <button onClick={downloadData}>Download in PDF</button>
                    </div>
                    <div className="col-md-2">
                        <button onClick={downloadDatax}>Download in Excel</button>
                    </div>
                    <div className="col-md-2">
                        <button onClick={uploadPics}>Upload Pics</button>
                    </div>
                </div>
            </div>
            {/* <h2>Upload Image</h2>
           

            {uploadedPath && (
                <div>
                    <h4>Uploaded Image:</h4>
                    <img src={`http://localhost:4000${uploadedPath}`} alt="Uploaded" width="300" />
                </div>
            )} */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Marks</th>
                        <th>Reg No</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {response ? response.map((user, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.marks}</td>
                            <td>{user.regno}</td>
                            <td><img src={user?.image ? `http://localhost:4000${user.image}` : '/logo192.png'} width="50px" alt="No Image"/></td>
                            <td> <Button variant="danger" onClick={() => navigate('/update', { state: { id: user._id, name: user.name, marks: user.marks, regno: user.regno } })}>Edit</Button>
                                &nbsp;&nbsp;&nbsp; <Button onClick={() => navigate('/delete', { state: { id: user._id } })} variant="outline-success">Delete</Button>
                                &nbsp;&nbsp;&nbsp; <input type="file" onChange={handleFileChange} />
                                <button onClick={()=>uploadPics(user._id)}>Upload</button> </td>
                        </tr>
                    )) : <tr><td>No data found</td></tr>}
                </tbody>
            </Table>
        </div>
    );
};

export default Apicall;
