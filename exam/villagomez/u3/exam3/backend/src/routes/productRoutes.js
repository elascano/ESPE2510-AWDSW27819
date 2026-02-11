const express = require("express");
const { daysToExpire } = require("../controllers/productController");

const router = express.Router();

router.post("/days-to-expire", daysToExpire);

module.exports = router;
