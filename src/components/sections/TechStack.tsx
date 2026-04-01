"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";
import { techStack } from "@/data/portfolio";
import { type IconType } from "react-icons";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function TechIcon({ Icon, color, name }: { Icon: IconType; color: string; name: string }) {
  return (
    <div className="flex flex-col items-center gap-2.5 group cursor-hover tech-icon">
      <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] transition-all duration-300 group-hover:border-[var(--accent)] group-hover:bg-[var(--surface-2)]">
        <Icon className="w-7 h-7 transition-colors duration-300" style={{ color }} />
      </div>
      <span className="text-[11px] text-[var(--muted)] group-hover:text-[var(--fg-secondary)] transition-colors font-medium">
        {name}
      </span>
    </div>
  );
}

export default function TechStack() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const cards = el.querySelectorAll<HTMLElement>(".tech-card");
    const glow = glowRef.current;

    const ctx = gsap.context(() => {
      cards.forEach((card, index) => {
        const direction = index % 3 === 0 ? -1 : index % 3 === 1 ? 1 : -0.45;
        const cardIcons = card.querySelectorAll<HTMLElement>(".tech-icon");

        gsap.set(card, {
          opacity: 0,
          y: 90,
          x: direction * 42,
          rotateX: 28,
          rotateY: direction * 16,
          scale: 0.88,
          transformPerspective: 1000,
        });
        gsap.set(cardIcons, { opacity: 0, y: 24, scale: 0.72 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 86%",
            toggleActions: "play none none none",
          },
        });

        tl.to(card, {
          opacity: 1,
          y: 0,
          x: 0,
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 1.05,
          ease: "expo.out",
        }).to(
          cardIcons,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            stagger: 0.04,
            ease: "back.out(1.7)",
          },
          "-=0.45"
        );

        gsap.to(card, {
          yPercent: index % 2 === 0 ? -8 : 8,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.1,
          },
        });
      });

      if (glow) {
        gsap.fromTo(
          glow,
          { xPercent: -25, opacity: 0.24, scaleX: 0.8 },
          {
            xPercent: 18,
            opacity: 0.55,
            scaleX: 1.15,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.4,
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="section-padding section-border">
      <div className="container-custom relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-28 flex justify-center">
          <div
            ref={glowRef}
            className="h-48 w-[min(42rem,90vw)] rounded-full"
            style={{
              background: "linear-gradient(90deg, transparent 0%, color-mix(in srgb, var(--accent) 12%, transparent) 50%, transparent 100%)",
              filter: "blur(24px)",
            }}
          />
        </div>
        <SectionHeading
          number="02"
          title="Stack"
          subtitle="Technologies and tools I work with"
        />

        <div ref={sectionRef} className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-3" style={{ perspective: "1200px" }}>
          {techStack.map((group) => (
            <div
              key={group.category}
              className="tech-card relative overflow-hidden p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] transition-colors duration-300 hover:border-[var(--muted)]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className="pointer-events-none absolute inset-x-6 top-0 h-px opacity-60"
                style={{ background: "linear-gradient(90deg, transparent, color-mix(in srgb, var(--accent) 38%, transparent), transparent)" }}
              />
              <span className="mono-label mb-5 block">{group.category}</span>
              <div className="flex flex-wrap gap-4">
                {group.items.map((item) => (
                  <TechIcon
                    key={item.name}
                    Icon={item.icon}
                    color={item.color}
                    name={item.name}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
