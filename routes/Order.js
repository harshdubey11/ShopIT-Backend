const express = require("express");
const {
  fetchOrdersbyUser,
  createOrder,
  updateOrderById,
  deleteOrder,
  fetchAllOrders,
} = require("../controller/Order");

const router = express.Router();

router
  .get("/user/:userId", fetchOrdersbyUser) //query strings arent mentioned in routes in express but params are mentioned. as params define a specific resource. query string is just a combination of filters
  .post("/", createOrder)
  .patch("/:id", updateOrderById)
  .delete("/:id", deleteOrder)
  .get("/", fetchAllOrders);//admin route for all orders
exports.router = router;
