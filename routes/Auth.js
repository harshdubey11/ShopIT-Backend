const express = require("express");
const { createUser, loginUser } = require("../controller/Auth");

const router = express.Router();
// '/user' is already added as a base path in index.js
router.post("/signup",createUser)
      .post("/login",loginUser);
exports.router = router;
