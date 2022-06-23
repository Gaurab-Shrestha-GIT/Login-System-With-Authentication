import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userLoggedIn, setUserLoggedIn] = useState();
  const [userDetails, setUserDetails] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    await axios
      .post("http://localhost:5000/profile", {
        userEmail: localStorage.getItem("userEmail"),
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      })
      .then((res) => {
        if (res.data.auth === true) {
          setUserDetails(res.data.result[0]);
        } else {
          navigate("/login");
        }
      });
  };

  useEffect(() => {
    if (localStorage.getItem("userLoggedIn")) {
      setUserLoggedIn(true);
    }

    fetchData();
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <div>
        <h1>Profile Page</h1>
        <div>{userDetails.user_email}</div>

        <button onClick={logout}>Logout</button>
      </div>
    </>
  );
};

export default Profile;
