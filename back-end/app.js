const express = require("express");
const app = express();
app.use(express.json());

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

  const branch = encodeURIComponent(data.default_branch);

  const filesResponse = await fetch(
    `https://api.github.com/repos/${owner}/${name}/git/trees/${branch}?recursive=1`,
  );

  const filesData = await filesResponse.json();

  if (!filesResponse.ok) {
    return res.status(filesResponse.status).json({
      error: filesData.message,
    });
  }

  if (filesData.truncated) {
    return res.status(422).json({
      error: "This repository is too large for this first version.",
    });
  }

  const files = [];

  for (const item of filesData.tree) {
    if (item.type === "blob") {
      files.push(item.path);
    }
  }

  res.json({
    name: data.name,
    url: data.html_url,
    files: files,
  });
});

module.exports = app;
