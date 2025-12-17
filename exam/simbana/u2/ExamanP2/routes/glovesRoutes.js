const express = require("express");
const glove = require("../models/glove");
const router = express.Router();


router.get("/gloves", async (req, res) => {
  try {
    const gloves = await glove.find();
    res.json(gloves);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/gloves/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "ID is required" });

  try {
    const gloveObject = await glove.findOne({ id });
    if (!gloveObject) {
      return res.status(404).json({ message: "glove not found" });
    }
    res.json(gloveObject);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post("/glove", async (req, res) => {
  const calculateDaysRemaining = (day, month, year) => {
    if (!day || !month || !year) return null;
    const appointmentDate = new Date(year, month - 1, day);
    const today = new Date();
    const timeDifference = appointmentDate - today;
    const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return daysRemaining;
  };

  const daysRemaining = calculateDaysRemaining(req.body.day, req.body.month, req.body.year);

  const gloveObject = new glove({
    id: req.body.id,
    name: req.body.name,
    serialNumber: req.body.serialNumber,
    brand: req.body.brand,
    model: req.body.model,
    price: req.body.price,
    day: req.body.day,

  });

  try {
    const gloveToSave = await gloveObject.save();
    res.status(200).json(gloveToSave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.put("/glove/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "ID is required" });

  const calculateDaysRemaining = (day, month, year) => {
    if (!day || !month || !year) return null;
    const appointmentDate = new Date(year, month - 1, day);
    const today = new Date();
    const timeDifference = appointmentDate - today;
    const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return daysRemaining;
  };

  const daysRemaining = calculateDaysRemaining(req.body.day, req.body.month, req.body.year);

  try {
    const updatedGlove = await glove.findOneAndUpdate(
      { id },
      {
        name: req.body.name,
    serialNumber: req.body.serialNumber,
    brand: req.body.brand,
    model: req.body.model,
    price: req.body.price,
    day: req.body.day,
      },
      { new: true }
    );

    if (!updatedGlove) {
      return res.status(404).json({ message: "glove not found" });
    }

    res.json(updatedGlove);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



router.delete("/glove/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "ID is required" });

  try {
    const deletedglove = await glove.findOneAndDelete({ id });

    if (!deletedglove) {
      return res.status(404).json({ message: "glove not found" });
    }

    res.json({ message: "glove deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
