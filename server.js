const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
app.use(express.json());

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // to accept form like data
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log("Middleware Log:", new Date(), req.method, req.url);
  let cond = true;
  if (cond) {
    next();
  } else {
    res.send("you are not authorised");
  }
});

let ADMINS = [];
let USERS = [];
let COURSES = [];

// Admin routes

app.post("/admin/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const foundUser = ADMINS.find((user) => user.username === username);
  if (foundUser) res.json("Admin already exists");
  else {
    const data = {
      username,
      password,
    };
    ADMINS.push(data);
    // console.log(ADMINS);
    res.json("Admin created successfully");
  }
});

app.post("/admin/login", (req, res) => {
  // logic to log in admin
 const username=req.headers.username
 const password=req.headers.password
const foundUser = ADMINS.find((user) => user.username === username && user.password===password);

if(foundUser) res.json({message: 'Logged in successfully'});
else{
  res.json({message: 'Usern'});
}








});

app.post("/admin/courses", (req, res) => {
  // logic to create a course
});

app.put("/admin/courses/:courseId", (req, res) => {
  // logic to edit a course
});


// User routes
app.post("/users/signup", (req, res) => {
  // logic to sign up user
});

app.post("/users/login", (req, res) => {
  // logic to log in user
});

app.get("/users/courses", (req, res) => {
  // logic to list all courses
});

app.post("/users/courses/:courseId", (req, res) => {
  // logic to purchase a course
});

app.get("/users/purchasedCourses", (req, res) => {
  // logic to view purchased courses
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// going to modify this server file and create to-do app 
// first simple to-do app with global variable
// then using fs module save all the data in a file 
// then build a simple frontend for this then do  all this.

//mongod database 

// Read about monorepo, docker , images, containers, how to pull images from docker
// two files docker file, compose file . ship whole container from one place to another
// need of kafka - send loaction on every second . publish and subscribe torant is very fast.
// can't able to do on dabases . it is not possible to read and write at so much pace then send this to user.

// Aws
// redis
// kafka
// docker