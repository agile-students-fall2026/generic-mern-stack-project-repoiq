const express = require("express");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const { setTimeout: wait } = require("node:timers/promises");
const path = require("node:path").posix;
const cors = require("cors");
const app = express();
const filePath = require("path");
const mapData = require("./data/mapData");
const analysesByRepoId = new Map();
app.use(express.json());
app.use(cors());
app.use(express.static(filePath.join(__dirname, "public")));
app.use(express.static(filePath.join(__dirname, "../front-end/dist")));

const progressById = new Map();

const repositories = [
  {
    id: 1,
    name: "repoiq",
    language: "JavaScript",
    updated: "2 days ago",
    status: "Completed",
  },
  {
    id: 2,
    name: "portfolio",
    language: "Python",
    updated: "1 week ago",
    status: "In Progress",
  },
  {
    id: 3,
    name: "machine-learning",
    language: "Python",
    updated: "3 weeks ago",
    status: "Not Started",
  },
];

app.get("/api/repositories", (req, res) => {
  res.json(repositories);
});

app.get("/api/repositories/:id", (req, res) => {
  const repo = repositories.find((r) => r.id === Number(req.params.id));

  if (!repo) {
    return res.status(404).json({ error: "Repository not found" });
  }

  res.json(repo);
});

app.delete("/api/repositories/:id", (req, res) => {
  const index = repositories.findIndex(
    (repo) => String(repo.id) === req.params.id,
  );
  if (index === -1)
    return res.status(404).json({ error: "Repository not found." });
  repositories.splice(index, 1);
  analysesByRepoId.delete(Number(req.params.id));
  res.json({ success: true });
});

app.post("/api/repositories", (req, res) => {
  const url = typeof req.body?.url === "string" ? req.body.url.trim() : "";
  if (!url || !/^https:\/\/github\.com\/[^/]+\/[^/]+\/?$/.test(url)) {
    return res.status(400).json({ error: "Invalid GitHub URL" });
  }

  const name = url.replace(/\/$/, "").split("/").pop();

  const repo = {
    id: Date.now(),
    name: name,
    url: url,
    language: "Unknown",
    updated: "Just now",
    status: "Pending",
  };

  repositories.push(repo);
  res.status(201).json(repo);
});
app.get("/api/analysis-progress/:id", (req, res) => {
  const progress = progressById.get(req.params.id);

  if (!progress) {
    return res.status(404).json({});
  }

  res.json(progress);
});

