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

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const cards = el.querySelectorAll<HTMLElement>(".tech-card");
    const icons = el.querySelectorAll<HTMLElement>(".tech-icon");

    // Set initial state — cards come from 3D rotated perspective
    gsap.set(cards, { opacity: 0, rotateX: 35, rotateY: -15, y: 80, scale: 0.9, transformPerspective: 800 });
    gsap.set(icons, { opacity: 0, y: 30, scale: 0.7 });

    const ctx = gsap.context(() => {
      // Animate cards in with a 3D flip
      gsap.to(cards, {
        opacity: 1,
        rotateX: 0,
        rotateY: 0,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Icons pop in after cards
      gsap.to(icons, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.04,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="section-padding section-border">
      <div className="container-custom">
        <SectionHeading
          number="02"
          title="Stack"
          subtitle="Technologies and tools I work with"
        />

        <div ref={sectionRef} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" style={{ perspective: "1200px" }}>
          {techStack.map((group) => (
            <div
              key={group.category}
              className="tech-card p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] transition-colors duration-300 hover:border-[var(--muted)]"
              style={{ transformStyle: "preserve-3d" }}
            >
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
