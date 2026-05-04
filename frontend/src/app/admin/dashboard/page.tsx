"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

const API = "http://localhost:8000";

type Booking = {
  id: number;
  service_id: number;
  customer_name: string;
  email: string;
  phone: string;
  date: string;
  time_slot: string;
  status: "pending" | "completed" | "cancelled";
};

const statusColors = {
  pending: { bg: "rgba(212,175,55,0.15)", color: "#d4af37" },
  completed: { bg: "rgba(80,200,120,0.15)", color: "#50c878" },
  cancelled: { bg: "rgba(255,100,100,0.15)", color: "#ff6464" },
};

const serviceNames: Record<number, string> = {
  1: "Haircut & Styling",
  2: "Hair Coloring",
  3: "Facial",
  4: "Manicure",
  5: "Pedicure",
  6: "Bridal Makeup",
};

export default function Dashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) { router.push("/admin"); return; }
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/bookings/`);
      setBookings(res.data);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    await axios.patch(`${API}/bookings/${id}`, { status });
    fetchBookings();
  };

  const deleteBooking = async (id: number) => {
    await axios.delete(`${API}/bookings/${id}`);
    fetchBookings();
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    router.push("/admin");
  };

  const today = new Date().toISOString().split("T")[0];
  const todayBookings = bookings.filter(b => b.date === today);
  const weekBookings = bookings.filter(b => {
    const d = new Date(b.date);
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return d >= weekAgo && d <= now;
  });
  const pendingBookings = bookings.filter(b => b.status === "pending");

  const filtered = bookings.filter(b => {
    const matchDate = filterDate ? b.date === filterDate : true;
    const matchStatus = filterStatus === "all" ? true : b.status === filterStatus;
    return matchDate && matchStatus;
  });

  return (
    <main style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0a0008 0%, #0a0a0f 40%, #080d12 70%, #0c0a08 100%)", color: "#f5f0e8", fontFamily: "'Georgia', serif" }}>

      {/* NAV */}
      <nav style={{ padding: "1.2rem 3rem", borderBottom: "1px solid rgba(212,175,55,0.15)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: "1.2rem", letterSpacing: "0.15em", color: "#d4af37" }}>
          GLAMOUR<span style={{ color: "#f5f0e8" }}>STUDIO</span>
          <span style={{ fontSize: "0.6rem", letterSpacing: "0.3em", opacity: 0.4, fontFamily: "system-ui, sans-serif", marginLeft: "1rem" }}>ADMIN</span>
        </div>
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <Link href="/" style={{ fontSize: "0.7rem", letterSpacing: "0.15em", opacity: 0.5, color: "#f5f0e8", textDecoration: "none", fontFamily: "system-ui, sans-serif" }}>VIEW SITE</Link>
          <button onClick={logout} style={{ padding: "0.5rem 1.5rem", border: "1px solid rgba(212,175,55,0.3)", background: "none", color: "#d4af37", fontSize: "0.7rem", letterSpacing: "0.15em", fontFamily: "system-ui, sans-serif", cursor: "pointer" }}>LOGOUT</button>
        </div>
      </nav>

      <div style={{ padding: "3rem" }}>

        {/* STATS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5px", background: "rgba(212,175,55,0.1)", marginBottom: "3rem" }}>
          {[
            ["Today's Bookings", todayBookings.length, "#d4af37"],
            ["This Week", weekBookings.length, "#50c878"],
            ["Pending", pendingBookings.length, "#d4af37"],
            ["Total", bookings.length, "#f5f0e8"],
          ].map(([label, value, color]) => (
            <div key={label as string} style={{ padding: "2rem", background: "#0a0a0f" }}>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.25em", opacity: 0.4, fontFamily: "system-ui, sans-serif", marginBottom: "0.8rem" }}>{label as string}</div>
              <div style={{ fontSize: "2.5rem", fontWeight: 300, color: color as string, lineHeight: 1 }}>{value as number}</div>
            </div>
          ))}
        </motion.div>

        {/* FILTERS */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          style={{ display: "flex", gap: "1rem", marginBottom: "2rem", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ fontSize: "0.7rem", letterSpacing: "0.2em", opacity: 0.4, fontFamily: "system-ui, sans-serif" }}>FILTER:</div>

          <input
            type="date"
            value={filterDate}
            onChange={e => setFilterDate(e.target.value)}
            style={{ padding: "0.5rem 1rem", background: "rgba(212,175,55,0.05)", border: "1px solid rgba(212,175,55,0.2)", color: "#f5f0e8", fontSize: "0.8rem", fontFamily: "system-ui, sans-serif", outline: "none", colorScheme: "dark" }}
          />

          {["all", "pending", "completed", "cancelled"].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              style={{ padding: "0.5rem 1.2rem", border: "1px solid", borderColor: filterStatus === s ? "#d4af37" : "rgba(212,175,55,0.2)", background: filterStatus === s ? "rgba(212,175,55,0.1)" : "none", color: filterStatus === s ? "#d4af37" : "#f5f0e8", fontSize: "0.7rem", letterSpacing: "0.15em", fontFamily: "system-ui, sans-serif", cursor: "pointer", transition: "all 0.2s ease", opacity: filterStatus === s ? 1 : 0.5 }}>
              {s.toUpperCase()}
            </button>
          ))}

          {filterDate && (
            <button onClick={() => setFilterDate("")}
              style={{ padding: "0.5rem 1rem", background: "none", border: "1px solid rgba(255,100,100,0.3)", color: "#ff6464", fontSize: "0.7rem", letterSpacing: "0.1em", fontFamily: "system-ui, sans-serif", cursor: "pointer" }}>
              CLEAR DATE ×
            </button>
          )}
        </motion.div>

        {/* TABLE */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "4rem", opacity: 0.4, fontFamily: "system-ui, sans-serif" }}>Loading appointments...</div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem", opacity: 0.4, fontFamily: "system-ui, sans-serif", border: "1px solid rgba(212,175,55,0.1)" }}>No appointments found.</div>
          ) : (
            <div style={{ border: "1px solid rgba(212,175,55,0.1)", overflow: "hidden" }}>
              {/* Table header */}
              <div style={{ display: "grid", gridTemplateColumns: "0.5fr 1.2fr 1.5fr 1.2fr 0.8fr 0.8fr 0.8fr 1.2fr", padding: "1rem 1.5rem", borderBottom: "1px solid rgba(212,175,55,0.1)", background: "rgba(212,175,55,0.03)" }}>
                {["#", "Service", "Customer", "Contact", "Date", "Time", "Status", "Actions"].map(h => (
                  <div key={h} style={{ fontSize: "0.6rem", letterSpacing: "0.2em", opacity: 0.4, fontFamily: "system-ui, sans-serif" }}>{h}</div>
                ))}
              </div>

              {/* Table rows */}
              {filtered.map((booking, i) => (
                <motion.div key={booking.id}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                  style={{ display: "grid", gridTemplateColumns: "0.5fr 1.2fr 1.5fr 1.2fr 0.8fr 0.8fr 0.8fr 1.2fr", padding: "1.2rem 1.5rem", borderBottom: "1px solid rgba(212,175,55,0.06)", alignItems: "center", transition: "background 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(212,175,55,0.03)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>

                  <div style={{ fontSize: "0.75rem", opacity: 0.4, fontFamily: "system-ui, sans-serif" }}>#{booking.id}</div>
                  <div style={{ fontSize: "0.8rem", fontFamily: "system-ui, sans-serif" }}>{serviceNames[booking.service_id] || "Service"}</div>
                  <div style={{ fontSize: "0.8rem", fontFamily: "system-ui, sans-serif" }}>{booking.customer_name}</div>
                  <div>
                    <div style={{ fontSize: "0.75rem", opacity: 0.6, fontFamily: "system-ui, sans-serif" }}>{booking.email}</div>
                    <div style={{ fontSize: "0.7rem", opacity: 0.4, fontFamily: "system-ui, sans-serif" }}>{booking.phone}</div>
                  </div>
                  <div style={{ fontSize: "0.75rem", fontFamily: "system-ui, sans-serif", opacity: 0.7 }}>{booking.date}</div>
                  <div style={{ fontSize: "0.75rem", fontFamily: "system-ui, sans-serif", color: "#d4af37" }}>{booking.time_slot}</div>

                  <div style={{ padding: "0.25rem 0.6rem", background: statusColors[booking.status].bg, color: statusColors[booking.status].color, fontSize: "0.6rem", letterSpacing: "0.1em", fontFamily: "system-ui, sans-serif", display: "inline-block", width: "fit-content" }}>
                    {booking.status.toUpperCase()}
                  </div>

                  <div style={{ display: "flex", gap: "0.4rem" }}>
                    {booking.status === "pending" && (
                      <button onClick={() => updateStatus(booking.id, "completed")}
                        style={{ padding: "0.3rem 0.7rem", background: "rgba(80,200,120,0.15)", border: "1px solid rgba(80,200,120,0.3)", color: "#50c878", fontSize: "0.6rem", letterSpacing: "0.1em", fontFamily: "system-ui, sans-serif", cursor: "pointer" }}>
                        DONE
                      </button>
                    )}
                    {booking.status !== "cancelled" && (
                      <button onClick={() => updateStatus(booking.id, "cancelled")}
                        style={{ padding: "0.3rem 0.7rem", background: "rgba(255,100,100,0.1)", border: "1px solid rgba(255,100,100,0.25)", color: "#ff6464", fontSize: "0.6rem", letterSpacing: "0.1em", fontFamily: "system-ui, sans-serif", cursor: "pointer" }}>
                        CANCEL
                      </button>
                    )}
                    <button onClick={() => deleteBooking(booking.id)}
                      style={{ padding: "0.3rem 0.7rem", background: "rgba(255,100,100,0.05)", border: "1px solid rgba(255,100,100,0.15)", color: "rgba(255,100,100,0.6)", fontSize: "0.6rem", letterSpacing: "0.1em", fontFamily: "system-ui, sans-serif", cursor: "pointer" }}>
                      DEL
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}