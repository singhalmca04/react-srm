import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Secdapipost from './Secdapipost';
import Apicall from './Apicall';
import Secdapi from './Secdapi';
import Life from './Hook';
import Mail from './Mail';
import Iedata from './Iedata';
import Studentdata from './Studentdata';
import Ieupdate from './Ieupdate';
import Iedelete from './Iedelete';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          {/* <Nav.Link href="/create">Create Data</Nav.Link> */}
          <Nav.Link href="/Studentdata">Upload Student Data</Nav.Link>
          <Nav.Link href="/iedata">Upload IE Data</Nav.Link>
          {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown> */}
          {/* <Nav.Link href="/update">Update Data</Nav.Link>
          <Nav.Link href="/delete">Delete Data</Nav.Link> */}
        </Nav>
      </Container>
    </Navbar>
    <Router>
      <Routes>
        <Route path="/" element={<Apicall />} />
        <Route path="/create" element={<Secdapipost />} />
        <Route path="/update" element={<Secdapi />} />
        <Route path="/delete" element={<Life />} />
        <Route path="/mail" element={<Mail />} />
        <Route path="/iedata" element={<Iedata />} />
        <Route path="/studentdata" element={<Studentdata />} />
        <Route path="/updateie" element={<Ieupdate />} />
        <Route path="/deleteie" element={<Iedelete />} />
      </Routes>
    </Router>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
