/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useRef } from "react";

const SKILLS = {
  Frontend: ["HTML", "CSS", "JavaScript", "React.js", "Tailwind CSS"],
  Backend: ["Node.js", "Express.js", "REST APIs"],
  Database: ["MongoDB", "Redis"],
  "AI & Tools": ["n8n", "AI Agents", "RAG", "Qdrant", "Git", "GitHub", "Postman", "JWT Authentication"],
  Deployment: ["Vercel", "Render"],
};

const PROJECTS = [
  {
  title: "AI Job Copilot",
  description:
    "Developed an AI-powered career assistant for resume analysis, ATS scoring, job matching, interview preparation, and role-specific resume generation using React.js and n8n.",
      tech: ["React.js", "Tailwind CSS", "n8n", "Gemini AI"],
  github: "https://github.com/spriyanerisala/ai_job_copilot.git",
  demo:"https://ai-job-copilot-jet.vercel.app/",
  icon: "",
},
{
  title: "AI-Powered Resume Analyzer Chatbot",
  description:
    "AI-powered resume analysis chatbot with semantic search and vector embeddings. Implemented a RAG-based workflow to answer natural language questions from resume data with context-aware responses. Built using React.js and n8n with embeddings-based retrieval.",
  tech: ["React.js", "n8n", "Qdrant", "Embeddings", "LLMs"],
  github: "https://github.com/spriyanerisala/resume_analyse_n8n_vector_rag.git",
  demo:"https://resume-analyser-khaki-zeta.vercel.app/",
  icon: "",
},
  {
    title: "Alumni Website",
    description:
      "Full-stack alumni management web app with secure user/admin authentication. Admin panel with CRUD operations using MongoDB & Express.js. Responsive React UI deployed on Vercel.",
    tech: ["React.js", "Node.js", "MongoDB", "Express.js", "Vercel"],
    github: "https://github.com/spriyanerisala/alumni_website",
    demo:"",
    icon: "",
  },
  {
    title: "Book Stall E-Commerce",
    description:
      "Full-stack book e-commerce platform with JWT auth, admin panel, Stripe payments, and Redis caching. Complete product/user/order management with responsive React UI.",
    tech: ["React.js", "Node.js", "MongoDB", "Stripe", "Redis", "JWT"],
    github: "https://github.com/spriyanerisala/book-stall-ecommerce.git",
    demo:"",
    icon: "",
  },
  

];

const NAV_ITEMS = ["About", "Skills", "Projects", "Education", "Contact"];

/* ─── hooks ─── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function useIsMobile(breakpoint = 768) {
  const [mobile, setMobile] = useState(window.innerWidth < breakpoint);
  useEffect(() => {
    const h = () => setMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, [breakpoint]);
  return mobile;
}

/* ─── typewriter ─── */
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

