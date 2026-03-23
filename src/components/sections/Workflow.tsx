"use client";

import { useGsapFadeUp } from "@/hooks/useGsap";
import SectionHeading from "@/components/ui/SectionHeading";
import { workflowSteps } from "@/data/portfolio";

export default function Workflow() {
  const ref = useGsapFadeUp<HTMLDivElement>();

  return (
    <section id="workflow" className="section-padding section-border">
      <div className="container-custom">
        <SectionHeading
          number="04"
          title="Process"
          subtitle="Agile/Scrum methodology for efficient delivery"
        />

        <div ref={ref} className="grid gap-px md:grid-cols-5 border border-[var(--border)] rounded-2xl overflow-hidden">
          {workflowSteps.map((step) => (
            <div
              key={step.step}
              data-animate
              className="p-6 bg-[var(--surface)] hover:bg-[var(--surface-2)] transition-colors duration-300 group"
            >
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
