const express = require("express");
const PictureFrame = require("../model/pictureFrame");
const router = express.Router();

router.get('/pictureFrame', async (req, res) => {
    try {
        const frames = await PictureFrame.find({ deleted: false });
        res.json(frames);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/pictureFrame', async (req, res) => {
    const pictureFrameObject = new PictureFrame({
        serialNumber: req.body.serialNumber,
        brand: req.body.brand,
        model: req.body.model,
        color: req.body.color,
        material: req.body.material,
        new: req.body.new,
        price: req.body.price
    });
    try {
        const newpictureFrame = await pictureFrameObject.save();
        res.status(201).json(newpictureFrame);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:serialNumber', async (req, res) => {
    const serial = Number(req.params.serialNumber);
    if (Number.isNaN(serial)) {
        return res.status(400).json({ message: 'Invalid serialNumber' });
    }
    try {
        const updated = await PictureFrame.findOneAndUpdate(
            { serialNumber: serial },
            { deleted: true },
            { new: true }
        );
        if (!updated) {
            return res.status(404).json({ message: 'Picture frame not found' });
        }
        res.json({ message: 'Picture frame logically deleted', pictureFrame: updated });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;