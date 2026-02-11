from pydantic import BaseModel
from typing import Optional

class Producto(BaseModel):
    id: int
    nombre: str
    precio: float
    descripcion: Optional[str] = None