app.post("/api/repositories/analyze", async (req, res) => {
  const url = typeof req.body?.url === "string" ? req.body.url.trim() : "";
  if (!url || !/^https:\/\/github\.com\/[^/]+\/[^/]+\/?$/.test(url)) {
    return res.status(400).json({ error: "Invalid GitHub URL" });
  }

  const progress = { step: 0 };
  const progressId = req.body.progressId;

  if (progressId) {
    progressById.set(progressId, progress);

    res.once("close", () => {
      setTimeout(() => {
        progressById.delete(progressId);
      }, 60000).unref();
    });
  }

  const parts = url.split("/");
  const owner = parts[3];
  const name = parts[4];

  if (process.env.REPOIQ_LIVE_GITHUB !== "1") {
    for (let step = 0; step <= 4; step++) {
      progress.step = step;
      await wait(750);
      if (res.destroyed) return;
    }

    const repoUrl = url.replace(/\/$/, "");
    let repo = repositories.find((item) => item.url === repoUrl);

    if (!repo) {
      repo = {
        id: Date.now(),
        name,
        url: repoUrl,
        language: "JavaScript",
        updated: "Just now",
        status: "Completed",
      };
      repositories.push(repo);
    }
    repo.status = "Completed";
    repo.updated = "Just now";

    const analysis = {
      analyzedAt: new Date().toISOString(),
      repository: {
        ...repo,
        defaultBranch: "main",
        files: 2,
        functions: 2,
        classes: 1,
        relationships: 4,
      },
      nodes: [
        {
          id: "main.js",
          name: "main.js",
          path: "main.js",
          type: "File",
          usedBy: ["test.js"],
          functions: [
            { name: "foo", startLine: 1 },
            { name: "baz", startLine: 3 },
          ],
          classes: [{ name: "Bar", startLine: 5 }],
        },
        {
          id: "test.js",
          name: "test.js",
          path: "test.js",
          type: "File",
          imports: ["./main.js"],
        },
        {
          id: "foo",
          name: "foo",
          path: "main.js",
          type: "Function",
          startLine: 1,
        },
        {
          id: "baz",
          name: "baz",
          path: "main.js",
          type: "Function",
          startLine: 3,
        },
        {
          id: "Bar",
          name: "Bar",
          path: "main.js",
          type: "Class",
          startLine: 5,
        },
      ],
      connections: [
        { from: "test.js", to: "main.js", type: "import" },
        { from: "main.js", to: "foo", type: "contains" },
        { from: "main.js", to: "baz", type: "contains" },
        { from: "main.js", to: "Bar", type: "contains" },
      ],
    };
    analysesByRepoId.set(repo.id, analysis);
    return res.json(analysis);
  }

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
        usedBy: [],
      });

      if (item.type === "blob") {
        fileCount++;
      }
    }
  }

  const sourceFiles = filesData.tree.filter(
    (item) =>
      item.type === "blob" &&
      (item.path.endsWith(".js") ||
        item.path.endsWith(".jsx") ||
        item.path.endsWith(".mjs") ||
        item.path.endsWith(".cjs")),
  );
  progress.step = 1;
  for (const file of sourceFiles) {
    if (res.destroyed) return;
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

        CallExpression(path) {
          if (
            path.node.callee.type === "Identifier" &&
            path.node.callee.name === "require" &&
            path.node.arguments[0]?.type === "StringLiteral"
          ) {
            node.imports.push(path.node.arguments[0].value);
          }
        },

        ExportNamedDeclaration(path) {
          if (path.node.source) {
            node.imports.push(path.node.source.value);
          }
        },

        ExportAllDeclaration(path) {
          node.imports.push(path.node.source.value);
        },

        ImportDeclaration(path) {
          node.imports.push(path.node.source.value);
        },
      });
    } catch {
      node.parseError = "Could not read functions in this file";
    }
  }
  progress.step = 2;
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
        usedBy: [],
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
        usedBy: [],
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
    usedBy: [],
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
        location + ".mjs",
        location + ".cjs",
        location + "/index.mjs",
        location + "/index.cjs",
      ];

      const dependency = nodes.find(
        (item) => item.type === "File" && possiblePaths.includes(item.path),
      );

      if (dependency && !dependency.usedBy.includes(node.path)) {
        connections.push({
          from: node.id,
          to: dependency.id,
          type: "import",
        });

        dependency.usedBy.push(node.path);
      }
    }
  }
  progress.step = 3;
  let functionCount = 0;

  for (const node of nodes) {
    classCount += (node.classes || []).length;
    functionCount += (node.functions || []).length;
  }

  if (res.destroyed) return;
  let repo = repositories.find((item) => item.url === data.html_url);

  if (!repo) {
    repo = { id: Date.now() };
    repositories.push(repo);
  }

  repo.name = data.name;
  repo.url = data.html_url;
  repo.language = data.language || "Unknown";
  repo.updated = "Just now";
  repo.status = "Completed";
  progress.step = 4;

  const analysis = {
    repository: {
      ...repo,
      defaultBranch: data.default_branch,
      files: fileCount,
      functions: functionCount,
      classes: classCount,
      relationships: connections.length,
    },
    analyzedAt: new Date().toISOString(),
    nodes: nodes,
    connections: connections,
  };

  analysesByRepoId.set(repo.id, analysis);
  return res.json(analysis);
});

app.get("/api/map", (req, res) => {
  res.json(mapData);
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please enter your email and password.",
    });
  }

  res.json({
    success: true,
    message: "Logged in.",
    user: { name: "Demo User", email: email },
  });
});

app.get("/api/repositories/:id/analysis", (req, res) => {
  const analysis = analysesByRepoId.get(Number(req.params.id));

  if (!analysis) {
    return res.status(404).json({ error: "Analysis not found" });
  }

  res.json(analysis);
});

app.post("/api/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill in all fields.",
    });
  }

  res.status(201).json({
    success: true,
    message: "Account created.",
    user: { name: name, email: email },
  });
});

app.post("/api/forgot-password", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Please enter your email.",
    });
  }

  res.json({
    success: true,
    message: "A password reset link has been sent to your email.",
  });
});

// Mock the resend action for the Check Email page; no email is actually sent.
app.post("/api/resend-email", (req, res) => {
  const { email, purpose } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Missing email",
    });
  }

  if (!["signup", "reset"].includes(purpose)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email purpose. Expected 'signup' or 'reset'"
    });
  }

  res.json({
    success: true,
    message: `Simulated ${purpose === "signup" ? "verification" : "password reset"} email for ${email}. No email was sent.`,
  });
});

module.exports = app;
