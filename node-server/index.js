
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
// const cookieParser = require('cookie-parser');
const productRoutes = require('./productRoutes');
// const authRoutes = require('./authRoutes')

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://rentalagriindia:cluster123@userlogs.tbiwfbc.mongodb.net/');
  console.log('db connected')
}

const server = express();

server.use(cors());
server.use(bodyParser.json());

server.use('/api', routes);
// server.use(cookieParser());

server.use('/admin/products', productRoutes);
// server.use('/admin/auth', adminlogin);

server.listen(8080, () => {
  console.log('Server started on port 8080');
});

