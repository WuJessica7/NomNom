// This is an example of a route file for a product API. Not intended to be used in the final project.

// This file is where routes for products are located (not used in project)
const express = require("express");
const Product = require("../models/product.model.js");

// We'll need to create this router; it points to other things.
const router = express.Router();

// This lets us use the controller functions in the controller file.
const {getProducts, getProduct, createProduct, updateProduct, deleteProduct} = require('../controllers/product.controller.js');

// General one. This is good.
// The thing inside (getProducts, createProduct, etc.) is called a controller. We need to have other files for controllers.
router.get('/', getProducts);

router.get("/:id", getProduct);

router.post("/", createProduct);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);


// Exports router we defined here so it can be used in other files.
module.exports = router;