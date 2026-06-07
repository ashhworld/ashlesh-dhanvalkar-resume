import { useState, useEffect, useRef } from "react";

const COLORS = {
  navy: "#0A1628",
  navyLight: "#0F2040",
  gold: "#D4A843",
  goldLight: "#E8C068",
  goldDim: "rgba(212,168,67,0.15)",
  white: "#F5F0E8",
  muted: "#8A9BB5",
  card: "rgba(255,255,255,0.04)",
  cardBorder: "rgba(212,168,67,0.18)",
  accent: "#1E5FAD",
};

const NAV_LINKS = ["About", "Services", "Experience", "Skills", "Portfolio", "Contact"];

const SERVICES = [
  { icon: "⚛", title: "React Web Applications", desc: "Enterprise-grade SPAs & micro-frontends built with React, TypeScript, Redux. Performance-tuned, scalable, production-ready.", tags: ["React", "TypeScript", "Redux", "Micro-FE"], price: "Starting ₹25,000" },
  { icon: "🎨", title: "Digital Logo Design", desc: "Modern, memorable brand identities — wordmarks, icon marks, monograms — delivered in all formats (SVG, PNG, PDF).", tags: ["Branding", "SVG", "Identity", "Vector"], price: "Starting ₹3,500" },
  { icon: "📱", title: "Social Media Posts", desc: "Scroll-stopping visual content for LinkedIn, Instagram & Twitter. Product launches, announcements, carousels & more.", tags: ["LinkedIn", "Instagram", "Carousel", "Content"], price: "Starting ₹1,500/post" },
  { icon: "🚀", title: "Full-Stack Development", desc: "End-to-end web solutions with Node.js/Express backend, REST APIs, and seamless front-end integration.", tags: ["Node.js", "Express", "REST API", "MongoDB"], price: "Starting ₹45,000" },
  { icon: "⚡", title: "Performance Audits", desc: "Deep-dive Core Web Vitals audits and optimisation. 52% faster load times, C→A CWV improvements on record.", tags: ["CWV", "Lighthouse", "Profiling", "LCP"], price: "Starting ₹8,000" },
  { icon: "🧩", title: "Component Libraries", desc: "Reusable, documented design systems with Storybook. Reduced duplicate UI code by 40% for 5+ product teams at EY.", tags: ["Storybook", "Design System", "Tokens", "a11y"], price: "Starting ₹20,000" },
];

const EXPERIENCES = [
  { company: "EY (Ernst & Young)", role: "Senior Consultant – Full-Stack & Front-End", period: "Aug 2025 – Present", location: "Bengaluru, India", color: "#D4A843", bullets: ["Architected React/TypeScript component libraries for 5+ squads — 40% less duplicate code", "Product Owner for enterprise Software & License UI — 60% fewer runtime type errors", "Reduced Time-to-Interactive by 35% across distributed micro-frontends", "28% fewer defect escapes via Storybook + Sentry across 4 engineering teams"] },
  { company: "Virtusa Software Services", role: "Lead Front-End Developer", period: "Aug 2021 – Jul 2025", location: "Bengaluru, India", color: "#1E5FAD", bullets: ["Led 8-engineer team — 12 major releases, 45% velocity increase", "52% faster page loads, Core Web Vitals C→A via profiling & lazy-loading", "Migrated 120K LOC to TypeScript — 87% Cypress E2E coverage", "Cut onboarding from 6 to 3 weeks through mentoring & pair programming"] },
  { company: "TechChefs Software", role: "Senior Web Developer", period: "Jan 2020 – Jul 2021", location: "Bengaluru, India", color: "#2A8A5E", bullets: ["React/Redux components serving 500K+ monthly active users", "REST API integration from 6 microservices — 70% fewer API failures", "Jest coverage 34% → 82% + Storybook-driven development"] },
  { company: "Testoutlook Solutions", role: "Senior Web Developer", period: "Dec 2015 – Dec 2019", location: "Aurangabad, India", color: "#8A5AAD", bullets: ["Front-end platform for 30,000+ users at 99.5% uptime", "Modernized jQuery → ES6+ React, 45% less page weight", "14 product features delivered, bug backlog reduced 40%"] },
];

