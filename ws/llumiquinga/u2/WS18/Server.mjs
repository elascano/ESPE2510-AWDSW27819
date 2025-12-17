import express from "express";
const app = express();
const port = 3014;


app.get( '/' , (req,res) =>{
    res.send('Welcome Ariel Server');
});
app.listen( port , () =>{
    console.log( `Server is running on port ${ port }` );
} );