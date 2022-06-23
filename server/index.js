const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.use("/", require("./routes/Route"));

app.listen(5000, () => {
  console.log("Server is running on port 5000.");
});
