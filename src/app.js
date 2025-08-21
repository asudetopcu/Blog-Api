const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("first api");
});

app.listen(5000);
