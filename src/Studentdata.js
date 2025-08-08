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
        // getData();
    }, []);


    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
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

    const uploadExcel = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            setImageUpload(true);
            const res = await axios.post(apiUrl + '/uploadexcel', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setExcelData(res.data.data);
            setImageUpload(false);
            navigate(0);
        } catch (err) {
            console.error('Upload error:', err);
        }
    };

    const handleChange = (e) => {
        setFiles([...e.target.files]);
    };
    const handleBulkUpload = async () => {
        for (const file of files) {
            setImageUpload(true);
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
            const data = await res.json(); // Parse the response
            console.log(data.secure_url, 'Cloudinary response');

            // 2. Save to backend
            await axios.post(apiUrl + '/upload/image/path', {
                fileName,
                imageUrl: data.secure_url,
            });
        }
        setImageUpload(false);
        // const formData = new FormData();
        // files.forEach(file => formData.append('images', file));
        // await axios.post(apiUrl + `/upload/bulk/images`, formData);
        navigate(0);
    };


    return (
        <div>
            <div className="container-fluid">
                <div className="row" style={{marginTop: 20}}>
                    <div className="col-md-12">
                        <b>Upload Student Data</b> &nbsp;&nbsp;&nbsp;
                        <input type="file" accept=".xlsx, .xls" onChange={uploadExcel} />&nbsp;&nbsp;&nbsp;
                        {imageUpload && (
                            <>
                                <img src="/loading.webp" alt="Uploading..." width={50} />
                            </>
                        )}
                        <a href="/students-data.xlsx" target="_blank">Download Student Data Template File</a>
                    </div>
                </div>
                <div className="row" style={{ marginTop: '50px' }}>
                    <div className="col-md-12">
                        <b>Upload Bulk Images</b>&nbsp;&nbsp;&nbsp;
                        <input type="file" multiple accept="image/*" onChange={handleChange} />
                        {imageUpload && (
                            <>
                                <img src="/loading.webp" alt="Uploading..." width={50} />
                            </>
                        )}
                        <button onClick={handleBulkUpload}>Upload</button>

                    </div>
                </div>
            </div>

            <Table striped bordered hover>
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
            </Table>
        </div>
    );
};

export default Studentdata;