/* ─── particle canvas ─── */
function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let anim;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const dots = Array.from({ length: 50 }, () => ({
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

/* ─── skill badge ─── */
function SkillBadge({ skill, delay }) {
  return (
    <span
      style={{
        display: "inline-block", padding: "5px 13px", margin: "4px",
        borderRadius: "20px", fontSize: "0.76rem",
        fontFamily: "'Inter', sans-serif",
        border: "1px solid rgba(0,212,255,0.4)",
        background: "rgba(0,102,255,0.1)", color: "#a8d8ff",
        animation: `fadeSlideUp 0.5s ease ${delay}s both`,
        transition: "all 0.3s", cursor: "default",
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

/* ─── animated section wrapper ─── */
function Section({ id, children, isMobile }) {
  const [ref, visible] = useInView();
  return (
    <section
      id={id}
      ref={ref}
      style={{
        padding: isMobile ? "64px 16px" : "90px 24px",
        maxWidth: 960, margin: "0 auto",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      {children}
    </section>
  );
}

/* ─── section title ─── */
function SectionTitle({ children }) {
  return (
    <div style={{ marginBottom: 44, textAlign: "center" }}>
      <h2 style={{
        fontFamily: "'Orbitron', monospace",
        fontSize: "clamp(1.2rem, 4vw, 2rem)",
        fontWeight: 700, color: "#e8f4ff",
        letterSpacing: "0.1em", textTransform: "uppercase",
        display: "inline-block",
      }}>
        <span style={{ color: "#00d4ff" }}>{"// "}</span>{children}
      </h2>
      <div style={{ height: 2, background: "linear-gradient(90deg, transparent, #0066ff, #00d4ff, transparent)", marginTop: 12 }} />
    </div>
  );
}

/* ─── hamburger icon ─── */
function HamburgerIcon({ open }) {
  const bar = (top, rot, opacity = 1) => ({
    position: "absolute", left: 0, width: 22, height: 2,
    background: "#00d4ff", borderRadius: 2,
    top, transition: "all 0.3s ease",
    transform: rot, opacity,
    transformOrigin: "center",
  });
  return (
    <div style={{ width: 22, height: 16, position: "relative", cursor: "pointer" }}>
      <span style={open ? bar("50%", "rotate(45deg) translateY(-50%)") : bar(0, "none")} />
      <span style={open ? bar("50%", "none", 0) : bar("50%", "translateY(-50%)")} />
      <span style={open ? bar("50%", "rotate(-45deg) translateY(-50%)") : bar("100%", "translateY(-100%)")} />
    </div>
  );
}

/* ═══════════════════════════════
   MAIN COMPONENT
═══════════════════════════════ */
export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("About");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile(768);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // close menu on resize to desktop
  useEffect(() => { if (!isMobile) setMenuOpen(false); }, [isMobile]);

  // lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id);
    setMenuOpen(false);
  };

  return (
    <div style={{ background: "#020818", minHeight: "100vh", color: "#e8f4ff", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Inter:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes blink      { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeSlideUp{ from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes float      { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes glowPulse  { 0%,100%{text-shadow:0 0 20px rgba(0,212,255,0.5)} 50%{text-shadow:0 0 40px #00d4ff,0 0 80px rgba(0,102,255,0.4)} }
        @keyframes scanLine   { 0%{top:-5%} 100%{top:105%} }
        @keyframes borderGlow { 0%,100%{border-color:rgba(0,102,255,0.3)} 50%{border-color:rgba(0,212,255,0.7)} }
        @keyframes slideDown  { from{opacity:0;transform:translateY(-16px)} to{opacity:1;transform:translateY(0)} }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #020818; }
        ::-webkit-scrollbar-thumb { background: #0066ff; border-radius: 2px; }
        a { color: #00d4ff; text-decoration: none; }
        a:hover { text-shadow: 0 0 8px #00d4ff; }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        padding: isMobile ? "0 20px" : "0 40px",
        height: 60,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled || menuOpen ? "rgba(2,8,24,0.97)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(14px)" : "none",
        borderBottom: scrolled || menuOpen ? "1px solid rgba(0,102,255,0.2)" : "none",
        transition: "background 0.4s, border 0.4s",
      }}>
        {/* Logo */}
        <div style={{ fontFamily: "'Orbitron', monospace", fontWeight: 700, fontSize: "1.05rem", color: "#00d4ff", letterSpacing: "0.1em", zIndex: 201 }}>
          SIVA_PRIYA<span style={{ color: "#0066ff" }}>_</span>
        </div>

        {/* Desktop nav links */}
        {!isMobile && (
          <div style={{ display: "flex", gap: 32 }}>
            {NAV_ITEMS.map(n => (
              <button key={n} onClick={() => scrollTo(n)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "'Orbitron', monospace", fontSize: "0.7rem",
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: activeNav === n ? "#00d4ff" : "rgba(232,244,255,0.6)",
                  textShadow: activeNav === n ? "0 0 8px #00d4ff" : "none",
                  transition: "all 0.3s",
                  paddingBottom: 4,
                  borderBottom: activeNav === n ? "1px solid #00d4ff" : "1px solid transparent",
                }}
                onMouseEnter={e => { if (activeNav !== n) e.target.style.color = "#a8d8ff"; }}
                onMouseLeave={e => { if (activeNav !== n) e.target.style.color = "rgba(232,244,255,0.6)"; }}
              >{n}</button>
            ))}
          </div>
        )}

        {/* Hamburger button (mobile) */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(o => !o)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              padding: 8, zIndex: 201, display: "flex", alignItems: "center",
            }}
            aria-label="Toggle menu"
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        )}
      </nav>

      {/* ── MOBILE DRAWER MENU ── */}
      {isMobile && (
        <div style={{
          position: "fixed", top: 60, left: 0, right: 0, bottom: 0,
          zIndex: 199,
          background: "rgba(2,8,24,0.98)",
          backdropFilter: "blur(20px)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: 8,
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
          borderTop: "1px solid rgba(0,102,255,0.15)",
        }}>
          {/* decorative horizontal line */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #0066ff, #00d4ff, transparent)" }} />

          {NAV_ITEMS.map((n, i) => (
            <button key={n} onClick={() => scrollTo(n)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'Orbitron', monospace",
                fontSize: "1.1rem",
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: activeNav === n ? "#00d4ff" : "rgba(232,244,255,0.75)",
                textShadow: activeNav === n ? "0 0 16px #00d4ff" : "none",
                padding: "18px 40px",
                width: "100%", textAlign: "center",
                borderBottom: "1px solid rgba(0,102,255,0.1)",
                transition: "all 0.25s",
                animation: menuOpen ? `slideDown 0.3s ease ${i * 0.06}s both` : "none",
                position: "relative",
              }}
              onTouchStart={e => { e.currentTarget.style.background = "rgba(0,102,255,0.12)"; e.currentTarget.style.color = "#00d4ff"; }}
              onTouchEnd={e => { e.currentTarget.style.background = "none"; }}
            >
              <span style={{ color: "#0066ff", fontSize: "0.7rem", marginRight: 10, verticalAlign: "middle" }}>0{i + 1}.</span>
              {n}
            </button>
          ))}

          {/* Social links in drawer */}
          <div style={{ display: "flex", gap: 20, marginTop: 32, animation: menuOpen ? "slideDown 0.3s ease 0.35s both" : "none" }}>
            {[
              { label: "GH", href: "https://github.com/spriyanerisala" },
              { label: "LI", href: "https://www.linkedin.com/in/siva-priya-nerisala-304aa92ab" },
              { label: "LC", href: "https://leetcode.com/u/WrAEWBsWV8/" },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                style={{
                  fontFamily: "'Orbitron', monospace", fontSize: "0.72rem",
                  letterSpacing: "0.1em",
                  color: "#a8d8ff", border: "1px solid rgba(0,102,255,0.35)",
                  padding: "10px 18px", borderRadius: 4,
                  transition: "all 0.25s",
                  display: "flex", alignItems: "center",
                }}
              >{s.label}</a>
            ))}
          </div>
        </div>
      )}

      {/* ── HERO ── */}
      <div id="about" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <ParticleCanvas />
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(0,102,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,102,255,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        <div style={{
          position: "absolute", left: 0, right: 0, height: "2px",
          background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.3), transparent)",
          animation: "scanLine 4s linear infinite",
        }} />

        <div style={{
          position: "relative", textAlign: "center",
          padding: isMobile ? "100px 20px 60px" : "0 32px",
          animation: "fadeSlideUp 1s ease 0.2s both",
          maxWidth: 680, width: "100%",
        }}>
          <p style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: isMobile ? "0.65rem" : "0.8rem",
            letterSpacing: "0.28em", color: "#0066ff",
            textTransform: "uppercase", marginBottom: 18,
          }}>
            {"< Hello World />"}
          </p>
          <h1 style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: isMobile ? "clamp(1.9rem, 10vw, 3rem)" : "clamp(2.8rem, 7vw, 5rem)",
            fontWeight: 900, letterSpacing: "0.04em",
            lineHeight: 1.1, marginBottom: 16,
            animation: "glowPulse 3s ease infinite",
          }}>
            Siva Priya<br />
            <span style={{ color: "#00d4ff" }}>Nerisala</span>
          </h1>
          <div style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: isMobile ? "clamp(0.75rem, 3.5vw, 1rem)" : "clamp(1rem, 2.5vw, 1.4rem)",
            color: "#a8d8ff", letterSpacing: "0.05em",
            marginBottom: 28, minHeight: "2em",
          }}>
            <Typewriter texts={["MERN Stack Developer", "Full-Stack Engineer", "React.js Specialist", "Web Developer"]} />
          </div>
          <p style={{
            maxWidth: 520, margin: "0 auto 36px",
            color: "rgba(168,216,255,0.75)",
            lineHeight: 1.75,
            fontSize: isMobile ? "0.88rem" : "0.95rem",
          }}>
            Final Year B.Tech student at Siddartha Institute of Science and Technology, passionate about building real-world web applications with modern JavaScript technologies.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { label: "LinkedIn", href: "https://www.linkedin.com/in/siva-priya-nerisala-304aa92ab", primary: true },
              { label: "GitHub", href: "https://github.com/spriyanerisala", primary: false },
              { label: "LeetCode", href: "https://leetcode.com/u/WrAEWBsWV8/", primary: false },
            ].map(btn => (
              <a key={btn.label} href={btn.href} target="_blank" rel="noreferrer"
                style={{
                  padding: isMobile ? "10px 22px" : "12px 28px",
                  borderRadius: 4,
                  fontFamily: "'Orbitron', monospace",
                  fontSize: isMobile ? "0.68rem" : "0.75rem",
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  fontWeight: 700,
                  background: btn.primary ? "linear-gradient(135deg,#0066ff,#00d4ff)" : "transparent",
                  color: btn.primary ? "#020818" : "#00d4ff",
                  border: btn.primary ? "none" : "1px solid #0066ff",
                  boxShadow: btn.primary ? "0 0 20px rgba(0,102,255,0.5)" : "none",
                  transition: "all 0.3s",
                  display: "inline-block",
                  animation: !btn.primary ? "borderGlow 2s ease infinite" : "none",
                }}
                onMouseEnter={e => {
                  if (btn.primary) { e.currentTarget.style.boxShadow = "0 0 32px rgba(0,212,255,0.7)"; }
                  else { e.currentTarget.style.background = "rgba(0,102,255,0.14)"; }
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  if (btn.primary) { e.currentTarget.style.boxShadow = "0 0 20px rgba(0,102,255,0.5)"; }
                  else { e.currentTarget.style.background = "transparent"; }
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >{btn.label}</a>
            ))}
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", animation: "float 2s ease infinite", opacity: 0.45 }}>
          <div style={{ width: 1, height: 44, background: "linear-gradient(to bottom, #00d4ff, transparent)", margin: "0 auto" }} />
        </div>
      </div>

      {/* ── SKILLS ── */}
      <Section id="skills" isMobile={isMobile}>
        <SectionTitle>Skills</SectionTitle>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(270px, 1fr))",
          gap: 16,
        }}>
          {Object.entries(SKILLS).map(([cat, items], ci) => (
            <div key={cat}
              style={{
                background: "rgba(10,22,40,0.85)",
                border: "1px solid rgba(0,102,255,0.22)",
                borderRadius: 8, padding: "22px 18px",
                transition: "all 0.3s",
                animation: `fadeSlideUp 0.5s ease ${ci * 0.08}s both`,
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,212,255,0.5)"; e.currentTarget.style.boxShadow = "0 0 24px rgba(0,102,255,0.18)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,102,255,0.22)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <h3 style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.7rem", letterSpacing: "0.14em", color: "#0066ff", textTransform: "uppercase", marginBottom: 14 }}>
                {cat}
              </h3>
              <div>{items.map((s, i) => <SkillBadge key={s} skill={s} delay={ci * 0.08 + i * 0.04} />)}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── PROJECTS ── */}
      <Section id="projects" isMobile={isMobile}>
        <SectionTitle>Projects</SectionTitle>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(360px, 1fr))",
          gap: 24,
        }}>
          {PROJECTS.map((p, i) => (
            <div key={p.title}
              style={{
                background: "rgba(10,22,40,0.85)",
                border: "1px solid rgba(0,102,255,0.25)",
                borderRadius: 10, padding: "28px 22px",
                position: "relative", overflow: "hidden",
                transition: "all 0.4s",
                animation: `fadeSlideUp 0.6s ease ${i * 0.12}s both`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(0,212,255,0.55)";
                e.currentTarget.style.boxShadow = "0 0 36px rgba(0,102,255,0.22), inset 0 0 36px rgba(0,102,255,0.05)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(0,102,255,0.25)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, #0066ff, #00d4ff, transparent)" }} />
              <div style={{ fontSize: "2rem", marginBottom: 14, animation: "float 3s ease infinite" }}>{p.icon}</div>
              <h3 style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.95rem", fontWeight: 700, color: "#e8f4ff", letterSpacing: "0.04em", marginBottom: 10 }}>{p.title}</h3>
              <p style={{ color: "rgba(168,216,255,0.75)", fontSize: "0.86rem", lineHeight: 1.7, marginBottom: 18 }}>{p.description}</p>
              <div style={{ marginBottom: 20, display: "flex", flexWrap: "wrap", gap: 4 }}>
                {p.tech.map(t => (
                  <span key={t} style={{
                    padding: "3px 10px", borderRadius: 3,
                    fontSize: "0.7rem",
                    background: "rgba(0,102,255,0.15)", color: "#0066ff",
                    border: "1px solid rgba(0,102,255,0.3)",
                    fontFamily: "'Orbitron', monospace", letterSpacing: "0.04em",
                  }}>{t}</span>
                ))}
              </div>
              {/* <a href={p.github} target="_blank" rel="noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 7,
                  fontFamily: "'Orbitron', monospace", fontSize: "0.7rem",
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "#00d4ff", border: "1px solid rgba(0,212,255,0.35)",
                  padding: "9px 16px", borderRadius: 4, transition: "all 0.3s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,212,255,0.1)"; e.currentTarget.style.boxShadow = "0 0 12px rgba(0,212,255,0.3)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.boxShadow = "none"; }}
              >
                {"</>"} View Code
              </a> */}
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
  <a
    href={p.github}
    target="_blank"
    rel="noreferrer"
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      fontFamily: "'Orbitron', monospace",
      fontSize: "0.7rem",
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: "#00d4ff",
      border: "1px solid rgba(0,212,255,0.35)",
      padding: "9px 16px",
      borderRadius: 4,
      transition: "all 0.3s",
    }}
    onMouseEnter={e => {
      e.currentTarget.style.background = "rgba(0,212,255,0.1)";
      e.currentTarget.style.boxShadow = "0 0 12px rgba(0,212,255,0.3)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.background = "transparent";
      e.currentTarget.style.boxShadow = "none";
    }}
  >
    {"</>"} View Code
  </a>

  {p.demo && (
    <a
      href={p.demo}
      target="_blank"
      rel="noreferrer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        fontFamily: "'Orbitron', monospace",
        fontSize: "0.7rem",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "#020818",
        background: "linear-gradient(135deg,#0066ff,#00d4ff)",
        padding: "9px 16px",
        borderRadius: 4,
        fontWeight: "700",
        transition: "all 0.3s",
      }}
    >
      🚀 Live Demo
    </a>
  )}
