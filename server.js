const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
app.use(express.json());

// there are thousand of package in node as well as custom middlewares you can use.

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false })); // to accept form like data

app.use((req, res, next) => {
  console.log("Middleware Log:", new Date(), req.method, req.url);
  let cond = true;
  if (cond) {
    next();
  } else {
    res.send("you are not authorised");
  }
});

let calculateSum = (counter) => {
  let sum = 0;
  for (let i = 0; i <= counter; i++) {
    sum += i;
  }
  return sum;
};

app.get("/calculate", (req, res) => {
  // let counterheader = req.header.counter;  // get your custom header
  let counterquery = req.query.x; // get your custom query param
  console.log("eq.query.counter", req.query.counter);
  // let counter= req.body.counter;  // to parse and use body you need to use middleware
  let ans = calculateSum(counterquery);
  res.send(`the sum is ${ans}`);
});

app.get("/", (req, res) => {
  // res.status(200).send("something") -- calling this type of function phenomenom is called function currying one function after other
  res.status(211).send(`Welcome page`); // sending status code
});

// the difference between res.send() and res.json() this make sure you only send json objects.

app.get("/jsondata", (req, res) => {
  let counter = req.query.counter;
  let counter2 = req.query.counter2;
  let obj = {
    a: counter,
    b: counter2,
  };
  res.status(278).json(obj); // make sure it's json
});

app.get("/rendersome", (req, res) => {
  res.send(
    `<div
  tabindex="0"
  class="mb-4 py-6 px-4 shadow-md flex items-center justify-between rounded-xl border border-transparent transition-all ease-in duration-200 cursor-pointer"
  [ngClass]="{ 'border-primary shadow-inner': selected }"
>
  <div class="flex items-center">
    <div class="navigation-icon w-6 h-6 mr-2">
      <img [src]="img" alt="icon" />
    </div>
    <div>
      <div class="font-semibold text-sm pb-1"><ng-content></ng-content></div>
      <div class="text-xxs">Regular settlement (T+2 Days)</div>
    </div>
  </div>
  <div class="font-semibold text-sm">{{ balance | ngsCurrency }}</div>
</div>
  `
  );
});
app.get("/hi", (req, res) => {
  res.send("<html><body>hello World</body></html>"); // you can write all your html in double quotes itself.
});

app.get("/sendfile", (req, res) => {
  res.sendFile(__dirname + "/index.html"); // directlty send file
});

app.post("/api", (req, res) => {
  try {
    res.json({
      message: `Data received and processed successfully ${req.body.hi}`,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
