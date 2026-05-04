"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import axios from "axios";

const API = "http://localhost:8000";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`${API}/auth/login`, { username, password });
      localStorage.setItem("admin_token", res.data.access_token);
      router.push("/admin/dashboard");
    } catch {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0a0008 0%, #0a0a0f 40%, #080d12 70%, #0c0a08 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Georgia', serif", color: "#f5f0e8" }}>

      {/* Background glow */}
      <div style={{ position: "fixed", inset: 0, background: "radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 60%)", pointerEvents: "none" }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        style={{ width: "100%", maxWidth: "420px", padding: "3rem", border: "1px solid rgba(212,175,55,0.15)", background: "rgba(212,175,55,0.02)", position: "relative" }}>

        {/* Corner decorations */}
        <div style={{ position: "absolute", top: "-1px", left: "-1px", width: "20px", height: "20px", borderTop: "2px solid #d4af37", borderLeft: "2px solid #d4af37" }} />
        <div style={{ position: "absolute", top: "-1px", right: "-1px", width: "20px", height: "20px", borderTop: "2px solid #d4af37", borderRight: "2px solid #d4af37" }} />
        <div style={{ position: "absolute", bottom: "-1px", left: "-1px", width: "20px", height: "20px", borderBottom: "2px solid #d4af37", borderLeft: "2px solid #d4af37" }} />
        <div style={{ position: "absolute", bottom: "-1px", right: "-1px", width: "20px", height: "20px", borderBottom: "2px solid #d4af37", borderRight: "2px solid #d4af37" }} />

        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ fontSize: "1.3rem", letterSpacing: "0.15em", color: "#d4af37", marginBottom: "0.4rem" }}>
            GLAMOUR<span style={{ color: "#f5f0e8" }}>STUDIO</span>
          </div>
          <div style={{ fontSize: "0.65rem", letterSpacing: "0.3em", opacity: 0.4, fontFamily: "system-ui, sans-serif" }}>ADMIN PORTAL</div>
        </div>

        <div style={{ marginBottom: "1.2rem" }}>
          <label style={{ fontSize: "0.65rem", letterSpacing: "0.25em", opacity: 0.5, fontFamily: "system-ui, sans-serif", display: "block", marginBottom: "0.5rem" }}>USERNAME</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            style={{ width: "100%", padding: "0.85rem 1rem", background: "rgba(212,175,55,0.05)", border: "1px solid rgba(212,175,55,0.2)", color: "#f5f0e8", fontSize: "0.9rem", fontFamily: "system-ui, sans-serif", outline: "none", boxSizing: "border-box" }}
            onFocus={e => e.target.style.borderColor = "#d4af37"}
            onBlur={e => e.target.style.borderColor = "rgba(212,175,55,0.2)"}
          />
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <label style={{ fontSize: "0.65rem", letterSpacing: "0.25em", opacity: 0.5, fontFamily: "system-ui, sans-serif", display: "block", marginBottom: "0.5rem" }}>PASSWORD</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            style={{ width: "100%", padding: "0.85rem 1rem", background: "rgba(212,175,55,0.05)", border: "1px solid rgba(212,175,55,0.2)", color: "#f5f0e8", fontSize: "0.9rem", fontFamily: "system-ui, sans-serif", outline: "none", boxSizing: "border-box" }}
            onFocus={e => e.target.style.borderColor = "#d4af37"}
            onBlur={e => e.target.style.borderColor = "rgba(212,175,55,0.2)"}
          />
        </div>

        {error && (
          <div style={{ fontSize: "0.75rem", color: "#ff6b6b", fontFamily: "system-ui, sans-serif", marginBottom: "1.2rem", textAlign: "center", letterSpacing: "0.05em" }}>
            {error}
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={loading || !username || !password}
          style={{ width: "100%", padding: "1rem", background: username && password ? "#d4af37" : "rgba(212,175,55,0.2)", border: "none", color: username && password ? "#0a0a0f" : "#f5f0e8", fontSize: "0.75rem", letterSpacing: "0.25em", fontFamily: "system-ui, sans-serif", fontWeight: 700, cursor: username && password ? "pointer" : "not-allowed", transition: "all 0.3s ease" }}>
          {loading ? "SIGNING IN..." : "SIGN IN"}
        </button>

        <div style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.7rem", opacity: 0.3, fontFamily: "system-ui, sans-serif", letterSpacing: "0.1em" }}>
          admin / admin123
        </div>
      </motion.div>
    </main>
  );
}