const port=4018;
const express=require('express');
const app=express();
const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://domenica:domenica2004@cluster0.wgtado9.mongodb.net/MedicalAppointment?retryWrites=true&w=majority&appName=Cluster0');

const db=mongoose.connection;
db.on('error', (error)=> console.error(error));
db.once('open', () => console.log('System connected to MongoDb Database'));
app.use(express.json());

const specialtyRoutes = require('./routes/specialtyRoutes');
app.use('/MedicalAppointment', specialtyRoutes);
app.listen(port, () => {
    console.log(`Medical Appointment's Server is running on port --> ${port}`);
});
module.exports = app;