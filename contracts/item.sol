// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Item {
    struct Product {
        string productName;
        string category;
        string boycott;
    }

    mapping(uint => Product) public products;
    mapping(string => uint) private productIndex;
    mapping(string => bool) private categoryExists;
    string[] public categories;
    uint public productCount;

    event ProductAdded(uint productId, string productName, string category, string boycott);
    event ProductDeleted(uint productId, string productName);

    function addProduct(
        string memory _productName,
        string memory _category,
        string memory _boycott
    ) public {
        if (!categoryExists[_category]) {
            categories.push(_category);
            categoryExists[_category] = true;
        }
        products[productCount] = Product(_productName, _category, _boycott);
        productIndex[_productName] = productCount;

        emit ProductAdded(productCount, _productName, _category, _boycott);

        productCount++;
    }

    function deleteProductByName(string memory _productName) public {
        uint index = productIndex[_productName];
        require(index < productCount, "Product not found");

        emit ProductDeleted(index, _productName);

        delete products[index];
        delete productIndex[_productName];
    }

    function getAllProductNames() public view returns (string[] memory) {
        string[] memory productNames = new string[](productCount);
        uint counter = 0;
        for (uint i = 0; i < productCount; i++) {
            if (bytes(products[i].productName).length != 0) {
                productNames[counter] = products[i].productName;
                counter++;
            }
        }
        return productNames;
    }

    function getProductsByCategory(string memory _category) public view returns (string[] memory, string[] memory, string[] memory) {
        uint count = 0;
        for (uint i = 0; i < productCount; i++) {
            if (keccak256(abi.encodePacked(products[i].category)) == keccak256(abi.encodePacked(_category))) {
                count++;
            }
        }

        string[] memory productNames = new string[](count);
        string[] memory productCategories = new string[](count);
        string[] memory productBoycotts = new string[](count);

        uint index = 0;
        for (uint i = 0; i < productCount; i++) {
            if (keccak256(abi.encodePacked(products[i].category)) == keccak256(abi.encodePacked(_category))) {
                productNames[index] = products[i].productName;
                productCategories[index] = products[i].category;
                productBoycotts[index] = products[i].boycott;
                index++;
            }
        }

        return (productNames, productCategories, productBoycotts);
    }

    function getAllCategories() public view returns (string[] memory) {
        return categories;
    }
    function checkProduct(string memory _productName) public view returns (string memory productName, string memory category, string memory boycott) {
    uint index = productIndex[_productName];
    require(index < productCount, "Product not found");
    
    Product memory foundProduct = products[index];
    
    productName = foundProduct.productName;
    category = foundProduct.category;
    boycott = foundProduct.boycott;
}
}
