const port = process.env.PORT || 3004
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Configure mongoose
mongoose.set('strictQuery', false);

// Connect to MongoDB with proper options
mongoose.connect(`mongodb+srv://gabaez1:gabriel2004@cluster0.uwoxjbl.mongodb.net/`, {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
})
.then(() => {
    console.log("System connected to MongoDb Database");
    // Start server only after DB connection is established
    app.listen(port, '0.0.0.0', () => 
        console.log("Server is running on port -->" + port));
})
.catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
});

const db = mongoose.connection;
db.on("error", (error) => console.error("MongoDB error:", error));
db.on("disconnected", () => console.log("MongoDB disconnected"));

app.use(express.json());
const flashRoutes = require("./routes/flashRoutes");
app.use("/Exam", flashRoutes);
