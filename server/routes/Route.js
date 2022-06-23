const express = require("express");
const router = express.Router();
const db = require("../database/db");
const jwt = require("jsonwebtoken");
const isAuth = require("../authMiddleware/isAuth");

router.get("/", (req, res) => {
  db.query("SELECT * from user_table", (error, result) => {
    if (error) {
      console.log(error);
    }
    if (result < 0) {
      console.log("No Result");
    }
    res.send(result);
  });
});

router.post("/register", (req, res) => {
  const userEmail = req.body.userEmail;
  const userPassword = req.body.userPassword;

  db.query(
    "INSERT INTO user_table (user_email, user_password) VALUES (?,?)",
    [userEmail, userPassword],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("SUCCESS");
      }
    }
  );
});

router.post("/login", (req, res) => {
  const userEmail = req.body.userEmail;
  const userPassword = req.body.userPassword;

  db.query(
    "SELECT * from user_table where user_email = ?",
    [userEmail],
    (error, result) => {
      if (error) {
        console.log(error);
      }
      if (result.length > 0) {
        if (result[0].user_password == userPassword) {
          const token = jwt.sign({ userEmail }, "user details", {
            expiresIn: 5000,
          });
          console.log(token);

          return res.json({
            userLoggedIn: true,
            userEmail: userEmail,
            token: token,
          });
        } else {
          console.log("Username or Password not matched!");
        }
      } else {
        console.log("User do not exist");
      }
    }
  );
});

router.post("/profile", isAuth, (req, res) => {
  const userEmail = req.body.userEmail;

  db.query(
    "SELECT * from user_table where user_email = ? ",
    [userEmail],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        return res.json({
          result: result,
          auth: true,
        });
      }
    }
  );
});

module.exports = router;
