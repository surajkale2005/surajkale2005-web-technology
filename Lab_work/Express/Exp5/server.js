/*node.js :  
            it is runtime environment that runs js on server side,
            built on chrome's v8 js engine
            used to create fast, scalable web application*/

/*Experess.js : 
            It is minimal and flexible web framework  
            It helps to handle route, middleware and HTTP requests easily
            Make backend development fast and simple*/

/*why use express.js : 
            simplyfies server creation in node js
            offer powerful features like static file service and error handling*/

//npm : node package manager, it is tool to install packages and libraries for node.js ecosystem
//every node project uses packet.js to manage dependencies

/*install Express:
  node v
  npm init
  npm i express*/

//npm init -y  -- to create package.json file with default values

//******activity : 
// 1. What is the use of package.json in Node.js?
// package.json is the main file of a Node.js project.
// It stores project details like name, version, scripts, and dependencies.

// 2. Difference between package.json and package-lock.json
// package.json -> Defines project info and dependency versions (flexible)
// package-lock.json -> Automatically generated file that locks exact versions
// package.json = what we want
// package-lock.json = what actually gets installed

// 3. What is the use of dependencies and devDependencies?

// dependencies:
// These are required to run the application in production
// Example: express, mongoose

// devDependencies:
// These are used only during development (not needed in production)
// Example: nodemon, eslint, jest

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/time',(req,res) => {
    let date = new Date();

    res.json({
        message : "Learning",
        time: date.toLocaleTimeString()
    })

})

app.listen(port, () => {
  console.log("http://localhost:" + port)
})

//using string interpolation.
/*const express = require('express');

const app = express();

const PORT = 3000;
const MESSAGE = "Hello World";

// create route
app.get('/', (req, res) => {
    res.send(`${MESSAGE}`);
});

// start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});*/