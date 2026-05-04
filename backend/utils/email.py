import sendgrid
from sendgrid.helpers.mail import Mail
import os
from dotenv import load_dotenv

load_dotenv()

SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")
FROM_EMAIL = os.getenv("FROM_EMAIL")

def send_confirmation_email(to_email: str, booking_data: dict):
    try:
        sg = sendgrid.SendGridAPIClient(api_key=SENDGRID_API_KEY)

        html_content = f"""
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: #f5f0e8; padding: 3rem; border: 1px solid rgba(212,175,55,0.3);">
            <div style="text-align: center; margin-bottom: 2rem;">
                <h1 style="color: #d4af37; font-weight: 300; letter-spacing: 0.15em; font-size: 1.5rem;">
                    GLAMOUR<span style="color: #f5f0e8;">STUDIO</span>
                </h1>
                <div style="width: 40px; height: 1px; background: #d4af37; margin: 1rem auto;"></div>
            </div>

            <h2 style="font-weight: 300; font-size: 1.3rem; margin-bottom: 0.5rem;">
                Your Appointment is <span style="color: #d4af37; font-style: italic;">Confirmed!</span>
            </h2>
            <p style="opacity: 0.6; font-family: system-ui, sans-serif; font-size: 0.9rem; margin-bottom: 2rem;">
                Hi {booking_data['customer_name']}, we look forward to seeing you!
            </p>

            <div style="border: 1px solid rgba(212,175,55,0.2); padding: 1.5rem; margin-bottom: 2rem;">
                <table style="width: 100%; font-family: system-ui, sans-serif; font-size: 0.85rem;">
                    <tr style="border-bottom: 1px solid rgba(212,175,55,0.1);">
                        <td style="padding: 0.7rem 0; opacity: 0.5; letter-spacing: 0.1em; font-size: 0.75rem;">BOOKING REF</td>
                        <td style="padding: 0.7rem 0; color: #d4af37;">#{booking_data['id']}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid rgba(212,175,55,0.1);">
                        <td style="padding: 0.7rem 0; opacity: 0.5; letter-spacing: 0.1em; font-size: 0.75rem;">SERVICE</td>
                        <td style="padding: 0.7rem 0;">{booking_data['service_name']}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid rgba(212,175,55,0.1);">
                        <td style="padding: 0.7rem 0; opacity: 0.5; letter-spacing: 0.1em; font-size: 0.75rem;">DATE</td>
                        <td style="padding: 0.7rem 0;">{booking_data['date']}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid rgba(212,175,55,0.1);">
                        <td style="padding: 0.7rem 0; opacity: 0.5; letter-spacing: 0.1em; font-size: 0.75rem;">TIME</td>
                        <td style="padding: 0.7rem 0;">{booking_data['time_slot']}</td>
                    </tr>
                    <tr>
                        <td style="padding: 0.7rem 0; opacity: 0.5; letter-spacing: 0.1em; font-size: 0.75rem;">PRICE</td>
                        <td style="padding: 0.7rem 0; color: #d4af37;">₹{booking_data['price']}</td>
                    </tr>
                </table>
            </div>

            <p style="opacity: 0.5; font-family: system-ui, sans-serif; font-size: 0.8rem; line-height: 1.8;">
                📍 Hyderabad &nbsp;·&nbsp; 📞 +91 98765 43210 &nbsp;·&nbsp; ✉️ hello@glamourstudio.in
            </p>

            <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid rgba(212,175,55,0.1); text-align: center;">
                <p style="opacity: 0.3; font-family: system-ui, sans-serif; font-size: 0.7rem; letter-spacing: 0.1em;">© 2025 GLAMOUR STUDIO</p>
            </div>
        </div>
        """

        message = Mail(
            from_email=FROM_EMAIL,
            to_emails=to_email,
            subject="Your Glamour Studio Appointment is Confirmed ✨",
            html_content=html_content
        )

        sg.send(message)
        print(f"Email sent to {to_email}")

    except Exception as e:
        print(f"Email error: {e}")