const cors = require("cors")
const express = require("express")
const app = express()

app.use(cors())
app.use(express.json())

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

module.exports = app