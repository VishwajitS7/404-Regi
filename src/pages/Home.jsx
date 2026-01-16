import { motion } from "framer-motion";
import Button from "../components/ui/Button";

export default function Home() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "circOut" }}
      >
        <span style={{
          display: 'inline-block',
          padding: '6px 16px',
          borderRadius: '99px',
          background: 'rgba(255, 158, 100, 0.1)',
          color: 'var(--accent-secondary)',
          fontWeight: 600,
          marginBottom: '20px',
          border: '1px solid rgba(255, 158, 100, 0.2)'
        }}>
          🚀 Registrations Closing Soon
        </span>

        <h1 className="hero-title" style={{ marginBottom: '24px', lineHeight: 1.1 }}>
          <span style={{
            background: 'linear-gradient(90deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Welcome to</span> <br />
          <span className="text-gradient-primary">CODE - 404</span>
        </h1>

        <div className="lead" style={{ fontSize: '1.25rem', marginBottom: '32px', maxWidth: '600px', lineHeight: '1.6' }}>
          {(() => {
            const text = "A one-day coding sprint — build, learn, and compete with mentors and prizes. Join the ultimate developer showdown at Oyster Kode.";
            let charIndex = 0;
            return text.split(" ").map((word, i) => (
              <span key={i} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
                {word.split("").map((char, j) => {
                  charIndex++;
                  return (
                    <motion.span
                      key={j}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: 0.5 + charIndex * 0.02 }}
                      style={{ display: "inline-block" }}
                    >
                      {char}
                    </motion.span>
                  );
                })}
                <span style={{ display: "inline-block" }}>&nbsp;</span>
              </span>
            ));
          })()}
        </div>

        <div className="hero-buttons" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Button onClick={() => scrollTo('register')}>
            Register Now
          </Button>
          <Button variant="outline" onClick={() => scrollTo('info')}>
            Learn More
          </Button>
        </div>

        <div className="hero-stats" style={{ marginTop: '48px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex' }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{
                width: 32, height: 32, borderRadius: '50%', background: '#333', border: '2px solid #000', marginLeft: -10,
                backgroundImage: `url(https://i.pravatar.cc/100?img=${i + 10})`, backgroundSize: 'cover'
              }} />
            ))}
          </div>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            <strong style={{ color: '#fff' }}>120+</strong> students joined
          </span>
        </div>
      </motion.div>
    </div>
  );
}
