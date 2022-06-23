import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000").then((res) => {
      setUser(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <>
      <h1>Welcome to Home Page</h1>
      <div>{user.length === 0 && <h1>NO USERS</h1>}</div>
      <div>
        {user.map((val) => (
          <div key={val.id}>
            <p>User Email : {val.user_email}</p>
          </div>
        ))}
      </div>
      <div>
        <a href="/register">Go To Register Form</a>
        <a href="/login">Go To Login Form</a>
      </div>
    </>
  );
};

export default Home;
