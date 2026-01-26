const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');
const app = express();

app.post('/signup', async (req, res) => {
  const userObj = {
    firstName: 'Suman',
    lastName: 'Ghosh',
    age: 33,
    emailId: 'rickypanthers@gmail.com',
    password: 'suman@123',
  };

  //Creating a new instance of the user model
  const user = new User(userObj);
  try {
    await user.save();
    res.send('User added successfully to the DB');
  } catch (err) {
    res.status(400).send('Error saving the user' + err.message);
  }
});

connectDB()
  .then(() => {
    console.log('Database connection established...');
    app.listen(3000, () => {
      console.log('Listening to port 3000');
    });
  })
  .catch((err) => {
    console.error('Connection to DB failed');
  });
