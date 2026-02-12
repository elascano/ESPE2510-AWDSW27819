const express = require("express");
const cors = require("cors");
const articleRoutes = require("./routes/articleRoutes");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
    res.json({ message: "API is running. Use /api/articles to access articles." });
});

app.use("/api/articles", articleRoutes);

const PORT = 3004;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
