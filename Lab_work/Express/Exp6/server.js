/*
middleware is a function that runs before sending response 
It can check data, log info, authenticate user
syntax
    app.use((req,res,next) => {
        console.log("request received" + new Date());
        next();
    })

Activity:
// 1. Where do we use middleware?
// Middleware is used between the request and the response in an application.
// It runs after the client sends a request and before the server sends a response.

// 2. Why do we need middleware functions?
// Middleware functions are used to perform tasks like:
// - Logging (tracking requests)
// - Authentication (checking user login)
// - Data validation (checking input data)
// - Error handling
// They help control and manage the request-response flow efficiently.

// 3. When do companies use middleware?
// In real-world applications, middleware is used for:
// - Security (authentication & authorization)
// - API request validation
// - Logging user activity
// - Handling errors globally
// - Processing data before sending response

// next():
// The next() function is used to pass control to the next middleware function.
// If next() is not called, the request will hang and no response will be sent.
next : it passes control to the next function , without next request will hang
*/

const express = require("express");
const app = express();
const port = 3000;

const department = [
  { id: 1, name: "CSE" },
  { id: 2, name: "IT" },
  { id: 3, name: "MECH" },
];

const student = [
  { id: 1, name: "Tahir", deptId: 1 },
  { id: 2, name: "Vrushabh", deptId: 1 },
  { id: 3, name: "Digvijay", deptId: 3 },
  { id: 4, name: "Rushi", deptId: 2 },
  { id: 5, name: "Rohit", deptId: 3 },
  { id: 6, name: "Parth", deptId: 2 },
];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/department", (req, res) => {
  res.json(department);
});

app.get("/department/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const s = [];

  for (let i = 0; i < student.length; i++) {
    if (student[i].deptId == id) {
      s.push(student[i]);
    }
  }
  res.json(s);
});

app.listen(port, () => {
  console.log("http://localhost:" + port);
});