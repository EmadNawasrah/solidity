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
    string[] public categorys;
    function addProductN() public returns (bool sufficient) {
        addProduct("test3", "category3", "alternative3");
        return true;
    }

    function addProduct(
        string memory _productName,
        string memory _category,
        string memory _boycott
    ) public {
        bool categoryExists = false;
        for (uint i = 0; i < categorys.length; i++) {
            if (
                keccak256(abi.encodePacked(categorys[i])) ==
                keccak256(abi.encodePacked(_category))
            ) {
                categoryExists = true;
                break;
            }
        }
        if (!categoryExists) {
            categorys.push(_category);
        }
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

    function getProductsByCategory(
        string memory _category,
        uint _numberOfProducts
    ) public view returns (string memory) {
        require(
            _numberOfProducts >= 0,
            "Number of products cannot be negative"
        );

        string memory jsonString = "[";
        uint count = 0;

        for (uint i = 0; i < products.length; i++) {
            if (
                keccak256(abi.encodePacked(products[i].category)) ==
                keccak256(abi.encodePacked(_category))
            ) {
                jsonString = string(abi.encodePacked(jsonString, "{"));
                jsonString = string(
                    abi.encodePacked(
                        jsonString,
                        '"productName":"',
                        products[i].productName,
                        '",'
                    )
                );
                jsonString = string(
                    abi.encodePacked(
                        jsonString,
                        '"category":"',
                        products[i].category,
                        '",'
                    )
                );
                jsonString = string(
                    abi.encodePacked(
                        jsonString,
                        '"boycott":"',
                        products[i].boycott,
                        '"'
                    )
                );
                jsonString = string(abi.encodePacked(jsonString, "}"));
                count++;
                if (_numberOfProducts != 0 && count >= _numberOfProducts) {
                    break;
                }
                if (i < products.length - 1) {
                    jsonString = string(abi.encodePacked(jsonString, ","));
                }
            }
        }

        jsonString = string(abi.encodePacked(jsonString, "]"));
        return jsonString;
    }
    function getProductsByCategoryWhenNotBoycott(
        string memory _category,
        uint _numberOfProducts
    ) public view returns (string memory) {
        require(
            _numberOfProducts >= 0,
            "Number of products cannot be negative"
        );

        string memory jsonString = "[";
        uint count = 0;

        for (uint i = 0; i < products.length; i++) {
            if (
                keccak256(abi.encodePacked(products[i].category)) ==
                keccak256(abi.encodePacked(_category)) &&
                keccak256(abi.encodePacked(products[i].boycott)) ==
                keccak256(abi.encodePacked("no"))
            ) {
                jsonString = string(abi.encodePacked(jsonString, "{"));
                jsonString = string(
                    abi.encodePacked(
                        jsonString,
                        '"productName":"',
                        products[i].productName,
                        '",'
                    )
                );
                jsonString = string(
                    abi.encodePacked(
                        jsonString,
                        '"category":"',
                        products[i].category,
                        '",'
                    )
                );
                jsonString = string(
                    abi.encodePacked(
                        jsonString,
                        '"boycott":"',
                        products[i].boycott,
                        '"'
                    )
                );
                jsonString = string(abi.encodePacked(jsonString, "}"));
                count++;
                if (_numberOfProducts != 0 && count >= _numberOfProducts) {
                    break;
                }
                if (i < products.length - 1) {
                    jsonString = string(abi.encodePacked(jsonString, ","));
                }
            }
        }

        jsonString = string(abi.encodePacked(jsonString, "]"));
        return jsonString;
    }
    function getAllCategories() public view returns (string[] memory) {
        return categorys;
    }

    contract Item {
    // Existing code...

    // Function to update product data by ID
    function updateProductById(
        uint _id,
        string memory _productName,
        string memory _category,
        string memory _boycott
    ) public {
        require(_id < products.length, "Product ID does not exist");
        products[_id].productName = _productName;
        products[_id].category = _category;
        products[_id].boycott = _boycott;
    }

    // Function to add category to the categories array
    function addCategory(string memory _category) public {
        categorys.push(_category);
    }

    // Function to delete product by ID
    function deleteProductById(uint _id) public {
        require(_id < products.length, "Product ID does not exist");
        for (uint i = _id; i < products.length - 1; i++) {
            products[i] = products[i + 1];
        }
        products.pop();
    }
}
}
