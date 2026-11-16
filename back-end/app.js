const express = require("express");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const path = require("node:path").posix;
const app = express();
app.use(express.json());

app.post("/api/repositories/analyze", async (req, res) => {
  const url = req.body.url;

  if (!url) {
    const connections = [];

    for (const node of nodes) {
      for (const imported of node.imports || []) {
        // Only connect relative imports, like "./Header".
        if (!imported.startsWith(".")) {
          continue;
        }

        const location = path.join(node.parent, imported);

        const possiblePaths = [
          location,
          location + ".js",
          location + ".jsx",
          location + "/index.js",
          location + "/index.jsx",
        ];

        const dependency = nodes.find(
          (item) => item.type === "File" && possiblePaths.includes(item.path),
        );

        if (dependency && !dependency.usedIn.includes(node.path)) {
          connections.push({
            from: node.id,
            to: dependency.id,
            type: "import",
          });

          dependency.usedIn.push(node.path);
        }
      }
    }
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
  const connections = [];

  for (const node of nodes) {
    for (const imported of node.imports || []) {
      if (!imported.startsWith(".")) {
        continue;
      }

      const location = path.join(node.parent, imported);

      const possiblePaths = [
        location,
        location + ".js",
        location + ".jsx",
        location + "/index.js",
        location + "/index.jsx",
      ];

      const dependency = nodes.find(
        (item) => item.type === "File" && possiblePaths.includes(item.path),
      );

      if (dependency && !dependency.usedIn.includes(node.path)) {
        connections.push({
          from: node.id,
          to: dependency.id,
          type: "import",
        });

        dependency.usedIn.push(node.path);
      }
    }
  }
  let functionCount = 0;

  for (const node of nodes) {
    functionCount += (node.functions || []).length;
  }

  res.json({
    repository: {
      name: data.name,
      url: data.html_url,
      files: fileCount,
      functions: functionCount,
      classes: 0,
      relationships: connections.length,
    },
    nodes: nodes,
    connections: connections,
  });
});

app.get("/api/search", async (req, res) => {
  const { nodes } = await import("../front-end/src/data/mockNodes.js");
  const q = req.query.q ?? "";
  const type = req.query.type ?? "All";
  const repo = req.query.repo;

  const results = nodes.filter((node) => {
    const matchesText = node.name.includes(q) || node.path.includes(q);
    const matchesType = type === "All" || node.type === type;
    const matchesRepo = !repo || node.repo === repo;

    return matchesText && matchesType && matchesRepo;
  });
  res.json(results);
});

app.get("/api/components/:id", async (req, res) => {

});

module.exports = app;
