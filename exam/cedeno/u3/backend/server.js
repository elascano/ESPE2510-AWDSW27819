require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3001',
  credentials: true
}));
app.use(bodyParser.json());

const mongoURL = process.env.MONGODB_URI || 'mongodb://localhost:27017/exam_iva';

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('MongoDB connection error:', err));

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
  createdAt: { type: Date, default: Date.now }
});

const ivaCalculationSchema = new mongoose.Schema({
  productId: mongoose.Schema.Types.ObjectId,
  productName: String,
  productPrice: Number,
  ivaRate: Number,
  ivaAmount: Number,
  priceWithIVA: Number,
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('product', productSchema);
const IVACalculation = mongoose.model('ivaCalculation', ivaCalculationSchema);

app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running' });
});

app.post('/api/calculate-iva', async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ 
        error: 'Product name is required' 
      });
    }

    const product = await Product.findOne({ name: new RegExp(name, 'i') });
    
    if (!product) {
      return res.status(404).json({ 
        error: 'Product not found' 
      });
    }

    const ivaRate = 15;
    const ivaAmount = (product.price * ivaRate) / 100;
    const priceWithIVA = product.price + ivaAmount;

    const calculation = new IVACalculation({
      productId: product._id,
      productName: product.name,
      productPrice: product.price,
      ivaRate: ivaRate,
      ivaAmount: parseFloat(ivaAmount.toFixed(2)),
      priceWithIVA: parseFloat(priceWithIVA.toFixed(2))
    });

    await calculation.save();

    res.json({
      success: true,
      data: {
        product: {
          id: product._id,
          name: product.name,
          price: product.price,
          quantity: product.quantity
        },
        calculation: {
          ivaRate: ivaRate,
          ivaAmount: parseFloat(ivaAmount.toFixed(2)),
          priceWithIVA: parseFloat(priceWithIVA.toFixed(2)),
          savedId: calculation._id
        }
      }
    });

  } catch (error) {
    res.status(500).json({ 
      error: error.message 
    });
  }
});

app.post('/api/calculate-iva/:productId', async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    
    if (!product) {
      return res.status(404).json({ 
        error: 'Product not found' 
      });
    }

    const ivaRate = 15;
    const ivaAmount = (product.price * ivaRate) / 100;
    const priceWithIVA = product.price + ivaAmount;

    const calculation = new IVACalculation({
      productId: product._id,
      productName: product.name,
      productPrice: product.price,
      ivaRate: ivaRate,
      ivaAmount: parseFloat(ivaAmount.toFixed(2)),
      priceWithIVA: parseFloat(priceWithIVA.toFixed(2))
    });

    await calculation.save();

    res.json({
      success: true,
      data: {
        product: {
          id: product._id,
          name: product.name,
          price: product.price,
          quantity: product.quantity
        },
        calculation: {
          ivaRate: ivaRate,
          ivaAmount: parseFloat(ivaAmount.toFixed(2)),
          priceWithIVA: parseFloat(priceWithIVA.toFixed(2)),
          savedId: calculation._id
        }
      }
    });

  } catch (error) {
    res.status(500).json({ 
      error: error.message 
    });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    res.status(500).json({ 
      error: error.message 
    });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const { name, price, quantity } = req.body;

    if (!name || price === undefined || !quantity) {
      return res.status(400).json({ 
        error: 'Product name, price, and quantity are required' 
      });
    }

    const existingProduct = await Product.findOne({ name: new RegExp(`^${name}$`, 'i') });
    if (existingProduct) {
      return res.status(400).json({ 
        error: 'Product already exists' 
      });
    }

    const product = new Product({
      name: name,
      price: parseFloat(price),
      quantity: parseInt(quantity)
    });

    await product.save();

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({ 
      error: error.message 
    });
  }
});

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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