const SKILLS = [
  { name: "React JS", level: 97, cat: "Frontend" },
  { name: "TypeScript", level: 93, cat: "Frontend" },
  { name: "Redux", level: 92, cat: "Frontend" },
  { name: "JavaScript ES6+", level: 96, cat: "Frontend" },
  { name: "HTML5 / CSS3", level: 95, cat: "Frontend" },
  { name: "Node.js", level: 80, cat: "Backend" },
  { name: "Express.js", level: 78, cat: "Backend" },
  { name: "REST APIs", level: 90, cat: "Backend" },
  { name: "Jest", level: 88, cat: "Testing" },
  { name: "Cypress", level: 85, cat: "Testing" },
  { name: "Docker / K8s", level: 70, cat: "DevOps" },
  { name: "CI/CD", level: 75, cat: "DevOps" },
];

const STATS = [
  { num: "11+", label: "Years Experience" },
  { num: "7+", label: "Years React JS" },
  { num: "500K+", label: "Users Served" },
  { num: "120K", label: "LOC Migrated" },
];

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return inView;
}

function AnimSection({ children, style = {} }) {
  const ref = useRef();
  const inView = useInView(ref);
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)", transition: "opacity 0.7s ease, transform 0.7s ease", ...style }}>
      {children}
    </div>
  );
}

function SectionLabel({ num, title }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 48 }}>
      <span style={{ fontFamily: "monospace", fontSize: 12, color: "#D4A843", letterSpacing: 2 }}>0{num}</span>
      <span style={{ width: 40, height: 1, background: "#D4A843", opacity: 0.4 }} />
      <h2 style={{ fontFamily: "Georgia, serif", fontSize: 36, fontWeight: 300, color: "#F5F0E8", letterSpacing: -0.5, margin: 0 }}>{title}</h2>
    </div>
  );
}

