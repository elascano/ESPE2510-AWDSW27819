from pydantic import BaseModel, EmailStr
from bson.objectid import ObjectId

class User(BaseModel):
    id: str
    fullName: str
    email: EmailStr
    type: str
    discount: float
    totalSale: float

def user_to_dict(u):
    return {
        "id": str(u["id"]),
        "fullName": u["fullName"],
        "email": u["email"],
        "type": u["type"],
        "discount": u["discount"],
        "totalSale": u["totalSale"]
    }
