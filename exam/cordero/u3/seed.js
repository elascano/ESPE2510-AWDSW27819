import { MongoClient } from 'mongodb';

const MONGO_URI = 'mongodb+srv://macordero:espe2025@cluster0.fwu2dep.mongodb.net/';
const DATABASE_NAME = 'Tienda';

async function seedDatabase() {
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db(DATABASE_NAME);
    
    const productos = [
      { 
        nombre: "Laptop Dell XPS 13", 
        marca: "Dell", 
        categoria: "Electrónica", 
        precio: 1299.99, 
        stock: 15, 
        descripcion: "Laptop ultraligera de 13 pulgadas con procesador Intel de última generación", 
        sku: "DELL-XPS-13-001", 
        activo: true 
      },
      { 
        nombre: "iPhone 15 Pro", 
        marca: "Apple", 
        categoria: "Celulares", 
        precio: 999.99, 
        stock: 20, 
        descripcion: "Smartphone premium con cámara avanzada y chip A17 Pro", 
        sku: "APPLE-IP15P-001", 
        activo: true 
      },
      { 
        nombre: "Samsung Galaxy S24", 
        marca: "Samsung", 
        categoria: "Celulares", 
        precio: 899.99, 
        stock: 25, 
        descripcion: "Teléfono Android con pantalla AMOLED 6.1 pulgadas", 
        sku: "SAMSUNG-S24-001", 
        activo: true 
      },
      { 
        nombre: "iPad Pro 12.9", 
        marca: "Apple", 
        categoria: "Tablets", 
        precio: 1199.99, 
        stock: 10, 
        descripcion: "Tableta premium con pantalla Liquid Retina XDR", 
        sku: "APPLE-IPAD-PRO-001", 
        activo: true 
      },
      { 
        nombre: "AirPods Pro", 
        marca: "Apple", 
        categoria: "Accesorios", 
        precio: 249.99, 
        stock: 50, 
        descripcion: "Auriculares inalámbricos con cancelación de ruido activa", 
        sku: "APPLE-AIRPODS-PRO-001", 
        activo: true 
      }
    ];
    
    await db.collection('producto').insertMany(productos);
    console.log('✅ ' + productos.length + ' productos insertados correctamente en MongoDB');
  } catch (error) {
    console.error('❌ Error al insertar datos:', error.message);
  } finally {
    await client.close();
  }
}

seedDatabase();
