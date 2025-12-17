const port = process.env.PORT || 4012;
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://juhuh3001_db_user:Espe123@cluster0.olchaay.mongodb.net/Notebook?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoUri);

const db = mongoose.connection;
db.on('error', (error) => console.error('Mongo connection error:', error));
db.once('open', () => console.log('System connected to MongoDb Database'));
app.use(express.json());

const notenooksRoutes = require('./routes/notebooks');


app.use('/api/notebooks', notenooksRoutes);

app.listen(port, '0.0.0.0', () => {
    console.log(`Users service is running on port ${port}`);
});

module.exports = app;


