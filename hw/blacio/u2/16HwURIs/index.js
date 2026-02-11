const port=4017;
const express=require('express');
const app=express();
const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://eatufino1:eatufino1@cluster0.o2uzj25.mongodb.net/AgeCalculatorDB?retryWrites=true&w=majority&appName=Cluster0');

const db=mongoose.connection;
db.on('error', (error)=> console.error(error));
db.once('open', () => console.log('System connected to AgeCalculatorDB Database'));
app.use(express.json());

const personRoutes = require('./routes/personRoutes');
app.use('/api', personRoutes);
app.listen(port, () => {
    console.log(`Age Calculator API Server is running on port --> ${port}`);
});
module.exports = app;