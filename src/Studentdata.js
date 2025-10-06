import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const Studentdata = () => {
    const navigate = useNavigate();
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [excelData, setExcelData] = useState([]);
    const [imageUpload, setImageUpload] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [files, setFiles] = useState([]);
    const [uploadedCount, setUploadedCount] = useState(0);
    const [excelFile, setExcelFile] = useState(null);
    const [excelUploading, setExcelUploading] = useState(false);
    const [uploadMessage, setUploadMessage] = useState("");

    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleExcelChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadMessage("");
            setExcelFile(file);
        }
    };

    async function uploadPics(id) {
        const formData = new FormData();
        formData.append('image', file);

        const res = await fetch(apiUrl + '/uploadpics/' + id, {
            method: 'POST',
            body: formData,
        });

        await res.json();
        navigate(0);
    }
    if (loading) return <p>Loading... It takes approx 30 sec to complete</p>;

    const uploadExcel = async () => {
        if (!excelFile) return;

        const formData = new FormData();
        formData.append('file', excelFile);

        try {
            setExcelUploading(true);
            setUploadMessage("");
            setImageUpload(true);
            const res = await axios.post(apiUrl + '/uploadexcel', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setExcelData(res.data.data || []);
            setUploadMessage("Excel uploaded successfully!");
            setExcelFile(null);
            setImageUpload(false);
            // navigate(0);
        } catch (err) {
            console.error('Upload error:', err);
            setUploadMessage("Upload failed. Try again.");
        } finally {
            setExcelUploading(false);
        }
    };

    const handleChange = (e) => {
        setFiles([...e.target.files]);
    };
    const handleBulkUpload = async () => {
        if (files.length === 0) return;
        setUploadedCount(0);
        for (const file of files) {
            setIsUploading(true);
            const fileName = file.name.substring(0, file.name.lastIndexOf('.'));
            console.log(file.name.substring(0, file.name.lastIndexOf('.')))
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'hallticket'); // Replace with your preset
            formData.append('cloud_name', 'dnf95bknw');        // Optional

            const res = await fetch(
                'https://api.cloudinary.com/v1_1/dnf95bknw/image/upload',
                {
                    method: 'POST',
                    body: formData,
                }
            );
            const data = await res.json();

            // 2. Save to backend
            await axios.post(apiUrl + '/upload/image/path', {
                fileName,
                imageUrl: data.secure_url,
            });
            setUploadedCount((prev) => prev + 1);
        }
        setIsUploading(false);
        navigate(0);
    };


    return (
        <div>
            <div className="container-fluid">
                <div className="row" style={{ marginTop: 20 }}>
                    <div className="col-md-12">
                        <b>Upload Student Data</b> &nbsp;&nbsp;&nbsp;
                        <input type="file" accept=".xlsx, .xls" onChange={handleExcelChange} />
                        <button onClick={uploadExcel} disabled={!excelFile || excelUploading}>
                            {excelUploading ? "Uploading..." : "Upload"}
                        </button>
                        {excelUploading && (
                            <>
                                <img src="/loading.webp" alt="Uploading..." width={50} />&nbsp;&nbsp;&nbsp;
                            </>
                        )}&nbsp;&nbsp;&nbsp;
                        {uploadMessage && <p style={{ marginTop: 10 }}>{uploadMessage}</p>}&nbsp;&nbsp;&nbsp;
                        <a href="/students-data.xlsx" target="_blank">Download Student Data Template File</a>
                    </div>
                </div>
                <div className="row" style={{ marginTop: '50px' }}>
                    <div className="col-md-12">
                        <b>Upload Bulk Images</b>&nbsp;&nbsp;&nbsp;
                        <input type="file" multiple accept="image/*" onChange={handleChange} disabled={isUploading} />
                        {isUploading && (
                            <>
                                {/* <img src="/loading.webp" alt="Uploading..." width={50} /> */}
                                Uploading {uploadedCount} / {files.length} images...
                            </>
                        )}
                        <button onClick={handleBulkUpload} disabled={files.length === 0 || isUploading} >
                             {isUploading ? "Uploading..." : "Upload"}
                        </button>

                    </div>
                </div>
            </div>

            {/* <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Reg No</th>
                        <th>Name</th>
                        <th>Semester</th>
                        <th>Section</th>
                        {
                            response && response[0] && response[0].subcode
                                ? response[0].subcode.map((code, index) => (
                                    <th key={index}>Subject Code {index + 1}</th>
                                ))
                                : <th>Subject Code1</th>
                        }
                        <th>Batch</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {response ? response.map((user, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.regno}</td>
                            <td>{user.name}</td>
                            <td>{user.semester}</td>
                            <td>{user.section}</td>
                            {user.subcode.map((code) => (
                                <td>{code}</td>
                            ))}
                            <td>{user.batch}</td>
                            <td><img src={user?.image ? `${user.image}` : '/logo192.png'} width="50px" alt="No Image" /></td>
                            <td> <Button variant="danger" onClick={() => navigate('/update', { state: { id: user._id, name: user.name, semester: user.semester, regno: user.regno, section: user.section, batch: user.batch, subcode: user.subcode } })}>Edit</Button>
                                &nbsp;&nbsp;&nbsp; <Button onClick={() => navigate('/delete', { state: { id: user._id } })} variant="outline-success">Delete</Button>
                                &nbsp;&nbsp;&nbsp; <input type="file" accept="image/*" onChange={handleFileChange} />
                                <button disabled={!file} onClick={() => uploadPics(user._id)}>Upload</button> </td>
                        </tr>
                    )) : <tr key="1"><td>No data found</td></tr>}
                </tbody>
            </Table> */}
            {excelData.length > 0 && (
                <div style={{ marginTop: 30 }}>
                    <h4>Uploaded Excel Data</h4>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                {Object.keys(excelData[0]).map((key, i) => (
                                    <th key={i}>{key}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {excelData.map((row, idx) => (
                                <tr key={idx}>
                                    {Object.values(row).map((val, i) => (
                                        <td key={i}>{val}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}

        </div>
    );
};

export default Studentdata;
