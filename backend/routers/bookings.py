from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Booking, Service
from schemas import BookingCreate, BookingOut, BookingUpdate
from utils.email import send_confirmation_email
from typing import List
from datetime import date

router = APIRouter(prefix="/bookings", tags=["bookings"])

TIME_SLOTS = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
]

@router.get("/slots")
def get_slots(date: date, db: Session = Depends(get_db)):
    booked = db.query(Booking.time_slot).filter(
        Booking.date == date,
        Booking.status != "cancelled"
    ).all()
    booked_slots = [b.time_slot for b in booked]
    available = [slot for slot in TIME_SLOTS if slot not in booked_slots]
    return {"date": date, "available_slots": available}

@router.post("/", response_model=BookingOut)
def create_booking(booking: BookingCreate, db: Session = Depends(get_db)):
    existing = db.query(Booking).filter(
        Booking.date == booking.date,
        Booking.time_slot == booking.time_slot,
        Booking.status != "cancelled"
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="This slot is already booked")

    new_booking = Booking(**booking.dict())
    db.add(new_booking)
    db.commit()
    db.refresh(new_booking)

    # Get service details for email
    service = db.query(Service).filter(Service.id == booking.service_id).first()

    # Send confirmation email
    send_confirmation_email(booking.email, {
        "id": new_booking.id,
        "customer_name": booking.customer_name,
        "service_name": service.name if service else "Service",
        "date": str(booking.date),
        "time_slot": booking.time_slot,
        "price": service.price if service else "",
    })

    return new_booking

@router.get("/", response_model=List[BookingOut])
def get_bookings(db: Session = Depends(get_db)):
    return db.query(Booking).order_by(Booking.date).all()

@router.patch("/{booking_id}", response_model=BookingOut)
def update_booking(booking_id: int, update: BookingUpdate, db: Session = Depends(get_db)):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    booking.status = update.status
    db.commit()
    db.refresh(booking)
    return booking

@router.delete("/{booking_id}")
def delete_booking(booking_id: int, db: Session = Depends(get_db)):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    db.delete(booking)
    db.commit()
    return {"message": "Booking deleted"}