const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
app.use(express.json());

app.use(express.urlencoded({ extended: false })); // to accept form like data
app.use(bodyParser.json());

function checklogin(req,res,next){
  const username = req.headers.username;
  const password = req.headers.password;
  const foundUser = ADMINS.find(
    (user) => user.username === username && user.password === password
  );
  if(foundUser){
    res.json({ message: "Logged in successfully" });
  }else{
    res.json({ message: "Username or password is incorrect" });
  }
}

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
  if (foundUser) {
    res.json("Admin already exists");
  }else{
    ADMINS.push({ username, password });
    res.json("Admin created successfully");
  }
  console.log(ADMINS);
});

app.post("/admin/login", checklogin, (req, res) => {
  // logic to log in admin
});

app.post("/admin/courses",checklogin, (req, res) => {
// checking admin is login or not with middleware in this route
   
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
