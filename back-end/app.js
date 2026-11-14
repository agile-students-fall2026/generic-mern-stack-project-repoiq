const express = require("express");
const app = express();

app.post("/api/repositories/analyze", (req, res) => {
  const url = req.body.url;

  if (!url) {
    return res.status(400).json({ error: "Enter a GitHub URL" });
  }

  const parts = url.split("/");
  const owner = parts[3];
  const name = parts[4];

  res.json({ owner, name });
});

module.exports = app;
