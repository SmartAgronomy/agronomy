// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');

// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/userlogs');
//   console.log('db connected')
// }
// const userSchema = new mongoose.Schema({
//     fname : {
//         type:String,
//         required:true
//     },
//     lname: String,
//     mobile: Number,
//     email: String,
//     password: String,
//     cpassword: String
// });

// const User = mongoose.model('User', userSchema);


// const server = express();

// server.use(cors());
// server.use(bodyParser.json());

// // CRUD - Create
// server.post('/userlogs',async (req,res)=>{



//     const pass1 = password = req.body.password;
//     const pass2 = cpassword = req.body.cpassword;
//     if( pass1 === pass2){
 
//     let user = new User();
//     user.fname = req.body.fname;
//     user.lname  = req.body.lname;
//     user.mobile = req.body.mobile;
//     user.email = req.body.username;
//     user.password = password;
//     user.cpassword = cpassword;



//     const doc = await user.save();

//     console.log(doc);
//     res.json(doc);
// }
//     else{
//     alert("password are not matching") 
// }
// })



// server.get('/userlogs',async (req,res)=>{
//     const docs = await User.find({});
//     res.json(docs)
// })

// server.listen(8080,()=>{
//     console.log('server started')
// })


const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const secretKey = 'secret@123'; 

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/userlogs');
  console.log('db connected')
}

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  mobile: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  cpassword: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

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
function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    
    req.userId = decoded.userId;
    next();
  });
}

// Create user endpoint
server.post('/users', validateUser, async (req, res) => {
  const { fname, lname, mobile, email, password, } = req.body;
  
  // Check if user already exists with the same email
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: 'Email already registered' });
  }
  
  // Create new user and save to database
  const newUser = new User({ fname, lname, mobile, email, password, cpassword: password });
  const savedUser = await newUser.save();
    // Generate JWT token and send back to client
    const token = jwt.sign({ userId: savedUser._id }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  });
  

  // Login validation middleware
function validateLogin(req, res, next) {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  
  next();
}

// Authentication middleware
function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    
    req.userId = decoded.userId;
    next();
  });
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
  res.json({ token });
});


  

// Get all users endpoint
server.get('/users', authenticate, async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

server.get('/login', authenticate, async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

server.listen(8080, () => {
  console.log('Server started on port 8080');
});

