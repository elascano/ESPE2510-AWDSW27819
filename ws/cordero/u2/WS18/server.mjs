import express from "express";
const app = express();
const port = 3010;


app.get( '/' , (req,res) =>{
    res.send('Welcome Danna Server');
});
app.listen(port, () => {
    console.log(`Server running at port ${port}`);
    });