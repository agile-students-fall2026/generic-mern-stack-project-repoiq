const express = require("express")
const path = require("path")
const app = express()

app.use(express.json())

app.use(express.static(path.join(__dirname, "public")))
app.use(express.static(path.join(__dirname, "../front-end/dist")))

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

app.use(express.json())

app.use(express.static(path.join(__dirname, "public")))
app.use(express.static(path.join(__dirname, "../front-end/dist")))

module.exports = app