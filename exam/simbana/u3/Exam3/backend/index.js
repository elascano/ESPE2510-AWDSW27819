const port = 3000
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect(`mongodb+srv://michael:michael2003@cluster0.mennk4o.mongodb.net/Products`);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("System connected to MongoDb Database"));
app.use(express.json());
app.use(cors());

const gloveRoutes = require ("./routes/productsRoutes");
app.use("/api/total", gloveRoutes);
app.listen(port, () => console.log("Michael's Computers Store Server is running on port -->" + port));