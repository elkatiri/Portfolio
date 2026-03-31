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

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const cards = el.querySelectorAll<HTMLElement>("[data-project-card]");

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        const isEven = i % 2 === 0;
        const imageEl = card.querySelector("[data-project-image]");
        const contentEls = card.querySelectorAll("[data-project-content] > *");

        // 3D card entrance — flies in from the side with rotation
        gsap.set(card, {
          opacity: 0,
          rotateY: isEven ? -25 : 25,
          rotateX: 8,
          x: isEven ? -120 : 120,
          z: -200,
          scale: 0.9,
          transformPerspective: 1200,
          transformOrigin: isEven ? "left center" : "right center",
        });

        gsap.to(card, {
          opacity: 1,
          rotateY: 0,
          rotateX: 0,
          x: 0,
          z: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 40%",
            toggleActions: "play none none none",
          },
        });

        // Image parallax tilt on scroll
        if (imageEl) {
          gsap.to(imageEl, {
            rotateY: isEven ? 6 : -6,
            rotateX: -3,
            scale: 1.04,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          });
        }

        // Staggered content reveal
        if (contentEls.length) {
          gsap.set(contentEls, { opacity: 0, y: 30, rotateX: 15 });
          gsap.to(contentEls, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 70%",
              toggleActions: "play none none none",
            },
          });
        }
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="section-padding section-border" style={{ perspective: "1400px" }}>
      <div className="container-custom">
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
              className="grid md:grid-cols-2 gap-8 md:gap-12 items-center will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
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
                    };
                    let theme: "dark" | "light" = typeof window !== "undefined" && document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
                    if (typeof window === "undefined") theme = "dark";
                    const techKey = t as keyof typeof colorMap;
                    const colorEntry = colorMap[techKey];
                    const fallback = { bg: theme === "dark" ? "rgba(243,244,246,0.18)" : "rgba(243,244,246,0.13)", text: theme === "dark" ? "#e5e7eb" : "#222" };
                    const { bg, text } = (colorEntry && typeof colorEntry === "object" && (theme in colorEntry)
                      ? (colorEntry as Record<"dark"|"light", {bg:string;text:string}>)[theme]
                      : fallback);
                    return (
                      <span
                        key={t}
                        className="text-[11px] px-3 py-1 rounded-full border border-[var(--border)] font-medium"
                        style={{ background: bg, color: text }}
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
