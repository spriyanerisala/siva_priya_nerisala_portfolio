/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";

const SKILLS = {
  Frontend: ["HTML", "CSS", "JavaScript", "React.js", "Tailwind CSS"],
  Backend: ["Node.js", "Express.js", "RESTful APIs", "MySQL"],
  Database: ["MongoDB Atlas", "CRUD Operations", "Redis (Upstash)"],
  "Tools & Auth": ["Git", "GitHub", "Postman", "JWT Auth", "OAuth (Firebase)", "Stripe Payments"],
  Deployment: ["Vercel", "Netlify", "Render"],
};

const PROJECTS = [
  {
    title: "Alumni Website",
    description:
      "Full-stack alumni management web app with secure user/admin authentication. Admin panel with CRUD operations using MongoDB & Express.js. Responsive React UI deployed on Vercel.",
    tech: ["React.js", "Node.js", "MongoDB", "Express.js", "Vercel"],
    github: "https://github.com/spriyanerisala/alumni_website",
    icon: "",
  },
  {
    title: "Book Stall E-Commerce",
    description:
      "Full-stack book e-commerce platform with JWT auth, admin panel, Stripe payments, and Redis caching. Complete product/user/order management with responsive React UI.",
    tech: ["React.js", "Node.js", "MongoDB", "Stripe", "Redis", "JWT"],
    github: "https://github.com/spriyanerisala/book-stall-ecommerce.git",
    icon: "",
  },
];

