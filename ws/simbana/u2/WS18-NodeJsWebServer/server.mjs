import express from "express";
const app = express();
const port = 3016;
app.get('/',(req,res) => {
    res.send('Welcome to Michael Simbaña Server');
});
app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
});