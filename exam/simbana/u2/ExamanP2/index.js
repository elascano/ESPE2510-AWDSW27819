const port = 3016
const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(`mongodb+srv://michael:michael2003@cluster0.mennk4o.mongodb.net/GooalKeeper`);


const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("System connected to MongoDb Database"));
app.use(express.json());
const gloveRoutes = require ("./routes/glovesRoutes");
app.use("/Gloves", gloveRoutes);
app.listen(port, () => console.log("Michael's Computers Store Server is running on port -->" + port));