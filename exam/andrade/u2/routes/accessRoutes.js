const express = require('express');
const Product = require('../models/product');
const router = express.Router();

//Product: GET ALL
router.get('/product', async (req, res) => {
  try {
    const product = await Product.find();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;