const express = require('express');
const cors = require('cors');
var mysql = require('mysql');
const port = 3000 || process.env.PORT;
const Web3 = require('web3');

const truffle_connect = require('./connection/app.js');
const bodyParser = require('body-parser');

const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

require('./config/passport')(passport);

// DB Config
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "7285",
  database: 'solidity'
});

// con.connect();

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
// Express body parser
app.use(express.urlencoded({ extended: true }));
// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});
// Routes
app.use('/', require('./routes/index.js'));
app.use('/admin', require('./routes/admin.js'));
app.use('/admin/product', require('./routes/product.js'));

app.use("/", express.static("public")); // For serving static files
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.post('/checkProduct', (req, res) => {
  try {


    truffle_connect.checkProduct(req.body.product, (answer) => {
      res.send(answer);
    });
  } catch (error) {
    console.log(error)
  }
});
app.get('/getAllProductNames', (req, res) => {
  try {


    truffle_connect.getProductsName((answer) => {
      res.send(answer);
    });
  } catch (error) {
    console.log(error)
  }
});
app.get('/addProducts', (req, res) => {
  try {


    truffle_connect.addProducts((answer) => {
      res.send(answer);
    });
  } catch (error) {
    console.log(error)
  }
});
app.get('/getAllCategories', (req, res) => {
  try {
    truffle_connect.getAllCategories((answer) => {
      res.send(answer);
    });
  } catch (error) {
    console.log(error)
  }
});
app.post('/getProductsByCategory', (req, res) => {
  try {
    const categoryName = req.body.categoryName;
    truffle_connect.getProductsByCategory(categoryName, (answer) => {
      res.send(answer);
    });
  } catch (error) {
    console.log(error)
  }
});
app.post('/getProductsByCategoryNotBoycott', (req, res) => {
  try {
    const categoryName = req.body.categoryName;
    truffle_connect.getAllCategoriesNotBoycott(categoryName, (answer) => {
      res.send(answer);
    });
  } catch (error) {
    console.log(error)
  }
});
app.listen(port, () => {

  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
  truffle_connect.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

  console.log("Express Listening at http://localhost:" + port);

});
