const express = require("express");
const Person = require("../models/person");
const router = express.Router();


router.post("/person", async (req, res) => {
    try {
        const personObject = new Person({
            name: req.body.name,
            month: parseInt(req.body.month),
            day: parseInt(req.body.day),
            year: parseInt(req.body.year)
        });
        
        const newPerson = await personObject.save();
        
        res.status(201).json({
            message: "Person created successfully (with date in JSON)",
            person: {
                _id: newPerson._id,
                name: newPerson.name,
                birthDate: {
                    month: newPerson.month,
                    day: newPerson.day,
                    year: newPerson.year
                },
                age: newPerson.age
            }
        });
    } catch (err) {
        res.status(400).json({ 
            message: "Error creating person", 
            error: err.message 
        });
    }
});

router.get("/person", async (req, res) => {
    try {
        const persons = await Person.find();
        res.json(persons);
    } catch (err) {
        res.status(500).json({ 
            message: "Error getting persons", 
            error: err.message 
        });
    }
});

router.get("/person/:id", async (req, res) => {
    try {
        const person = await Person.findById(req.params.id);
        if (!person) {
            return res.status(404).json({ message: "Person not found" });
        }
        res.json(person);
    } catch (err) {
        res.status(500).json({ 
            message: "Error getting person", 
            error: err.message 
        });
    }
});

module.exports = router;
