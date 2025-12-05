const port=3017;
const express=require('express');
const app=express();
const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://oop:oop@cluster0.9knxc.mongodb.net/oop?retryWrites=true&w=majority&appName=Cluster0');

const db=mongoose.connection;
db.on('error', (error)=> console.error(error));
db.once('open', () => console.log('System connected to MongoDb Database'));
app.use(express.json());

const customerRoutes = require('./routes/customerRoutes');
app.use('/computerstore', customerRoutes);
app.listen(port, () => {
    console.log(`Erick's Computers Store Server is running on port --> ${port}`);
});
module.exports = app;