"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import axios from "axios";

const API = "http://localhost:8000";

type Service = { id: number; name: string; duration: number; price: number; description: string };
type Step = 1 | 2 | 3 | 4 | 5;

export default function BookPage() {
  const [step, setStep] = useState<Step>(1);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [bookingRef, setBookingRef] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    axios.get(`${API}/services/`).then(r => setServices(r.data));
  }, []);

  useEffect(() => {
    if (!selectedDate || !selectedService) return;
    setLoadingSlots(true);
    setSelectedSlot("");
    axios.get(`${API}/bookings/slots?date=${selectedDate}`)
      .then(r => setAvailableSlots(r.data.available_slots))
      .finally(() => setLoadingSlots(false));
  }, [selectedDate, selectedService]);

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [calYear, setCalYear] = useState(today.getFullYear());
  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await axios.post(`${API}/bookings/`, {
        service_id: selectedService!.id,
        customer_name: form.name,
        email: form.email,
        phone: form.phone,
        date: selectedDate,
        time_slot: selectedSlot,
      });
      setBookingRef(res.data.id);
      setStep(5);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const stepTitles = ["", "Choose Service", "Pick a Date", "Pick a Time", "Your Details", "Confirmed!"];

  return (
    <main style={{ minHeight: "100vh", background: "#0a0a0f", color: "#f5f0e8", fontFamily: "'Georgia', serif" }}>

      {/* NAV */}
      <nav style={{ padding: "1.5rem 3rem", borderBottom: "1px solid rgba(212,175,55,0.15)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/" style={{ fontSize: "1.2rem", letterSpacing: "0.15em", color: "#d4af37", textDecoration: "none", fontWeight: 300 }}>
          GLAMOUR<span style={{ color: "#f5f0e8" }}>STUDIO</span>
        </Link>
        <div style={{ fontSize: "0.75rem", letterSpacing: "0.2em", opacity: 0.4, fontFamily: "system-ui, sans-serif" }}>
          BOOK APPOINTMENT
        </div>
      </nav>

      {/* PROGRESS BAR */}
      {step < 5 && (
        <div style={{ padding: "2rem 3rem 0" }}>
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.8rem" }}>
            {[1,2,3,4].map(s => (
              <div key={s} style={{
                flex: 1, height: "2px",
                background: s <= step ? "#d4af37" : "rgba(212,175,55,0.15)",
                transition: "background 0.4s ease"
              }} />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: "0.7rem", letterSpacing: "0.2em", opacity: 0.5, fontFamily: "system-ui, sans-serif" }}>
              STEP {step} OF 4
            </span>
            <span style={{ fontSize: "0.7rem", letterSpacing: "0.2em", color: "#d4af37", fontFamily: "system-ui, sans-serif" }}>
              {stepTitles[step].toUpperCase()}
            </span>
          </div>
        </div>
      )}

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "3rem" }}>
        <AnimatePresence mode="wait">

          {/* STEP 1 - SELECT SERVICE */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }}>
              <h1 style={{ fontSize: "2rem", fontWeight: 300, marginBottom: "0.5rem" }}>
                Choose a <span style={{ color: "#d4af37", fontStyle: "italic" }}>Service</span>
              </h1>
              <p style={{ opacity: 0.45, fontFamily: "system-ui, sans-serif", fontSize: "0.85rem", marginBottom: "2.5rem" }}>
                Select the treatment you'd like to book
              </p>
              <div style={{ display: "grid", gap: "1.5px", background: "rgba(212,175,55,0.1)" }}>
                {services.map(service => (
                  <motion.div key={service.id} whileHover={{ backgroundColor: "#0f0f18" }}
                    onClick={() => { setSelectedService(service); setStep(2); }}
                    style={{
                      padding: "1.8rem 2rem", background: "#0a0a0f", cursor: "pointer",
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      borderLeft: selectedService?.id === service.id ? "2px solid #d4af37" : "2px solid transparent",
                      transition: "all 0.2s ease"
                    }}>
                    <div>
                      <div style={{ fontSize: "1rem", marginBottom: "0.3rem" }}>{service.name}</div>
                      <div style={{ fontSize: "0.75rem", opacity: 0.45, fontFamily: "system-ui, sans-serif" }}>{service.description}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ color: "#d4af37", fontSize: "1.1rem" }}>₹{service.price.toLocaleString()}</div>
                      <div style={{ fontSize: "0.7rem", opacity: 0.4, fontFamily: "system-ui, sans-serif", marginTop: "0.2rem" }}>{service.duration} min</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2 - PICK DATE */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }}>
              <h1 style={{ fontSize: "2rem", fontWeight: 300, marginBottom: "0.5rem" }}>
                Pick a <span style={{ color: "#d4af37", fontStyle: "italic" }}>Date</span>
              </h1>
              <p style={{ opacity: 0.45, fontFamily: "system-ui, sans-serif", fontSize: "0.85rem", marginBottom: "2.5rem" }}>
                {selectedService?.name} · ₹{selectedService?.price.toLocaleString()} · {selectedService?.duration} min
              </p>

              {/* Calendar */}
              <div style={{ background: "rgba(212,175,55,0.05)", border: "1px solid rgba(212,175,55,0.15)", padding: "2rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                  <button onClick={() => { if (calMonth === 0) { setCalMonth(11); setCalYear(y => y-1); } else setCalMonth(m => m-1); }}
                    style={{ background: "none", border: "none", color: "#d4af37", cursor: "pointer", fontSize: "1.2rem" }}>←</button>
                  <span style={{ fontSize: "0.85rem", letterSpacing: "0.15em" }}>{monthNames[calMonth].toUpperCase()} {calYear}</span>
                  <button onClick={() => { if (calMonth === 11) { setCalMonth(0); setCalYear(y => y+1); } else setCalMonth(m => m+1); }}
                    style={{ background: "none", border: "none", color: "#d4af37", cursor: "pointer", fontSize: "1.2rem" }}>→</button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px", textAlign: "center" }}>
                  {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => (
                    <div key={d} style={{ fontSize: "0.65rem", opacity: 0.35, padding: "0.5rem 0", fontFamily: "system-ui, sans-serif", letterSpacing: "0.1em" }}>{d}</div>
                  ))}
                  {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const dateStr = `${calYear}-${String(calMonth+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
                    const isPast = new Date(dateStr) < new Date(today.toDateString());
                    const isSelected = selectedDate === dateStr;
                    return (
                      <motion.button key={day} whileHover={!isPast ? { scale: 1.1 } : {}}
                        onClick={() => !isPast && setSelectedDate(dateStr)}
                        style={{
                          padding: "0.6rem 0", fontSize: "0.8rem", border: "none", cursor: isPast ? "not-allowed" : "pointer",
                          background: isSelected ? "#d4af37" : "transparent",
                          color: isPast ? "rgba(245,240,232,0.2)" : isSelected ? "#0a0a0f" : "#f5f0e8",
                          fontFamily: "system-ui, sans-serif", borderRadius: "2px",
                          transition: "all 0.2s ease"
                        }}>
                        {day}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
                <button onClick={() => setStep(1)} style={{ background: "none", border: "1px solid rgba(212,175,55,0.2)", color: "#f5f0e8", padding: "0.8rem 2rem", cursor: "pointer", fontSize: "0.75rem", letterSpacing: "0.15em", fontFamily: "system-ui, sans-serif" }}>← BACK</button>
                <button onClick={() => selectedDate && setStep(3)} style={{ background: selectedDate ? "#d4af37" : "rgba(212,175,55,0.2)", border: "none", color: selectedDate ? "#0a0a0f" : "#f5f0e8", padding: "0.8rem 2rem", cursor: selectedDate ? "pointer" : "not-allowed", fontSize: "0.75rem", letterSpacing: "0.15em", fontFamily: "system-ui, sans-serif", fontWeight: 600 }}>NEXT →</button>
              </div>
            </motion.div>
          )}

          {/* STEP 3 - PICK TIME */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }}>
              <h1 style={{ fontSize: "2rem", fontWeight: 300, marginBottom: "0.5rem" }}>
                Pick a <span style={{ color: "#d4af37", fontStyle: "italic" }}>Time</span>
              </h1>
              <p style={{ opacity: 0.45, fontFamily: "system-ui, sans-serif", fontSize: "0.85rem", marginBottom: "2.5rem" }}>
                {selectedDate} · {selectedService?.name}
              </p>

              {loadingSlots ? (
                <div style={{ textAlign: "center", opacity: 0.4, fontFamily: "system-ui, sans-serif", padding: "3rem" }}>Loading available slots...</div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: "1.5px", background: "rgba(212,175,55,0.1)" }}>
                  {availableSlots.length === 0 ? (
                    <div style={{ gridColumn: "1/-1", padding: "3rem", textAlign: "center", background: "#0a0a0f", opacity: 0.5, fontFamily: "system-ui, sans-serif", fontSize: "0.85rem" }}>
                      No slots available for this date. Please choose another date.
                    </div>
                  ) : availableSlots.map(slot => (
                    <motion.button key={slot} whileHover={{ backgroundColor: "#0f0f18" }}
                      onClick={() => setSelectedSlot(slot)}
                      style={{
                        padding: "1rem", background: selectedSlot === slot ? "#d4af37" : "#0a0a0f",
                        color: selectedSlot === slot ? "#0a0a0f" : "#f5f0e8",
                        border: "none", cursor: "pointer", fontSize: "0.85rem",
                        fontFamily: "system-ui, sans-serif", letterSpacing: "0.05em",
                        transition: "all 0.2s ease"
                      }}>
                      {slot}
                    </motion.button>
                  ))}
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
                <button onClick={() => setStep(2)} style={{ background: "none", border: "1px solid rgba(212,175,55,0.2)", color: "#f5f0e8", padding: "0.8rem 2rem", cursor: "pointer", fontSize: "0.75rem", letterSpacing: "0.15em", fontFamily: "system-ui, sans-serif" }}>← BACK</button>
                <button onClick={() => selectedSlot && setStep(4)} style={{ background: selectedSlot ? "#d4af37" : "rgba(212,175,55,0.2)", border: "none", color: selectedSlot ? "#0a0a0f" : "#f5f0e8", padding: "0.8rem 2rem", cursor: selectedSlot ? "pointer" : "not-allowed", fontSize: "0.75rem", letterSpacing: "0.15em", fontFamily: "system-ui, sans-serif", fontWeight: 600 }}>NEXT →</button>
              </div>
            </motion.div>
          )}

          {/* STEP 4 - ENTER DETAILS */}
          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }}>
              <h1 style={{ fontSize: "2rem", fontWeight: 300, marginBottom: "0.5rem" }}>
                Your <span style={{ color: "#d4af37", fontStyle: "italic" }}>Details</span>
              </h1>
              <p style={{ opacity: 0.45, fontFamily: "system-ui, sans-serif", fontSize: "0.85rem", marginBottom: "2.5rem" }}>
                Almost there! Fill in your contact details.
              </p>

              {/* Summary */}
              <div style={{ background: "rgba(212,175,55,0.05)", border: "1px solid rgba(212,175,55,0.15)", padding: "1.5rem", marginBottom: "2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {[["Service", selectedService?.name], ["Price", `₹${selectedService?.price.toLocaleString()}`], ["Date", selectedDate], ["Time", selectedSlot]].map(([label, value]) => (
                  <div key={label}>
                    <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", opacity: 0.4, fontFamily: "system-ui, sans-serif", marginBottom: "0.3rem" }}>{label}</div>
                    <div style={{ fontSize: "0.9rem" }}>{value}</div>
                  </div>
                ))}
              </div>

              {/* Form */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                {[["Full Name", "name", "text", "Your full name"], ["Email Address", "email", "email", "your@email.com"], ["Phone Number", "phone", "tel", "+91 98765 43210"]].map(([label, field, type, placeholder]) => (
                  <div key={field}>
                    <label style={{ fontSize: "0.7rem", letterSpacing: "0.2em", opacity: 0.5, fontFamily: "system-ui, sans-serif", display: "block", marginBottom: "0.5rem" }}>{label.toUpperCase()}</label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      value={form[field as keyof typeof form]}
                      onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                      style={{
                        width: "100%", padding: "0.9rem 1.2rem",
                        background: "rgba(212,175,55,0.05)", border: "1px solid rgba(212,175,55,0.2)",
                        color: "#f5f0e8", fontSize: "0.9rem", fontFamily: "system-ui, sans-serif",
                        outline: "none", boxSizing: "border-box",
                        transition: "border-color 0.2s ease"
                      }}
                      onFocus={e => e.target.style.borderColor = "#d4af37"}
                      onBlur={e => e.target.style.borderColor = "rgba(212,175,55,0.2)"}
                    />
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2.5rem" }}>
                <button onClick={() => setStep(3)} style={{ background: "none", border: "1px solid rgba(212,175,55,0.2)", color: "#f5f0e8", padding: "0.8rem 2rem", cursor: "pointer", fontSize: "0.75rem", letterSpacing: "0.15em", fontFamily: "system-ui, sans-serif" }}>← BACK</button>
                <button
                  onClick={handleSubmit}
                  disabled={!form.name || !form.email || !form.phone || submitting}
                  style={{ background: form.name && form.email && form.phone ? "#d4af37" : "rgba(212,175,55,0.2)", border: "none", color: form.name && form.email && form.phone ? "#0a0a0f" : "#f5f0e8", padding: "0.8rem 2.5rem", cursor: form.name && form.email && form.phone ? "pointer" : "not-allowed", fontSize: "0.75rem", letterSpacing: "0.15em", fontFamily: "system-ui, sans-serif", fontWeight: 600 }}>
                  {submitting ? "BOOKING..." : "CONFIRM BOOKING →"}
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 5 - CONFIRMATION */}
          {step === 5 && (
            <motion.div key="step5" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
              style={{ textAlign: "center", padding: "4rem 2rem" }}>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}
                style={{ width: "80px", height: "80px", border: "1px solid #d4af37", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2rem", fontSize: "2rem" }}>
                ✓
              </motion.div>
              <h1 style={{ fontSize: "2.5rem", fontWeight: 300, marginBottom: "1rem" }}>
                You're <span style={{ color: "#d4af37", fontStyle: "italic" }}>Booked!</span>
              </h1>
              <p style={{ opacity: 0.5, fontFamily: "system-ui, sans-serif", marginBottom: "0.5rem" }}>Booking Reference: <span style={{ color: "#d4af37" }}>#{bookingRef}</span></p>
              <p style={{ opacity: 0.45, fontFamily: "system-ui, sans-serif", fontSize: "0.85rem", marginBottom: "3rem" }}>
                A confirmation has been sent to {form.email}
              </p>

              <div style={{ background: "rgba(212,175,55,0.05)", border: "1px solid rgba(212,175,55,0.15)", padding: "2rem", maxWidth: "400px", margin: "0 auto 3rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem", textAlign: "left" }}>
                {[["Service", selectedService?.name], ["Date", selectedDate], ["Time", selectedSlot], ["Name", form.name]].map(([label, value]) => (
                  <div key={label}>
                    <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", opacity: 0.4, fontFamily: "system-ui, sans-serif", marginBottom: "0.3rem" }}>{label}</div>
                    <div style={{ fontSize: "0.85rem" }}>{value}</div>
                  </div>
                ))}
              </div>

              <Link href="/" style={{ padding: "1rem 3rem", border: "1px solid rgba(212,175,55,0.3)", color: "#d4af37", textDecoration: "none", fontSize: "0.8rem", letterSpacing: "0.2em", fontFamily: "system-ui, sans-serif" }}>
                BACK TO HOME
              </Link>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </main>
  );
}