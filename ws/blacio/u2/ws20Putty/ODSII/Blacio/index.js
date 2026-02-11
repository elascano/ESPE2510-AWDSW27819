const express = require("express");
const mongoose = require("mongoose");
const destinationRoutes = require("./routes/destinationRoutes");
require("dotenv").config();

const app = express();
const port = 4005;

app.use(express.json());

app.use("/api", destinationRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB - travel_brain");
    app.listen(port, '0.0.0.0', () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });
