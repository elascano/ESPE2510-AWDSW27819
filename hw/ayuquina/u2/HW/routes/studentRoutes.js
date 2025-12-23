const express = require('express');
const student = require('../models/Student'); 
const router = express.Router();   

router.get("/students", async(req, res) => {
    try{
        const students = await student.find();
        res.json(students);
    } catch(err){
        res.status(500).json({message: err.message});
    }
});

router.get('/students/:id', async (req, res) => {
    try{
        const studentObject = await student.findOne({id: req.params.id});
        if(studentObject == null){
            res.status(400).json(404);
        } else {
            res.json(studentObject);
        }
    } catch(error){
        res.status(500).json({message: error.message});
    }
});

router.post('/students', async (req, res) => {
    const studentObject = new student({
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthDate: req.body.birthDate,
        age: req.body.age,
        gender: req.body.gender,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        medicalInfo: req.body.medicalInfo,
        emergencyContact: req.body.emergencyContact,
        emergencyPhone: req.body.emergencyPhone,
        isActive: req.body.isActive
    });

    try {
        const newStudent = await studentObject.save();
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/students/:id', async (req, res) => {
    try {
        const studentObject = await student.findOne({ id: req.params.id });
        if (studentObject == null) {
            return res.status(404).json({ message: 'Student not found' });
        }
        Object.assign(studentObject, req.body);
        const updatedStudent = await studentObject.save();
        res.json(updatedStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Logic for DELETE method
router.patch('/students/:id', async (req, res) => {
    try {
        const id = isNaN(req.params.id) ? req.params.id : Number(req.params.id);
        const updated = await student.findOneAndUpdate(
            { id: id },
            { $set: req.body },               // solo setea los campos del body
            { new: true, runValidators: true } // devuelve el documento actualizado
        );
        if (!updated) return res.status(404).json({ message: 'Student not found' });
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/*router.delete('/students/:id', async (req, res) => {
    try {
        const studentObject = await student.findOne({ id: req.params.id });
        if (studentObject == null) {
            return res.status(404).json({ message: 'Student not found' });
        }
        await studentObject.isActive? false : true;
        await studentObject.save();
        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});*/

module.exports = router;