const express = require("express");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const path = require("node:path").posix;
const app = express();
app.use(express.json());

app.post("/api/repositories/analyze", async (req, res) => {
  const url = req.body?.url;

  if (typeof url !== "string" || !url.trim()) {
    return res.status(400).json({
      error: "Enter a GitHub URL",
    });
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
  let classCount = 0;

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
    node.classes = [];
    node.imports = [];

    try {
      const tree = parser.parse(code, {
        sourceType: "unambiguous",
        plugins: ["jsx"],
      });

      traverse(tree, {
        Class(path) {
          node.classes.push({
            name: path.node.id?.name || path.parent.id?.name || "anonymous",
            extends: path.node.superClass
              ? code.slice(path.node.superClass.start, path.node.superClass.end)
              : null,
            startLine: path.node.loc.start.line,
            endLine: path.node.loc.end.line,
          });
        },
        Function(path) {
          node.functions.push({
            name:
              path.node.id?.name ||
              path.parent.id?.name ||
              path.node.key?.name ||
              "anonymous",
            parameters: path.node.params.map((param) =>
              code.slice(param.start, param.end),
            ),
            startLine: path.node.loc.start.line,
            endLine: path.node.loc.end.line,
            code: code.slice(path.node.start, path.node.end),
          });
        },

        ImportDeclaration(path) {
          node.imports.push(path.node.source.value);
        },
      });
    } catch {
      node.parseError = "Could not read functions in this file";
    }
  }
  const fileNodes = nodes.filter((node) => node.type === "File");

  for (const file of fileNodes) {
    const functions = file.functions || [];

    for (let i = 0; i < functions.length; i++) {
      const fn = functions[i];

      nodes.push({
        id: file.id + "#function:" + i,
        name: fn.name,
        type: "Function",
        path: file.path,
        parent: file.id,
        repo: file.repo,
        parameters: fn.parameters,
        startLine: fn.startLine,
        endLine: fn.endLine,
        code: fn.code,
        usedIn: [],
      });
    }
  }
  for (const file of fileNodes) {
    const classes = file.classes || [];

    for (let i = 0; i < classes.length; i++) {
      const cls = classes[i];

      nodes.push({
        id: file.id + "#class:" + i,
        name: cls.name,
        type: "Class",
        path: file.path,
        parent: file.id,
        repo: file.repo,
        extends: cls.extends,
        startLine: cls.startLine,
        endLine: cls.endLine,
        usedIn: [],
      });
    }
  }
  const repositoryId = "repo:" + owner + "/" + name;

  nodes.push({
    id: repositoryId,
    name: data.name,
    type: "Repository",
    path: "",
    parent: null,
    repo: data.name,
    info: data.name,
    usedIn: [],
  });

  const connections = [];

  for (const node of nodes) {
    if (node.type !== "Repository") {
      connections.push({
        from: node.parent || repositoryId,
        to: node.id,
        type: "contains",
      });
    }
  }

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
    classCount += (node.classes || []).length;
    functionCount += (node.functions || []).length;
  }

  res.json({
    repository: {
      name: data.name,
      url: data.html_url,
      files: fileCount,
      functions: functionCount,
      classes: classCount,
      relationships: connections.length,
    },
    nodes: nodes,
    connections: connections,
  });
});

module.exports = app;
