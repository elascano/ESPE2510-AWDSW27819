const port=3018;
const express=require('express');
const app=express();
const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://domenica:domenica2004@cluster0.wgtado9.mongodb.net/pictureFrame?retryWrites=true&w=majority&appName=Cluster0');


const db=mongoose.connection;
db.on('error', (error)=> console.error(error));
db.once('open', () => console.log('System connected to MongoDb Database'));
app.use(express.json());

const pictureFrameRoutes = require('./routes/pictureFrameRoutesFixed');
app.use('/pictureFrame', pictureFrameRoutes);
app.listen(port, () => {
    console.log(`Domenica's Picture Frame Store Server is running on port --> ${port}`);
});
module.exports = app;