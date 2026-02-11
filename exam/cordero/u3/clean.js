import { MongoClient } from 'mongodb';

const MONGO_URI = 'mongodb+srv://macordero:espe2025@cluster0.fwu2dep.mongodb.net/';
const DATABASE_NAME = 'Tienda';

async function cleanDatabase() {
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db(DATABASE_NAME);
    
    // Eliminar los productos que inserté con seed.js
    const productosAEliminar = [
      "Laptop Dell XPS 13",
      "iPhone 15 Pro",
      "Samsung Galaxy S24",
      "iPad Pro 12.9",
      "AirPods Pro"
    ];
    
    const result = await db.collection('producto').deleteMany({
      nombre: { $in: productosAEliminar }
    });
    
    console.log('✅ ' + result.deletedCount + ' productos eliminados');
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.close();
  }
}

cleanDatabase();
