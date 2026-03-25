"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { HiOutlineArrowDownTray } from "react-icons/hi2";
import Button from "@/components/ui/Button";

/* ─── 3D Morphing Sphere Background ─── */
function SphereBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 });
  const frameRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current.tx = e.clientX / window.innerWidth;
    mouseRef.current.ty = e.clientY / window.innerHeight;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = window.innerWidth;
    let h = window.innerHeight;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    // Fibonacci sphere distribution
    const POINTS = 140;
    const BASE_RADIUS = Math.min(w, h) * 0.32;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    const vertices: { theta: number; phi: number; noiseOffset: number; speed: number }[] = [];

    for (let i = 0; i < POINTS; i++) {
      const y = 1 - (i / (POINTS - 1)) * 2;
      vertices.push({
        theta: goldenAngle * i,
        phi: Math.acos(y),
        noiseOffset: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.7,
      });
    }

    // Connect nearby vertices
    const edges: [number, number][] = [];
    for (let i = 0; i < POINTS; i++) {
      for (let j = i + 1; j < POINTS; j++) {
        const v1 = vertices[i], v2 = vertices[j];
        const x1 = Math.sin(v1.phi) * Math.cos(v1.theta);
        const y1 = Math.cos(v1.phi);
        const z1 = Math.sin(v1.phi) * Math.sin(v1.theta);
        const x2 = Math.sin(v2.phi) * Math.cos(v2.theta);
        const y2 = Math.cos(v2.phi);
        const z2 = Math.sin(v2.phi) * Math.sin(v2.theta);
        const dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);
        if (dist < 0.52) edges.push([i, j]);
      }
    }

    // Floating particles
    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number; life: number }[] = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5, alpha: Math.random() * 0.15 + 0.03,
        life: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    // Detect light/dark theme for sphere color
    const getColor = () => {
      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      return isLight
        ? { r: 20, g: 20, b: 20, glow: "rgba(0,0,0," }   // dark sphere on light bg
        : { r: 196, g: 248, b: 42, glow: "rgba(196,248,42," }; // lime on dark bg
    };
    let clr = getColor();

    // Re-check theme periodically
    const themeInterval = setInterval(() => { clr = getColor(); }, 500);

    function draw() {
      time += 0.006;
      const m = mouseRef.current;
      m.x += (m.tx - m.x) * 0.05;
      m.y += (m.ty - m.y) * 0.05;

      ctx.clearRect(0, 0, w, h);
      const c = clr;

      const rotY = time * 0.3 + (m.x - 0.5) * 1.2;
      const rotX = (m.y - 0.5) * 0.6;
      const cosRY = Math.cos(rotY), sinRY = Math.sin(rotY);
      const cosRX = Math.cos(rotX), sinRX = Math.sin(rotX);
      const radius = BASE_RADIUS + Math.sin(time * 0.8) * 8;
      const cx = w * 0.5, cy = h * 0.48;

      // Project vertices with morphing
      const projected: { x: number; y: number; z: number; size: number }[] = [];
      for (const v of vertices) {
        const morph = 1 + Math.sin(time * v.speed + v.noiseOffset) * 0.12
                        + Math.sin(time * 0.7 + v.phi * 3) * 0.06;
        const r = radius * morph;
        const x = Math.sin(v.phi) * Math.cos(v.theta) * r;
        const y = Math.cos(v.phi) * r;
        const z = Math.sin(v.phi) * Math.sin(v.theta) * r;

        const x2 = x * cosRY - z * sinRY;
        const z2 = x * sinRY + z * cosRY;
        const y2 = y * cosRX - z2 * sinRX;
        const z3 = y * sinRX + z2 * cosRX;

        const perspective = 600 / (600 + z3);
        projected.push({ x: cx + x2 * perspective, y: cy + y2 * perspective, z: z3, size: perspective });
      }

      // Draw edges
      for (const [a, b] of edges) {
        const p1 = projected[a], p2 = projected[b];
        const avgZ = (p1.z + p2.z) / 2;
        const alpha = Math.max(0, 0.03 + (1 - (avgZ + radius) / (radius * 2)) * 0.12);
        ctx.strokeStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${alpha})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }

      // Draw vertices
      for (const p of projected) {
        const depth = (p.z + radius) / (radius * 2);
        const alpha = 0.08 + depth * 0.35;
        const size = 1 + p.size * 1.8;
        ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Inner glow
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 1.1);
      glow.addColorStop(0, c.glow + "0.025)");
      glow.addColorStop(0.5, c.glow + "0.01)");
      glow.addColorStop(1, c.glow + "0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      // Floating particles
      for (const p of particles) {
        p.life += 0.008;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        const flicker = 0.5 + Math.sin(p.life) * 0.5;
        ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${p.alpha * flicker})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Mouse glow
      const mg = ctx.createRadialGradient(m.x * w, m.y * h, 0, m.x * w, m.y * h, 280);
      mg.addColorStop(0, c.glow + "0.035)");
      mg.addColorStop(1, c.glow + "0)");
      ctx.fillStyle = mg;
      ctx.fillRect(0, 0, w, h);

      frameRef.current = requestAnimationFrame(draw);
    }

    frameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameRef.current);
      clearInterval(themeInterval);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
}