</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── EDUCATION ── */}
      <Section id="education" isMobile={isMobile}>
        <SectionTitle>Education</SectionTitle>
        <div style={{ position: "relative", paddingLeft: isMobile ? 24 : 32 }}>
          <div style={{ position: "absolute", left: 0, top: 8, bottom: 8, width: 2, background: "linear-gradient(to bottom, #0066ff, #00d4ff, rgba(0,102,255,0.1))" }} />
          {[
            { degree: "B.Tech", school: "Siddartha Institute of Science and Technology", place: "Puttur, Tirupati", current: true },
            { degree: "Intermediate", school: "Sri Chaitanya Junior College", place: "Vijayawada", current: false },
            { degree: "SSC", school: "Narayana E.M. High School", place: "Tirupati", current: false },
          ].map((edu, i) => (
            <div key={edu.degree} style={{ marginBottom: 28, paddingLeft: isMobile ? 18 : 24, position: "relative", animation: `fadeSlideUp 0.5s ease ${i * 0.12}s both` }}>
              <div style={{
                position: "absolute", left: isMobile ? -27 : -33, top: 8,
                width: 12, height: 12, borderRadius: "50%",
                background: edu.current ? "#00d4ff" : "#0066ff",
                boxShadow: edu.current ? "0 0 16px #00d4ff" : "0 0 8px #0066ff",
                border: "2px solid #020818",
              }} />
              <div style={{
                background: "rgba(10,22,40,0.85)",
                border: `1px solid ${edu.current ? "rgba(0,212,255,0.38)" : "rgba(0,102,255,0.2)"}`,
                borderRadius: 8, padding: isMobile ? "16px 16px" : "20px 24px",
              }}>
                <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 8, marginBottom: 6 }}>
                  <span style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.7rem", letterSpacing: "0.1em", color: edu.current ? "#00d4ff" : "#0066ff", textTransform: "uppercase" }}>{edu.degree}</span>
                  {edu.current && (
                    <span style={{ fontSize: "0.6rem", padding: "2px 8px", borderRadius: 10, background: "rgba(0,212,255,0.14)", border: "1px solid rgba(0,212,255,0.38)", color: "#00d4ff", fontFamily: "'Orbitron', monospace", letterSpacing: "0.05em" }}>CURRENT</span>
                  )}
                </div>
                <div style={{ fontSize: isMobile ? "0.88rem" : "0.95rem", fontWeight: 600, color: "#e8f4ff", marginBottom: 4 }}>{edu.school}</div>
                <div style={{ fontSize: "0.8rem", color: "rgba(168,216,255,0.6)" }}>{edu.place}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Certificate */}
        <div style={{
          marginTop: 12, padding: isMobile ? "16px 16px" : "20px 24px",
          background: "rgba(0,102,255,0.07)",
          border: "1px solid rgba(0,102,255,0.28)",
          borderRadius: 8, display: "flex", alignItems: "center", gap: 14,
          flexWrap: "wrap",
        }}>
          <span style={{ fontSize: "1.4rem" }}>🏆</span>
          <div>
            <div style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.68rem", letterSpacing: "0.12em", color: "#0066ff", textTransform: "uppercase", marginBottom: 3 }}>Certificate</div>
            <div style={{ color: "#e8f4ff", fontSize: "0.9rem" }}>Hackathon 2026 Participant</div>
            <div style={{ color: "rgba(168,216,255,0.6)", fontSize: "0.78rem" }}>Siddartha Institute of Science and Technology</div>
          </div>
        </div>
      </Section>

      {/* ── CONTACT ── */}
      <Section id="contact" isMobile={isMobile}>
        <SectionTitle>Contact</SectionTitle>
        <div style={{ textAlign: "center", maxWidth: 520, margin: "0 auto" }}>
          <p style={{ color: "rgba(168,216,255,0.7)", marginBottom: 36, lineHeight: 1.75, fontSize: isMobile ? "0.88rem" : "0.95rem" }}>
            Open to internship opportunities in web development. Feel free to reach out!
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { label: "Email", value: "nspriya005@gmail.com", href: "mailto:nspriya005@gmail.com", icon: "✉" },
              { label: "Phone", value: "8885023504", href: "tel:8885023504", icon: "📱" },
              { label: "Location", value: "Kadapa, Andhra Pradesh", href: null, icon: "📍" },
            ].map(c => (
              <div key={c.label}
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: isMobile ? "14px 16px" : "16px 24px",
                  borderRadius: 8, width: "100%",
                  background: "rgba(10,22,40,0.85)", border: "1px solid rgba(0,102,255,0.2)",
                  transition: "all 0.3s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,212,255,0.42)"; e.currentTarget.style.background = "rgba(0,102,255,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,102,255,0.2)"; e.currentTarget.style.background = "rgba(10,22,40,0.85)"; }}
              >
                <span style={{ fontSize: "1.1rem", width: 26, textAlign: "center", flexShrink: 0 }}>{c.icon}</span>
                <div style={{ textAlign: "left", minWidth: 0 }}>
                  <div style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.62rem", letterSpacing: "0.12em", color: "#0066ff", textTransform: "uppercase", marginBottom: 2 }}>{c.label}</div>
                  {c.href
                    ? <a href={c.href} style={{ color: "#a8d8ff", fontSize: isMobile ? "0.85rem" : "0.92rem", wordBreak: "break-all" }}>{c.value}</a>
                    : <span style={{ color: "#a8d8ff", fontSize: isMobile ? "0.85rem" : "0.92rem" }}>{c.value}</span>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid rgba(0,102,255,0.14)", padding: "24px 20px", textAlign: "center" }}>
        <p style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.6rem", letterSpacing: "0.14em", color: "rgba(168,216,255,0.32)", textTransform: "uppercase" }}>
          © 2026 Siva Priya Nerisala <span style={{ color: "#0066ff" }}>•</span> Built with React.js
        </p>
      </footer>
    </div>
  );
}