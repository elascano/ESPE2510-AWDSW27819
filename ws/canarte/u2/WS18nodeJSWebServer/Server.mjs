import express from "express";
const app = express();
const port = 4007;

app.get('/', (req, res) => {
    res.send('Welcome to Saray Server!');
}
);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});