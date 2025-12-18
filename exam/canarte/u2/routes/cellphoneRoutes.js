const express = require('express');
const Cellphone= require('../models/cellphone');
const router = express.Router();

router.get('/cellphone', async (req, res) => {
    try {
        const cellphones = await Cellphone.find();
        res.json(cellphones);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;