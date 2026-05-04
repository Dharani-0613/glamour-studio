"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

const services = [
  { name: "Haircut & Styling", duration: "60 min", price: "₹799", icon: "✂️", desc: "Professional cut and style tailored to you" },
  { name: "Hair Coloring", duration: "120 min", price: "₹2,499", icon: "🎨", desc: "Full color treatment by expert colorists" },
  { name: "Facial", duration: "60 min", price: "₹1,199", icon: "✨", desc: "Deep cleansing and rejuvenating facial" },
  { name: "Manicure", duration: "45 min", price: "₹599", icon: "💅", desc: "Nail care and polish to perfection" },
  { name: "Pedicure", duration: "60 min", price: "₹699", icon: "🌸", desc: "Relaxing foot care and polish" },
  { name: "Bridal Makeup", duration: "180 min", price: "₹8,999", icon: "👑", desc: "Complete bridal look for your special day" },
];

const testimonials = [
  { name: "Priya S.", text: "Absolutely loved my experience. The staff is so professional and the results were stunning!", rating: 5 },
  { name: "Ananya R.", text: "Best salon in the city! My bridal makeup was perfect. Got so many compliments.", rating: 5 },
  { name: "Meera K.", text: "The facial left my skin glowing for weeks. Will definitely be coming back!", rating: 5 },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen" style={{ background: "linear-gradient(135deg, #0a0008 0%, #0a0a0f 40%, #080d12 70%, #0c0a08 100%)", color: "#f5f0e8", fontFamily: "'Georgia', serif" }}>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        padding: "1.2rem 3rem",
        background: scrolled ? "rgba(10,10,15,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(212,175,55,0.15)" : "none",
        transition: "all 0.4s ease",
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <div style={{ fontSize: "1.4rem", letterSpacing: "0.15em", color: "#d4af37", fontWeight: "300" }}>
          GLAMOUR<span style={{ color: "#f5f0e8" }}>STUDIO</span>
        </div>
        <div style={{ display: "flex", gap: "2.5rem", fontSize: "0.85rem", letterSpacing: "0.12em" }}>
          {["Services", "About", "Contact"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{ color: "#f5f0e8", opacity: 0.7, textDecoration: "none", transition: "opacity 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "0.7")}>
              {item}
            </a>
          ))}
        </div>
        <Link href="/book" style={{
          padding: "0.6rem 1.8rem",
          border: "1px solid #d4af37",
          color: "#d4af37",
          textDecoration: "none",
          fontSize: "0.8rem",
          letterSpacing: "0.15em",
          transition: "all 0.3s ease",
          background: "transparent"
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "#d4af37"; e.currentTarget.style.color = "#0a0a0f"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#d4af37"; }}>
          BOOK NOW
        </Link>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        padding: "0 3rem",
        position: "relative", overflow: "hidden"
      }}>
        {/* Background gradient */}
        <div style={{
          position: "absolute", inset: 0,
          background: `
            radial-gradient(ellipse at 70% 50%, rgba(212,175,55,0.09) 0%, transparent 55%),
            radial-gradient(ellipse at 15% 80%, rgba(180,80,80,0.07) 0%, transparent 45%),
            radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.04) 0%, transparent 40%)
          `,
        }} />
        {/* Noise texture overlay */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat", backgroundSize: "128px", pointerEvents: "none"
        }} />

        {/* Decorative right side */}
        <div style={{ position: "absolute", right: "5%", top: "20%", width: "1px", height: "60%", background: "linear-gradient(to bottom, transparent, rgba(212,175,55,0.3), transparent)" }} />
        <div style={{ position: "absolute", right: "8%", top: "30%", width: "1px", height: "40%", background: "linear-gradient(to bottom, transparent, rgba(212,175,55,0.15), transparent)" }} />

        {/* Right side visual */}
        <div style={{
          position: "absolute", right: "5%", top: "50%", transform: "translateY(-50%)",
          width: "380px", height: "480px",
          background: "linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(180,120,100,0.06) 100%)",
          border: "1px solid rgba(212,175,55,0.12)",
          display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "2.5rem",
          overflow: "hidden"
        }}>
          <div style={{ position: "absolute", top: "1.5rem", right: "1.5rem", width: "60px", height: "60px", border: "1px solid rgba(212,175,55,0.2)" }} />
          <div style={{ position: "absolute", top: "2rem", right: "2rem", width: "60px", height: "60px", border: "1px solid rgba(212,175,55,0.1)" }} />
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            <line x1="0" y1="0" x2="100%" y2="100%" stroke="rgba(212,175,55,0.06)" strokeWidth="1" />
            <line x1="100%" y1="0" x2="0" y2="100%" stroke="rgba(212,175,55,0.06)" strokeWidth="1" />
          </svg>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -60%)", textAlign: "center" }}>
            <div style={{ fontSize: "5rem", fontWeight: 300, color: "rgba(212,175,55,0.15)", letterSpacing: "-0.05em", lineHeight: 1 }}>GS</div>
            <div style={{ width: "40px", height: "1px", background: "rgba(212,175,55,0.2)", margin: "1rem auto" }} />
            <div style={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "rgba(212,175,55,0.3)", fontFamily: "system-ui, sans-serif" }}>EST. 2024</div>
          </div>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ width: "30px", height: "1px", background: "#d4af37", marginBottom: "0.8rem" }} />
            <div style={{ fontSize: "0.7rem", letterSpacing: "0.2em", opacity: 0.5, fontFamily: "system-ui, sans-serif", marginBottom: "0.3rem" }}>PREMIUM BEAUTY</div>
            <div style={{ fontSize: "1rem", fontWeight: 300, letterSpacing: "0.05em" }}>Hyderabad's Finest Salon</div>
          </div>
        </div>

        <div style={{ maxWidth: "700px", position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            style={{ fontSize: "0.75rem", letterSpacing: "0.3em", color: "#d4af37", marginBottom: "2.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ width: "40px", height: "1px", background: "#d4af37", display: "inline-block" }} />
            LUXURY BEAUTY STUDIO · HYDERABAD
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)", fontWeight: "300", lineHeight: 1.05, marginBottom: "1.5rem", letterSpacing: "-0.02em" }}>
            Where Beauty
            <br />
            <span style={{ color: "#d4af37", fontStyle: "italic" }}>Meets Art</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            style={{ fontSize: "1.05rem", opacity: 0.65, lineHeight: 1.8, marginBottom: "3rem", maxWidth: "480px", fontFamily: "system-ui, sans-serif", fontWeight: 300 }}>
            Experience premium beauty treatments crafted by expert stylists. Every visit is a journey to your most radiant self.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
            style={{ display: "flex", gap: "1.2rem", alignItems: "center" }}>
            <Link href="/book" style={{
              padding: "1rem 2.8rem",
              background: "#d4af37",
              color: "#0a0a0f",
              textDecoration: "none",
              fontSize: "0.8rem",
              letterSpacing: "0.2em",
              fontFamily: "system-ui, sans-serif",
              fontWeight: 600,
              transition: "all 0.3s ease",
              display: "inline-block"
            }}>
              BOOK APPOINTMENT
            </Link>
            <a href="#services" style={{
              color: "#f5f0e8", opacity: 0.6, textDecoration: "none",
              fontSize: "0.8rem", letterSpacing: "0.15em",
              fontFamily: "system-ui, sans-serif",
              display: "flex", alignItems: "center", gap: "0.5rem",
              transition: "opacity 0.2s"
            }}>
              VIEW SERVICES ↓
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}
            style={{ display: "flex", gap: "3rem", marginTop: "5rem" }}>
            {[["500+", "Happy Clients"], ["6+", "Expert Services"], ["5★", "Rated Salon"]].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontSize: "1.8rem", color: "#d4af37", fontWeight: 300, letterSpacing: "0.05em" }}>{num}</div>
                <div style={{ fontSize: "0.7rem", opacity: 0.5, letterSpacing: "0.15em", fontFamily: "system-ui, sans-serif", marginTop: "0.2rem" }}>{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "8rem 3rem", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(to right, transparent, rgba(212,175,55,0.3), transparent)" }} />

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "5rem" }}>
          <div style={{ fontSize: "0.7rem", letterSpacing: "0.3em", color: "#d4af37", marginBottom: "1rem" }}>OUR SERVICES</div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 300, letterSpacing: "-0.02em" }}>
            Treatments Designed <br /><span style={{ fontStyle: "italic", color: "#d4af37" }}>For You</span>
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5px", maxWidth: "1100px", margin: "0 auto", background: "rgba(212,175,55,0.1)" }}>
          {services.map((service, i) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{
                padding: "2.5rem", background: "transparent",
                cursor: "pointer", transition: "background 0.3s ease",
                position: "relative", overflow: "hidden"
              }}
              whileHover={{ backgroundColor: "#0f0f18" }}>
              <div style={{ fontSize: "2rem", marginBottom: "1.2rem" }}>{service.icon}</div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 400, marginBottom: "0.5rem", letterSpacing: "0.03em" }}>{service.name}</h3>
              <p style={{ fontSize: "0.8rem", opacity: 0.5, fontFamily: "system-ui, sans-serif", lineHeight: 1.6, marginBottom: "1.5rem" }}>{service.desc}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#d4af37", fontSize: "1.1rem", fontWeight: 300 }}>{service.price}</span>
                <span style={{ fontSize: "0.7rem", opacity: 0.4, fontFamily: "system-ui, sans-serif", letterSpacing: "0.1em" }}>{service.duration}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{ textAlign: "center", marginTop: "4rem" }}>
          <Link href="/book" style={{
            padding: "1rem 3rem", border: "1px solid rgba(212,175,55,0.4)",
            color: "#d4af37", textDecoration: "none", fontSize: "0.8rem",
            letterSpacing: "0.2em", fontFamily: "system-ui, sans-serif",
            transition: "all 0.3s ease", display: "inline-block"
          }}>
            BOOK ANY SERVICE
          </Link>
        </motion.div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "8rem 3rem", display: "flex", gap: "6rem", alignItems: "center", maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(to right, transparent, rgba(212,175,55,0.3), transparent)" }} />

        <motion.div
          initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ flex: 1 }}>
          <div style={{ fontSize: "0.7rem", letterSpacing: "0.3em", color: "#d4af37", marginBottom: "1.5rem" }}>ABOUT US</div>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 300, lineHeight: 1.2, marginBottom: "2rem" }}>
            A Sanctuary of <br /><span style={{ fontStyle: "italic", color: "#d4af37" }}>Beauty & Wellness</span>
          </h2>
          <p style={{ opacity: 0.6, lineHeight: 1.9, fontFamily: "system-ui, sans-serif", fontWeight: 300, fontSize: "0.95rem", marginBottom: "1.5rem" }}>
            Glamour Studio was founded with a single vision — to create a space where every client feels celebrated. Our team of expert stylists brings years of experience and a passion for beauty.
          </p>
          <p style={{ opacity: 0.6, lineHeight: 1.9, fontFamily: "system-ui, sans-serif", fontWeight: 300, fontSize: "0.95rem" }}>
            We use only premium products and stay ahead of the latest trends to ensure you leave looking and feeling your absolute best.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "rgba(212,175,55,0.15)" }}>
          {[["Premium Products", "We use only the finest beauty products"], ["Expert Team", "Trained and certified stylists"], ["Hygiene First", "Sanitized tools for every client"], ["Your Style", "Personalized to your unique look"]].map(([title, desc]) => (
            <div key={title} style={{ padding: "2rem", background: "#0a0a0f" }}>
              <div style={{ width: "24px", height: "1px", background: "#d4af37", marginBottom: "1rem" }} />
              <div style={{ fontSize: "0.85rem", fontWeight: 400, marginBottom: "0.5rem" }}>{title}</div>
              <div style={{ fontSize: "0.75rem", opacity: 0.45, fontFamily: "system-ui, sans-serif", lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "8rem 3rem", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(to right, transparent, rgba(212,175,55,0.3), transparent)" }} />

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ fontSize: "0.7rem", letterSpacing: "0.3em", color: "#d4af37", marginBottom: "1rem" }}>TESTIMONIALS</div>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 300 }}>
            What Our Clients <span style={{ fontStyle: "italic", color: "#d4af37" }}>Say</span>
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5px", maxWidth: "1000px", margin: "0 auto", background: "rgba(212,175,55,0.1)" }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              style={{ padding: "2.5rem", background: "#0a0a0f" }}>
              <div style={{ color: "#d4af37", fontSize: "1rem", marginBottom: "1.2rem", letterSpacing: "0.15em" }}>{"★".repeat(t.rating)}</div>
              <p style={{ opacity: 0.65, fontFamily: "system-ui, sans-serif", lineHeight: 1.8, fontSize: "0.9rem", marginBottom: "1.5rem", fontStyle: "italic" }}>"{t.text}"</p>
              <div style={{ fontSize: "0.75rem", letterSpacing: "0.1em", opacity: 0.5 }}>— {t.name}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "8rem 3rem", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(to right, transparent, rgba(212,175,55,0.3), transparent)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(212,175,55,0.05) 0%, transparent 70%)" }} />

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: "0.7rem", letterSpacing: "0.3em", color: "#d4af37", marginBottom: "1.5rem" }}>READY TO GLOW?</div>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 300, marginBottom: "2rem", lineHeight: 1.1 }}>
            Book Your <span style={{ fontStyle: "italic", color: "#d4af37" }}>Appointment</span><br />Today
          </h2>
          <p style={{ opacity: 0.55, fontFamily: "system-ui, sans-serif", marginBottom: "3rem", fontSize: "0.95rem" }}>
            Your transformation is just one click away.
          </p>
          <Link href="/book" style={{
            padding: "1.2rem 4rem", background: "#d4af37",
            color: "#0a0a0f", textDecoration: "none",
            fontSize: "0.85rem", letterSpacing: "0.2em",
            fontFamily: "system-ui, sans-serif", fontWeight: 700,
            display: "inline-block", transition: "all 0.3s ease"
          }}>
            BOOK NOW
          </Link>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer id="contact" style={{ padding: "3rem", borderTop: "1px solid rgba(212,175,55,0.15)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ fontSize: "1rem", letterSpacing: "0.15em", color: "#d4af37", fontWeight: 300 }}>
          GLAMOUR<span style={{ color: "#f5f0e8" }}>STUDIO</span>
        </div>
        <div style={{ fontSize: "0.75rem", opacity: 0.4, fontFamily: "system-ui, sans-serif", letterSpacing: "0.05em" }}>
          📍 Hyderabad · 📞 +91 98765 43210 · ✉️ hello@glamourstudio.in
        </div>
        <div style={{ fontSize: "0.7rem", opacity: 0.3, fontFamily: "system-ui, sans-serif", letterSpacing: "0.1em" }}>
          © 2025 GLAMOUR STUDIO
        </div>
      </footer>

    </main>
  );
}