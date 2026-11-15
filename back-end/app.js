const cors = require("cors")
const express = require("express")
const app = express()
app.use(cors())

app.get("/api/repositories", (req, res) => {
    res.json([
        { id: 1, name: "repoiq", language: "JavaScript", updated: "2 days ago" },
        { id: 2, name: "portfolio", language: "Python", updated: "5 days ago" },
        { id: 3, name: "machine-learning", language: "Python", updated: "1 week ago" }
    ])
})

module.exports = app