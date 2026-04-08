import SectionHeading from "@/components/ui/SectionHeading";
import { workflowSteps } from "@/data/portfolio";

export default function Workflow() {
  return (
    <section id="workflow" className="section-padding section-border">
      <div className="container-custom">
        <SectionHeading
          number="04"
          title="Process"
          subtitle="Agile/Scrum methodology for efficient delivery"
        />

        <div
          className="relative grid gap-px md:grid-cols-5 border border-[var(--border)] rounded-2xl overflow-hidden"
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px"
            style={{ background: "linear-gradient(90deg, transparent, color-mix(in srgb, var(--accent) 44%, transparent), transparent)" }}
          />
          {workflowSteps.map((step) => (
            <div
              key={step.step}
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
