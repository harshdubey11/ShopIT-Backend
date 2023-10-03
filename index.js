const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");

const { createProduct } = require("./controller/Product");
const productRouter = require("./routes/Product");
const categoryRouter = require("./routes/Category");
const brandRouter = require("./routes/Brand");
const userRouter = require("./routes/User");
const authRouter = require("./routes/Auth");
const cartRouter = require("./routes/Cart");
const orderRouter = require("./routes/Order");
server.use(express.json()); //middleware to parse req.body
server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
main().catch((err) => console.log(err));

server.get("/", (req, res) => {
  res.json({ status: "success" });
});

server.listen(8080, () => {
  console.log("server has started!");
});

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
  console.log("db connected");
}

//Routes
server.use("/users", userRouter.router);
server.use("/auth", authRouter.router);
server.use("/products", productRouter.router);
server.use("/categories", categoryRouter.router);
server.use("/brands", brandRouter.router);
server.use("/cart", cartRouter.router);
server.use("/orders", orderRouter.router);
