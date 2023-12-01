const express = require('express')
const app = express();
const port = 3000;
// const fs=require('fs');


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




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api', (req, res) => {
  try {
    let counterheader = req.header.counter;
    let counterquery = req.params.counter;
    res.json({ message: `Data received and processed successfully ${req.body.hi}` });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})