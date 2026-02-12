const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

const IVA_RATE = 0.16;

router.get('/:product_id/iva', async (req, res) => {
    const { product_id } = req.params;
    try {
        const product = await Product.findOne({ product_id });
        if (product) {
            const iva = product.product_price * IVA_RATE;
            res.json({
                product_id: product.product_id,
                product_name: product.product_name,
                iva: parseFloat(iva.toFixed(2))
            });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to calculate product IVA' });
    }
});

module.exports = router;
