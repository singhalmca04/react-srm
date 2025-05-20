// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Mail = () => {
//     const navigate = useNavigate();
//     const [to, setTo] = useState();
//     const [subject, setSubject] = useState();
//     const [text, setText] = useState('');
//     const [files, setFiles] = useState([]);

//     const sendMail = async () => {
//         const apiUrl = process.env.REACT_APP_API_URL;
//         const formData = new FormData();
//         formData.append('to', to);
//         formData.append('subject', subject);
//         formData.append('text', text);

//         for (let i = 0; i < files.length; i++) {
//             formData.append('attachments', files[i]);
//         }

//         try {
//             const res = await axios.post(apiUrl + "/send/mail", formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' }
//             });
//             alert('Email sent!');
//             setTimeout(navigate('/'), 2000);
//         } catch (err) {
//             console.error(err);
//             alert('Error sending email.');
//         }
//     }
// return (
//     <div>
//         <table>
//             <tr>
//                 <td>To</td>
//                 <td><input type="text" value={to} onChange={(e) => setTo(e.target.value)} /></td>
//             </tr>
//             <tr>
//                 <td>Subject</td>
//                 <td><input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} /></td>
//             </tr>
//             <tr>
//                 <td>Body</td>
//                 <td><textarea rows="10" cols="100" value={text} onChange={(e) => setText(e.target.value)}></textarea></td>
//             </tr>
//             <tr>
//                 <td><button onClick={sendMail}>Send Mail</button></td>
//             </tr>
//         </table>
//     </div>
// )
// }


import React, { useState } from 'react';
import axios from 'axios';

export default function Mail() {
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('');
    const [text, setText] = useState('');
    const [files, setFiles] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiUrl = process.env.REACT_APP_API_URL;
        const formData = new FormData();
        formData.append('to', to);
        formData.append('subject', subject);
        formData.append('text', text);

        for (let i = 0; i < files.length; i++) {
            formData.append('attachments', files[i]);
        }

        try {
            await axios.post(apiUrl + "/send/mail", formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert('Email sent!');
        } catch (err) {
            console.error(err);
            alert('Error sending email.');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
            <input type="email" size="100" placeholder="Recipient Email - To" value={to} onChange={(e) => setTo(e.target.value)} required />
            <br /><br />
            <input type="text" size="100" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
            <br /><br />
            <textarea rows="10" cols="103" placeholder="Message" value={text} onChange={(e) => setText(e.target.value)} required />
            <br /><br />
            <input type="file" multiple onChange={(e) => setFiles(e.target.files)} />
            <br /><br />
            <button type="submit">Send Email</button>
        </form>
    );
}