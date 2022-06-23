import axios from "axios";
import React, { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const submit = () => {
    axios
      .post("http://localhost:5000/register", {
        userEmail: email,
        userPassword: password,
      })
      .then((response) => {
        console.log("Registered");
      });
  };

  return (
    <div>
      <h1>REGISTER FORM</h1>
      <form onSubmit={submit}>
        <input
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          type="text"
          placeholder="Enter email here..."
        ></input>
        <input
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          type="password"
          placeholder="Enter password here..."
        ></input>
        <button>Submit</button>
        <a href="/">Go To Home</a>
        <a href="/login">Go To Login Form</a>
      </form>
    </div>
  );
};

export default Register;
