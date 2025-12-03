import express from "express";
const app = express();
const port = 3015;
app.get('/',(req,res) => {
    res.send('Welcome to Jeancarlo Server');
});
app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
});