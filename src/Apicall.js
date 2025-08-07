import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const Apicall = () => {
    const navigate = useNavigate();
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({ branch: localStorage.getItem('branch') || '', specialization: localStorage.getItem('specialization') || '', semester: localStorage.getItem('semester') || '', section: localStorage.getItem('section') || '' });
    const [isData, setIsData] = useState(false);
    const [specializations, setSpecializations] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [sections, setSections] = useState([]);
    console.log(data, 'dddddd');
    const getData = async (e) => {
        const { name, value } = e.target;
        const updated = { ...data, [name]: value };
        setData(updated);
        localStorage.setItem(name, value);
        console.log(updated);
        setLoading(true);
        try {
            console.log(updated.branch, 'bbbb');
            const xhr = new XMLHttpRequest();
            const url = apiUrl + '/finduser';

            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    setLoading(false);
                    if (xhr.status === 200) {
                        const response = JSON.parse(xhr.responseText);
                        setSpecializations(response.data.specialization);
                        setSemesters(response.data.semester);
                        setSections(response.data.section);
                        setResponse(response.data.user)
                        if (response.data.user.length)
                            setIsData(true);
                    } else {
                        console.error('API call failed');
                    }
                }
            };
            xhr.send(JSON.stringify(updated));
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };
    async function downloadData(group) {
        setLoading(true);
        try {
            const res = await fetch(apiUrl + "/downloaduser/" + data.branch + "/" + data.specialization + "/" + data.semester + "/" + data.section + "/" + group, {
                method: 'GET',
                headers: {
                    'Accept': 'application/pdf',
                },
            });
            if (res.status === 204 || res.status === 404) {
                alert("IE Details Not Found");
                return;
            }
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
            console.error("Error:" + error);
        } finally {
            setLoading(false);
        }
    }
    async function downloadDatax() {
        setLoading(true);
        try {
            const res = await fetch(apiUrl + "/downloaduserx");
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
        await axios.post(apiUrl + '/uploadpics/' + id, {
            fileName,
            imageUrl: data.secure_url,
        });
    }
    if (loading) return <p>Loading... It takes approx 30 - 60 sec to complete</p>;

    const handleSelect = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        getData();
    }

    return (
        <div>
            <div className="container mt-4">
                <div className="row mb-4">
                    <div className="col-md-12">
                        <h2>Hall Ticket Management</h2>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-md-2">
                        Branch &nbsp;&nbsp;
                        <Form.Select name="branch" value={data.branch} onChange={getData}>
                            <option value="">Select</option>
                            <option value="CSE">CSE</option>
                        </Form.Select>
                    </div>
                    <div className="col-md-3">
                        Specialization &nbsp;&nbsp;
                        <Form.Select name="specialization" value={data.specialization} onChange={getData}>
                            <option value="">Select</option>
                            {specializations.map((spec, index) => (
                                <option key={index} value={spec}>
                                    {spec}
                                </option>
                            ))}
                        </Form.Select>
                    </div>
                    <div className="col-md-2">
                        Semester &nbsp;&nbsp;
                        <Form.Select name="semester" value={data.semester} onChange={getData}>
                            <option value="">Select</option>
                            {semesters.map((spec, index) => (
                                <option key={index} value={spec}>
                                    {spec}
                                </option>
                            ))}
                        </Form.Select>
                    </div>
                    <div className="col-md-5">
                        <label>Section &nbsp;&nbsp;
                            <Form.Select name="section" value={data.section} onChange={getData}>
                                <option value="">Select</option>
                                {sections.map((spec, index) => (
                                    <option key={index} value={spec}>
                                        {spec}
                                    </option>
                                ))}
                            </Form.Select>
                        </label>
                    </div>
                    {/* <div className="col-md-3">
                        <Button onClick={getData}>Get Data </Button>
                    </div> */}
                </div>
            </div>
            {/* {isData && (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <b>Upload Student Data</b>
                            <input type="file" accept=".xlsx, .xls" onChange={uploadExcel} />
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: '50px' }}>
                        <div className="col-md-12">
                            <b>Upload Bulk Images</b>
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
            )} */}
            {isData && (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                        </div>
                        <div className="col-md-2">
                            <button onClick={() => downloadData(1)}>Download PDF (G1) </button>
                        </div>
                        <div className="col-md-2">
                            <button onClick={() => downloadData(2)}>Download PDF (G2) </button>
                        </div>
                        {/* <div className="col-md-2">
                            <button onClick={downloadDatax}>Download in Excel</button>
                        </div> */}
                        {/* <div className="col-md-2">
                            <button onClick={() => navigate('/mail')}>Approve</button>
                        </div> */}
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
                                    response && response[0]
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
                                    <td><img src={user?.image ? `${user.image}` : '/test1.jpg'} width="50px" alt="No Image" /></td>
                                    <td> <Button variant="danger" onClick={() => navigate('/update', { state: { id: user._id, name: user.name, semester: user.semester, regno: user.regno, section: user.section, batch: user.batch, subcode: user.subcode } })}>Edit</Button>
                                        &nbsp;&nbsp;&nbsp; <Button onClick={() => navigate('/delete', { state: { id: user._id } })} variant="outline-success">Delete</Button>
                                        &nbsp;&nbsp;&nbsp; <input type="file" accept="image/*" onChange={handleFileChange} />
                                        <button disabled={!file} onClick={() => uploadPics(user._id)}>Upload</button> </td>
                                </tr>
                            )) : <tr key="1"><td>No data found</td></tr>}
                        </tbody>
                    </Table>
                </div>
            )}
        </div >
    );
};

export default Apicall;
