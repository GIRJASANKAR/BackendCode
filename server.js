const express = require("express");
const z = require("zod");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
app.use(express.json());

app.use(express.urlencoded({ extended: false })); // to accept form like data
app.use(bodyParser.json());

const courseSchema = z.object({
  title: z.string({
    required_error: "title is required",
    invalid_type_error: "title must be a string",
  }),
  description: z.string(),
  price: z.number(),
  imageLink: z.string(),
  published: z.boolean(),
});

function checklogin(req, res, next) {
  const username = req.headers.username;
  const password = req.headers.password;
  if(username===undefined || password===undefined){
    res.json({error: "please provide username & password in headers"});
    return;
  }
  const foundUser = ADMINS.find(
    (user) => user.username === username && user.password === password
  );
  if (foundUser) {
   console.log("user exists")
     next();
  } else {
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

let courseId = 0;

// Admin routes
app.post("/admin/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const foundUser = ADMINS.find((user) => user.username === username);
  if (foundUser) {
    res.json("Admin already exists");
  } else {
    ADMINS.push({ username, password });
    res.json("Admin created successfully");
  }
  console.log(ADMINS);
});

app.post('/admin/login', (req, res) => {
  // middleware will take this
  res.send("hello world");
});

app.post("/admin/courses", checklogin, (req, res) => {
  // checking admin is login or not with middleware in this route
  const creating_course = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    imageLink: req.body.imageLink,
    published: req.body.published,
  };
  let result = courseSchema.safeParse(creating_course);
  if (!result.success) {
    res.json({
      ...result,
      message: "course is not created",
    });
  } else {
    courseId++;
    COURSES.push({ ...creating_course, courseId });
    res.json({
      ...result,
      message: "Course created successfully",
      courseId: courseId,
    });
  }
  console.log(COURSES);
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
