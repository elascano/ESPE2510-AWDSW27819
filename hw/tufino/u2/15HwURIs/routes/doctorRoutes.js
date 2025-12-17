const express = require("express");
const doctor = require("../models/doctor");
const router = express.Router();

// GET 1: Obtener todos los doctores
router.get("/doctors", async (req, res) => {
    try {
        const doctors = await doctor.find();
        res.json(doctors);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// GET 2: Obtener un doctor por ID
router.get("/doctors/:id", async (req, res) => {
    try {
        const doctorFound = await doctor.findById(req.params.id);
        if (!doctorFound) {
            return res.status(404).json({message: "Doctor no encontrado"});
        }
        res.json(doctorFound);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// POST: Insertar un nuevo doctor
router.post("/doctors", async (req, res) => {
    const doctorObject = new doctor({
        _id: req.body._id,
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        correo: req.body.correo,
        horario: req.body.horario,
        estado: req.body.estado,
        especialidadId: req.body.especialidadId
    });
    try {
        const newDoctor = await doctorObject.save();
        res.status(201).json(newDoctor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT: Actualizar un doctor por ID
router.put("/doctors/:id", async (req, res) => {
    try {
        const updatedDoctor = await doctor.findByIdAndUpdate(
            req.params.id,
            {
                nombre: req.body.nombre,
                telefono: req.body.telefono,
                correo: req.body.correo,
                horario: req.body.horario,
                estado: req.body.estado,
                especialidadId: req.body.especialidadId
            },
            { new: true }
        );
        if (!updatedDoctor) {
            return res.status(404).json({message: "Doctor no encontrado"});
        }
        res.json(updatedDoctor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE: Eliminar un doctor por ID
router.delete("/doctors/:id", async (req, res) => {
    try {
        const deletedDoctor = await doctor.findByIdAndDelete(req.params.id);
        if (!deletedDoctor) {
            return res.status(404).json({message: "Doctor no encontrado"});
        }
        res.json({message: "Doctor eliminado exitosamente", doctor: deletedDoctor});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

module.exports = router;