function SkillBar({ name, level, delay }) {
  const ref = useRef();
  const inView = useInView(ref);
  return (
    <div ref={ref} style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 13, color: "#F5F0E8", fontWeight: 500 }}>{name}</span>
        <span style={{ fontSize: 11, color: "#D4A843", fontFamily: "monospace" }}>{level}%</span>
      </div>
      <div style={{ height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ height: "100%", width: inView ? `${level}%` : "0%", background: "linear-gradient(90deg, #D4A843, rgba(212,168,67,0.4))", borderRadius: 2, transition: `width 1.2s ${delay}s cubic-bezier(0.4,0,0.2,1)` }} />
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("About");
  const [contactForm, setContactForm] = useState({ name: "", email: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [skillFilter, setSkillFilter] = useState("All");

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY + 120;
      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_LINKS[i].toLowerCase());
        if (el && el.offsetTop <= scrollY) { setActiveNav(NAV_LINKS[i]); break; }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };
  const cats = ["All", ...Array.from(new Set(SKILLS.map(s => s.cat)))];
  const filteredSkills = skillFilter === "All" ? SKILLS : SKILLS.filter(s => s.cat === skillFilter);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", fontFamily: "'DM Sans', 'Segoe UI', sans-serif", color: "#F5F0E8", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; }
        input, textarea, select { color-scheme: dark; }
        input::placeholder, textarea::placeholder { color: #4A5A70; }
        .nav-btn:hover { color: #D4A843 !important; }
        .svc-card:hover { border-color: #D4A843 !important; transform: translateY(-5px) !important; }
        .btn-ghost:hover { background: rgba(212,168,67,0.1) !important; }
      `}</style>

      {/* Background grid */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: "linear-gradient(rgba(212,168,67,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(212,168,67,0.025) 1px,transparent 1px)", backgroundSize: "64px 64px", pointerEvents: "none", zIndex: 0 }} />
      {/* Ambient glow top-right */}
      <div style={{ position: "fixed", top: -200, right: -200, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(30,95,173,0.12) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      {/* ── NAV ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(10,22,40,0.94)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(212,168,67,0.15)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", height: 62 }}>
        <div onClick={() => scrollTo("about")} style={{ fontFamily: "Georgia, serif", fontSize: 24, fontWeight: 700, cursor: "pointer", color: "#F5F0E8" }}>
          AD<span style={{ color: "#D4A843" }}>.</span>
        </div>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {NAV_LINKS.map(n => (
            <button key={n} className="nav-btn" onClick={() => scrollTo(n)} style={{ background: "none", border: "none", borderBottom: activeNav === n ? "1px solid #D4A843" : "1px solid transparent", cursor: "pointer", fontSize: 11, fontWeight: 600, letterSpacing: 1.8, textTransform: "uppercase", color: activeNav === n ? "#D4A843" : "#6A7D95", padding: "4px 0", transition: "all 0.2s" }}>{n}</button>
          ))}
          <button onClick={() => scrollTo("contact")} style={{ background: "#D4A843", border: "none", borderRadius: 2, padding: "9px 22px", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#0A1628", cursor: "pointer" }}>Hire Me</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="about" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "0 48px", paddingTop: 62, position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 400px", gap: 80, alignItems: "center" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28, animation: "fadeUp 0.5s ease both" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#2ECC71", display: "inline-block", animation: "pulse 2s infinite" }} />
              <span style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#6A7D95" }}>Available for Work · Pune, India</span>
            </div>
            <h1 style={{ fontFamily: "Georgia, 'Cormorant Garamond', serif", fontSize: "clamp(48px,6.5vw,80px)", fontWeight: 300, lineHeight: 1.05, letterSpacing: -1, margin: "0 0 6px", animation: "fadeUp 0.6s 0.1s ease both", opacity: 0, animationFillMode: "forwards" }}>
              Ashlesh<br /><strong style={{ fontWeight: 700, color: "#D4A843" }}>Dhanvalkar</strong>
            </h1>
            <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: "#6A7D95", margin: "18px 0 26px", animation: "fadeUp 0.6s 0.2s ease both", opacity: 0, animationFillMode: "forwards" }}>
              Senior React JS Engineer · Full-Stack Dev · Digital Creative
            </div>
            <p style={{ fontSize: 16, lineHeight: 1.9, color: "#7A8FA5", maxWidth: 560, marginBottom: 36, animation: "fadeUp 0.6s 0.3s ease both", opacity: 0, animationFillMode: "forwards" }}>
              I build enterprise-scale web applications, component libraries, and digital brand assets. 11+ years crafting high-performance React experiences — from EY to 500K-user platforms.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", animation: "fadeUp 0.6s 0.4s ease both", opacity: 0, animationFillMode: "forwards" }}>
              <button onClick={() => scrollTo("contact")} style={{ background: "#D4A843", border: "none", borderRadius: 2, padding: "14px 34px", fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#0A1628", cursor: "pointer" }}>Get In Touch</button>
              <button className="btn-ghost" onClick={() => scrollTo("services")} style={{ background: "transparent", border: "1px solid rgba(212,168,67,0.3)", borderRadius: 2, padding: "14px 34px", fontSize: 12, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: "#F5F0E8", cursor: "pointer", transition: "background 0.2s" }}>View Services</button>
            </div>
          </div>

          {/* Stats panel */}
          <div style={{ animation: "fadeUp 0.7s 0.5s ease both", opacity: 0, animationFillMode: "forwards" }}>
            <div style={{ background: "#0F2040", border: "1px solid rgba(212,168,67,0.2)", borderRadius: 4, padding: 32, position: "relative" }}>
              <div style={{ position: "absolute", top: -1, left: 32, width: 52, height: 2, background: "#D4A843" }} />
              <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase", color: "#D4A843", marginBottom: 24 }}>By The Numbers</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 28 }}>
                {STATS.map(s => (
                  <div key={s.label}>
                    <div style={{ fontFamily: "Georgia, serif", fontSize: 40, fontWeight: 700, color: "#F5F0E8", lineHeight: 1 }}>{s.num}</div>
                    <div style={{ fontSize: 11, color: "#6A7D95", marginTop: 4 }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 20, marginBottom: 16 }}>
                <div style={{ fontSize: 10, color: "#6A7D95", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Currently at</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#F5F0E8" }}>EY (Ernst & Young)</div>
                <div style={{ fontSize: 12, color: "#D4A843" }}>Senior Consultant — Front-End Eng</div>
              </div>
              <div style={{ fontSize: 12, color: "#6A7D95", lineHeight: 1.8 }}>
                📍 Pune, Maharashtra, India<br />
                ✉ dhanvalkarashu20@gmail.com
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ padding: "100px 48px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <AnimSection><SectionLabel num={1} title="Services & Offerings" /></AnimSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {SERVICES.map((s, i) => (
              <AnimSection key={s.title} style={{ transitionDelay: `${i * 0.07}s` }}>
                <div className="svc-card" style={{ background: "#0F2040", border: "1px solid rgba(212,168,67,0.15)", borderRadius: 4, padding: 28, height: "100%", cursor: "default", transition: "border-color 0.3s, transform 0.3s" }}>
                  <div style={{ fontSize: 30, marginBottom: 14 }}>{s.icon}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#F5F0E8", marginBottom: 10 }}>{s.title}</div>
                  <div style={{ fontSize: 13, color: "#7A8FA5", lineHeight: 1.75, marginBottom: 16 }}>{s.desc}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
                    {s.tags.map(t => <span key={t} style={{ fontSize: 10, fontWeight: 600, letterSpacing: 1, padding: "3px 8px", background: "rgba(212,168,67,0.12)", color: "#D4A843", borderRadius: 2 }}>{t}</span>)}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#D4A843" }}>{s.price}</div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" style={{ padding: "100px 48px", background: "rgba(255,255,255,0.012)", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <AnimSection><SectionLabel num={2} title="Work Experience" /></AnimSection>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 0, top: 8, bottom: 8, width: 1, background: "linear-gradient(to bottom, #D4A843, transparent)", opacity: 0.25 }} />
            {EXPERIENCES.map((exp, i) => (
              <AnimSection key={exp.company} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div style={{ paddingLeft: 36, marginBottom: 32, position: "relative" }}>
                  <div style={{ position: "absolute", left: -5, top: 8, width: 11, height: 11, borderRadius: "50%", background: exp.color, boxShadow: `0 0 10px ${exp.color}88` }} />
                  <div style={{ background: "#0F2040", border: `1px solid rgba(255,255,255,0.05)`, borderLeft: `3px solid ${exp.color}`, borderRadius: "0 4px 4px 0", padding: "22px 26px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4, flexWrap: "wrap", gap: 8 }}>
                      <div style={{ fontSize: 17, fontWeight: 700, color: "#F5F0E8" }}>{exp.company}</div>
                      <div style={{ fontSize: 11, fontFamily: "monospace", color: exp.color, background: `${exp.color}22`, padding: "3px 10px", borderRadius: 2 }}>{exp.period}</div>
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: exp.color, marginBottom: 4 }}>{exp.role}</div>
                    <div style={{ fontSize: 11, color: "#6A7D95", marginBottom: 14, fontStyle: "italic" }}>{exp.location}</div>
                    <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                      {exp.bullets.map((b, bi) => (
                        <li key={bi} style={{ fontSize: 13, color: "#8A9BB5", lineHeight: 1.7, marginBottom: 4, paddingLeft: 16, position: "relative" }}>
                          <span style={{ position: "absolute", left: 0, color: "#D4A843", fontWeight: 700 }}>›</span>{b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ padding: "100px 48px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <AnimSection><SectionLabel num={3} title="Technical Skills" /></AnimSection>
          <AnimSection>
            <div style={{ display: "flex", gap: 10, marginBottom: 36, flexWrap: "wrap" }}>
              {cats.map(c => (
                <button key={c} onClick={() => setSkillFilter(c)} style={{ background: skillFilter === c ? "#D4A843" : "transparent", border: `1px solid ${skillFilter === c ? "#D4A843" : "rgba(212,168,67,0.2)"}`, borderRadius: 2, padding: "7px 18px", fontSize: 11, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: skillFilter === c ? "#0A1628" : "#6A7D95", cursor: "pointer", transition: "all 0.2s" }}>{c}</button>
              ))}
            </div>
          </AnimSection>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 64px" }}>
            {filteredSkills.map((s, i) => <SkillBar key={s.name} name={s.name} level={s.level} delay={i * 0.06} />)}
          </div>
          <AnimSection style={{ marginTop: 48 }}>
            <div style={{ background: "#0F2040", border: "1px solid rgba(212,168,67,0.15)", borderRadius: 4, padding: 28 }}>
              <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#D4A843", marginBottom: 18 }}>Also Proficient In</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["Storybook", "Webpack", "Babel", "Docker", "Kubernetes", "CI/CD", "Sentry", "Agile/Scrum", "System Design", "Micro-Frontends", "AJAX", "jQuery", "PHP", "Java", "MySQL", "Git"].map(t => (
                  <span key={t} style={{ fontSize: 11, fontWeight: 500, padding: "5px 12px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 2, color: "#7A8FA5" }}>{t}</span>
                ))}
              </div>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section id="portfolio" style={{ padding: "100px 48px", background: "rgba(255,255,255,0.012)", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <AnimSection><SectionLabel num={4} title="Project Highlights" /></AnimSection>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
            {[
              { title: "Enterprise Component Library — EY", tag: "React · TypeScript · Storybook", result: "40% less duplicate code · 3 weeks faster per release · 5+ product squads", color: "#D4A843", bg: "#1A150A" },
              { title: "120K LOC TypeScript Migration — Virtusa", tag: "React · TypeScript · Cypress", result: "87% E2E coverage · 0 critical regressions · Production-stable", color: "#1E5FAD", bg: "#0A1422" },
              { title: "Core Web Vitals Optimisation — Virtusa", tag: "Performance · Profiling · Lazy-load", result: "52% faster load · C → A CWV · 500K+ MAU platform", color: "#2ECC71", bg: "#0A1A10" },
              { title: "API Integration Platform — TechChefs", tag: "REST APIs · Microservices · Redux", result: "6 microservices unified · 70% fewer API failures · Sub-100ms render", color: "#8A5AAD", bg: "#130D1C" },
            ].map((p, i) => (
              <AnimSection key={p.title} style={{ transitionDelay: `${i * 0.09}s` }}>
                <div style={{ background: p.bg, border: `1px solid ${p.color}33`, borderRadius: 4, padding: 28, height: "100%", borderTop: `2px solid ${p.color}` }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: p.color, marginBottom: 10 }}>{p.tag}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#F5F0E8", lineHeight: 1.35, marginBottom: 12 }}>{p.title}</div>
                  <div style={{ fontSize: 13, color: "#7A8FA5", lineHeight: 1.75 }}>{p.result}</div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: "100px 48px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <AnimSection><SectionLabel num={5} title="Get In Touch" /></AnimSection>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56 }}>
            <AnimSection>
              <div style={{ fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 300, color: "#F5F0E8", lineHeight: 1.45, marginBottom: 20 }}>
                Let's build something <span style={{ color: "#D4A843" }}>extraordinary</span> together.
              </div>
              <p style={{ fontSize: 14, color: "#7A8FA5", lineHeight: 1.85, marginBottom: 36 }}>
                Whether you need a React application, digital logo, social media content, or a full-stack solution — I'm here to bring your vision to life.
              </p>
              {[
                { icon: "✉", label: "Email", val: "dhanvalkarashu20@gmail.com" },
                { icon: "📍", label: "Location", val: "Pune, Maharashtra, India" },
                { icon: "🔗", label: "LinkedIn", val: "linkedin.com/in/ashleshdhanvalkar" },
              ].map(c => (
                <div key={c.label} style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 18 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 2, background: "rgba(212,168,67,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: "#6A7D95", marginBottom: 3 }}>{c.label}</div>
                    <div style={{ fontSize: 13, color: "#F5F0E8" }}>{c.val}</div>
                  </div>
                </div>
              ))}
            </AnimSection>

            <AnimSection>
              {submitted ? (
                <div style={{ background: "#0F2040", border: "1px solid rgba(212,168,67,0.4)", borderRadius: 4, padding: 44, textAlign: "center" }}>
                  <div style={{ fontSize: 44, marginBottom: 16 }}>✅</div>
                  <div style={{ fontFamily: "Georgia, serif", fontSize: 24, color: "#F5F0E8", marginBottom: 10 }}>Message Sent!</div>
                  <div style={{ fontSize: 14, color: "#7A8FA5", marginBottom: 24 }}>Thanks {contactForm.name}! I'll reply within 24 hours at {contactForm.email}.</div>
                  <button onClick={() => setSubmitted(false)} style={{ background: "#D4A843", border: "none", borderRadius: 2, padding: "10px 24px", fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#0A1628", cursor: "pointer" }}>Send Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ background: "#0F2040", border: "1px solid rgba(212,168,67,0.15)", borderRadius: 4, padding: 30, position: "relative" }}>
                  <div style={{ position: "absolute", top: -1, left: 0, width: 52, height: 2, background: "#D4A843" }} />
                  {[
                    { id: "name", label: "Your Name", type: "text", placeholder: "Madhuri Mane" },
                    { id: "email", label: "Email Address", type: "email", placeholder: "madhuri@synechron.com" },
                  ].map(f => (
                    <div key={f.id} style={{ marginBottom: 18 }}>
                      <label style={{ display: "block", fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: "#6A7D95", marginBottom: 8 }}>{f.label}</label>
                      <input required type={f.type} placeholder={f.placeholder} value={contactForm[f.id]} onChange={e => setContactForm(p => ({ ...p, [f.id]: e.target.value }))}
                        style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 2, padding: "11px 14px", fontSize: 13, color: "#F5F0E8", outline: "none", fontFamily: "inherit" }} />
                    </div>
                  ))}
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ display: "block", fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: "#6A7D95", marginBottom: 8 }}>Service Needed</label>
                    <select required value={contactForm.service} onChange={e => setContactForm(p => ({ ...p, service: e.target.value }))}
                      style={{ width: "100%", background: "#0A1628", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 2, padding: "11px 14px", fontSize: 13, color: contactForm.service ? "#F5F0E8" : "#4A5A70", outline: "none", fontFamily: "inherit" }}>
                      <option value="">Select a service…</option>
                      {SERVICES.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                    </select>
                  </div>
                  <div style={{ marginBottom: 24 }}>
                    <label style={{ display: "block", fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: "#6A7D95", marginBottom: 8 }}>Your Message</label>
                    <textarea required rows={4} placeholder="Tell me about your project, timeline, and budget…" value={contactForm.message} onChange={e => setContactForm(p => ({ ...p, message: e.target.value }))}
                      style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 2, padding: "11px 14px", fontSize: 13, color: "#F5F0E8", outline: "none", fontFamily: "inherit", resize: "vertical" }} />
                  </div>
                  <button type="submit" style={{ width: "100%", background: "#D4A843", border: "none", borderRadius: 2, padding: "14px", fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#0A1628", cursor: "pointer" }}>
                    Send Message →
                  </button>
                </form>
              )}
            </AnimSection>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid rgba(212,168,67,0.12)", padding: "28px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 1, flexWrap: "wrap", gap: 12 }}>
        <div style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 700, color: "#F5F0E8" }}>AD<span style={{ color: "#D4A843" }}>.</span></div>
        <div style={{ fontSize: 11, color: "#5A6A80" }}>© 2026 Ashlesh Dhanvalkar · Senior React JS Engineer · Pune, India</div>
        <div style={{ display: "flex", gap: 18 }}>
          {[["LinkedIn", "https://linkedin.com/in/ashleshdhanvalkar"], ["Email", "mailto:dhanvalkarashu20@gmail.com"]].map(([l, h]) => (
            <a key={l} href={h} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: "#5A6A80", textDecoration: "none", letterSpacing: 1 }}>{l}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}