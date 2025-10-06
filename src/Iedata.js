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
    const [imageUpload, setImageUpload] = useState(false);
    const [excelFile, setExcelFile] = useState(null);
    const [excelUploading, setExcelUploading] = useState(false);
    const [uploadMessage, setUploadMessage] = useState("");

    useEffect(() => {
        getData();
    }, []);
    
    async function getData() {
            // setImageUpload(true);
            try {
                const res = await fetch(apiUrl + "/findstudents");
                const data = await res.json();
                setResponse(data.data);

            } catch (error) {
                console.error("Error:", error);
            } finally {
                // setImageUpload(false);
            }
        }
    const [file, setFile] = useState(null);

    const handleExcelChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadMessage("");
            setExcelFile(file);
        }
    };

    // if (loading) return <p>Loading...</p>

    const uploadExcelIe = async (e) => {
        if (!excelFile) return;

        const formData = new FormData();
        formData.append('file', excelFile);

        try {
            setExcelUploading(true);
            setUploadMessage("");
            setImageUpload(true);
            const res = await axios.post(apiUrl + '/uploadexcelie', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setExcelData(res.data.data || []);
            setImageUpload(false);
            setUploadMessage("Excel uploaded successfully!");
            setExcelFile(null);
            getData();
        } catch (err) {
            console.error('Upload error:', err);
            setUploadMessage("Upload failed. Try again.");
        } finally {
            setExcelUploading(false);
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
                        <b>Upload IE Data</b> &nbsp;&nbsp;&nbsp;
                        <input type="file" accept=".xlsx, .xls" onChange={handleExcelChange} /> &nbsp;&nbsp;&nbsp;
                        <button onClick={uploadExcelIe} disabled={!excelFile || excelUploading}>
                            {excelUploading ? "Uploading..." : "Upload"}
                        </button>
                        {excelUploading && (
                            <>
                                <img src="/loading.webp" alt="Uploading..." width={50} />
                            </>
                        )}
                        &nbsp;&nbsp;&nbsp;
                        {uploadMessage && <p style={{ marginTop: 10 }}>{uploadMessage}</p>}&nbsp;&nbsp;&nbsp;
                        <a href="/ie-details.xlsx" target="_blank">Download IE Data Template File</a>
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
                        <th>Specialization</th>
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
                            <td>{user.specialization}</td>
                            <td>{user.semester}</td>
                            <td>{user.subcode}</td>
                            <td>{user.subject}</td>
                            <td>{user.examdate}</td>
                            <td>{user.session}</td>
                            <td>{user.batch}</td>
                            <td> <Button variant="danger" onClick={() => navigate('/updateie', { state: { id: user._id, 
                                ie: user.ie, month: user.month, year: user.year, program: user.program, specialization: user.specialization, 
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
