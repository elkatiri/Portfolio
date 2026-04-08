import Image from "next/image";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import SectionHeading from "@/components/ui/SectionHeading";
import { projects } from "@/data/portfolio";

export default function Projects() {
  const tagClasses = [
    "border-[rgba(97,218,251,0.28)] bg-[rgba(97,218,251,0.12)] text-[var(--fg)]",
    "border-[rgba(196,248,42,0.28)] bg-[rgba(196,248,42,0.12)] text-[var(--fg)]",
    "border-[rgba(125,211,252,0.28)] bg-[rgba(125,211,252,0.12)] text-[var(--fg)]",
    "border-[rgba(248,113,113,0.28)] bg-[rgba(248,113,113,0.12)] text-[var(--fg)]",
  ];

  return (
    <section id="projects" className="section-padding section-border">
      <div className="container-custom relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-24 flex justify-center">
          <div
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

        <div className="space-y-16 md:space-y-24">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className="relative grid items-center gap-8 md:grid-cols-2 md:gap-12"
            >
              <div
                className="pointer-events-none absolute left-0 right-0 top-0 h-px opacity-70"
                style={{ background: "linear-gradient(90deg, transparent, color-mix(in srgb, var(--accent) 40%, transparent), transparent)" }}
              />
              <div
                className={`relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] ${i % 2 !== 0 ? "md:order-2" : ""}`}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(6,6,6,0.2))] pointer-events-none rounded-2xl" />
              </div>

              <div
                className={`space-y-4 ${i % 2 !== 0 ? "md:order-1" : ""}`}
              >
                <span className="mono-label">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-2xl md:text-3xl font-semibold text-[var(--fg)] leading-tight">
                  {project.title}
                </h3>
                <p className="text-[var(--fg-secondary)] text-sm md:text-base leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tech.map((t, tagIndex) => (
                    <span
                      key={t}
                      className={`rounded-full border px-3 py-1 text-[11px] font-medium ${tagClasses[tagIndex % tagClasses.length]}`}
                    >
                      {t}
                    </span>
                  ))}
                </div>

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
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-[var(--fg-secondary)] hover:text-[var(--fg)] transition-colors cursor-hover"
                    >
                      <FiGithub className="w-4 h-4" />
                      Source
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
