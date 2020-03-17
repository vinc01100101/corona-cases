const express = require("express");
const app = express();

app.use(express.static(__dirname + "/public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

const port = 3000;
app.listen(port, () => {
  console.log("Listening to port: " + port);
});
