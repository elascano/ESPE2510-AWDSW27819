const express = require("express");
const patient = require("../models/patient");
const router = express.Router();

router.get("/patients", async (req, res) => {
    try {
        const patients = await patient.find();
        res.json(patients);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

router.post("/patients", async (req, res) => {
    const patientObject = new patient({
        _id: req.body._id,
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        correo: req.body.correo,
        fechaNacimiento: req.body.fechaNacimiento,
        estado: req.body.estado
    });
    try {
        const newPatient = await patientObject.save();
        res.status(201).json(newPatient);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
