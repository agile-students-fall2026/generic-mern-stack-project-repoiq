const express = require("express");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
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

  const nodes = [];
  let fileCount = 0;

  for (const item of filesData.tree) {
    if (item.type === "blob" || item.type === "tree") {
      const parts = item.path.split("/");
      const name = parts.pop();
      const parent = parts.join("/");

      nodes.push({
        id: item.path,
        name: name,
        path: item.path,
        parent: parent,
        type: item.type === "tree" ? "Folder" : "File",
        repo: data.name,
        info: item.path,
        usedIn: [],
      });

      if (item.type === "blob") {
        fileCount++;
      }
    }
  }

  const sourceFiles = filesData.tree.filter(
    (item) =>
      item.type === "blob" &&
      (item.path.endsWith(".js") || item.path.endsWith(".jsx")),
  );
  for (const file of sourceFiles) {
    const response = await fetch(file.url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.message });
    }

    const code = Buffer.from(data.content, "base64").toString("utf8");
    const node = nodes.find((node) => node.path === file.path);

    node.functions = [];
    node.imports = [];

    try {
      const tree = parser.parse(code, {
        sourceType: "unambiguous",
        plugins: ["jsx"],
      });

      traverse(tree, {
        FunctionDeclaration(path) {
          if (path.node.id) {
            node.functions.push(path.node.id.name);
          }
        },

        ImportDeclaration(path) {
          node.imports.push(path.node.source.value);
        },
      });
    } catch {
      node.parseError = "Could not read functions in this file";
    }
  }

  res.json({
    repository: {
      name: data.name,
      url: data.html_url,
      files: fileCount,
      functions: 0,
      classes: 0,
      relationships: 0,
    },
    nodes: nodes,
    connections: [],
  });
});

module.exports = app;
