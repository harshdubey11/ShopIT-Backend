const express = require("express");
const { fetchUserById, updateUserById } = require("../controller/User");

const router = express.Router();
// '/user' is already added as a base path in index.js
router.get("/:id", fetchUserById)
      .patch("/:id", updateUserById);
exports.router = router;
