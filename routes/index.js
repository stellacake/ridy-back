const express = require("express");
const router = express.Router();

const rides = require("./rides");
const users = require("./users");

router.use("/rides", rides);
router.use("/users", users);

module.exports = router;
