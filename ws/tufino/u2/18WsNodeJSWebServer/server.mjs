import express from "express";
const app = express();
const port = 3017;
app.get('/',(req,res) => {
    res.send('Welcome to Erick Server');
});
app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
});