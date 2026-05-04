from pydantic import BaseModel
from datetime import date
from typing import Optional
from models import BookingStatus

class ServiceOut(BaseModel):
    id: int
    name: str
    duration: int
    price: float
    description: Optional[str]

    class Config:
        from_attributes = True

class BookingCreate(BaseModel):
    service_id: int
    customer_name: str
    email: str
    phone: str
    date: date
    time_slot: str

class BookingOut(BaseModel):
    id: int
    service_id: int
    customer_name: str
    email: str
    phone: str
    date: date
    time_slot: str
    status: BookingStatus

    class Config:
        from_attributes = True

class BookingUpdate(BaseModel):
    status: BookingStatus

class AdminLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str