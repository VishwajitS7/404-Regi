import React, { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { Code, Trophy, Users, Menu, X, Mail, Instagram, Linkedin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Success from "./pages/Success";
import Card from "./components/ui/Card";
import Memories from "./components/Memories";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#info" },
    { name: "Register", href: "#register" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <div className="app-root">
      <Toaster position="top-right" theme="dark" />
      <div className="particles-bg" />

      {/* Navigation */}
      <header className={`nav-fixed ${scrolled ? "scrolled" : ""}`}>
        <div className="container nav-content">
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 800, fontSize: 20 }}>
            <img 
              src="/img/logo.png" 
              alt="Oyster Kode Logo" 
              style={{ height: 32, width: 'auto', objectFit: 'contain' }}
            />
            Oyster Kode
          </div>

          <div className={`nav-links ${menuOpen ? 'mobile-open' : ''}`}>
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="nav-link" onClick={() => setMenuOpen(false)}>
                {link.name}
              </a>
            ))}
            <a href="#register" className="nav-link" style={{
              background: 'rgba(0, 212, 255, 0.1)',
              padding: '8px 16px',
              borderRadius: '99px',
              border: '1px solid rgba(0, 212, 255, 0.3)',
              color: 'var(--accent-primary)'
            }} onClick={() => setMenuOpen(false)}>Join Now</a>
          </div>

          <button
            className="mobile-menu-btn"
            style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
          {/* Background Elements */}
          <div className="hero-bg-element" style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
            <div style={{
              width: '100%', height: '100%',
              background: 'radial-gradient(circle at 50% 50%, rgba(0, 212, 255, 0.1), transparent 60%)',
              filter: 'blur(80px)'
            }} />
          </div>

          <div className="container hero-grid" style={{ position: 'relative', zIndex: 1 }}>
            <div>
              <Home />
            </div>

            {/* 3D Visual Replacement */}
            <motion.div
              className="glass-panel hero-visual"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(45deg, transparent 40%, rgba(255, 77, 126, 0.1))' }} />

              {/* Code visual */}
              <div style={{ fontFamily: 'monospace', fontSize: 14, color: 'var(--accent-primary)', opacity: 0.8, textShadow: '0 0 10px rgba(0, 212, 255, 0.5)' }}>
                <pre>{`
function Event() {
  return (
    <Hackathon 
      mode="beast"
      skills={['React', 'Firebase']}
    />
  );
}
                `}</pre>
              </div>

              <div style={{ position: 'absolute', bottom: -50, right: -50, width: 200, height: 200, background: 'var(--accent-tertiary)', filter: 'blur(80px)', borderRadius: '50%' }} />
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="info" className="section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 style={{ textAlign: 'center' }}>Why Participate?</h2>
              <p style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 60px' }}>
                Join hundreds of students in this immersive experience. It's more than just coding; it's about community.
              </p>
            </motion.div>

            <div className="grid-cols-3">
              <Card delay={0.1}>
                <Code size={40} color="var(--accent-secondary)" style={{ marginBottom: 20 }} />
                <h3 style={{ marginBottom: 12 }}>Workshops</h3>
                <p>Hands-on sessions with industry experts covering the latest tech stacks.</p>
              </Card>

              <Card delay={0.2}>
                <Trophy size={40} color="var(--accent-primary)" style={{ marginBottom: 20 }} />
                <h3 style={{ marginBottom: 12 }}>Competitions</h3>
                <p>Showcase your skills in intense coding battles and win exciting swags.</p>
              </Card>

              <Card delay={0.3}>
                <Users size={40} color="var(--accent-tertiary)" style={{ marginBottom: 20 }} />
                <h3 style={{ marginBottom: 12 }}>Networking</h3>
                <p>Connect with mentors, peers, and potential employers in the tech space.</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Memories Section */}
        <Memories />

        {/* Register Section */}
        <section id="register" className="section" style={{ position: 'relative' }}>
          <div className="container">
            <div className="register-grid">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2>Ready to Start?</h2>
                <p style={{ marginBottom: 40 }}>
                  Secure your spot today. Limited seats available for the upcoming cohort.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {['Free Swag Kits', 'Certificate of Completion', 'Lunch & Snacks'].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(80, 200, 120, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-secondary)' }}>✓</div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <div id="register-form-container">
                <Register onRegistrationSuccess={() => setRegistrationSuccess(true)} />
              </div>
            </div>
          </div>
        </section>

        {/* Success Section - Only shown after registration is complete */}
        {registrationSuccess && <Success />}

        {/* Footer */}
        <footer style={{ borderTop: '1px solid var(--border-subtle)', padding: '60px 0', marginTop: 100 }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 40 }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 24, marginBottom: 20 }}>Oyster Kode</div>
                <p style={{ maxWidth: 300 }}>Empowering the next generation of developers.</p>
              </div>

              <div style={{ display: 'flex', gap: 40 }}>
                <div>
                  <h4 style={{ marginBottom: 20, color: '#fff' }}>Links</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <a href="#home" className="nav-link">Home</a>
                    <a href="#info" className="nav-link">About</a>
                    <a href="#register" className="nav-link">Register</a>
                  </div>
                </div>

                <div>
                  <h4 style={{ marginBottom: 20, color: '#fff' }}>Socials</h4>
                  <div style={{ display: 'flex', gap: 16 }}>
                    <a 
                      href="https://www.instagram.com/oyster_kode/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
                    >
                      <Instagram size={20} />
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/oyster-kode-club/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
                    >
                      <Linkedin size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 60, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', fontSize: 14, color: 'var(--text-muted)' }}>
              © 2024 Oyster Kode. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
