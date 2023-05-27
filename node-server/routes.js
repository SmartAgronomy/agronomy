const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secretKey = 'secretkeymithun';
const User = require('./models/User');
const {verifyToken, validateUser} = require('./middlewares');

  
  // Create user endpoint
  router.post('/signup', validateUser, async (req, res) => {
    const { fname, lname, mobile, email, password, address, state, city } = req.body;
    
    // Check if user already exists with the same email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    
    // Create new user and save to database
    const newUser = new User({ fname, lname, mobile, email, password, cpassword: password, address, state,city });
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
  router.post('/login', validateLogin, async (req, res) => {
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
  router.get('/profile', verifyToken, async (req, res) => {
    try {
      const userId = req.user.userId;
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const { fname, lname, mobile, email, address, state, city } = user;
      const profileData = { fname, lname, mobile, email, address, state, city };
  
      res.json(profileData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal router error' });
    }
  });
  
  
  // Get all users endpoint
  router.get('/signup', async (req, res) => {
    const users = await User.find({});
    res.json(users);
  });
  
  router.get('/login', verifyToken, async (req, res) => {
    const users = await User.find({});
    res.json(users);
  });
  
  router.get('/profile', verifyToken, async (req, res) => {
    const users = await User.find({});
    res.json(users);
  });


  // Export the router
  module.exports = router;