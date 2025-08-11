import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Secdapipost from './Secdapipost';
import Apicall from './Apicall';
import Secdapi from './Secdapi';
import Hook from './Hook';
import Mail from './Mail';
import Iedata from './Iedata';
import Studentdata from './Studentdata';
import Ieupdate from './Ieupdate';
import Iedelete from './Iedelete';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';

function handleLogout() {
  localStorage.clear();
  window.location.href = '/'; // redirect to login page
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/Studentdata">Upload Student Data</Nav.Link>
          <Nav.Link href="/iedata">Upload IE Data</Nav.Link>
        </Nav>
        <Nav className="ms-auto">
          <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    <Router>
      <Routes>
        <Route path="/" element={<Apicall />} />
        <Route path="/create" element={<Secdapipost />} />
        <Route path="/update" element={<Secdapi />} />
        <Route path="/delete" element={<Hook />} />
        <Route path="/mail" element={<Mail />} />
        <Route path="/iedata" element={<Iedata />} />
        <Route path="/studentdata" element={<Studentdata />} />
        <Route path="/updateie" element={<Ieupdate />} />
        <Route path="/deleteie" element={<Iedelete />} />
      </Routes>
    </Router>
  </>
);

reportWebVitals();
