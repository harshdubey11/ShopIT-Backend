const express = require("express");
const { createProduct, fetchAllProducts, fetchProductById, updateProductById } = require("../controller/Product");
const router = express.Router();
// '/product' is already added as a base path in index.js
router.post("/", createProduct)
      .get("/", fetchAllProducts)
      .get("/:id",fetchProductById)
      .patch("/:id",updateProductById);
exports.router = router;