/* ─── Hero Section ─── */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const word1Ref = useRef<HTMLSpanElement>(null);
  const word2Ref = useRef<HTMLSpanElement>(null);
  const word3Ref = useRef<HTMLSpanElement>(null);
  const accentLineRef = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // 1. Background scales in
    tl.fromTo(bgRef.current, { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, duration: 2, ease: "power2.out" }, 0);

    // 2. Tag with blur reveal
    tl.fromTo(tagRef.current, { opacity: 0, y: 30, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 }, 0.3);

    // 3. Name chars stagger with 3D flip
    if (nameRef.current) {
      const chars = nameRef.current.querySelectorAll(".char");
      tl.fromTo(chars,
        { opacity: 0, y: 50, rotateX: 90, transformPerspective: 500 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.03, ease: "back.out(1.4)" },
        0.5
      );
    }

    // 4. Headline words — 3D perspective flip
    tl.fromTo(word1Ref.current,
      { opacity: 0, y: "120%", rotateX: 50, transformPerspective: 800, scale: 0.8 },
      { opacity: 1, y: "0%", rotateX: 0, scale: 1, duration: 1.2 },
      0.7
    );
    tl.fromTo(word2Ref.current,
      { opacity: 0, y: "120%", rotateX: 50, transformPerspective: 800, scale: 0.8 },
      { opacity: 1, y: "0%", rotateX: 0, scale: 1, duration: 1.2 },
      0.85
    );
    tl.fromTo(word3Ref.current,
      { opacity: 0, x: -40, rotateY: -30, transformPerspective: 800 },
      { opacity: 1, x: 0, rotateY: 0, duration: 1 },
      1.0
    );

    // 5. Accent underline draws in
    tl.fromTo(accentLineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: "power3.inOut" }, 1.4);

    // 6. Subtitle + CTA
    tl.fromTo(subRef.current, { opacity: 0, y: 24, filter: "blur(4px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7 }, "-=0.5");
    tl.fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3");

    // 7. Divider + scroll indicator
    tl.fromTo(dividerRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "power2.inOut" }, "-=0.4");
    tl.fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.3");

    // Scroll parallax
    const section = sectionRef.current;
    if (section) {
      const onScroll = () => {
        const y = window.scrollY;
        const f = Math.min(y / 800, 1);
        const content = section.querySelector<HTMLElement>(".hero-content");
        if (content) {
          content.style.transform = `translate3d(0, ${y * 0.2}px, 0)`;
          content.style.opacity = String(1 - f * 0.7);
        }
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, []);

  // Split name into individual chars for stagger
  const name = "Ahmed Elkatiri";
  const nameChars = name.split("").map((ch, i) => (
    <span key={i} className="char inline-block" style={{ opacity: 0 }}>
      {ch === " " ? "\u00A0" : ch}
    </span>
  ));

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* ── 3D Animated Sphere Background ── */}
      <div ref={bgRef} className="absolute inset-0" style={{ opacity: 0 }}>
        <SphereBackground />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 70% at 50% 48%, transparent 25%, var(--bg) 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-56 pointer-events-none" style={{ background: "linear-gradient(to top, var(--bg), transparent)" }} />
        <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none" style={{ background: "linear-gradient(to bottom, var(--bg), transparent)" }} />
      </div>

      {/* ── Content ── */}
      <div className="hero-content container-custom relative z-10 py-32 md:py-0">
        <div ref={tagRef} className="mono-label mb-6" style={{ opacity: 0 }}>
          Full Stack Developer
        </div>

        {/* Name — letter-by-letter 3D flip */}
        <div ref={nameRef} className="text-sm md:text-base tracking-[0.2em] uppercase text-[var(--fg-secondary)] mb-6 font-mono">
          {nameChars}
        </div>

        {/* Headline */}
        <h1 className="text-[clamp(2.8rem,9vw,7.5rem)] font-bold tracking-tighter leading-[0.95] mb-8">
          <span className="block overflow-hidden" style={{ perspective: "800px" }}>
            <span
              ref={word1Ref}
              className="block"
              style={{ opacity: 0, transformOrigin: "center bottom" }}
            >
              I build
            </span>
          </span>
          <span className="block overflow-hidden" style={{ perspective: "800px" }}>
            <span
              ref={word2Ref}
              className="block"
              style={{ opacity: 0, transformOrigin: "center bottom" }}
            >
              <span className="relative inline-block">
                <span
                  ref={word3Ref}
                  className="text-[var(--accent)]"
                  style={{ opacity: 0 }}
                >
                  modern
                </span>
                <span
                  ref={accentLineRef}
                  className="absolute -bottom-1 left-0 right-0 h-[3px] bg-[var(--accent)] rounded-full origin-left"
                  style={{ transform: "scaleX(0)" }}
                />
              </span>{" "}
              web apps.
            </span>
          </span>
        </h1>

        <p ref={subRef} className="text-[var(--fg-secondary)] text-base md:text-lg max-w-lg leading-relaxed mb-10" style={{ opacity: 0 }}>
          Crafting scalable web applications, SaaS platforms, and polished interfaces with modern technologies.
        </p>

        <div ref={ctaRef} className="flex flex-wrap gap-4" style={{ opacity: 0 }}>
          <Button href="#projects" variant="primary">View Work</Button>
          <Button
            href="/Ahmed-Elkatiri-CV.pdf"
            variant="download"
            download
            className="min-w-[11.5rem]"
          >
            <HiOutlineArrowDownTray className="text-base transition-transform duration-300 group-hover:translate-y-0.5" />
            <span>Download CV</span>
          </Button>
          <Button href="#contact" variant="outline">Get in Touch</Button>
        </div>

        <div ref={dividerRef} className="mt-20 md:mt-28 h-px bg-[var(--border)] origin-left" style={{ transform: "scaleX(0)" }} />
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-2" style={{ opacity: 0 }}>
        <span className="mono-label">Scroll</span>
        <span className="block w-px h-8 bg-[var(--muted)] animate-pulse" />
      </div>
    </section>
  );
}
