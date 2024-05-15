const Web3 = require('web3');
const contract = require('truffle-contract');
const XLSX = require("xlsx");
const item_a = require('../build/contracts/Item.json');

var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));
var Item = contract(item_a);
Item.setProvider(web3.currentProvider);

let contractAddress = "";



// Ensure accounts are fetched at startup
// fetchAccounts();

function removeWhiteSpace(str) {
  return str.trim();
}

function readExcel(filePath) {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet);
  return data;
}
  module.exports = {
  async  fetchAccounts() {
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
    });
    },
  async getProductsName(callback) {
    try {
      if (!contractAddress) await this.fetchAccounts();
      const instance = await Item.deployed();
      const products = await instance.getAllProductNames({ from: contractAddress });
      console.log(products);
      if (typeof callback === 'function') callback({ status: 200, message: "Products fetched successfully!", data: products });
    } catch (e) {
      console.error(e);
      if (typeof callback === 'function') callback({ status: 201, message: "Product Not Found" });
    }
  },
 async checkProduct (productName, callback) {
  try {
    if (!contractAddress) await this.fetchAccounts();
    const instance = await Item.deployed();
    const products = await instance.checkProduct(productName,{ from: contractAddress });
    console.log(products);
    if (typeof callback === 'function') callback({ status: 200, message: "Products fetched successfully!", data: products });
  } catch (e) {
    console.error(e);
    if (typeof callback === 'function') callback({ status: 201, message: "Product Not Found" });
  }
  },
  async addProducts(callback) {
    try {
      if (!contractAddress) await this.fetchAccounts();
      const instance = await Item.deployed();
      const exlsxData = readExcel("./final.xlsx");
      console.log(exlsxData);

      const promises = exlsxData.map(element => {
        let category = element.category.replace(/\s/g, "");
        let productName = removeWhiteSpace(element.porduct_name);
        return instance.addProduct(productName, category, element.boycott, { from: contractAddress, gas: 6000000 });
      });

      await Promise.all(promises);
      if (typeof callback === 'function') callback({ status: 200, message: "Products added successfully!" });
    } catch (error) {
      console.error("Error adding products:", error);
      if (typeof callback === 'function') callback({ status: 500, message: "Error adding products" });
    }
  },

  async getProductsByCategory(categoryName, callback) {
    try {
      if (!contractAddress) await this.fetchAccounts();
      const instance = await Item.deployed();
      const products = await instance.getProductsByCategory(categoryName, { from: contractAddress });
      console.log(products);
      if (typeof callback === 'function') callback({ status: 200, message: "Products fetched successfully!", products });
    } catch (e) {
      console.error(e);
      if (typeof callback === 'function') callback({ status: 201, message: "Product Not Found" });
    }
  },

  async getAllCategories(callback) {
    try {
      if (!contractAddress) await this.fetchAccounts();
      const instance = await Item.deployed();
      const categories = await instance.getAllCategories({ from: contractAddress });
      const newCategories = categories.filter(element => element !== "");
      if (typeof callback === 'function') callback({ status: 200, message: "Categories fetched successfully!", categories: newCategories });
    } catch (e) {
      console.error(e);
      if (typeof callback === 'function') callback({ status: 201, message: "Categories Not Found" });
    }
  },

  async getAllProducts(callback) {
    try {
      if (!contractAddress) await this.fetchAccounts();
      const instance = await Item.deployed();
      const products = await instance.getAllProducts({ from: contractAddress });
      if (typeof callback === 'function') callback({ status: 200, message: "Products fetched successfully!", data: products });
    } catch (e) {
      console.error(e);
      if (typeof callback === 'function') callback({ status: 201, message: "Products Not Found" });
    }
  },

  async getAllCategoriesNotBoycott(categoryName, callback) {
    try {
      if (!contractAddress) await this.fetchAccounts();
      const instance = await Item.deployed();
      const products = await instance.getProductsByCategoryWhenNotBoycott(categoryName, { from: contractAddress });
      console.log(products);
      if (typeof callback === 'function') callback({ status: 200, message: "Products fetched successfully!", products });
    } catch (e) {
      console.error(e);
      if (typeof callback === 'function') callback({ status: 201, message: "Product Not Found" });
    }
  },

  async deleteProduct(productName, callback) {
    try {
      if (!contractAddress) await this.fetchAccounts();
      productName = removeWhiteSpace(productName);
      const instance = await Item.deployed();
      const gasEstimate = await instance.deleteProductByName.estimateGas(productName, { from: contractAddress });
      await instance.deleteProductByName(productName, { from: contractAddress, gas: gasEstimate });
      if (typeof callback === 'function') callback({ status: 200, message: "Product deleted successfully!" });
    } catch (e) {
      console.error(e);
      if (typeof callback === 'function') callback({ status: 201, message: "Product Not Found" });
    }
  }
};
