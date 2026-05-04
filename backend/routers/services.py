from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Service
from schemas import ServiceOut
from typing import List

router = APIRouter(prefix="/services", tags=["services"])

@router.get("/", response_model=List[ServiceOut])
def get_services(db: Session = Depends(get_db)):
    return db.query(Service).all()