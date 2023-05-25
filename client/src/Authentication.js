import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import config from './config';
import { setAuthToken } from './apiUtils';

function Authentication() {
  const [username, setUsername] = useState('johndoe123');
  const [password, setPassword] = useState('password');

  const handleLogin = (event) => {
    event.preventDefault();

    axios.post(config.loginUrl, {
      username: username,
      password: password
    })
      .then((response) => {
        if (response.status === 200) {
          const token = response.data.token;
          localStorage.setItem('token', token);
          setAuthToken(token);
          window.location.replace('/home');
        }
      })
      .catch(error => {
        alert("Incorrect username or password");
      });
  }

  const handleRegistration = (event) => {
    event.preventDefault();

    axios.post(config.registerUrl, {
      username: username,
      password: password
    })
      .then((response) => {
        if (response.status === 200) {
          alert("User successfully registered.");
        }
      })
      .catch((error) => {
        alert("Error");
      });
  };

  return (
    <div style={{ backgroundColor: '#f0f8ff', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container style={{ width: '400px', padding: '20px', borderRadius: '10px', background: 'white' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>Culinary Creations</h1>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="username">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ fontSize: '18px', height: '50px' }}
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ fontSize: '18px', height: '50px' }}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" size="lg" type="submit" className="mr-2">
              Login
            </Button>
            <Button variant="secondary" size="lg" onClick={handleRegistration} className="mr-2">
              Register
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );









}



export default Authentication;
