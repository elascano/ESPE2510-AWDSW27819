import express from "express";
import mongoose from "mongoose";

const app = express();
const port = 4015;


app.use(express.json());


const mongoURI = "mongodb+srv://jeancarlo:jean12345@cluster0.3ixvnnj.mongodb.net/Quizz?retryWrites=true&w=majority";

mongoose.connect(mongoURI)
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log("MongoDB connection error:", err));


const notaSchema = new mongoose.Schema({
  nota1: Number,
  nota2: Number,
  nota3: Number,
  promedio: Number,
});

const Nota = mongoose.model('Nota', notaSchema, 'Grades');


app.get('/', (req, res) => {
  res.send('Welcome to Santi, llumiquinga, lainez Server');
});


app.post('/grades', async (req, res) => {
  try {
    const { nota1, nota2, nota3 } = req.body;
    
    console.log("Received data:", req.body);
    
    if (!nota1 || !nota2 || !nota3) {
      return res.status(400).json({ 
        error: "All three grades are required" 
      });
    }
    

    const promedio = (Number(nota1) + Number(nota2) + Number(nota3)) / 3;
    
    console.log("Calculated average:", promedio);
    
    const nuevaNota = new Nota({
      nota1: Number(nota1),
      nota2: Number(nota2),
      nota3: Number(nota3),
      promedio: promedio
    });
    
    const savedNota = await nuevaNota.save();
    console.log("Saved to database:", savedNota);
    
    res.json({
      message: "Grades saved successfully",
      data: savedNota
    });
  } catch (error) {
    console.error("Error saving grades:", error);
    res.status(500).json({ error: error.message });
  }
});


app.get('/grades', async (req, res) => {
  try {
    const notas = await Nota.find();
    console.log("Found grades:", notas.length);
    res.json(notas);
  } catch (error) {
    console.error("Error fetching grades:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});