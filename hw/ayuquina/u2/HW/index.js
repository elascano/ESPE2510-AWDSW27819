const port = 3003;
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://danny:danny@cluster0.crwllgh.mongodb.net/NiceKids?retryWrites=true&w=majority');

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', async () => {
    console.log('System connected to MongoDB Database:', db.databaseName); // imprime "NiceKids"
    try {
        const count = await db.collection('Student').countDocuments();
        console.log('Student collection count:', count);
    } catch (e) {
        console.log('No se pudo contar la colección Student:', e.message);
    }
});

app.use(express.json());
const customerRoutes = require('./routes/studentRoutes');
app.use("/nicekids", customerRoutes); //raiz del sistema + ruta

app.listen(port, () => console.log("Danny's URI's for NiceKids -->"+ port));
