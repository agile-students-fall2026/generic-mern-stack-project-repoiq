const cors = require("cors")
const express = require("express")
const app = express()

app.use(cors())
app.use(express.json())

const repositories = [
    { id: 1, name: "repoiq", language: "JavaScript", updated: "2 days ago" },
    { id: 2, name: "portfolio", language: "Python", updated: "5 days ago" },
    { id: 3, name: "machine-learning", language: "Python", updated: "1 week ago" }
]

app.get("/api/repositories", (req, res) => {
    res.json(repositories)
})

module.exports = app