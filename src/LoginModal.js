import { Modal, Button, Form } from "react-bootstrap";
import axios from 'axios';
import { useState } from 'react';

function LoginModal({ onClose }) {
    const [otp, setOtp] = useState("");
    const [change, setChange] = useState(false);
    const handleLogin = async () => {
        const apiUrl = process.env.REACT_APP_API_URL;
        setChange(false);
        const newOtp = Math.floor(100000 + Math.random() * 900000);
        setOtp(newOtp.toString());
        let res = await axios.post(apiUrl +"/api/test-mail", {
            to: document.getElementById('inputText').value,
            subject: "SRM Hall Ticket Portal: Your Verification Code",
            text: "OTP is " + newOtp
        });
        if (res.status == 200) {
            setChange(true);
            document.getElementById('inputText').value = "";
        }
    };

    const handleLoginAfterOtp = () => {
        let enteredOtp = document.getElementById('inputOtp').value;
        if (enteredOtp === otp) {
            localStorage.setItem("isLoggedIn", "true");
            onClose();
        } else {
            alert("OTP not match! Try Again");
        }
    };

    return (
        <Modal show>
            <Modal.Header>
                <Modal.Title>Login Required</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h2>Welcome to SRM</h2>
                {!change ?
                    <div>
                        <p>Please login to your account</p>
                        <Form.Label htmlFor="inputText">Enter Official Email</Form.Label>
                        <Form.Control type="text" id="inputText" />
                    </div> :
                    <div>
                        <p>Please login to your account</p>
                        <Form.Label htmlFor="inputText">Enter OTP</Form.Label>
                        <Form.Control type="text" id="inputOtp" />
                    </div>
                }
            </Modal.Body>
            <Modal.Footer>
                {!change ?
                    <Button variant="primary" onClick={handleLogin}>
                        Send OTP
                    </Button> :
                    <Button variant="primary" onClick={handleLoginAfterOtp}>
                        Login
                    </Button>
                }
            </Modal.Footer>
        </Modal>
    );
}

export default LoginModal;
