"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";
import { projects } from "@/data/portfolio";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const cards = el.querySelectorAll<HTMLElement>("[data-project-card]");
    const glow = glowRef.current;

    const ctx = gsap.context(() => {
      cards.forEach((card, index) => {
        const imageEl = card.querySelector("[data-project-image]");
        const contentEls = card.querySelectorAll("[data-project-content] > *");
        const frameEl = card.querySelector("[data-project-frame]");
        const direction = index % 2 === 0 ? 1 : -1;

        gsap.set(card, {
          opacity: 0,
          y: 72,
          x: direction * 56,
        });
        gsap.set(frameEl, { scaleX: 0, transformOrigin: direction === 1 ? "left center" : "right center" });

        if (imageEl) {
          gsap.set(imageEl, {
            scale: 1.12,
            opacity: 0,
            y: 36,
            rotateZ: direction * 1.8,
            clipPath: "inset(14% 0% 18% 0% round 1.25rem)",
          });
        }

        gsap.set(contentEls, { opacity: 0, y: 36, x: direction * 26, filter: "blur(8px)" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 84%",
            toggleActions: "play none none none",
          },
        });

        tl.to(card, {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 1,
          ease: "expo.out",
        })
          .to(
            frameEl,
            {
              scaleX: 1,
              duration: 0.9,
              ease: "power2.out",
            },
            "<0.1"
          );

        if (imageEl) {
          tl.to(
            imageEl,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateZ: 0,
              clipPath: "inset(0% 0% 0% 0% round 1.25rem)",
              duration: 1.25,
              ease: "expo.out",
            },
            "<"
          );

          gsap.to(imageEl, {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.15,
            },
          });
        }

        tl.to(
          contentEls,
          {
            opacity: 1,
            y: 0,
            x: 0,
            filter: "blur(0px)",
            duration: 0.72,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.7"
        );

        gsap.to(card, {
          yPercent: index % 2 === 0 ? -6 : 6,
          rotateZ: direction * 0.45,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      if (glow) {
        gsap.fromTo(
          glow,
          { scale: 0.86, opacity: 0.18, yPercent: -10 },
          {
            scale: 1.08,
            opacity: 0.42,
            yPercent: 18,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.3,
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="section-padding section-border" style={{ perspective: "1400px" }}>
      <div className="container-custom relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-24 flex justify-center">
          <div
            ref={glowRef}
            className="h-72 w-[min(46rem,92vw)] rounded-full"
            style={{
              background: "radial-gradient(circle, color-mix(in srgb, var(--accent) 14%, transparent) 0%, transparent 72%)",
              filter: "blur(28px)",
            }}
          />
        </div>
        <SectionHeading
          number="03"
          title="Work"
          subtitle="Selected projects I've built"
        />

        <div ref={sectionRef} className="space-y-16 md:space-y-24">
          {projects.map((project, i) => (
            <div
              key={project.title}
              data-project-card
              className="relative grid md:grid-cols-2 gap-8 md:gap-12 items-center will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                data-project-frame
                className="pointer-events-none absolute left-0 right-0 top-0 h-px opacity-70"
                style={{ background: "linear-gradient(90deg, transparent, color-mix(in srgb, var(--accent) 40%, transparent), transparent)", transform: "scaleX(0)" }}
              />
              {/* Image */}
              <div
                data-project-image
                className={`relative aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--surface)] border border-[var(--border)] will-change-transform ${i % 2 !== 0 ? "md:order-2" : ""}`}
                style={{ transformStyle: "preserve-3d" }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Glare overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
              </div>

              {/* Content */}
              <div
                data-project-content
                className={`space-y-4 ${i % 2 !== 0 ? "md:order-1" : ""}`}
                style={{ transformStyle: "preserve-3d" }}
              >
                <span className="mono-label">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-2xl md:text-3xl font-semibold text-[var(--fg)] leading-tight">
                  {project.title}
                </h3>
                <p className="text-[var(--fg-secondary)] text-sm md:text-base leading-relaxed">
                  {project.description}
                </p>

                {/* Tech */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tech.map((t) => {
                    const colorMap = {
                      "React": {
                        dark: { bg: "rgba(97,218,251,0.18)", text: "#61dafb" },
                        light: { bg: "rgba(97,218,251,0.13)", text: "#2563eb" },
                      },
                      "Next.js": {
                        dark: { bg: "rgba(30,30,30,0.18)", text: "#fff" },
                        light: { bg: "rgba(0,0,0,0.08)", text: "#222" },
                      },
                      "Tailwind CSS": {
                        dark: { bg: "rgba(6,182,212,0.18)", text: "#06b6d4" },
                        light: { bg: "rgba(6,182,212,0.13)", text: "#0e7490" },
                      },
                      "Supabase": {
                        dark: { bg: "rgba(62,207,142,0.18)", text: "#3ECF8E" },
                        light: { bg: "rgba(62,207,142,0.13)", text: "#17855a" },
                      },
                      "Node.js": {
                        dark: { bg: "rgba(51,153,51,0.18)", text: "#22c55e" },
                        light: { bg: "rgba(51,153,51,0.13)", text: "#166534" },
                      },
                      "Express": {
                        dark: { bg: "rgba(34,34,34,0.18)", text: "#fff" },
                        light: { bg: "rgba(34,34,34,0.08)", text: "#222" },
                      },
                      "MongoDB": {
                        dark: { bg: "rgba(71,162,72,0.18)", text: "#22d3ee" },
                        light: { bg: "rgba(71,162,72,0.13)", text: "#166534" },
                      },
                      "MySQL": {
                        dark: { bg: "rgba(68,121,161,0.18)", text: "#60a5fa" },
                        light: { bg: "rgba(68,121,161,0.13)", text: "#1e40af" },
                      },
                      "Cloudinary": {
                        dark: { bg: "rgba(52,72,197,0.18)", text: "#6366f1" },
                        light: { bg: "rgba(52,72,197,0.13)", text: "#3730a3" },
                      },
                      "Postman": {
                        dark: { bg: "rgba(255,108,55,0.18)", text: "#fb923c" },
                        light: { bg: "rgba(255,108,55,0.13)", text: "#b45309" },
                      },
                      "Socket.io": {
                        dark: { bg: "rgba(1,1,1,0.13)", text: "#fff" },
                        light: { bg: "rgba(1,1,1,0.08)", text: "#222" },
                      },
                      "Laravel": {
                        dark: { bg: "rgba(255,45,32,0.18)", text: "#f87171" },
                        light: { bg: "rgba(255,45,32,0.13)", text: "#991b1b" },
                      },
                      "PHP": {
                        dark: { bg: "rgba(119,123,180,0.18)", text: "#a5b4fc" },
                        light: { bg: "rgba(119,123,180,0.13)", text: "#3730a3" },
                      },
                      "WordPress": {
                        dark: { bg: "rgba(33,117,155,0.2)", text: "#7dd3fc" },
                        light: { bg: "rgba(33,117,155,0.14)", text: "#0c4a6e" },
                      },
                      "WooCommerce": {
                        dark: { bg: "rgba(135,88,216,0.2)", text: "#c4b5fd" },
                        light: { bg: "rgba(135,88,216,0.14)", text: "#6b21a8" },
                      },
                      "WP Travel Engine": {
                        dark: { bg: "rgba(14,165,140,0.2)", text: "#5eead4" },
                        light: { bg: "rgba(14,165,140,0.14)", text: "#0f766e" },
                      },
                      "Framer Motion": {
                        dark: { bg: "rgba(168,85,247,0.18)", text: "#d8b4fe" },
                        light: { bg: "rgba(168,85,247,0.13)", text: "#7e22ce" },
                      },
                    };
                    let theme: "dark" | "light" = typeof window !== "undefined" && document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
                    if (typeof window === "undefined") theme = "dark";
                    const techKey = t as keyof typeof colorMap;
                    const colorEntry = colorMap[techKey];
                    const fallback = {
                      bg: theme === "dark" ? "rgba(243,244,246,0.12)" : "rgba(15,23,42,0.08)",
                      text: theme === "dark" ? "#f8fafc" : "#0f172a",
                    };
                    const { bg, text } = (colorEntry && typeof colorEntry === "object" && (theme in colorEntry)
                      ? (colorEntry as Record<"dark"|"light", {bg:string;text:string}>)[theme]
                      : fallback);
                    return (
                      <span
                        key={t}
                        className="text-[11px] px-3 py-1 rounded-full border font-medium"
                        style={{
                          background: bg,
                          color: text,
                          borderColor: theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.09)",
                        }}
                      >
                        {t}
                      </span>
                    );
                  })}
                </div>

                {/* Links */}
                <div className="flex gap-5 pt-4">
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-[var(--accent)] hover:underline cursor-hover"
                  >
                    <FiExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--fg)] transition-colors cursor-hover"
                  >
                    <FiGithub className="w-4 h-4" />
                    Source
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
