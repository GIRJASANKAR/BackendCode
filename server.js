const express = require('express')
const app = express();
const port = 3000;

// there are thousand of package in node as well as custom middlewares you ca use.

// const fs=require('fs');  // in built packages


// fs.writeFile('myfile.txt','SAY MY NAME' , (e)=>{
//   if(e){
//     console.log('Cannot able to write');
//     return;
//   }
// })

// fs.readFile('myfile.txt','utf8',(e,d)=>{
//    if(e) return;
//    console.log(d);
// })

// fs.appendFile('myfile.txt','\nGirja',(e)=>{
//   if (e) return;
//   console.log("Appended");
// })

// fs.unlink('myfile.txt',(e)=>{
//   if (e) return;
//   console.log("deleted");
// })

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log('Middleware Log:', new Date(), req.method, req.url);
  if (cond) {
    next();
  } else {
    res.send("you are not authorised")
  }

});


let calculateSum=(counter)=>{
  let sum=0;
  for(let i=0;i<counter;i++){
    sum+=i;
  }
}

app.get('/calculate', (req, res) => {
  let counterheader = req.header.counter;  // get your custom header
  let counterquery = req.params.counter;    // get your custom query param
  let counter= req.body.counter;  // body
  let ans= calculateSum(counterquery);
  res.send(`the sum is ${ans}`);
})

app.post('/api', (req, res) => {
  try {
    res.json({ message: `Data received and processed successfully ${req.body.hi}` });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})