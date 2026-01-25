const express = require('express');

const app = express();

app.get('/user', (req, res) => {
  res.send({
    firstName: 'Suman',
    lastName: 'Ghosh',
  });
});

app.post('/user', (req, res) => {
  res.send('Data saved successfully to the database');
});

app.listen(3000, () => {
  console.log('Listening to port 3000');
});
