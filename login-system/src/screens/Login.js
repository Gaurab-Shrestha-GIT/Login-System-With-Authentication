import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Form, Button } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const login = async () => {
    await axios
      .post("http://localhost:5000/login", {
        userEmail: email,
        userPassword: password,
      })
      .then((res) => {
        localStorage.setItem("userLoggedIn", true);
        localStorage.setItem("userEmail", res.data.userEmail);
        localStorage.setItem("token", res.data.token);
        navigate("/profile");
      });
  };

  return (
    <div>
      <h1>This is Login Form</h1>

      <Form>
        <Form.Group>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Button onClick={login}>Login</Button>
      </Form>

      <a href="/register">Go to Register Form</a>
      <a href="/">Go to Home</a>
    </div>
  );
};

export default Login;
