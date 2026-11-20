const cors = require("cors")
const express = require("express")
const path = require("path")
const app = express()

app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, "public")))
app.use(express.static(path.join(__dirname, "../front-end/dist")))

const repositories = [
    { id: 1, name: "repoiq", language: "JavaScript", updated: "2 days ago", status: "Completed" },
    { id: 2, name: "portfolio", language: "Python", updated: "1 week ago", status: "In Progress" },
    { id: 3, name: "machine-learning", language: "Python", updated: "3 weeks ago", status: "Not Started" }
]

app.get("/api/repositories", (req, res) => {
    res.json(repositories)
})

app.get("/api/repositories/:id", (req, res) => {
    const repo = repositories.find(r => r.id === Number(req.params.id))

    if (!repo) {
        return res.status(404).json({ error: "Repository not found" })
    }

    res.json(repo)
})

const analyses = {}

app.get("/api/repositories/:id/analysis", (req, res) => {
    const repo = repositories.find(r => r.id === Number(req.params.id))

    if (!repo) {
        return res.status(404).json({ error: "Repository not found" })
    }

    if (!analyses[repo.id]) {
        analyses[repo.id] = {
            repositoryId: repo.id,
            analyzedAt: new Date().toISOString(),
            status: "Completed",
            files: 342,
            functions: 28,
            classes: 65,
            relationships: 19
        }
    }

    res.json(analyses[repo.id])
})

app.post("/api/repositories", (req, res) => {
    const { url } = req.body

    if (!url || !/^https:\/\/github\.com\/[^/]+\/[^/]+\/?$/.test(url)) {
        return res.status(400).json({ error: "Invalid GitHub URL" })
    }

    const name = url.replace(/\/$/, "").split("/").pop()

    const repo = {
        id: Date.now(),
        name: name,
        url: url,
        language: "Unknown",
        updated: "Just now",
        status: "Pending"
    }

    repositories.push(repo)
    res.status(201).json(repo)
})

app.post("/api/login", (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Please enter your email and password." })
  }

  res.json({
    success: true,
    message: "Logged in.",
    user: { name: "Demo User", email: email },
  })
})

app.post("/api/signup", (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "Please fill in all fields." })
  }

  res.status(201).json({
    success: true,
    message: "Account created.",
    user: { name: name, email: email },
  })
})

module.exports = app
