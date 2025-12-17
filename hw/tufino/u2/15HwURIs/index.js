const port=3017;
const express=require('express');
const app=express();
const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://eatufino1:eatufino1@cluster0.o2uzj25.mongodb.net/MedicalAppointment?retryWrites=true&w=majority&appName=Cluster0');

const db=mongoose.connection;
db.on('error', (error)=> console.error(error));
db.once('open', () => console.log('System connected to MongoDb Database'));
app.use(express.json());

const patientRoutes = require('./routes/patientRoutes');
app.use('/hospital', patientRoutes);

const doctorRoutes = require('./routes/doctorRoutes');
app.use('/hospital', doctorRoutes);
app.listen(port, () => {
    console.log(`Erick's Hospital Management System Server is running on port --> ${port}`);
});
module.exports = app;