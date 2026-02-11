const express = require("express");
const total = require("../models/total");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const totalProducts = await total.find();
    res.json(totalProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const calculateTotalPrice = async () => {
    const products = await total.find();
    const totalPrice = products.reduce((acc, product) => acc + (product.price || 0), 0);
    return totalPrice;
};

router.get("/calculate", async (req, res) => {
  try {
    const products = await total.find();
    const totalPrice = products.reduce((acc, product) => acc + (product.price || 0), 0);
    res.json({ 
      total: totalPrice.toFixed(2),
      count: products.length
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/calculate-cart", async (req, res) => {
  try {
    const { items } = req.body;
    
    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ message: "Invalid items format" });
    }

    let cartTotal = 0;
    const details = [];
    
    for (const item of items) {
      const product = await total.findById(item.id);
      if (product) {
        const itemTotal = product.price * item.quantity;
        cartTotal += itemTotal;
        details.push({
          id: product._id,
          name: product.name,
          price: product.price,
          quantity: item.quantity,
          subtotal: itemTotal.toFixed(2)
        });
      }
    }
    
    res.json({ 
      total: cartTotal.toFixed(2),
      itemCount: items.length,
      details: details
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
