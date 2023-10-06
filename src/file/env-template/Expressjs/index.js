import express from 'express';

const app = express();
const PORT = 8080;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(
    `Express template was generated by Open-Set-Go. Server is listening on port ${PORT}!`,
  );
});