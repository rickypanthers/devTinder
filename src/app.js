const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');
const app = express();
const { validateSignUpData } = require('./utils/validation');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { userAuth } = require('./middlewares/auth');

app.use(express.json());
app.use(cookieParser());
app.post('/signup', async (req, res) => {
  try {
    //Validation of data
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;
    //Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    //Creating a new instance of the user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send('User added successfully to the DB');
  } catch (err) {
    res.status(400).send('Error saving the user ' + err.message);
  }
});

app.post('/login', async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      //Create a JWT Token

      //Add the token to cookie and send the response back to the user
      const token = await user.getJWT();
      res.cookie('token', token, {
        expires: new Date(Date.now() + 8 * 3600000),
      }); //Cookie expires in 8 hours

      res.send('Login successful!!');
    } else {
      throw new Error('Password is not correct');
    }
  } catch (err) {
    res.status(400).send('ERROR: ' + err.message);
  }
});

app.get('/profile', userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send('ERROR : ' + err.message);
  }
});

app.post('/sendConnectionRequest', userAuth, async (req, res) => {
  const user = req.user;
  //Sending a connection request
  console.log('Sending a connection request');
  console.log(user);
  res.send(user.firstName + ' sent the connection request');
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
