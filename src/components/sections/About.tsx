"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiOutlineArrowDownTray } from "react-icons/hi2";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const glow = glowRef.current;
    if (!section || !content) return;

    const intro = content.querySelectorAll<HTMLElement>("[data-about-intro]");
    const panel = content.querySelector<HTMLElement>("[data-about-panel]");
    const stats = content.querySelectorAll<HTMLElement>("[data-about-stat]");

    const ctx = gsap.context(() => {
      gsap.set(intro, { opacity: 0, y: 48, filter: "blur(10px)" });
      gsap.set(panel, { opacity: 0, y: 64, scale: 0.94, rotateX: 8, transformPerspective: 1000 });
      gsap.set(stats, { opacity: 0, y: 36, scale: 0.9 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });

      tl.to(intro, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.95,
        stagger: 0.12,
      })
        .to(
          panel,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 1,
            ease: "expo.out",
          },
          "-=0.45"
        )
        .to(
          stats,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.1,
            ease: "back.out(1.8)",
          },
          "-=0.45"
        );

      if (glow) {
        gsap.fromTo(
          glow,
          { yPercent: -18, scale: 0.82, opacity: 0.2 },
          {
            yPercent: 16,
            scale: 1.12,
            opacity: 0.6,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="section-padding section-border relative overflow-hidden">
      <div className="absolute inset-x-0 top-16 flex justify-center pointer-events-none">
        <div
          ref={glowRef}
          className="h-64 w-[min(36rem,82vw)] rounded-full"
          style={{
            background: "radial-gradient(circle, color-mix(in srgb, var(--accent) 18%, transparent) 0%, transparent 72%)",
            filter: "blur(26px)",
          }}
        />
      </div>
      <div className="container-custom relative">
        <SectionHeading
          number="01"
          title="About"
          subtitle="Who I am and what I do"
        />

        <div ref={contentRef} className="max-w-3xl space-y-8">
          <p data-about-intro className="text-lg md:text-xl leading-relaxed text-[var(--fg)]">
            I&apos;m <strong className="text-[var(--accent)]">Ahmed Elkatiri</strong> — a
            <strong className="text-[var(--accent)]"> Full Stack </strong>Developer  specializing in the <strong className="text-[var(--accent)]">MERN Stack, Next.js,
            Laravel, and SaaS applications.</strong>
          </p>
          <p data-about-intro className="text-[var(--fg-secondary)] text-base md:text-lg leading-relaxed">
            I build scalable, responsive, and modern web applications with
            clean UI/UX. From marketplace platforms with real-time features to
            subscription-based SaaS dashboards, I focus on delivering
            production-ready solutions.
          </p>
          <p data-about-intro className="text-[var(--fg-secondary)] text-base md:text-lg leading-relaxed">
            I also have experience with <strong className="text-[var(--fg)]">WordPress</strong> and follow{" "}
            <strong className="text-[var(--fg)]">Agile (Scrum)</strong> methodology using tools like{" "}
            <strong className="text-[var(--fg)]">Jira</strong> and <strong className="text-[var(--fg)]">Slack</strong> for
            team collaboration.
          </p>

          <div
            data-about-panel
            className="relative overflow-hidden flex flex-col gap-5 rounded-[calc(var(--radius)+6px)] border border-[var(--border)] bg-[linear-gradient(135deg,color-mix(in_srgb,var(--surface)_92%,transparent),color-mix(in_srgb,var(--surface-2)_88%,transparent))] p-6 md:flex-row md:items-center md:justify-between"
          >
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-32"
              style={{ background: "linear-gradient(135deg, transparent 0%, color-mix(in srgb, var(--accent) 14%, transparent) 100%)" }}
            />
            <div className="max-w-xl">
              <p className="mono-label mb-2">Resume</p>
              <p className="text-base md:text-lg text-[var(--fg)] leading-relaxed">
                Want the concise version of my experience, stack, and project work? Download my CV here.
              </p>
            </div>
            <Button
              href="/AhmedElkatiri_CV.pdf"
              variant="download"
              download
              className="w-full justify-center md:w-auto md:min-w-[12rem]"
            >
              <HiOutlineArrowDownTray className="text-base transition-transform duration-300 group-hover:translate-y-0.5" />
              <span>Download CV</span>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex gap-6 pt-6 border-t border-[var(--border)] md:gap-12">
            {[
              { value: "10+", label: "Projects" },
              { value: "8+", label: "Technologies" },
              { value: "SaaS", label: "Focus" },
            ].map((stat) => (
              <div key={stat.label} data-about-stat>
                <div className="text-3xl md:text-4xl font-bold text-[var(--fg)] leading-none">
                  {stat.value}
                </div>
                <div className="mono-label mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
