const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  /* Getting the token from the header. */
  const token = req.body.headers["x-access-token"];

  if (!token) {
    return res.json({
      auth: false,
      message: "No Token",
    });
  } else {
    jwt.verify(token, "user details", (error) => {
      if (error) {
        return res.json({
          auth: false,
          message: "Not Authenticated",
        });
      } else {
        next();
      }
    });
  }
};

module.exports = isAuth;
