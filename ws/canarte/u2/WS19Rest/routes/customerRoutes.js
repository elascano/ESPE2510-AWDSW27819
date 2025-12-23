const express = require('express');
const customer = require('../models/customer'); 
const router = express.Router();   

router.get("/customers", async(req, res) => {
    try{
        const customers = await customer.find();
        res.json(customers);
    } catch(err){
        res.status(500).json({message: err.message});
    }
});

router.get('/customers/:id', async (req, res) => {
    try{
        const customerObject = await customer.findOne({id: req.params.id});
        if(customerObject == null){
            res.status(400).json(404);
        } else {
            res.json(customerObject);
        }
    } catch(error){
        res.status(500).json({message: error.message});
    }
});

router.post('/customer', async (req, res) => {
    const customerObject = new customer({
        id: req.body.id,
        name: req.body.name,
        age: req.body.age,
        moneySpent: req.body.moneySpent
    });
    try {
        const newCustomer = await customerObject.save();
        res.status(201).json(newCustomer); // ¡Siempre responde!
    } catch (err) {
        res.status(400).json({ message: err.message }); // ¡Siempre responde!
    }
});

module.exports = router;