const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT;

app.use(express.static("public"));

app.get("/generic", (req, res) => {
  res.sendFile(__dirname + "/public/generic.html");
});

app.get("*", function (req, res) {
  res.sendFile(__dirname + "/public/404.html");
});
app.listen(port, () => {
  console.log("Example app listening at http://localhost:", port);
});
