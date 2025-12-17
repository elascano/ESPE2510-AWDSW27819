const express = require('express');
const router = express.Router();
const TvSet = require('../module/tvsetmodule');

router.post('/tvset', async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: 'Request body vacío' });
  }

  const tvObject = new TvSet({
    idtv: req.body.idtv ?? null,
    smart: req.body.smart ?? false,
    pulgadas: req.body.pulgadas ?? null,
    marca: req.body.marca ?? null,
    precio: req.body.precio ?? null
  });

  try {
    const newTv = await tvObject.save();
    res.status(201).json(newTv);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});




module.exports = router;