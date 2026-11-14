const express = require("express");
const app = express();

app.post("/api/repositories/analyze", async (req, res) => {
  const url = req.body.url;

  if (!url) {
    return res.status(400).json({ error: "Enter a GitHub URL" });
  }

  const parts = url.split("/");
  const owner = parts[3];
  const name = parts[4];

  const response = await fetch(`https://api.github.com/repos/${owner}/${name}`);

  const data = await response.json();

  if (!response.ok) {
    return res.status(response.status).json({ error: data.message });
  }

  res.json({
    name: data.name,
    url: data.html_url,
    branch: data.default_branch,
  });
});

module.exports = app;
