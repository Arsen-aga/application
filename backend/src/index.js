import express from 'express'

const app = express();
const PORT = 3000;

app.use('/', (req, res) =>{
  res.json({ message: 'hello world' })
})

app.listen(PORT, () =>{
  console.log(`server work on http://localhost:${PORT}`);
})