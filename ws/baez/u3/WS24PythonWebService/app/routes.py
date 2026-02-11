from fastapi import APIRouter
from bson.objectid import ObjectId
from app.db import customers
from app.models import User, user_to_dict

router = APIRouter(prefix="/customers", tags=["Customers"])

@router.get("/")
def list_customers():
    return [user_to_dict(c) for c in customers.find()]

@router.get("/{id}")
def get_customer(id: str):
    c = customers.find_one({"_id": ObjectId(id)})
    if not c:
        return {"error": "Not found"}
    return user_to_dict(c)
