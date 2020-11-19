const express = require("express");
const router = express.Router();

const blogs = require("./blogs");
const users = require("./users");

router.use("/blogs", blogs);
router.use("/users", users);

module.exports = router;
