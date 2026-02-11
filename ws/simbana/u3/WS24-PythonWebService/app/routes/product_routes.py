from fastapi import APIRouter, HTTPException
from app.model.product import Producto
from app.database import db_productos

router = APIRouter()

@router.get("/productos")
def listar_productos():
    return db_productos

@router.post("/productos")
def crear_producto(producto: Producto):
    db_productos.append(producto.dict())
    return {"mensaje": "Producto agregado con éxito"}