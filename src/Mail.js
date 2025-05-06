import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Mail = () => {
    const navigate = useNavigate();
    const [to, setTo] = useState();
    const [subject, setSubject] = useState();
    const [body, setBody] = useState();

    const sendMail = () => {
        const apiUrl = process.env.REACT_APP_API_URL;
        fetch(apiUrl + "/send/mail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({to, subject, body}),
        })
        .then((res)=> res.json())
        .then(data => {
            console.log(data);
            alert("Mail send")
            setTimeout(navigate('/'), 2000);
        })
        .catch(err => {
            console.log("Error " + err);
        })
    }
  return (
    <div>
      <table>
        <tr>
            <td>To</td>
            <td><input type="text" value={to} onChange={(e)=> setTo(e.target.value)} /></td>
        </tr>
        <tr>
            <td>Subject</td>
            <td><input type="text" value={subject} onChange={(e)=> setSubject(e.target.value)} /></td>
        </tr>
        <tr>
            <td>Body</td>
            <td><textarea rows="10" cols="100" value={body} onChange={(e)=> setBody(e.target.value)}></textarea></td>
        </tr>
        <tr>
            <td><button onClick={sendMail}>Send Mail</button></td>
        </tr>
      </table>
    </div>
  )
}

export default Mail
