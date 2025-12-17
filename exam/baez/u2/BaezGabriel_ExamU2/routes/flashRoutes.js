const express = require("express");
const FlashDrive = require("../model/flashdrive");
const router = express.Router();


//Create/Insert one User
router.post('/flashdrives', async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'Request body is empty. Please send JSON data.' });
        }

        const flashdriveObject = new FlashDrive({
            serialnumber: req.body.serialnumber,
            brand: req.body.brand,
            model: req.body.model,
            name: req.body.name,
            role: req.body.role,
            price: req.body.price,
            createdAt: req.body.createdAt
        });

        const flashdriveToSave = await flashdriveObject.save();
        res.status(201).json(flashdriveToSave);
    }
    catch(error){
        console.error("Error creating FlashDrive:", error);
        res.status(500).json({ message: error.message});
    }
});

//Delete one User
router.delete('/flashdrives/:id', async (req, res) => {
    try{
        console.log(`Deleting flashdrive with id: ${req.params.id}`);
        const flashdriveObject = await FlashDrive.findById(req.params.id);
        if(flashdriveObject == null){
            console.log('Flash Drive not found');
            return res.status(404).json({message: 'Flash Drive not found'});
        }

        await flashdriveObject.deleteOne();
        console.log('Flash Drive deleted successfully');
        res.json({message: 'Flash Drive deleted successfully', deletedId: req.params.id});
    }
    catch(error){
        console.error('Error deleting flash drive:', error);
        res.status(500).json({message: error.message});
    }
});

module.exports = router;