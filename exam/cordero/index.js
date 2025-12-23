const port=4010;
const express=require('express');
const app=express();
const mongoose=require('mongoose');

// Connect to Homework database using provided connection string
mongoose.connect('mongodb+srv://macordero:espe2025@cluster0.fwu2dep.mongodb.net/Homework');

const db=mongoose.connection;
db.on('error', (error)=> console.error(error));
db.once('open', () => console.log('System connected to MongoDb Database'));
app.use(express.json());

const accessRoutes = require('./routes/accessRoutes');
app.use('/MartinStore', accessRoutes);
app.listen(port, () => {
    console.log(`MartinStore Server is running on port --> ${port}`);
});
module.exports = app;