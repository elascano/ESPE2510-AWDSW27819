const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('./js/data-base');
const { Schema, Types } = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors());

// Modelo flexible ligado a la colección "chickens"
const Chicken = mongoose.model('Chicken', new Schema({}, { strict: false }), 'chickens');

// Servir archivos estáticos desde la carpeta del proyecto
app.use(express.static(path.resolve(__dirname)));

// GET /api/chickens/:id  -> busca por _id (ObjectId) o por chickenId (numérico)
app.get('/api/chickens/:id', async (req, res) => {
  const { id } = req.params;

  try {
    let doc = null;

    // intentar buscar por ObjectId si el formato es válido (24 hex chars)
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
    if (isObjectId) {
      doc = await Chicken.findById(Types.ObjectId(id)).lean();
    }

    if (!doc) {
      // intentar buscar por chickenId numérico
      const num = Number(id);
      if (!Number.isNaN(num)) {
        doc = await Chicken.findOne({ chickenId: num }).lean();
      }
    }

    if (!doc) return res.status(404).json({ message: 'Not found' });

    return res.json(doc);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

ObjectId('6904c052d264a00fde110377')
