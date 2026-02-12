import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de MongoDB (usa env en Render/producción)
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://macordero:espe2025@cluster0.fwu2dep.mongodb.net/';
const DATABASE_NAME = 'Tienda';

// Middleware
app.use(cors());
app.use(express.json());

// Cliente de MongoDB
let db;
let client;

// Conectar a MongoDB
async function connectToDatabase() {
  try {
    client = new MongoClient(MONGO_URI);
    await client.connect();
    db = client.db(DATABASE_NAME);
    console.log('✅ Conectado a MongoDB - Base de datos: Tienda');
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error);
    process.exit(1);
  }
}

// Rutas
app.get('/api/productos', async (req, res) => {
  try {
    const productos = await db.collection('productos').find({}).toArray();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos', details: error.message });
  }
});

app.get('/api/carrito', async (req, res) => {
  try {
    const carrito = await db.collection('carrito').find({}).toArray();
    res.json(carrito);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener carrito', details: error.message });
  }
});

// Ruta para obtener todos los datos combinados
app.get('/api/all', async (req, res) => {
  try {
    const productos = await db.collection('productos').find({}).toArray();
    const carrito = await db.collection('carrito').find({}).toArray();
    res.json({ productos, carrito });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener datos', details: error.message });
  }
});

// Eliminar producto con verificación de vínculos en carrito
app.delete('/api/productos/:id', async (req, res) => {
  const { id } = req.params;
  const { force } = req.query;

  // Construir filtros que soporten ObjectId o string
  const filters = [{ _id: id }];
  try {
    filters.push({ _id: new ObjectId(id) });
  } catch (e) {
    // ignorar error de ObjectId inválido
  }

  try {
    const producto = await db.collection('productos').findOne({ $or: filters });
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Verificar vínculos en carrito (soporta arrays de ids o objetos con productoId/_id)
    const objectId = filters.find((f) => f._id instanceof ObjectId)?._id;
    const vinculado = await db.collection('carrito').findOne({
      $or: [
        { productos: id },
        objectId ? { productos: objectId } : null,
        { 'productos._id': id },
        objectId ? { 'productos._id': objectId } : null,
        { 'productos.productoId': id },
        objectId ? { 'productos.productoId': objectId } : null
      ].filter(Boolean)
    });

    if (vinculado && force !== 'true') {
      return res.status(409).json({
        error: 'Producto vinculado a compras',
        message: 'El producto está asociado a al menos un carrito. Confirma el borrado definitivo.',
        linked: true
      });
    }

    const resultado = await db.collection('productos').deleteOne({ $or: filters });
    if (resultado.deletedCount === 0) {
      return res.status(500).json({ error: 'No se pudo eliminar el producto' });
    }

    res.json({ deleted: true, linked: !!vinculado });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto', details: error.message });
  }
});

// Iniciar servidor
connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
});

// Cerrar conexión al terminar
process.on('SIGINT', async () => {
  if (client) {
    await client.close();
    console.log('Conexión a MongoDB cerrada');
  }
  process.exit(0);
});
