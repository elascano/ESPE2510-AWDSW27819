const express = require('express');
const router = express.Router();
const Team = require('../models/Team');

router.get('/', async (req, res) => {
  try {
    res.json(await Team.find());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const team = new Team(req.body);
    const saved = await team.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
