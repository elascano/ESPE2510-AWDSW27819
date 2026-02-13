from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from bson import json_util
import json
from typing import List, Dict, Any

# String connection to MongoDB
MONGO_URI = "mongodb+srv://oop:oop@cluster0.9knxc.mongodb.net/?appName=Cluster0"
DATABASE_NAME = "oop"
COLLECTION_NAME = "Customers"

# Inicializar FastAPI
app = FastAPI(title="Customer Microservice", version="1.0.0")

# Configurar CORS para permitir peticiones desde React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, especifica los orígenes permitidos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Conexión a MongoDB
try:
    client = MongoClient(MONGO_URI)
    db = client[DATABASE_NAME]
    customers_collection = db[COLLECTION_NAME]
    print("✓ Conexión exitosa a MongoDB")
except Exception as e:
    print(f"✗ Error al conectar a MongoDB: {e}")

# Función helper para convertir datos de MongoDB a JSON
def parse_json(data):
    return json.loads(json_util.dumps(data))

@app.get("/")
async def root():
    """Endpoint raíz"""
    return {
        "message": "Customer Microservice API",
        "endpoints": {
            "customers": "/oopdatabase/customers",
            "customer_by_id": "/oopdatabase/customers/{id}"
        }
    }

@app.get("/oopdatabase/customers")
async def get_all_customers():
    """
    Obtiene todos los customers de la colección
    """
    try:
        customers = list(customers_collection.find())
        return parse_json(customers)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener customers: {str(e)}")

@app.get("/oopdatabase/customers/{customer_id}")
async def get_customer_by_id(customer_id: int):
    """
    Obtiene un customer específico por su id
    """
    try:
        customer = customers_collection.find_one({"id": customer_id})
        if customer:
            return parse_json(customer)
        else:
            raise HTTPException(status_code=404, detail=f"Customer con id {customer_id} no encontrado")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener customer: {str(e)}")

@app.get("/health")
async def health_check():
    """
    Verifica el estado de la conexión a MongoDB
    """
    try:
        client.admin.command('ping')
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        return {"status": "unhealthy", "error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)