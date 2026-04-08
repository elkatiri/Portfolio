"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
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

    const getColor = () => {
      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      return isLight
        ? { r: 20, g: 20, b: 20, glow: "rgba(0,0,0," }
        : { r: 196, g: 248, b: 42, glow: "rgba(196,248,42," };
    };
    let clr = getColor();
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

      for (const p of projected) {
        const depth = (p.z + radius) / (radius * 2);
        const alpha = 0.08 + depth * 0.35;
        const size = 1 + p.size * 1.8;
        ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 1.1);
      glow.addColorStop(0, c.glow + "0.025)");
      glow.addColorStop(0.5, c.glow + "0.01)");
      glow.addColorStop(1, c.glow + "0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

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

  // ── Image refs (redesigned system) ──
  const imageWrapperRef = useRef<HTMLDivElement>(null);    // outer positioning shell
  const imageRigRef = useRef<HTMLDivElement>(null);        // 3D tilt rig
  const imageMaskRef = useRef<HTMLDivElement>(null);       // clip-path reveal mask
  const imageCardRef = useRef<HTMLDivElement>(null);       // glass card
  const imageInnerRef = useRef<HTMLDivElement>(null);      // photo layer
  const imageGlowRef = useRef<HTMLDivElement>(null);       // ambient glow blob
  const imageGlow2Ref = useRef<HTMLDivElement>(null);      // secondary glow
  const imageAuroraRef = useRef<HTMLDivElement>(null);     // rotating aurora border
  const imageScanRef = useRef<HTMLDivElement>(null);       // scanline sweep
  const imageOverlayRef = useRef<HTMLDivElement>(null);    // glass overlay

  const dividerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tweens: gsap.core.Tween[] = [];
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    let onScroll: (() => void) | undefined;

    // ── 1. Background cinematic scale ──
    tl.fromTo(bgRef.current, { opacity: 0, scale: 1.15 }, { opacity: 1, scale: 1, duration: 2.4, ease: "expo.out" }, 0);

    // ── 2. Tag ──
    tl.fromTo(tagRef.current,
      { opacity: 0, x: -30, filter: "blur(6px)" },
      { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out" }, 0.25
    );

    // ── 3. Name chars ──
    if (nameRef.current) {
      const chars = nameRef.current.querySelectorAll(".char");
      tl.fromTo(chars,
        { opacity: 0, y: 60, rotateX: -90, scale: 0.5, transformPerspective: 600 },
        { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 0.7, stagger: 0.025, ease: "back.out(2.2)" }, 0.4
      );
    }

    // ── 4. Headline words ──
    tl.fromTo(word1Ref.current,
      { opacity: 0, y: "140%", rotateX: 60, transformPerspective: 1000, scale: 0.75 },
      { opacity: 1, y: "0%", rotateX: 0, scale: 1, duration: 1.4, ease: "expo.out" }, 0.55
    );
    tl.fromTo(word2Ref.current,
      { opacity: 0, y: "140%", rotateX: 60, transformPerspective: 1000, scale: 0.75 },
      { opacity: 1, y: "0%", rotateX: 0, scale: 1, duration: 1.4, ease: "expo.out" }, 0.72
    );
    tl.fromTo(word3Ref.current,
      { opacity: 0, x: -50, rotateY: -40, scale: 0.8, transformPerspective: 1000, filter: "blur(6px)" },
      { opacity: 1, x: 0, rotateY: 0, scale: 1, filter: "blur(0px)", duration: 1.1, ease: "power3.out" }, 0.9
    );
    tl.fromTo(accentLineRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 1.1, ease: "elastic.out(1, 0.5)" }, 1.35
    );

    // ── 5. Subtitle ──
    tl.fromTo(subRef.current,
      { opacity: 0, y: 30, filter: "blur(8px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out" }, 1.4
    );

    // ── 6. CTA ──
    if (ctaRef.current) {
      const btns = ctaRef.current.children;
      tl.fromTo(btns,
        { opacity: 0, y: 30, scale: 0.85, rotateX: 20, transformPerspective: 500 },
        { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 0.8, stagger: 0.12, ease: "back.out(1.8)" }, 1.55
      );
    }

    // ════════════════════════════════════════════════════
    // ── IMAGE: Premium Multi-Stage Cinematic Entrance ──
    // ════════════════════════════════════════════════════
    const IMAGE_START = 0.5;

    // Stage 1: Wrapper drifts in from right with depth blur
    tl.fromTo(imageWrapperRef.current,
      { opacity: 0, x: 80, filter: "blur(20px)" },
      { opacity: 1, x: 0, filter: "blur(0px)", duration: 1.6, ease: "expo.out" },
      IMAGE_START
    );

    // Stage 2: Rig starts heavily rotated and snaps to rest
    tl.fromTo(imageRigRef.current,
      { rotateY: 55, rotateX: -18, rotateZ: 8, scale: 0.72, transformPerspective: 1400 },
      { rotateY: -5, rotateX: 3, rotateZ: 0, scale: 1, duration: 2.0, ease: "expo.out" },
      IMAGE_START + 0.08
    );

    // Stage 3: Clip-path mask wipe — frame slides up to reveal photo
    tl.fromTo(imageMaskRef.current,
      { clipPath: "inset(100% 0% 0% 0% round 2rem)" },
      { clipPath: "inset(0% 0% 0% 0% round 2rem)", duration: 1.4, ease: "expo.inOut" },
      IMAGE_START + 0.35
    );

    // Stage 4: Card glass surface materializes
    tl.fromTo(imageCardRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: "power2.out" },
      IMAGE_START + 0.4
    );

    // Stage 5: Primary glow expands outward like a bloom
    tl.fromTo(imageGlowRef.current,
      { opacity: 0, scale: 0.3, filter: "blur(20px)" },
      { opacity: 0.7, scale: 1, filter: "blur(60px)", duration: 1.8, ease: "expo.out" },
      IMAGE_START + 0.6
    );

    // Stage 6: Secondary glow from top
    tl.fromTo(imageGlow2Ref.current,
      { opacity: 0, y: -40 },
      { opacity: 0.5, y: 0, duration: 1.4, ease: "power3.out" },
      IMAGE_START + 0.8
    );

    // Stage 7: Aurora border fades in with a rotation head-start
    tl.fromTo(imageAuroraRef.current,
      { opacity: 0, scale: 0.92 },
      { opacity: 1, scale: 1, duration: 1.0, ease: "power2.out" },
      IMAGE_START + 0.9
    );

    // Stage 8: Scanline sweep — a single dramatic horizontal pass
    tl.fromTo(imageScanRef.current,
      { yPercent: -100, opacity: 0 },
      { yPercent: 100, opacity: 1, duration: 1.2, ease: "power2.inOut" },
      IMAGE_START + 1.1
    );
    tl.to(imageScanRef.current, { opacity: 0, duration: 0.25 }, IMAGE_START + 2.1);

    // Stage 9: Glass overlay settles
    tl.fromTo(imageOverlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out" },
      IMAGE_START + 1.4
    );

    // ════════════════════════════════════════════════
    // ── CONTINUOUS: Organic Multi-Layered Float ──
    // ════════════════════════════════════════════════
    // Three overlapping oscillations with prime-number-like frequencies
    // to ensure they never feel repetitive or robotic.
    const FLOAT_DELAY = IMAGE_START + 2.2;

    // Layer A — slow vertical drift
    tweens.push(
      gsap.to(imageRigRef.current, {
        y: "+=18",
        duration: 4.1,
        repeat: -1, yoyo: true,
        ease: "sine.inOut",
        delay: FLOAT_DELAY,
      })
    );

    // Layer B — subtle lateral sway with slight roll
    tweens.push(
      gsap.to(imageRigRef.current, {
        x: "+=6",
        rotateZ: "-=0.8",
        duration: 5.7,
        repeat: -1, yoyo: true,
        ease: "sine.inOut",
        delay: FLOAT_DELAY + 0.3,
      })
    );

    // Layer C — micro-breathe in scale (depth illusion)
    tweens.push(
      gsap.to(imageRigRef.current, {
        scale: 1.012,
        duration: 3.3,
        repeat: -1, yoyo: true,
        ease: "sine.inOut",
        delay: FLOAT_DELAY + 0.7,
      })
    );

    // Glow breathe (out of phase with float for organic feel)
    tweens.push(
      gsap.to(imageGlowRef.current, {
        scale: 1.25,
        opacity: 0.4,
        duration: 3.2,
        repeat: -1, yoyo: true,
        ease: "sine.inOut",
        delay: FLOAT_DELAY,
      })
    );
    tweens.push(
      gsap.to(imageGlow2Ref.current, {
        opacity: 0.25,
        y: 10,
        duration: 4.6,
        repeat: -1, yoyo: true,
        ease: "sine.inOut",
        delay: FLOAT_DELAY + 1.2,
      })
    );

    // ── Aurora border: continuous smooth conic rotation ──
    const auroraEl = imageAuroraRef.current;
    if (auroraEl) {
      const anim = { angle: 0 };
      tweens.push(
        gsap.to(anim, {
          angle: 360,
          duration: 4,
          repeat: -1,
          ease: "none",
          onUpdate: () => {
            auroraEl.style.background =
              `conic-gradient(from ${anim.angle}deg,
                var(--accent) 0deg,
                transparent 60deg,
                transparent 150deg,
                rgba(196,248,42,0.25) 210deg,
                transparent 270deg,
                var(--accent) 360deg)`;
          },
        })
      );
    }

    // ── Periodic scanline sweep (looped, long gap) ──
    tweens.push(
      gsap.fromTo(imageScanRef.current,
        { yPercent: -100, opacity: 0 },
        {
          yPercent: 100,
          opacity: 0.6,
          duration: 1.4,
          repeat: -1,
          repeatDelay: 5.5,
          ease: "power2.inOut",
          delay: IMAGE_START + 4.0,
        }
      )
    );

    // ════════════════════════════════════════════════════════
    // ── MOUSE: Magnetic Spring Tilt + Inner Parallax ──
    // ════════════════════════════════════════════════════════
    const imageWrapper = imageWrapperRef.current;
    const imageRig = imageRigRef.current;
    const imageInner = imageInnerRef.current;
    const imageGlow = imageGlowRef.current;

    // Spring physics state
    const spring = { vx: 0, vy: 0, rx: 0, ry: 0 };
    const STIFFNESS = 0.08;
    const DAMPING = 0.75;
    let targetRX = 0, targetRY = -5;
    let rafId: number;
    let isHovered = false;

    const springLoop = () => {
      if (!imageRig) return;
      spring.vx += (targetRY - spring.ry) * STIFFNESS;
      spring.vy += (targetRX - spring.rx) * STIFFNESS;
      spring.vx *= DAMPING;
      spring.vy *= DAMPING;
      spring.ry += spring.vx;
      spring.rx += spring.vy;

      gsap.set(imageRig, {
        rotateY: spring.ry,
        rotateX: spring.rx,
        overwrite: false,
      });

      rafId = requestAnimationFrame(springLoop);
    };
    rafId = requestAnimationFrame(springLoop);

    const handleImageMove = (event: MouseEvent) => {
      if (!imageWrapper) return;
      const bounds = imageWrapper.getBoundingClientRect();
      const nx = (event.clientX - bounds.left) / bounds.width - 0.5;   // -0.5 → 0.5
      const ny = (event.clientY - bounds.top) / bounds.height - 0.5;

      targetRY = -5 + nx * 26;
      targetRX = -ny * 18;

      // Inner image counter-parallax (deeper layer feels further away)
      if (imageInner) {
        gsap.to(imageInner, {
          x: -nx * 22,
          y: -ny * 16,
          scale: 1.08,
          duration: 0.9,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      // Glow tracks cursor position reactively
      if (imageGlow) {
        gsap.to(imageGlow, {
          x: nx * 30,
          y: ny * 20,
          duration: 1.0,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const handleImageEnter = () => {
      isHovered = true;
      // Kill the float tweens temporarily so tilt is clean
      gsap.to(imageRigRef.current, { scale: 1.02, duration: 0.5, ease: "power2.out", overwrite: "auto" });
    };

    const handleImageLeave = () => {
      isHovered = false;
      targetRX = 3;
      targetRY = -5;

      if (imageInner) {
        gsap.to(imageInner, {
          x: 0, y: 0, scale: 1,
          duration: 1.2, ease: "elastic.out(1, 0.45)", overwrite: "auto",
        });
      }
      if (imageGlow) {
        gsap.to(imageGlow, {
          x: 0, y: 0,
          duration: 1.2, ease: "elastic.out(1, 0.45)", overwrite: "auto",
        });
      }
      gsap.to(imageRigRef.current, { scale: 1, duration: 1.2, ease: "elastic.out(1, 0.4)", overwrite: "auto" });
    };

    if (imageWrapper) {
      imageWrapper.addEventListener("mousemove", handleImageMove);
      imageWrapper.addEventListener("mouseenter", handleImageEnter);
      imageWrapper.addEventListener("mouseleave", handleImageLeave);
    }

    // ── Divider + scroll indicator ──
    tl.fromTo(dividerRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "expo.inOut" }, "-=0.6");
    tl.fromTo(scrollRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.4");

    // ── Scroll parallax ──
    const section = sectionRef.current;
    if (section) {
      onScroll = () => {
        const y = window.scrollY;
        const f = Math.min(y / 800, 1);
        const content = section.querySelector<HTMLElement>(".hero-content");
        if (content) {
          content.style.transform = `translate3d(0, ${y * 0.18}px, 0)`;
          content.style.opacity = String(1 - f * 0.75);
        }
        if (imageWrapper) {
          imageWrapper.style.transform = `translate3d(0, ${y * -0.07}px, 0)`;
        }
      };
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    return () => {
      tl.kill();
      tweens.forEach((t) => t.kill());
      cancelAnimationFrame(rafId);
      if (imageWrapper) {
        imageWrapper.removeEventListener("mousemove", handleImageMove);
        imageWrapper.removeEventListener("mouseenter", handleImageEnter);
        imageWrapper.removeEventListener("mouseleave", handleImageLeave);
      }
      if (onScroll) window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const name = "Ahmed Elkatiri";
  const nameChars = name.split("").map((ch, i) => (
    <span key={i} className="char inline-block" style={{ opacity: 0 }}>
      {ch === " " ? "\u00A0" : ch}
    </span>
  ));

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden">

      {/* ── Sphere Background ── */}
      <div ref={bgRef} className="absolute inset-0" style={{ opacity: 0 }}>
        <SphereBackground />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 70% at 50% 48%, transparent 25%, var(--bg) 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-56 pointer-events-none" style={{ background: "linear-gradient(to top, var(--bg), transparent)" }} />
        <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none" style={{ background: "linear-gradient(to bottom, var(--bg), transparent)" }} />
      </div>

      {/* ── Content ── */}
      <div className="hero-content container-custom relative z-10 py-32 md:py-0">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_420px]">

          {/* Left: Text */}
          <div>
            <div ref={tagRef} className="mono-label mb-6" style={{ opacity: 0 }}>
              Full Stack Developer
            </div>

            <div ref={nameRef} className="text-sm md:text-base tracking-[0.2em] uppercase text-[var(--fg-secondary)] mb-6 font-mono">
              {nameChars}
            </div>

            <h1 className="text-[clamp(2.8rem,9vw,7.5rem)] font-bold tracking-tighter leading-[0.95] mb-8">
              <span className="block overflow-hidden" style={{ perspective: "800px" }}>
                <span ref={word1Ref} className="block" style={{ opacity: 0, transformOrigin: "center bottom" }}>
                  I build
                </span>
              </span>
              <span className="block overflow-hidden" style={{ perspective: "800px" }}>
                <span ref={word2Ref} className="block" style={{ opacity: 0, transformOrigin: "center bottom" }}>
                  <span className="relative inline-block">
                    <span ref={word3Ref} className="text-[var(--accent)]" style={{ opacity: 0 }}>
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
              <Button href="/#projects" variant="primary">View Work</Button>
              <Button href="/AhmedElkatiri_CV.pdf" variant="download" download className="min-w-[11.5rem]">
                <HiOutlineArrowDownTray className="text-base transition-transform duration-300 group-hover:translate-y-0.5" />
                <span>Download CV</span>
              </Button>
              <Button href="/#contact" variant="outline">Get in Touch</Button>
            </div>
          </div>

          {/* ════════════════════════════════════════════
              Right: Premium Image System
              ════════════════════════════════════════════ */}
          <div
            ref={imageWrapperRef}
            className="relative mx-auto flex w-full max-w-[26rem] justify-center lg:max-w-none lg:justify-end"
            style={{ opacity: 0, perspective: "1800px", perspectiveOrigin: "50% 40%" }}
          >
            {/* ── Ambient glow blobs ── */}
            <div
              ref={imageGlowRef}
              className="absolute bottom-[-10%] left-[10%] right-[10%] h-[45%] rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at center, var(--accent) 0%, transparent 70%)",
                filter: "blur(55px)",
                opacity: 0,
              }}
            />
            <div
              ref={imageGlow2Ref}
              className="absolute top-[-5%] left-[20%] h-[30%] w-[60%] rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at center, rgba(196,248,42,0.35) 0%, transparent 70%)",
                filter: "blur(40px)",
                opacity: 0,
              }}
            />

            {/* ── Aurora rotating border (moved to wrap image only) ── */}

            {/* ── 3D Tilt Rig ── */}
            <div
              ref={imageRigRef}
              className="relative w-full max-w-[23rem]"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* ── Clip-path reveal mask ── */}
              <div
                ref={imageMaskRef}
                className="relative aspect-[4/5] w-full"
                style={{ clipPath: "inset(100% 0% 0% 0% round 2rem)" }}
              >
                {/* ── Glass card shell ── */}
                <div
                  ref={imageCardRef}
                  className="absolute inset-0 overflow-hidden rounded-[2rem] border border-[var(--border)] p-2.5"
                  style={{
                    opacity: 0,
                    background: "linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.06) 100%)",
                    boxShadow: "0 50px 120px rgba(0,0,0,0.5), 0 12px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  {/* Top specular highlight */}
                  <div className="absolute inset-x-0 top-0 h-28 rounded-t-[2rem] pointer-events-none"
                    style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.12), transparent)" }} />

                  {/* Aurora border wraps image only */}
                  <div
                    ref={imageAuroraRef}
                    className="absolute -inset-1 rounded-[1.5rem] pointer-events-none z-10"
                    style={{
                      opacity: 0,
                      padding: "2px",
                      WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                    }}
                  />

                  {/* Inner photo area */}
                  <div className="relative h-full w-full overflow-hidden rounded-[1.4rem] bg-[var(--surface-2)]">

                    {/* Scanline sweep — a thin bright horizontal bar */}
                    <div
                      ref={imageScanRef}
                      className="absolute inset-x-0 z-20 pointer-events-none"
                      style={{
                        top: 0,
                        height: "3px",
                        opacity: 0,
                        background: "linear-gradient(90deg, transparent 0%, rgba(196,248,42,0.9) 40%, rgba(255,255,255,0.95) 50%, rgba(196,248,42,0.9) 60%, transparent 100%)",
                        boxShadow: "0 0 20px 6px rgba(196,248,42,0.4), 0 0 60px 15px rgba(196,248,42,0.15)",
                        filter: "blur(0.5px)",
                      }}
                    />

                    {/* Photo with counter-parallax */}
                    <div ref={imageInnerRef} className="relative h-full w-full" style={{ willChange: "transform" }}>
                      <Image
                        src="/ahmed.png"
                        alt="Ahmed Elkatiri portrait"
                        fill
                        priority
                        className="object-cover object-center"
                        sizes="(max-width: 1024px) 24rem, 420px"
                      />
                    </div>

                    {/* Bottom vignette */}
                    <div className="absolute inset-x-0 bottom-0 h-36 pointer-events-none"
                      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.30), transparent)" }} />

                    {/* Glass sheen overlay */}
                    <div
                      ref={imageOverlayRef}
                      className="absolute inset-0 pointer-events-none rounded-[1.4rem]"
                      style={{
                        opacity: 0,
                        background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%, rgba(196,248,42,0.03) 100%)",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* ── Depth shadow plane (below card in 3D space) ── */}
              <div
                className="absolute inset-x-4 -bottom-8 h-12 rounded-full pointer-events-none"
                style={{
                  background: "rgba(0,0,0,0.35)",
                  filter: "blur(24px)",
                  transform: "translateZ(-30px) scaleX(0.85)",
                }}
              />
            </div>
          </div>
        </div>

        <div ref={dividerRef} className="mt-20 md:mt-28 h-px bg-[var(--border)] origin-left" style={{ transform: "scaleX(0)" }} />
      </div>

      {/* ── Scroll indicator ── */}
      <div ref={scrollRef} className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-2" style={{ opacity: 0 }}>
        <span className="mono-label">Scroll</span>
        <span className="block w-px h-8 bg-[var(--muted)] animate-pulse" />
      </div>
    </section>
  );
}