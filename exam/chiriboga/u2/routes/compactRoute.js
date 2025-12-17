const express = require('express');
const Compact = require('../models/compact'); 
const router = express.Router();

router.delete('/compact_disc/:idCompact', async (req, res) => {
    try {
        const compact = await Compact.findOneAndDelete({
            idCompact: req.params.idCompact
        });

        if (!compact) {
            return res.status(404).json({ message: 'Compact not found' });
        }

        res.json({
            message: 'Compact disc permanently deleted',
            compact
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/compact_disc/:idCompact', async (req, res) => {
    try {
        const updatedCompact = await Compact.findOneAndUpdate(
            { idCompact: req.params.idCompact }, 
            req.body,                         
            {
                new: true,       
                runValidators: true 
            }
        );

        if (!updatedCompact) {
            return res.status(404).json({ message: 'Compact not found' });
        }

        res.json({
            message: 'Compact disc updated successfully',
            compact: updatedCompact
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/', (req, res) => {
    res.json({ message: 'Compact disc route working' });
});

module.exports = router;
