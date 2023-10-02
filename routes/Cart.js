const express = require("express");
const {
  fetchCartbyUser,
  addToCart,
  updateUserCart,
  deleteFromUserCart,
} = require("../controller/Cart");

const router = express.Router();

router
  .get("/", fetchCartbyUser)//query strings arent mentioned in routes in express but params are mentioned. as params define a specific resource. query string is just a combination of filters
  .post("/", addToCart)
  .patch("/:id", updateUserCart)
  .delete("/:id", deleteFromUserCart);
exports.router = router;