const NAV_ITEMS = ["About", "Skills", "Projects", "Education", "Contact"];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Typewriter({ texts, speed = 80 }) {
  const [display, setDisplay] = useState("");
  const [tIdx, setTIdx] = useState(0);
  const [cIdx, setCIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[tIdx];
    const delay = deleting ? 40 : speed;
    const timer = setTimeout(() => {
      if (!deleting && cIdx < current.length) {
        setDisplay(current.slice(0, cIdx + 1));
        setCIdx(c => c + 1);
      } else if (!deleting && cIdx === current.length) {
        setTimeout(() => setDeleting(true), 1800);
      } else if (deleting && cIdx > 0) {
        setDisplay(current.slice(0, cIdx - 1));
        setCIdx(c => c - 1);
      } else {
        setDeleting(false);
        setTIdx(i => (i + 1) % texts.length);
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [display, cIdx, deleting, tIdx, texts, speed]);

  return (
    <span>
      {display}
      <span style={{ animation: "blink 1s step-end infinite", color: "#00d4ff" }}>▌</span>
    </span>
  );
}

function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let anim;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    const dots = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,212,255,0.5)";
        ctx.fill();
      });
      dots.forEach((a, i) => dots.slice(i + 1).forEach(b => {
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(0,102,255,${0.15 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }));
      anim = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(anim); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />;
}

function SkillBadge({ skill, delay }) {
  return (
    <span style={{
      display: "inline-block",
      padding: "5px 14px",
      margin: "4px",
      borderRadius: "20px",
      fontSize: "0.78rem",
      fontFamily: "'Inter', sans-serif",
      border: "1px solid rgba(0,212,255,0.4)",
      background: "rgba(0,102,255,0.1)",
      color: "#a8d8ff",
      animation: `fadeSlideUp 0.5s ease ${delay}s both`,
      transition: "all 0.3s",
      cursor: "default",
    }}
      onMouseEnter={e => {
        e.target.style.background = "rgba(0,212,255,0.2)";
        e.target.style.borderColor = "#00d4ff";
        e.target.style.color = "#00d4ff";
        e.target.style.boxShadow = "0 0 12px rgba(0,212,255,0.4)";
      }}
      onMouseLeave={e => {
        e.target.style.background = "rgba(0,102,255,0.1)";
        e.target.style.borderColor = "rgba(0,212,255,0.4)";
        e.target.style.color = "#a8d8ff";
        e.target.style.boxShadow = "none";
      }}
    >
      {skill}
    </span>
  );
}

function Section({ id, children }) {
  const [ref, visible] = useInView();
  return (
    <section id={id} ref={ref} style={{
      padding: "90px 24px",
      maxWidth: 960,
      margin: "0 auto",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(40px)",
      transition: "opacity 0.7s ease, transform 0.7s ease",
    }}>
      {children}
    </section>
  );
}

function SectionTitle({ children }) {
  return (
    <div style={{ marginBottom: 48, textAlign: "center" }}>
      <h2 style={{
        fontFamily: "'Orbitron', monospace",
        fontSize: "clamp(1.4rem, 3vw, 2rem)",
        fontWeight: 700,
        color: "#e8f4ff",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        position: "relative",
        display: "inline-block",
      }}>
        <span style={{ color: "#00d4ff" }}>{"// "}</span>{children}
      </h2>
      <div style={{ height: 2, background: "linear-gradient(90deg, transparent, #0066ff, #00d4ff, transparent)", marginTop: 12 }} />
    </div>
  );
}

export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("About");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id);
    setMenuOpen(false);
  };

  return (
    <div style={{ background: "#020818", minHeight: "100vh", color: "#e8f4ff", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Inter:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes glowPulse { 0%,100%{text-shadow:0 0 20px rgba(0,212,255,0.5)} 50%{text-shadow:0 0 40px #00d4ff,0 0 80px rgba(0,102,255,0.4)} }
        @keyframes scanLine { 0%{top:-5%} 100%{top:105%} }
        @keyframes borderGlow { 0%,100%{border-color:rgba(0,102,255,0.3)} 50%{border-color:rgba(0,212,255,0.7)} }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #020818; }
        ::-webkit-scrollbar-thumb { background: #0066ff; border-radius: 3px; }
        a { color: #00d4ff; text-decoration: none; }
        a:hover { text-shadow: 0 0 8px #00d4ff; }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 32px",
        height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(2,8,24,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,102,255,0.2)" : "none",
        transition: "all 0.4s ease",
      }}>
        <div style={{ fontFamily: "'Orbitron', monospace", fontWeight: 700, fontSize: "1.1rem", color: "#00d4ff", letterSpacing: "0.1em" }}>
          NSP<span style={{ color: "#0066ff" }}>_</span>
        </div>
        <div style={{ display: "flex", gap: 32 }}>
          {NAV_ITEMS.map(n => (
            <button key={n} onClick={() => scrollTo(n)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'Orbitron', monospace", fontSize: "0.72rem",
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: activeNav === n ? "#00d4ff" : "rgba(232,244,255,0.6)",
                textShadow: activeNav === n ? "0 0 8px #00d4ff" : "none",
                transition: "all 0.3s",
                padding: "4px 0",
                borderBottom: activeNav === n ? "1px solid #00d4ff" : "1px solid transparent",
              }}
              onMouseEnter={e => { if (activeNav !== n) e.target.style.color = "#a8d8ff"; }}
              onMouseLeave={e => { if (activeNav !== n) e.target.style.color = "rgba(232,244,255,0.6)"; }}
            >{n}</button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <div id="about" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <ParticleCanvas />
        {/* grid overlay */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(0,102,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,102,255,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        {/* scan line */}
        <div style={{
          position: "absolute", left: 0, right: 0, height: "2px",
          background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.3), transparent)",
          animation: "scanLine 4s linear infinite",
        }} />
        <div style={{ position: "relative", textAlign: "center", padding: "0 24px", animation: "fadeSlideUp 1s ease 0.2s both" }}>
          <p style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.8rem", letterSpacing: "0.3em", color: "#0066ff", textTransform: "uppercase", marginBottom: 20 }}>
            {"< Hello World />"}
          </p>
          <h1 style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "clamp(2.4rem, 7vw, 5rem)",
            fontWeight: 900,
            letterSpacing: "0.05em",
            lineHeight: 1.1,
            animation: "glowPulse 3s ease infinite",
            marginBottom: 16,
          }}>
            Siva Priya<br />
            <span style={{ color: "#00d4ff" }}>Nerisala</span>
          </h1>
          <div style={{ fontFamily: "'Orbitron', monospace", fontSize: "clamp(1rem, 2.5vw, 1.4rem)", color: "#a8d8ff", letterSpacing: "0.06em", marginBottom: 36, minHeight: "2em" }}>
            <Typewriter texts={["MERN Stack Developer", "Full-Stack Engineer", "React.js Specialist", "Web Developer"]} />
          </div>
          <p style={{ maxWidth: 560, margin: "0 auto 40px", color: "rgba(168,216,255,0.75)", lineHeight: 1.7, fontSize: "0.95rem" }}>
            Final year B.Tech student at Siddartha Institute of Science and Technology, passionate about building real-world web applications with modern JavaScript technologies.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://www.linkedin.com/in/siva-priya-nerisala-304aa92ab" target="_blank" rel="noreferrer"
              style={{
                padding: "12px 28px", borderRadius: 4, fontFamily: "'Orbitron', monospace", fontSize: "0.75rem",
                letterSpacing: "0.1em", textTransform: "uppercase",
                background: "linear-gradient(135deg, #0066ff, #00d4ff)",
                color: "#020818", fontWeight: 700,
                boxShadow: "0 0 20px rgba(0,102,255,0.5)", border: "none",
                transition: "all 0.3s", display: "inline-block",
              }}
              onMouseEnter={e => { e.target.style.boxShadow = "0 0 35px rgba(0,212,255,0.7)"; e.target.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.target.style.boxShadow = "0 0 20px rgba(0,102,255,0.5)"; e.target.style.transform = "translateY(0)"; }}
            >LinkedIn</a>
            <a href="https://github.com/spriyanerisala" target="_blank" rel="noreferrer"
              style={{
                padding: "12px 28px", borderRadius: 4, fontFamily: "'Orbitron', monospace", fontSize: "0.75rem",
                letterSpacing: "0.1em", textTransform: "uppercase",
                background: "transparent",
                color: "#00d4ff", fontWeight: 700,
                border: "1px solid #0066ff",
                transition: "all 0.3s", display: "inline-block",
                animation: "borderGlow 2s ease infinite",
              }}
              onMouseEnter={e => { e.target.style.background = "rgba(0,102,255,0.15)"; e.target.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.transform = "translateY(0)"; }}
            >GitHub</a>
            <a href="https://leetcode.com/u/WrAEWBsWV8/" target="_blank" rel="noreferrer"
              style={{
                padding: "12px 28px", borderRadius: 4, fontFamily: "'Orbitron', monospace", fontSize: "0.75rem",
                letterSpacing: "0.1em", textTransform: "uppercase",
                background: "transparent",
                color: "#a8d8ff", fontWeight: 700,
                border: "1px solid rgba(168,216,255,0.3)",
                transition: "all 0.3s", display: "inline-block",
              }}
              onMouseEnter={e => { e.target.style.background = "rgba(168,216,255,0.07)"; e.target.style.borderColor = "rgba(168,216,255,0.6)"; }}
              onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.borderColor = "rgba(168,216,255,0.3)"; }}
            >LeetCode</a>
          </div>
        </div>
        {/* scroll hint */}
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", animation: "float 2s ease infinite", opacity: 0.5 }}>
          <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, #00d4ff, transparent)", margin: "0 auto" }} />
        </div>
      </div>

      {/* SKILLS */}
      <Section id="skills">
        <SectionTitle>Skills</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
          {Object.entries(SKILLS).map(([cat, items], ci) => (
            <div key={cat} style={{
              background: "rgba(10,22,40,0.8)",
              border: "1px solid rgba(0,102,255,0.2)",
              borderRadius: 8,
              padding: "24px 20px",
              transition: "all 0.3s",
              animation: `fadeSlideUp 0.5s ease ${ci * 0.1}s both`,
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,212,255,0.5)"; e.currentTarget.style.boxShadow = "0 0 24px rgba(0,102,255,0.2)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,102,255,0.2)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <h3 style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.75rem", letterSpacing: "0.15em", color: "#0066ff", textTransform: "uppercase", marginBottom: 16 }}>
                {cat}
              </h3>
              <div>{items.map((s, i) => <SkillBadge key={s} skill={s} delay={ci * 0.1 + i * 0.05} />)}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects">
        <SectionTitle>Projects</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: 28 }}>
          {PROJECTS.map((p, i) => (
            <div key={p.title} style={{
              background: "rgba(10,22,40,0.8)",
              border: "1px solid rgba(0,102,255,0.25)",
              borderRadius: 10,
              padding: "32px 28px",
              position: "relative",
              overflow: "hidden",
              transition: "all 0.4s",
              animation: `fadeSlideUp 0.6s ease ${i * 0.15}s both`,
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(0,212,255,0.6)";
                e.currentTarget.style.boxShadow = "0 0 40px rgba(0,102,255,0.25), inset 0 0 40px rgba(0,102,255,0.05)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(0,102,255,0.25)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, #0066ff, #00d4ff, transparent)" }} />
              <div style={{ fontSize: "2.2rem", marginBottom: 16, animation: "float 3s ease infinite" }}>{p.icon}</div>
              <h3 style={{ fontFamily: "'Orbitron', monospace", fontSize: "1rem", fontWeight: 700, color: "#e8f4ff", letterSpacing: "0.05em", marginBottom: 12 }}>{p.title}</h3>
              <p style={{ color: "rgba(168,216,255,0.75)", fontSize: "0.88rem", lineHeight: 1.7, marginBottom: 20 }}>{p.description}</p>
              <div style={{ marginBottom: 24 }}>
                {p.tech.map(t => (
                  <span key={t} style={{
                    display: "inline-block", margin: "3px", padding: "3px 10px",
                    borderRadius: 3, fontSize: "0.72rem",
                    background: "rgba(0,102,255,0.15)", color: "#0066ff",
                    border: "1px solid rgba(0,102,255,0.3)",
                    fontFamily: "'Orbitron', monospace", letterSpacing: "0.05em",
                  }}>{t}</span>
                ))}
              </div>
              <a href={p.github} target="_blank" rel="noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  fontFamily: "'Orbitron', monospace", fontSize: "0.72rem",
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "#00d4ff", border: "1px solid rgba(0,212,255,0.35)",
                  padding: "9px 18px", borderRadius: 4,
                  transition: "all 0.3s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,212,255,0.1)"; e.currentTarget.style.boxShadow = "0 0 12px rgba(0,212,255,0.3)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.boxShadow = "none"; }}
              >
                {"</>"} View Code
              </a>
            </div>
          ))}
        </div>
      </Section>

      {/* EDUCATION */}
      <Section id="education">
        <SectionTitle>Education</SectionTitle>
        <div style={{ position: "relative", paddingLeft: 32 }}>
          <div style={{ position: "absolute", left: 0, top: 8, bottom: 8, width: 2, background: "linear-gradient(to bottom, #0066ff, #00d4ff, rgba(0,102,255,0.1))" }} />
          {[
            { degree: "B.Tech", school: "Siddartha Institute of Science and Technology", place: "Puttur, Tirupati", current: true },
            { degree: "Intermediate", school: "Sri Chaitanya Junior College", place: "Vijayawada", current: false },
            { degree: "SSC", school: "Narayana E.M. High School", place: "Tirupati", current: false },
          ].map((e, i) => (
            <div key={e.degree} style={{
              marginBottom: 36, paddingLeft: 24, position: "relative",
              animation: `fadeSlideUp 0.5s ease ${i * 0.15}s both`,
            }}>
              <div style={{
                position: "absolute", left: -37, top: 6,
                width: 12, height: 12, borderRadius: "50%",
                background: e.current ? "#00d4ff" : "#0066ff",
                boxShadow: e.current ? "0 0 16px #00d4ff" : "0 0 8px #0066ff",
                border: "2px solid #020818",
              }} />
              <div style={{
                background: "rgba(10,22,40,0.8)",
                border: `1px solid ${e.current ? "rgba(0,212,255,0.4)" : "rgba(0,102,255,0.2)"}`,
                borderRadius: 8, padding: "20px 24px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <span style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.72rem", letterSpacing: "0.1em", color: e.current ? "#00d4ff" : "#0066ff", textTransform: "uppercase" }}>{e.degree}</span>
                  {e.current && <span style={{ fontSize: "0.65rem", padding: "2px 8px", borderRadius: 10, background: "rgba(0,212,255,0.15)", border: "1px solid rgba(0,212,255,0.4)", color: "#00d4ff", fontFamily: "'Orbitron', monospace", letterSpacing: "0.05em" }}>CURRENT</span>}
                </div>
                <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "#e8f4ff", marginBottom: 4 }}>{e.school}</div>
                <div style={{ fontSize: "0.82rem", color: "rgba(168,216,255,0.6)" }}>{e.place}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Certificate */}
        <div style={{
          marginTop: 16, padding: "20px 24px",
          background: "rgba(0,102,255,0.08)",
          border: "1px solid rgba(0,102,255,0.3)",
          borderRadius: 8, display: "flex", alignItems: "center", gap: 16,
        }}>
          <span style={{ fontSize: "1.5rem" }}>🏆</span>
          <div>
            <div style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.72rem", letterSpacing: "0.12em", color: "#0066ff", textTransform: "uppercase", marginBottom: 4 }}>Certificate</div>
            <div style={{ color: "#e8f4ff", fontSize: "0.92rem" }}>Hackathon 2026 Participant</div>
            <div style={{ color: "rgba(168,216,255,0.6)", fontSize: "0.8rem" }}>Siddartha Institute of Science and Technology</div>
          </div>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact">
        <SectionTitle>Contact</SectionTitle>
        <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto" }}>
          <p style={{ color: "rgba(168,216,255,0.7)", marginBottom: 40, lineHeight: 1.7 }}>
            Open to internship opportunities in web development. Feel free to reach out!
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
            {[
              { label: "Email", value: "nspriya005@gmail.com", href: "mailto:nspriya005@gmail.com", icon: "✉" },
              { label: "Phone", value: "8885023504", href: "tel:8885023504", icon: "📱" },
              { label: "Location", value: "Kadapa, Andhra Pradesh", href: null, icon: "📍" },
            ].map(c => (
              <div key={c.label} style={{
                display: "flex", alignItems: "center", gap: 16,
                padding: "16px 28px", borderRadius: 8, width: "100%",
                background: "rgba(10,22,40,0.8)", border: "1px solid rgba(0,102,255,0.2)",
                transition: "all 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,212,255,0.45)"; e.currentTarget.style.background = "rgba(0,102,255,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,102,255,0.2)"; e.currentTarget.style.background = "rgba(10,22,40,0.8)"; }}
              >
                <span style={{ fontSize: "1.2rem", width: 28, textAlign: "center" }}>{c.icon}</span>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.65rem", letterSpacing: "0.12em", color: "#0066ff", textTransform: "uppercase", marginBottom: 2 }}>{c.label}</div>
                  {c.href
                    ? <a href={c.href} style={{ color: "#a8d8ff", fontSize: "0.92rem" }}>{c.value}</a>
                    : <span style={{ color: "#a8d8ff", fontSize: "0.92rem" }}>{c.value}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(0,102,255,0.15)", padding: "28px 24px", textAlign: "center" }}>
        <p style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", color: "rgba(168,216,255,0.35)", textTransform: "uppercase" }}>
          © 2026 Siva Priya Nerisala <span style={{ color: "#0066ff" }}>•</span> Built with React.js
        </p>
      </footer>
    </div>
  );
}
