const express = require('express');
const VinylRecord = require('../models/product');
const router = express.Router();

//VinylRecord: GET ALL
router.get('/vinylrecords', async (req, res) => {
  try {
    const records = await VinylRecord.find();
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//VinylRecord: UPDATE ONE BY serialnumber
router.put('/vinylrecords/:serialnumber', async (req, res) => {
  try {
    const updated = await VinylRecord.findOneAndUpdate(
      { serialnumber: req.params.serialnumber },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Vinyl record not found' });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;