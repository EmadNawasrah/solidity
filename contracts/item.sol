// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Migrations {
    address public owner;
    uint public lastCompletedMigration;

    modifier restricted() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function setCompleted(uint completed) public restricted {
        lastCompletedMigration = completed;
    }
}

contract Item {
    struct Product {
        string productName;
        string category;
        string boycott;
    }

    Product[] public products;

    function addProductN() public returns (bool sufficient) {
        addProduct("test3", "category3", "alternative3");
        return true;
    }

    function addProduct(
        string memory _productName,
        string memory _category,
        string memory _boycott
    ) public {
        products.push(Product(_productName, _category, _boycott));
    }

    function getProducts() public view returns (string memory) {
        string memory jsonString = " [";

        for (uint i = 0; i < products.length; i++) {
            jsonString = string(abi.encodePacked(jsonString, ""));
            jsonString = string(
                abi.encodePacked(jsonString, "", products[i].productName, '",')
            );
            jsonString = string(
                abi.encodePacked(jsonString, "", products[i].category, '",')
            );
            jsonString = string(
                abi.encodePacked(jsonString, "", products[i].boycott, '"')
            );
            jsonString = string(abi.encodePacked(jsonString, ""));
            if (i < products.length - 1) {
                jsonString = string(abi.encodePacked(jsonString, ","));
            }
        }
        jsonString = string(abi.encodePacked(jsonString, "]"));

        return jsonString;
    }

    function getProductNameById(uint _id) public view returns (string memory) {
        require(_id < products.length, "Product ID does not exist");
        return products[_id].productName;
    }

    function getProductByName(
        string memory _name
    ) public view returns (string memory) {
        for (uint i = 0; i < products.length; i++) {
            if (
                keccak256(abi.encodePacked(products[i].productName)) ==
                keccak256(abi.encodePacked(_name))
            ) {
                string memory jsonString = "[";
                jsonString = string(
                    abi.encodePacked(
                        jsonString,
                        '"',
                        products[i].productName,
                        '",'
                    )
                );
                jsonString = string(
                    abi.encodePacked(
                        jsonString,
                        '"',
                        products[i].category,
                        '",'
                    )
                );
                jsonString = string(
                    abi.encodePacked(jsonString, '"', products[i].boycott, '"')
                );
                jsonString = string(abi.encodePacked(jsonString, "]"));
                return jsonString;
            }
        }
        revert("Product not found");
    }
    function getAllProductNames() public view returns (string[] memory) {
        string[] memory productNames = new string[](products.length);
        for (uint i = 0; i < products.length; i++) {
            productNames[i] = products[i].productName;
        }
        return productNames;
    }
}
