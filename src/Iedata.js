import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const Iedata = () => {
    const navigate = useNavigate();
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [excelData, setExcelData] = useState([]);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        async function getData() {
            setLoading(true);
            try {
                const res = await fetch(apiUrl + "/findstudents");
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
    

    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // if (loading) return <p>Loading...</p>

    const uploadExcelIe = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post(apiUrl + '/uploadexcelie', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setExcelData(res.data.data);
        } catch (err) {
            console.error('Upload error:', err);
        }
    };

    return (
        <div>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-4">
                        <h2>IE Detail List</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <b>Upload IE Data</b>
                        <input type="file" accept=".xlsx, .xls" onChange={uploadExcelIe} />
                    </div>
                </div>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>S. No.</th>
                        <th>IE</th>
                        <th>Month</th>
                        <th>Year</th>
                        <th>Program</th>
                        <th>Section</th>
                        <th>Semester</th>
                        <th>Subject Code</th>
                        <th>Subject Name</th>
                        <th>Exam Date</th>
                        <th>Session</th>
                        <th>Batch</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {response ? response.map((user, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.ie}</td>
                            <td>{user.month}</td>
                            <td>{user.year}</td>
                            <td>{user.program}</td>
                            <td>{user.section}</td>
                            <td>{user.semester}</td>
                            <td>{user.subcode}</td>
                            <td>{user.subject}</td>
                            <td>{user.examdate}</td>
                            <td>{user.session}</td>
                            <td>{user.batch}</td>
                            <td> <Button variant="danger" onClick={() => navigate('/updateie', { state: { id: user._id, 
                                ie: user.ie, month: user.month, year: user.year, program: user.program, section: user.section, 
                                semester: user.semester, subcode: user.subcode, subject: user.subject, examdate: user.examdate,
                                session: user.session, batch: user.batch } })}>Edit</Button>
                                &nbsp;&nbsp;&nbsp; <Button onClick={() => navigate('/deleteie', { state: { id: user._id } })} variant="outline-success">Delete</Button>
                            </td>
                        </tr>
                    )) : <tr><td>No data found</td></tr>}
                </tbody>
            </Table>
        </div>
    );
};

export default Iedata;
