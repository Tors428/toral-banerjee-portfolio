import Head from "next/head";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const TRAIL_ICONS = [
  `<svg width="24" height="24" viewBox="0 0 24 24" fill="rgba(244,192,209,0.75)" stroke="none"><ellipse cx="12" cy="16" rx="4.5" ry="3.8"/><ellipse cx="5.5" cy="11" rx="1.8" ry="2.3"/><ellipse cx="9" cy="7" rx="1.8" ry="2.3"/><ellipse cx="15" cy="7" rx="1.8" ry="2.3"/><ellipse cx="18.5" cy="11" rx="1.8" ry="2.3"/></svg>`,
  `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(207,180,235,0.75)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(159,225,203,0.75)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 20-7z"/></svg>`,
  `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(250,199,117,0.75)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 14h12l-1 7H7l-1-7z"/><path d="M8 14c0-3 1.5-5 4-5s4 2 4 5"/><path d="M12 6V4"/><path d="M10 4c0-1 1-2 2-2s2 1 2 2"/></svg>`,
  `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(237,147,177,0.8)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`,
];

function CursorTrail() {
  const [trails, setTrails] = useState([]);
  const lastSpawn = useRef(0);
  const idx = useRef(0);
  const nextId = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e) => {
      const now = performance.now();
      if (now - lastSpawn.current < 140) return;
      lastSpawn.current = now;
      const id = nextId.current++;
      const iconIdx = idx.current++ % TRAIL_ICONS.length;
      const rot = (Math.random() - 0.5) * 30;
      setTrails((t) => [...t, { id, x: e.clientX, y: e.clientY, iconIdx, rot }]);
      setTimeout(() => {
        setTrails((t) => t.filter((x) => x.id !== id));
      }, 950);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[60]">
      {trails.map((t) => (
        <div
          key={t.id}
          className="absolute"
          style={{
            left: t.x,
            top: t.y,
            "--r": `${t.rot}deg`,
            animation: "trail-fade 0.9s ease-out forwards",
          }}
          dangerouslySetInnerHTML={{ __html: TRAIL_ICONS[t.iconIdx] }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Toral Banerjee — Portfolio</title>
        <meta name="description" content="AI agents, HCI, and design" />
      </Head>

      <CursorTrail />

      <nav className="fixed top-0 w-full z-50 px-10 py-6 flex justify-between items-center backdrop-blur-sm">
        <span className="text-lg font-bold tracking-tight text-white">toral.dev</span>
        <div className="flex gap-8 text-base text-white/80">
          <a href="#about" className="hover:text-white transition">About</a>
          <a href="#projects" className="hover:text-white transition">Projects</a>
          <a href="#skills" className="hover:text-white transition">Skills</a>
          
          <a href="mailto:toralbanerjee2006@gmail.com" className="hover:text-white transition">Contact</a>
        </div>
      </nav>

      <section
        className="relative min-h-screen flex items-center px-10 md:px-20"
        style={{
          background: "radial-gradient(circle at 15% 30%, rgb(209, 131, 169) 0%, rgb(120, 80, 130) 30%, rgb(58, 52, 91) 70%, rgb(40, 35, 65) 100%)"
        }}
      >
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Hey there, I&apos;m Toral.
            </h1>
            <p className="text-lg text-white/70 mb-8 leading-relaxed">
              I build AI agents you can actually <span className="text-pink-300">trust</span> — tools that show their work, admit what they don&apos;t know, and let you replay where they went wrong.
            </p>
            <div className="flex gap-4">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-white/40 text-white rounded-lg hover:bg-white hover:text-purple-900 transition font-semibold"
              >
                Resume
              </a>
              <a
                href="#projects"
                className="px-6 py-3 border border-white/40 text-white rounded-lg hover:bg-white hover:text-purple-900 transition font-semibold"
              >
                View Projects
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="w-52 h-52 md:w-56 md:h-56">
              <img
                src="/pixel-avatar.png"
                alt="Toral Banerjee"
                className="w-full h-full object-cover"
                style={{ imageRendering: "pixelated" }}
              />
            </div>
            <a
              href="mailto:toralbanerjee2006@gmail.com"
              className="mt-6 text-white/80 font-mono text-sm tracking-wide hover:text-white transition"
            >
              toralbanerjee2006@gmail.com
            </a>
          </motion.div>

        </div>
      </section>

      <section
        id="about"
        className="relative py-32 px-10 md:px-20"
        style={{
          background: "linear-gradient(180deg, rgb(40, 35, 65) 0%, rgb(58, 52, 91) 50%, rgb(80, 60, 100) 100%)"
        }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-sm tracking-[0.3em] uppercase text-pink-300 mb-6 font-mono"
          >
            // about
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-10 leading-tight"
          >
            Human first.<br />
            Then make it <span className="italic text-pink-300">smart.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl"
          >
            <p>
              Most AI gets built capability-first — ship the demo, hide the failure modes, hope nobody asks. I work the other way around: start with the <span className="text-pink-300">person</span> on the receiving end, the <span className="text-pink-300">trust</span> they need, the <span className="text-pink-300">interface</span> that earns it — <em>then</em> make it smart.
            </p>
            <p>
              The questions I keep coming back to: how does someone <span className="text-pink-300">know</span> when an agent is wrong? How do you give them a way to <span className="text-pink-300">push back</span>? Where does &quot;automated&quot; stop and &quot;told what to think&quot; begin? I don&apos;t have clean answers yet. I have prototypes — small, real, breakable.
            </p>
            <p>
              I&apos;m a junior undergrad at the intersection of <span className="text-white font-semibold">AI agents</span> and <span className="text-white font-semibold">human-computer interaction</span>.
            </p>
          </motion.div>
        </div>
      </section>

      <section
        id="projects"
      
        className="relative py-32 px-10 md:px-20"
        style={{
          background: "linear-gradient(180deg, rgb(80, 60, 100) 0%, rgb(95, 65, 115) 50%, rgb(80, 60, 100) 100%)"
        }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-sm tracking-[0.3em] uppercase text-pink-300 mb-6 font-mono text-center"
          >
            // projects
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight text-center"
          >
            Things I have <span className="italic text-pink-300">built.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/60 mb-16 text-center"
          >
            Real, working tools — built to be inspected.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ perspective: "900px" }}>

            <motion.a
              href="https://agent-trajectory-inspector.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.72, rotateX: 12, z: -120 }}
              whileInView={{ opacity: 1, scale: 1, rotateX: 0, z: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              style={{ transformStyle: "preserve-3d" }}
              className="group block relative overflow-hidden rounded-2xl border border-white/10 p-7 transition-all duration-500 hover:border-pink-300/40"
              style={{ background: "rgba(255, 255, 255, 0.03)" }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                style={{
                  background: "radial-gradient(circle at 30% 20%, rgba(209, 131, 169, 0.3) 0%, rgba(120, 80, 130, 0.2) 40%, transparent 70%)"
                }}
              />

              <div className="w-11 h-11 rounded-lg bg-pink-300/10 border border-pink-300/30 flex items-center justify-center mb-5">
                <svg className="w-5 h-5 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-pink-200 transition-colors">
                Agent Trajectory Inspector
              </h3>

              <p className="text-sm text-white/70 leading-relaxed mb-6">
                A lightweight web tool to inspect, replay, and annotate AI agent runs — built to triage where LLM agents go wrong.
              </p>

              <div className="flex flex-wrap gap-1.5">
                {["React", "Vite", "Groq API", "Llama 3.3"].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs bg-white/5 text-white/70 rounded-md border border-white/10 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.a>

            <motion.a
              href="https://decision-receipt.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.72, rotateX: 12, z: -120 }}
              whileInView={{ opacity: 1, scale: 1, rotateX: 0, z: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              style={{ transformStyle: "preserve-3d" }}
              className="group block relative overflow-hidden rounded-2xl border border-white/10 p-7 transition-all duration-500 hover:border-pink-300/40"
              style={{ background: "rgba(255, 255, 255, 0.03)" }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                style={{
                  background: "radial-gradient(circle at 30% 20%, rgba(209, 131, 169, 0.3) 0%, rgba(120, 80, 130, 0.2) 40%, transparent 70%)"
                }}
              />

              <div className="w-11 h-11 rounded-lg bg-pink-300/10 border border-pink-300/30 flex items-center justify-center mb-5">
                <svg className="w-5 h-5 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-pink-200 transition-colors">
                Decision Receipt
              </h3>

              <p className="text-sm text-white/70 leading-relaxed mb-6">
                A prototype that makes AI-driven loan decisions legible to the person on the receiving end — with calibrated uncertainty, fairness shadow-runs, and auto-drafted appeals.
              </p>

              <div className="flex flex-wrap gap-1.5">
                {["React", "Vite", "Tailwind", "Groq API"].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs bg-white/5 text-white/70 rounded-md border border-white/10 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.a>

            <motion.div
              initial={{ opacity: 0, scale: 0.72, rotateX: 12, z: -120 }}
              whileInView={{ opacity: 1, scale: 1, rotateX: 0, z: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              style={{ transformStyle: "preserve-3d" }}
              className="rounded-2xl border border-dashed border-white/10 p-7 flex flex-col items-center justify-center text-center min-h-[280px]"
            >
              <p className="text-white/30 text-sm font-mono">
                more soon ✦
              </p>
            </motion.div>

          </div>
        </div>
      </section>
      

      <section
        id="skills"
        className="relative py-32 px-10 md:px-20"
        style={{
          background: "linear-gradient(180deg, rgb(80, 60, 100) 0%, rgb(58, 52, 91) 50%, rgb(40, 35, 65) 100%)"
        }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-sm tracking-[0.3em] uppercase text-pink-300 mb-6 font-mono"
          >
            // skills
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-16 leading-tight"
          >
            What I work <span className="italic text-pink-300">with.</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="border border-white/10 rounded-2xl p-8 backdrop-blur-sm bg-white/5"
            >
              <h3 className="text-xs tracking-[0.2em] uppercase text-pink-300 mb-5 font-mono">
                Programming Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Python", "Java", "TypeScript", "JavaScript", "R (Biostatistics)", "SQL"].map((skill) => (
                  <span key={skill} className="px-3 py-1.5 text-sm bg-white/10 text-white rounded-full border border-white/10 hover:bg-pink-300/20 hover:border-pink-300/40 transition">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="border border-white/10 rounded-2xl p-8 backdrop-blur-sm bg-white/5"
            >
              <h3 className="text-xs tracking-[0.2em] uppercase text-pink-300 mb-5 font-mono">
                AI Systems & Agentic Systems
              </h3>
              <div className="flex flex-wrap gap-2">
                {["LLM Orchestration", "OpenAI APIs", "Agent-Driven Workflows", "Tool Calling Logic", "Prompt Engineering", "Digital Phenotyping"].map((skill) => (
                  <span key={skill} className="px-3 py-1.5 text-sm bg-white/10 text-white rounded-full border border-white/10 hover:bg-pink-300/20 hover:border-pink-300/40 transition">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="border border-white/10 rounded-2xl p-8 backdrop-blur-sm bg-white/5"
            >
              <h3 className="text-xs tracking-[0.2em] uppercase text-pink-300 mb-5 font-mono">
                Deep Learning
              </h3>
              <div className="flex flex-wrap gap-2">
                {["PyTorch", "CUDA (basic)", "Transformers (HF)", "NumPy"].map((skill) => (
                  <span key={skill} className="px-3 py-1.5 text-sm bg-white/10 text-white rounded-full border border-white/10 hover:bg-pink-300/20 hover:border-pink-300/40 transition">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="border border-white/10 rounded-2xl p-8 backdrop-blur-sm bg-white/5"
            >
              <h3 className="text-xs tracking-[0.2em] uppercase text-pink-300 mb-5 font-mono">
                Machine Learning & Data
              </h3>
              <div className="flex flex-wrap gap-2">
                {["K-Means / RFM Clustering", "Predictive Modeling", "Statistical Inference", "Apache Spark", "Tableau", "Matplotlib"].map((skill) => (
                  <span key={skill} className="px-3 py-1.5 text-sm bg-white/10 text-white rounded-full border border-white/10 hover:bg-pink-300/20 hover:border-pink-300/40 transition">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="border border-white/10 rounded-2xl p-8 backdrop-blur-sm bg-white/5 md:col-span-2"
            >
              <h3 className="text-xs tracking-[0.2em] uppercase text-pink-300 mb-5 font-mono">
                Software & Infrastructure
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Linux (Bash)", "Git", "AWS (basic)", "PostgreSQL", "MySQL", "Modular Software Design", "Statistical Modeling"].map((skill) => (
                  <span key={skill} className="px-3 py-1.5 text-sm bg-white/10 text-white rounded-full border border-white/10 hover:bg-pink-300/20 hover:border-pink-300/40 transition">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

    </>
  );
}