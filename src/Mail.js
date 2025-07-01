import React, { useState } from 'react';
import axios from 'axios';

export default function SendEmailForm() {
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('');
    const [text, setText] = useState('');
    const [files, setFiles] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiUrl = process.env.REACT_APP_API_URL;
        // 1. Upload files to Cloudinary
        const uploadedFiles = [];

        for (let file of files) {
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

            uploadedFiles.push({
                url: res.data.secure_url,
                filename: file.name
            });
        }

        // 2. Send email with links
        await axios.post(apiUrl + "/send/mail", {
            to,
            subject,
            text,
            attachments: uploadedFiles
        });

        alert('Email sent!');
    };

    return (
        <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
            <input type="email" size="100" placeholder="Recipient Email" value={to} onChange={e => setTo(e.target.value)} required />
            <br /><br />
            <input type="text" size="100" placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} required />
            <br /><br />
            <textarea rows="10" cols="103" placeholder="Message" value={text} onChange={e => setText(e.target.value)} required />
            <br /><br />
            <input type="file" multiple onChange={e => setFiles(e.target.files)} />
            <br /><br />
            <button type="submit">Send Email</button>
        </form>
    );
}