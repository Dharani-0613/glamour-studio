from database import engine, SessionLocal
from models import Base, Service, Admin
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def init():
    # Create all tables
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()

    # Add services if none exist
    if db.query(Service).count() == 0:
        services = [
            Service(name="Haircut & Styling", duration=60, price=799, description="Professional cut and style"),
            Service(name="Hair Coloring", duration=120, price=2499, description="Full color treatment"),
            Service(name="Facial", duration=60, price=1199, description="Deep cleansing facial"),
            Service(name="Manicure", duration=45, price=599, description="Nail care and polish"),
            Service(name="Pedicure", duration=60, price=699, description="Foot care and polish"),
            Service(name="Bridal Makeup", duration=180, price=8999, description="Full bridal look"),
        ]
        db.add_all(services)

    # Add admin if none exist
    if db.query(Admin).count() == 0:
        admin = Admin(
            username="admin",
            hashed_password=pwd_context.hash("admin123")
        )
        db.add(admin)

    db.commit()
    db.close()
    print("Database initialized successfully!")

if __name__ == "__main__":
    init()