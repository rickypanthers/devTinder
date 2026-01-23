const express = require('express');

const app = express();

app.use('/', (req, res) => {
  res.send('Namaste from the suman!');
});
app.use('/hello', (req, res) => {
  res.send('Hello hello hello!!');
});

app.use((req, res) => {
  res.send('Hello from the server');
});

app.listen(3000, () => {
  console.log('Listening to port 3000');
});
