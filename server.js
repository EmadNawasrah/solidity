const express = require('express');
const app = express();
const cors = require('cors');

const port = 3000 || process.env.PORT;
const Web3 = require('web3');
const truffle_connect = require('./connection/app.js');
const bodyParser = require('body-parser');
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/', express.static('public_static'));




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
    truffle_connect.getProductsByCategory(categoryName,(answer) => {
      res.send(answer);
    });
  } catch (error) {
    console.log(error)
  }
});
app.post('/getProductsByCategoryNotBoycott', (req, res) => {
  try {
    const categoryName = req.body.categoryName;
    truffle_connect.getAllCategoriesNotBoycott(categoryName,(answer) => {
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
