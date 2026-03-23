"use client";

import Image from "next/image";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { useGsapFadeUp } from "@/hooks/useGsap";
import SectionHeading from "@/components/ui/SectionHeading";
import { projects } from "@/data/portfolio";

export default function Projects() {
  const ref = useGsapFadeUp<HTMLDivElement>();

  return (
    <section id="projects" className="section-padding section-border">
      <div className="container-custom">
        <SectionHeading
          number="03"
          title="Work"
          subtitle="Selected projects I've built"
        />

        <div ref={ref} className="space-y-16 md:space-y-24">
          {projects.map((project, i) => (
            <div
              key={project.title}
              data-animate
              className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
            >
              {/* Image */}
              <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--surface)] border border-[var(--border)] ${i % 2 !== 0 ? "md:order-2" : ""}`}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Content */}
              <div className={`space-y-4 ${i % 2 !== 0 ? "md:order-1" : ""}`}>
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
