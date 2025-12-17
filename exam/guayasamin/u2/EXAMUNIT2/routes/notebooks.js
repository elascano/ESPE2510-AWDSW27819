const express = require('express');
const router = express.Router();
const Notebook = require('../models/Notebook');


// GET /api/notebook/:id
router.get('/:id', async (req, res) => {
    try {
        console.log('Search by id:', parseInt(req.params.id));
        const allNotebooks = await Notebook.find({});
        console.log('All notebooks:', allNotebooks);
        
        const notebook = await Notebook.findOne({ id: parseInt(req.params.id) });
        if (!notebook) {
            return res.status(404).json({ message: 'Notebook not found' });
        }
        res.json(notebook);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});


module.exports = router;

