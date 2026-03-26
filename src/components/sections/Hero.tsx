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
  const imageRef = useRef<HTMLDivElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);
  const imageGlowRef = useRef<HTMLDivElement>(null);
  const imageShineRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const imageBorderRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tweens: gsap.core.Tween[] = [];
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    let onScroll: (() => void) | undefined;

    // ── 1. Background cinematic scale ──
    tl.fromTo(bgRef.current, { opacity: 0, scale: 1.15 }, { opacity: 1, scale: 1, duration: 2.4, ease: "expo.out" }, 0);

    // ── 2. Tag slides in with subtle line animation ──
    tl.fromTo(tagRef.current,
      { opacity: 0, x: -30, filter: "blur(6px)" },
      { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out" },
      0.25
    );

    // ── 3. Name chars — spring cascade ──
    if (nameRef.current) {
      const chars = nameRef.current.querySelectorAll(".char");
      tl.fromTo(chars,
        { opacity: 0, y: 60, rotateX: -90, scale: 0.5, transformPerspective: 600 },
        { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 0.7, stagger: 0.025, ease: "back.out(2.2)" },
        0.4
      );
    }

    // ── 4. Headline — cinematic word reveals ──
    tl.fromTo(word1Ref.current,
      { opacity: 0, y: "140%", rotateX: 60, transformPerspective: 1000, scale: 0.75 },
      { opacity: 1, y: "0%", rotateX: 0, scale: 1, duration: 1.4, ease: "expo.out" },
      0.55
    );
    tl.fromTo(word2Ref.current,
      { opacity: 0, y: "140%", rotateX: 60, transformPerspective: 1000, scale: 0.75 },
      { opacity: 1, y: "0%", rotateX: 0, scale: 1, duration: 1.4, ease: "expo.out" },
      0.72
    );
    tl.fromTo(word3Ref.current,
      { opacity: 0, x: -50, rotateY: -40, scale: 0.8, transformPerspective: 1000, filter: "blur(6px)" },
      { opacity: 1, x: 0, rotateY: 0, scale: 1, filter: "blur(0px)", duration: 1.1, ease: "power3.out" },
      0.9
    );

    // ── 5. Accent underline — elastic draw ──
    tl.fromTo(accentLineRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 1.1, ease: "elastic.out(1, 0.5)" },
      1.35
    );

    // ── 6. Subtitle — smooth deblur ──
    tl.fromTo(subRef.current,
      { opacity: 0, y: 30, filter: "blur(8px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out" },
      1.4
    );

    // ── 7. CTA buttons — elastic stagger ──
    if (ctaRef.current) {
      const btns = ctaRef.current.children;
      tl.fromTo(btns,
        { opacity: 0, y: 30, scale: 0.85, rotateX: 20, transformPerspective: 500 },
        {
          opacity: 1, y: 0, scale: 1, rotateX: 0,
          duration: 0.8, stagger: 0.12, ease: "back.out(1.8)",
        },
        1.55
      );
    }

    // ── 8. Image card — dramatic 3D entrance ──
    tl.fromTo(imageRef.current,
      { opacity: 0, scale: 0.82, filter: "blur(14px)" },
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.3, ease: "expo.out" },
      0.65
    );
    tl.fromTo(imageCardRef.current,
      { rotateX: 22, rotateY: -28, y: 70, scale: 0.88 },
      { rotateX: 0, rotateY: -6, y: 0, scale: 1, duration: 1.6, ease: "expo.out" },
      0.7
    );
    tl.fromTo(imageGlowRef.current,
      { opacity: 0, scale: 0.5 },
      { opacity: 0.6, scale: 1, duration: 1.4, ease: "power2.out" },
      0.85
    );
    tl.fromTo(imageBorderRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.out" },
      1.2
    );
    // Shine sweep on entrance
    tl.fromTo(imageShineRef.current,
      { xPercent: -160, opacity: 0 },
      { xPercent: 160, opacity: 0.45, duration: 1.3, ease: "power2.inOut" },
      1.3
    );
    tl.to(imageShineRef.current, { opacity: 0, duration: 0.3 }, 2.35);

    // ── 9. Divider + scroll indicator ──
    tl.fromTo(dividerRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "expo.inOut" }, "-=0.6");
    tl.fromTo(scrollRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.4");

    // ── Continuous: multi-axis floating card ──
    if (imageCardRef.current) {
      tweens.push(
        gsap.to(imageCardRef.current, {
          y: "+=14", rotateZ: -1.2, rotateY: "-=3",
          duration: 3.6, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2.2,
        }),
        gsap.to(imageCardRef.current, {
          rotateX: "+=2.5",
          duration: 4.8, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2.5,
        })
      );
    }

    // ── Continuous: glow breathing ──
    if (imageGlowRef.current) {
      tweens.push(
        gsap.to(imageGlowRef.current, {
          scale: 1.18, opacity: 0.35,
          duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2.2,
        })
      );
    }

    // ── Continuous: animated border rotation ──
    if (imageBorderRef.current) {
      const borderEl = imageBorderRef.current;
      const borderAnim = { angle: 0 };
      tweens.push(
        gsap.to(borderAnim, {
          angle: 360,
          duration: 5,
          repeat: -1,
          ease: "none",
          onUpdate: () => {
            borderEl.style.background =
              `conic-gradient(from ${borderAnim.angle}deg, var(--accent), transparent 40%, transparent 60%, var(--accent))`;
          },
        })
      );
    }

    // ── Continuous: periodic shine sweep ──
    if (imageShineRef.current) {
      tweens.push(
        gsap.fromTo(imageShineRef.current,
          { xPercent: -160, opacity: 0 },
          {
            xPercent: 160, opacity: 0.3,
            duration: 1.5, repeat: -1, repeatDelay: 4,
            ease: "power2.inOut", delay: 3.5,
          }
        )
      );
    }

    // ── Mouse tilt with inner image counter-parallax ──
    const imageWrapper = imageRef.current;
    const imageCard = imageCardRef.current;
    const imageInner = imageInnerRef.current;

    const handleImageMove = (event: MouseEvent) => {
      if (!imageWrapper || !imageCard) return;
      const bounds = imageWrapper.getBoundingClientRect();
      const offsetX = (event.clientX - bounds.left) / bounds.width - 0.5;
      const offsetY = (event.clientY - bounds.top) / bounds.height - 0.5;

      gsap.to(imageCard, {
        rotateY: -6 + offsetX * 18,
        rotateX: -offsetY * 15,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      });

      // Counter-parallax on inner image
      if (imageInner) {
        gsap.to(imageInner, {
          x: -offsetX * 16,
          y: -offsetY * 12,
          scale: 1.06,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const handleImageLeave = () => {
      if (imageCard) {
        gsap.to(imageCard, {
          rotateX: 0, rotateY: -6,
          duration: 0.8, ease: "elastic.out(1, 0.4)", overwrite: "auto",
        });
      }
      if (imageInner) {
        gsap.to(imageInner, {
          x: 0, y: 0, scale: 1,
          duration: 0.8, ease: "elastic.out(1, 0.4)", overwrite: "auto",
        });
      }
    };

    if (imageWrapper) {
      imageWrapper.addEventListener("mousemove", handleImageMove);
      imageWrapper.addEventListener("mouseleave", handleImageLeave);
    }

    // ── Scroll parallax with split speeds ──
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
        // Image floats up faster on scroll for depth
        if (imageWrapper) {
          imageWrapper.style.transform = `translate3d(0, ${y * -0.06}px, 0)`;
        }
      };
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    return () => {
      tl.kill();
      tweens.forEach((t) => t.kill());
      if (imageWrapper) {
        imageWrapper.removeEventListener("mousemove", handleImageMove);
        imageWrapper.removeEventListener("mouseleave", handleImageLeave);
      }
      if (onScroll) {
        window.removeEventListener("scroll", onScroll);
      }
    };
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
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div>
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
                href="/AhmedElkatiri_CV.pdf"
                variant="download"
                download
                className="min-w-[11.5rem]"
              >
                <HiOutlineArrowDownTray className="text-base transition-transform duration-300 group-hover:translate-y-0.5" />
                <span>Download CV</span>
              </Button>
              <Button href="#contact" variant="outline">Get in Touch</Button>
            </div>
          </div>

          <div ref={imageRef} className="relative mx-auto flex w-full max-w-[26rem] justify-center lg:max-w-none lg:justify-end" style={{ opacity: 0, perspective: "1600px" }}>
            {/* Ambient glow */}
            <div ref={imageGlowRef} className="absolute inset-x-6 bottom-0 h-32 rounded-full bg-[var(--accent)]/25 blur-[60px]" />
            <div className="absolute left-1/2 top-1/4 h-40 w-40 -translate-x-1/2 rounded-full bg-[var(--accent)]/10 blur-[80px]" />

            {/* Animated rotating border */}
            <div
              ref={imageBorderRef}
              className="absolute -inset-[2px] rounded-[2.15rem] opacity-0"
              style={{ padding: "2px", WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude" }}
            />

            <div
              ref={imageCardRef}
              className="relative aspect-[4/5] w-full max-w-[23rem] overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[linear-gradient(160deg,rgba(255,255,255,0.1),rgba(255,255,255,0.02)_50%,rgba(255,255,255,0.05))] p-2.5 shadow-[0_40px_100px_rgba(0,0,0,0.45),_0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-lg [transform-style:preserve-3d]"
            >
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/10 to-transparent rounded-t-[2rem] pointer-events-none" />
              <div className="relative h-full w-full overflow-hidden rounded-[1.4rem] bg-[var(--surface-2)]">
                {/* Shine sweep */}
                <div ref={imageShineRef} className="absolute inset-y-0 -left-1/3 z-10 w-1/3 -skew-x-12 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)] opacity-0" />
                {/* Inner image with counter-parallax */}
                <div ref={imageInnerRef} className="relative h-full w-full [will-change:transform]">
                  <Image
                    src="/ahmed.png"
                    alt="Ahmed Elkatiri portrait"
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 24rem, 420px"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
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
