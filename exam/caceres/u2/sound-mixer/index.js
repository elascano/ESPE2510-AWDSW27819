const port=4005;
const express=require('express');
const app=express();
const mongoose=require('mongoose');

app.use(express.json());

const soundRoutes = require('./routes/soundRoutes');

app.use('/soundmixer/', soundRoutes);

module.exports = app;

mongoose.connect("mongodb+srv://SrJCBM:bdd2025@cluster0.tjvfmrk.mongodb.net/sound_mixer?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("Connected to MongoDB - sound_mixer");
    app.listen(port, '0.0.0.0', () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });
