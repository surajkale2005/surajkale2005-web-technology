const express = require("express");
const app = express();
const port = 3006;

const users = [
  { id: 1, name: "Suraj", age: 21 },
  { id: 2, name: "Rohit", age: 22 },
  { id: 3, name: "Sanyukta", age: 23 },
  { id: 4, name: "Atharv", age: 24 },
];

// Root route (fix for "Cannot GET /")
app.get("/", (req, res) => {
  res.send("Welcome to User API ");
});

// Get all users
app.get("/user", (req, res) => {
  res.json(users);
});

// Get user by ID
app.get("/user/:id", (req, res) => {
  const id = parseInt(req.params.id); // convert string to number

  const user = users.find((u) => u.id === id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});