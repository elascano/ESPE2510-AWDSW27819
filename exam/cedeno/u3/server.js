const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// MongoDB Connection
const mongoURL = 'mongodb://localhost:27017/exam_iva';

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('MongoDB connection error:', err));

// Schema for IVA Calculation
const ivaCalculationSchema = new mongoose.Schema({
  products: [
    {
      name: String,
      price: Number
    }
  ],
  totalPrice: Number,
  ivaRate: Number,
  ivaAmount: Number,
  finalPrice: Number,
  createdAt: { type: Date, default: Date.now }
});

const IVACalculation = mongoose.model('ivaCalculation', ivaCalculationSchema);

// Routes

// GET - Home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// POST - Calculate IVA
app.post('/api/calculate-iva', async (req, res) => {
  try {
    const { products } = req.body;

    // Validate that we have exactly 5 products
    if (!Array.isArray(products) || products.length !== 5) {
      return res.status(400).json({ 
        error: 'You must provide exactly 5 products' 
      });
    }

    // Calculate totals
    let totalPrice = 0;
    products.forEach(product => {
      if (!product.name || product.price === undefined) {
        throw new Error('Each product must have name and price');
      }
      totalPrice += parseFloat(product.price);
    });

    const ivaRate = 21; // 21% IVA
    const ivaAmount = (totalPrice * ivaRate) / 100;
    const finalPrice = totalPrice + ivaAmount;

    // Save to MongoDB
    const calculation = new IVACalculation({
      products: products,
      totalPrice: totalPrice.toFixed(2),
      ivaRate: ivaRate,
      ivaAmount: parseFloat(ivaAmount.toFixed(2)),
      finalPrice: parseFloat(finalPrice.toFixed(2))
    });

    await calculation.save();

    res.json({
      success: true,
      data: {
        products: products,
        totalPrice: parseFloat(totalPrice.toFixed(2)),
        ivaRate: ivaRate,
        ivaAmount: parseFloat(ivaAmount.toFixed(2)),
        finalPrice: parseFloat(finalPrice.toFixed(2)),
        savedId: calculation._id
      }
    });

  } catch (error) {
    res.status(500).json({ 
      error: error.message 
    });
  }
});

// GET - Get all calculations
app.get('/api/calculations', async (req, res) => {
  try {
    const calculations = await IVACalculation.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: calculations
    });
  } catch (error) {
    res.status(500).json({ 
      error: error.message 
    });
  }
});

// GET - Get calculation by ID
app.get('/api/calculation/:id', async (req, res) => {
  try {
    const calculation = await IVACalculation.findById(req.params.id);
    if (!calculation) {
      return res.status(404).json({ 
        error: 'Calculation not found' 
      });
    }
    res.json({
      success: true,
      data: calculation
    });
  } catch (error) {
    res.status(500).json({ 
      error: error.message 
    });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
