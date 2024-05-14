
const contract = require('truffle-contract');
const XLSX = require("xlsx");
const item_a = require('../build/contracts/Item.json');

var Item = contract(item_a);
var contractAddress = ""; // Define contractAddress variable globally
function removeWhiteSpace( str) {
  return str.trim();
}

function readExcel(filePath) {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0]; // Assuming we are reading the first sheet
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet);

  return data;
}

module.exports = {
  checkProduct: function (productName, callback) {
    var self = this;

    // Bootstrap the Item abstraction for Use.
    Item.setProvider(self.web3.currentProvider);

    // Ensure contractAddress is fetched before continuing
    if (!contractAddress) {
      console.error("Contract address not set. Please ensure you fetch accounts first.");
      return;
    }

    Item.deployed().then(async function (instance) {
      products = await instance.getProductByName(productName, { from: contractAddress });
      console.log(products);
      callback({ "status": 200, "message": "Products fetched successfully!", "data": products });
    }).catch(function (e) {
      console.log(e);
      callback({ "status": 500, "message": "Product Not Found" });
    });
  },

  getProductsName: function (callback) {
    var self = this;
    Item.setProvider(self.web3.currentProvider);

    self.web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
        console.log("There was an error fetching your accounts.");
        console.log("Error fetching accounts:", err);
        return;
      }

      if (accs.length == 0) {
        console.log("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }
      contractAddress = accs[0]; // Set contractAddress here

      // Bootstrap the Item abstraction for Use.
      Item.deployed().then(async function (instance) {
        products = await instance.getAllProductNames({ from: contractAddress });
        console.log(products);
        callback({ "status": 200, "message": "Products fetched successfully!", "data": products });
      }).catch(function (e) {
        console.log(e);
        callback({ "status": 201, "message": "Product Not Found" });
      });
    });
  },
  addProducts: function (callback) {
    var self = this;
    // Bootstrap the Item abstraction for Use.
    Item.setProvider(self.web3.currentProvider);

    Item.deployed().then(async function (instance) {
      let exlsxData = readExcel("./final.xlsx");
      console.log(exlsxData)

      // ==========================================
      let promises = [];
      for (const element of exlsxData) {
        let category = element.category.replace(/\s/g, "");
        let productName=removeWhiteSpace(element.porduct_name);
        promises.push(instance.addProduct(productName, category, element.boycott, { from: "0x48418f08E9F640773feFd5dff15F94e99072b5c1", gas: 6000000 }));
      }

      // Wait for all addProduct calls to finish
      Promise.all(promises)
        .then(function (results) {
          callback({ "status": 200, "message": "Products added successfully!" });
        })
        .catch(function (error) {
          console.error("Error adding products:", error);
          callback({ "status": 500, "message": "Error adding products" });
        });
      // =======================================================

    }).catch(function (e) {
      console.log(e);
      callback({ "status": 201, "message": "Products Not add" });
    });
  },

  getProductsByCategory: function (catigoryName, callback) {
    var self = this;
    Item.setProvider(self.web3.currentProvider);

    self.web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
        console.log("There was an error fetching your accounts.");
        console.log("Error fetching accounts:", err);
        return;
      }

      if (accs.length == 0) {
        console.log("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }
      contractAddress = accs[0]; // Set contractAddress here

      // Bootstrap the Item abstraction for Use.
      Item.deployed().then(async function (instance) {
        products = await instance.getProductsByCategory(catigoryName, 0, { from: contractAddress });
        console.log(products[products.length - 2]);
        if (products.charAt(products.length - 2) === ',') {
          products = products.substring(0, products.length - 2) + products.substring(products.length - 1);
      }
      console.log(products);
        callback({ "status": 200, "message": "Products fetched successfully!", "products": JSON.parse(products) });
      }).catch(function (e) {
        console.log(e);
        callback({ "status": 201, "message": "Product Not Found" });
      });
    });
  },

  getAllCategories: function (callback) {
    var self = this;
    Item.setProvider(self.web3.currentProvider);

    self.web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
        console.log("There was an error fetching your accounts.");
        console.log("Error fetching accounts:", err);
        return;
      }

      if (accs.length == 0) {
        console.log("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }
      contractAddress = accs[0]; // Set contractAddress here

      // Bootstrap the Item abstraction for Use.
      Item.deployed().then(async function (instance) {
        var categories = await instance.getAllCategories({ from: contractAddress });

        var newCategoires = [];
        // remove empty string
        categories.forEach((element, index) => {
          if (element !== "") {
            newCategoires.push(categories[index])
          }
        });
        callback({ "status": 200, "message": "Categories fetched successfully!", "categories": newCategoires });
      }).catch(function (e) {
        console.log(e);
        callback({ "status": 201, "message": "Categories Not Found" });
      });
    });
  }
,
  getAllCategoriesNotBoycott: function (catigoryName, callback) {
    console.log(catigoryName)
    var self = this;
    Item.setProvider(self.web3.currentProvider);

    self.web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
        console.log("There was an error fetching your accounts.");
        console.log("Error fetching accounts:", err);
        return;
      }

      if (accs.length == 0) {
        console.log("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }
      contractAddress = accs[0]; // Set contractAddress here

      // Bootstrap the Item abstraction for Use.
      Item.deployed().then(async function (instance) {
        products = await instance.getProductsByCategoryWhenNotBoycott(catigoryName,3,{ from: contractAddress });
        console.log(products[products.length - 2]);
        if (products.charAt(products.length - 2) === ',') {
          products = products.substring(0, products.length - 2) + products.substring(products.length - 1);
      }
      console.log(products);
        callback({ "status": 200, "message": "Products fetched successfully!", "products": JSON.parse(products) });
      }).catch(function (e) {
        console.log(e);
        callback({ "status": 201, "message": "Product Not Found" });
      });
    });
  }
};
