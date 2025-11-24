const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");

const teamRoutes = require("./routes/team");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/team", teamRoutes);
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

app.use(express.static(path.join(__dirname, "..")));

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "..", "/panels/clients.html"));
});

const PORT = process.env.PORT || 5502;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

