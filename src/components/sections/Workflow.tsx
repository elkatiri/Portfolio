"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";
import { workflowSteps } from "@/data/portfolio";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Workflow() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    const rail = railRef.current;
    if (!section || !grid) return;

    const cards = grid.querySelectorAll<HTMLElement>("[data-workflow-card]");

    const ctx = gsap.context(() => {
      gsap.set(cards, {
        opacity: 0,
        y: 56,
        rotateX: 26,
        scale: 0.92,
        transformPerspective: 900,
      });
      gsap.set(rail, { scaleX: 0, transformOrigin: "left center" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });

      tl.to(rail, {
        scaleX: 1,
        duration: 0.85,
        ease: "power2.out",
      }).to(
        cards,
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.78,
          stagger: 0.11,
          ease: "back.out(1.45)",
        },
        "-=0.25"
      );

      cards.forEach((card, index) => {
        gsap.to(card, {
          yPercent: index % 2 === 0 ? -8 : 8,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.1,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="workflow" className="section-padding section-border">
      <div className="container-custom">
        <SectionHeading
          number="04"
          title="Process"
          subtitle="Agile/Scrum methodology for efficient delivery"
        />

        <div
          ref={gridRef}
          className="relative grid gap-px md:grid-cols-5 border border-[var(--border)] rounded-2xl overflow-hidden"
        >
          <div
            ref={railRef}
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px"
            style={{ background: "linear-gradient(90deg, transparent, color-mix(in srgb, var(--accent) 44%, transparent), transparent)", transform: "scaleX(0)" }}
          />
          {workflowSteps.map((step) => (
            <div
              key={step.step}
              data-workflow-card
              className="relative overflow-hidden p-6 bg-[var(--surface)] hover:bg-[var(--surface-2)] transition-colors duration-300 group"
            >
              <div
                className="pointer-events-none absolute inset-y-0 left-0 w-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(180deg, transparent, color-mix(in srgb, var(--accent) 38%, transparent), transparent)" }}
              />
              <span className="mono-label text-[var(--accent)] block mb-4">{step.step}</span>
              <h3 className="font-semibold text-base text-[var(--fg)] mb-2 leading-snug">{step.title}</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
