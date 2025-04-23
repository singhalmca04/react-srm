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

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h2>User Table List</h2>
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
                            <td> <Button variant="danger" onClick={()=> navigate('/update', { state: {id: user._id, name: user.name, marks: user.marks, regno: user.regno} })}>Edit</Button>   
                            &nbsp;&nbsp;&nbsp;<Button onClick={()=> navigate('/delete', { state: {id: user._id} })} variant="outline-success">Delete</Button> </td>
                        </tr>
                    )) : <tr><td>No data found</td></tr>}
                </tbody>
            </Table>
        </div>
    );
};

export default Apicall;
