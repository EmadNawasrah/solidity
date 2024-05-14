const express = require('express');
const router = express.Router();

router.get('/getAllProducts', (req, res) => res.send({
    status: 200, data:
        [
            {id:1, product_name: "test", category: "gum", product_type: "yes" },
            {id:2, product_name: "test", category: "gum", product_type: "yes" },
            {id:3, product_name: "test", category: "gum", product_type: "yes" },
            {id:4, product_name: "test", category: "gum", product_type: "yes" },
            {id:5, product_name: "test", category: "gum", product_type: "yes" },
            {id:6, product_name: "test", category: "gum", product_type: "yes" },
            {id:7, product_name: "test", category: "gum", product_type: "yes" },
            {id:8, product_name: "test", category: "gum", product_type: "yes" },
            {id:9, product_name: "test", category: "gum", product_type: "yes" },
            {id:10, product_name: "test", category: "gum", product_type: "yes" },
            {id:11, product_name: "test", category: "gum", product_type: "yes" },
            {id:12, product_name: "test", category: "gum", product_type: "yes" },
            {id:13, product_name: "test", category: "gum", product_type: "yes" },
            {id:14, product_name: "test", category: "gum", product_type: "yes" },
            {id:15, product_name: "test", category: "gum", product_type: "yes" },
            {id:16, product_name: "test", category: "gum", product_type: "yes" },
            {id:17, product_name: "test", category: "gum", product_type: "yes" },
            {id:18, product_name: "test", category: "gum", product_type: "yes" },
            {id:19, product_name: "test", category: "gum", product_type: "yes" },
        ]
}
));

router.get('/getAllCategories', (req, res) => res.send({
    status: 200, data:
        [
            "catiegory1",
            "catiegory2",
            "catiegory3",
            "catiegory4",
            "catiegory5",
        ]
}
));

router.post('/addNewProduct', (req, res) => res.send({
    status: 200, message:"Added Product Successfully",data:{id:1}
}
));
module.exports = router;