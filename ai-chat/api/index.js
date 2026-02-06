const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI app is live 🚀");
});

module.exports = app;
