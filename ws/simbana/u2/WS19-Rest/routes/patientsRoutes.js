const express = require("express");
const patient = require("../models/patient");
const router = express.Router();


router.get("/patients", async (req, res) => {
  try {
    const patients = await patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/patients/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "ID is required" });

  try {
    const patientObject = await patient.findOne({ id });
    if (!patientObject) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.json(patientObject);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post("/patient", async (req, res) => {
  const patientObject = new patient({
    id: req.body.id,
    name: req.body.name,
    lastname: req.body.lastname,
    age: req.body.age,
    cellphone: req.body.cellphone
  });

  try {
    const patientToSave = await patientObject.save();
    res.status(200).json(patientToSave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.put("/patient/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "ID is required" });

  try {
    const updatedPatient = await patient.findOneAndUpdate(
      { id },
      {
        name: req.body.name,
        lastname: req.body.lastname,
        age: req.body.age,
        cellphone: req.body.cellphone
      },
      { new: true }
    );

    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json(updatedPatient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



router.delete("/patient/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "ID is required" });

  try {
    const deletedPatient = await patient.findOneAndDelete({ id });

    if (!deletedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json({ message: "Patient deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
