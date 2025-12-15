const express = require("express");
const router = express.Router();
const Stand = require("../models/stand");

router.get("/", async (req, res) => {
  const items = await Stand.find();
  res.json(items);
});

module.exports = router;