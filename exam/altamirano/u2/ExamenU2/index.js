const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());


const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://alanxavi777:232884@cluster0.pkaomie.mongodb.net/AWS';
mongoose.connect(mongoUri);
const db = mongoose.connection;
db.on("error", (error) => console.error("error:", error));
db.once("open", () => console.log(" connect successful to MongoDB"));

app.get("/", (req, res) => {
  res.send("API  is running");
});


const tvsetRouter = require("./routes/tvsetroutes");
app.use('/', tvsetRouter);

const port = process.env.PORT || 4001;
app.listen(port, () => console.log(`Servidor en el puerto ${port}`));