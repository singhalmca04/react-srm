import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Secdapipost from './Secdapipost';
import Apicall from './Apicall';
import Secdapi from './Secdapi';
import Life from './Hook';
import {Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/create">Create Data</Nav.Link>
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
      </Routes>
    </Router>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
