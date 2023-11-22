const express = require('express')
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
const port = 3000;

// Global Middleware going to add more with frontend
app.use((req, res, next) => {
    console.log('Middleware Log:', new Date(), req.method, req.url);
    next(); // Call next() to continue processing the request/response cycle
  });
  

app.get('/', (req, res) => {
  res.send('Hello World!')
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