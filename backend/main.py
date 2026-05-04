from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import services, bookings, auth
from database import engine
from models import Base

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Glamour Studio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(services.router)
app.include_router(bookings.router)
app.include_router(auth.router)

@app.get("/")
def root():
    return {"message": "Glamour Studio API is running"}