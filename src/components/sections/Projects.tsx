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
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-3 py-1 rounded-full border border-[var(--border)] text-[var(--muted)] font-medium"
                    >
                      {t}
                    </span>
                  ))}
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
