const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const databaseConfig = require('./config/database');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
databaseConfig();

// Routes
app.use('/api', routes());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});