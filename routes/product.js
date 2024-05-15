const express = require('express');
const router = express.Router();
const truffle_connect = require('../connection/app');


router.get('/getAllCategories', (req, res)=>{
    try {
        truffle_connect.getAllCategories((answer) => {
          res.send(answer);
        });
      } catch (error) {
        console.log(error)
      }
} );
router.get('/getAllProducts', (req, res)=>{
    try {
        truffle_connect.getProductsName((answer) => {
          res.send(answer);
        });
      } catch (error) {
        console.log(error)
      }
} );
router.post('/deleteProduct', (req, res)=>{
    try {
        console.log(req.body.productName)
        truffle_connect.deleteProduct(req.body.productName,(answer) => {
          res.send(answer);
        });
      } catch (error) {
        console.log(error)
      }
} );
router.post('/addNewProduct', (req, res) => res.send({
    status: 200, message:"Added Product Successfully",data:{id:1}
}
));
module.exports = router;