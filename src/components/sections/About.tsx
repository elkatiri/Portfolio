"use client";

import { useGsapFadeUp } from "@/hooks/useGsap";
import SectionHeading from "@/components/ui/SectionHeading";

export default function About() {
  const ref = useGsapFadeUp<HTMLDivElement>();

  return (
    <section id="about" className="section-padding section-border">
      <div className="container-custom">
        <SectionHeading
          number="01"
          title="About"
          subtitle="Who I am and what I do"
        />

        <div ref={ref} className="max-w-3xl space-y-8">
          <p data-animate className="text-lg md:text-xl leading-relaxed text-[var(--fg)]">
            I&apos;m <strong className="text-[var(--accent)]">Ahmed Elkatiri</strong> — a
            <strong className="text-[var(--accent)]"> Full Stack </strong>Developer  specializing in the <strong className="text-[var(--accent)]">MERN Stack, Next.js,
            Laravel, and SaaS applications.</strong>
          </p>
          <p data-animate className="text-[var(--fg-secondary)] text-base md:text-lg leading-relaxed">
            I build scalable, responsive, and modern web applications with
            clean UI/UX. From marketplace platforms with real-time features to
            subscription-based SaaS dashboards, I focus on delivering
            production-ready solutions.
          </p>
          <p data-animate className="text-[var(--fg-secondary)] text-base md:text-lg leading-relaxed">
            I also have experience with <strong className="text-[var(--fg)]">WordPress</strong> and follow{" "}
            <strong className="text-[var(--fg)]">Agile (Scrum)</strong> methodology using tools like{" "}
            <strong className="text-[var(--fg)]">Jira</strong> and <strong className="text-[var(--fg)]">Slack</strong> for
            team collaboration.
          </p>

          {/* Stats */}
          <div data-animate className="flex gap-12 pt-6 border-t border-[var(--border)]">
            {[
              { value: "10+", label: "Projects" },
              { value: "8+", label: "Technologies" },
              { value: "SaaS", label: "Focus" },
            ].map((stat) => (
              <div key={stat.label}>
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
