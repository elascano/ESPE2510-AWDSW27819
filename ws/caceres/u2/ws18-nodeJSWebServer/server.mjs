import express from "express";
const app = express();
const port = 3006;

app.get('/', (req, res) => {
    res.send('Welcome to German Caceres server');
});

app.listen(port, () => {
    console.log(`Server is running ${port}`);
});
