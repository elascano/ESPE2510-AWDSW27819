import { MongoClient } from 'mongodb';

const MONGO_URI = 'mongodb+srv://macordero:espe2025@cluster0.fwu2dep.mongodb.net/';
const DATABASE_NAME = 'Tienda';

async function verifyDatabase() {
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db(DATABASE_NAME);
    
    const productos = await db.collection('productos').find({}).toArray();
    
    console.log('✅ Conexión exitosa a MongoDB');
    console.log('📊 Total de productos encontrados:', productos.length);
    console.log('\n📦 Productos:');
    console.log(JSON.stringify(productos, null, 2));
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.close();
  }
}

verifyDatabase();
