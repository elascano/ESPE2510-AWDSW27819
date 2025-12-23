const port = 3007;
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://oop:oop@cluster0.9knxc.mongodb.net/oop?retryWrites=true&w=majority&appName=Cluster0');

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('System connected to MongoDB Database'));

app.use(express.json());
const customerRoutes = require('./routes/customerRoutes');
app.use("/computerstore", customerRoutes); //raiz del sistema + ruta

app.listen(port, () => console.log("Saray's Computers Store Server is running on port -->"+ port));
