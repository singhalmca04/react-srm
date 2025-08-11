import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './Ieupdate.css';

const apiUrl = process.env.REACT_APP_API_URL;
const Ieupdate = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id, ie, month, year, program, specialization, 
        semester, subcode, subject, examdate, session, batch } = location.state || {};
    const [iedata, setIedata] = useState({ id, ie, month, year, program, specialization, 
        semester, subcode, subject, examdate, session, batch });
    const [loading, setLoading] = useState(false);
    function handleChange(e) {
        setIedata({ ...iedata, [e.target.name]: e.target.value });
    }
    const saveData = () => {
        setLoading(true);
        fetch(apiUrl + "/updateie/"+id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(iedata),
        })
        .then((res)=> res.json())
        .then(data => {
            setLoading(false)
            console.log(data);
            navigate('/iedata');
        })
        .catch(err => {
            console.log("Error " + err);
            setLoading(false);
        })
    }
    if (loading) return <p>Loading...</p>;

    return (
        <div>
      <table className='mleft' cellPadding={4}>
        <tbody>
            <tr>
                <th>IE</th>
                <th><input type="text" className="big-input" name="ie" value={iedata.ie} onChange={handleChange}/></th>
            </tr>
            <tr>
                <th>Month</th>
                <th><input type="text" className="big-input" name="month" value={iedata.month} onChange={handleChange}/></th>
            </tr>
            <tr>
                <th>Year</th>
                <th><input type="text" className="big-input" name="year" value={iedata.year} onChange={handleChange}/></th>
            </tr>
            <tr>
                <th>Program</th>
                <th><input type="text" className="big-input" name="program" value={iedata.program} onChange={handleChange}/></th>
            </tr>
            <tr>
                <th>Specialization</th>
                <th><input type="text" className="big-input" name="specialization" value={iedata.specialization} onChange={handleChange}/></th>
            </tr>
            <tr>
                <th>Semester</th>
                <th><input type="text" className="big-input" name="semester" value={iedata.semester} onChange={handleChange}/></th>
            </tr>
            <tr>
                <th>Subcode</th>
                <th><input type="text" className="big-input" name="subcode" value={iedata.subcode} onChange={handleChange}/></th>
            </tr>
            <tr>
                <th>Subject</th>
                <th><input type="text" className="big-input" name="subject" value={iedata.subject} onChange={handleChange}/></th>
            </tr>
            <tr>
                <th>Exam date</th>
                <th><input type="text" className="big-input" name="examdate" value={iedata.examdate} onChange={handleChange}/></th>
            </tr>
            <tr>
                <th>Session</th>
                <th><input type="text" className="big-input" name="year" value={iedata.session} onChange={handleChange}/></th>
            </tr>
            <tr>
                <th>Batch</th>
                <th><input type="text" className="big-input" name="batch" value={iedata.batch} onChange={handleChange}/></th>
            </tr>
            <tr>
                <td><button onClick={saveData}>Save Data</button></td>
            </tr>
        </tbody>
      </table>
    </div>
    )
}

export default Ieupdate
