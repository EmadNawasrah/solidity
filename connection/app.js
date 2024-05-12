const contract = require('truffle-contract');
const XLSX = require("xlsx");
const metacoin_artifact = null;
const item_a = require('../build/contracts/Item.json');
const { log } = require('console');
var Item = contract(item_a);

module.exports = {
  checkProduct: function (productName, callback) {
    var self = this;
    // Bootstrap the Item abstraction for Use.
    Item.setProvider(self.web3.currentProvider);

    Item.deployed().then(async function (instance) {
      // console.log("add")
      // let exlsxData = readExcel("/home/enawasrah/Desktop/emad/final.xlsx");
      // // Array to store promises returned by addProduct calls
      // let promises = [];
      // for (const element of exlsxData) {
      //   promises.push(instance.addProduct(element.porduct_name, element.category, element.boycott, { from: "0x48418f08E9F640773feFd5dff15F94e99072b5c1", gas: 6000000 }));
      // }

      // Wait for all addProduct calls to finish
      // Promise.all(promises)
      //   .then(function (results) {
      //     console.log("All products added successfully!");
      //     console.log(results);
      //     callback({ "status": 200, "message": "Products added successfully!" });
      //   })
      //   .catch(function (error) {
      //     console.error("Error adding products:", error);
      //     callback({ "status": 500, "message": "Error adding products" });
      //   });
      products = await instance.getProductByName(productName, { from: "0x48418f08E9F640773feFd5dff15F94e99072b5c1" })
      // products = JSON.stringify(products);
      console.log(products)
      // console.log("Products fetched successfully!");
      callback({ "status": 200, "message": "Products fetched successfully!", "data": products });
    }).catch(function (e) {
      console.log(e);
      callback({ "status": 500, "message": "Product Not Found" });
    });
  }
  ,
 getProductsName: function (callback) {
    var self = this;
    // Bootstrap the Item abstraction for Use.
    Item.setProvider(self.web3.currentProvider);

    Item.deployed().then(async function (instance) {
      // let exlsxData = readExcel("/home/nawasrah/Desktop/emad/mytruffle/final.xlsx");
      // postDataToGanache(exlsxData, instance)
      // Call the getProducts function
      products = await instance.getAllProductNames({ from: "0x48418f08E9F640773feFd5dff15F94e99072b5c1" })
      // products = JSON.stringify(products);
      console.log(products)
      // console.log("Products fetched successfully!");
      callback({ "status": 200, "message": "Products fetched successfully!", "data": products });
    }).catch(function (e) {
      console.log(e);
      callback({ "status": 201, "message": "Product Not Found" });
    });
  }
  
}
