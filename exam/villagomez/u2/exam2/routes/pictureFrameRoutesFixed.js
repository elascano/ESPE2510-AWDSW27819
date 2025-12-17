const express = require("express");
const PictureFrame = require("../model/pictureFrame");
const router = express.Router();

// GET / => list non-deleted picture frames
// Use { deleted: { $ne: true } } so we include documents that don't have the field yet
router.get('/', async (req, res) => {
    try {
        const frames = await PictureFrame.find({ deleted: { $ne: true } });
        res.json(frames);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST / => create a picture frame; finalPrice computed automatically in model
router.post('/', async (req, res) => {
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

// Logical DELETE by serialNumber (marks `deleted: true`)
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

// Physical DELETE by serialNumber using JSON body { id }
router.delete('/', async (req, res) => {
    const serial = Number(req.body.id);
    if (Number.isNaN(serial)) {
        return res.status(400).json({ message: 'Invalid id in request body' });
    }
    try {
        const deleted = await PictureFrame.findOneAndDelete({ serialNumber: serial });
        if (!deleted) {
            return res.status(404).json({ message: 'Picture frame not found' });
        }
        res.json({ message: 'Picture frame permanently deleted', pictureFrame: deleted });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
