
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const secretKey = 'secretkeymithun'; 
const User = require('./models/User');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://rentalagriindia:cluster123@userlogs.tbiwfbc.mongodb.net/');
  console.log('db connected')
}

const server = express();

server.use(cors());
server.use(bodyParser.json());

// Validation middleware
function validateUser(req, res, next) {
  const { fname, lname, mobile, email, password, cpassword } = req.body;
  
  if (!fname || !lname || !mobile || !email || !password || !cpassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  if (password !== cpassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }
  
  next();
}


// Authentication middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = { userId: decoded.userId };
      next(); // Call the next middleware or route handler
    });
  } else {
    res.sendStatus(401);
  }
};



// Create user endpoint
server.post('/signup', validateUser, async (req, res) => {
  const { fname, lname, mobile, email, password, } = req.body;
  
  // Check if user already exists with the same email
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: 'Email already registered' });
  }
  
  // Create new user and save to database
  const newUser = new User({ fname, lname, mobile, email, password, cpassword: password });
  const savedUser = await newUser.save();
  });
  

  // Login validation middleware
function validateLogin(req, res, next) {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  
  next();
}



// Login endpoint
server.post('/login', validateLogin, async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists with the given email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Check if the password is correct
  if (user.password !== password) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Generate JWT token and send back to client
  const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
  res.json({ token, userID: user._id });
});

// Profile endpoint
server.get('/profile', verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { fname, lname, mobile, email } = user;
    const profileData = { fname, lname, mobile, email };

    res.json(profileData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



  

// Get all users endpoint
server.get('/signup', async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

server.get('/login', verifyToken, async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

server.get('/profile', verifyToken, async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

server.listen(8080, () => {
  console.log('Server started on port 8080');
});

