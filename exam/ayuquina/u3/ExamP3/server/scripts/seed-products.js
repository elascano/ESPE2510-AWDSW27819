// Seed sample Product documents into ExamP3.Product
import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DB || 'ExamP3'

if (!uri) {
  console.error('Missing MONGODB_URI environment variable')
  process.exit(1)
}

const products = [
  { id: 1, name: 'Milk 1L', expiration: [20, 2, 2026], price: 1.99 },
  { id: 2, name: 'Yogurt', expiration: [14, 2, 2026], price: 0.99 },
  { id: 3, name: 'Bread', expiration: [11, 2, 2026], price: 1.49 },
  { id: 4, name: 'Cheese', expiration: [28, 2, 2026], price: 4.99 },
  { id: 5, name: 'Butter', expiration: [30, 3, 2026], price: 2.49 }
]

async function main() {
  const client = new MongoClient(uri)
  await client.connect()
  const db = client.db(dbName)
  const col = db.collection('Product')
  await col.createIndex({ id: 1 }, { unique: true })
  for (const p of products) {
    await col.updateOne({ id: p.id }, { $set: { ...p, createdAt: new Date() } }, { upsert: true })
    console.log(`Upserted product id=${p.id}`)
  }
  await client.close()
  console.log('Done')
}

main().catch((e) => { console.error(e); process.exit(1) })
