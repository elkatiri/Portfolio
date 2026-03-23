"use client";

import { motion } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { HiOutlineShoppingCart, HiOutlineGlobe, HiOutlineChartBar } from "react-icons/hi";
import { RiPlantLine } from "react-icons/ri";
import {
  useScrollAnimation,
  fadeUp,
  staggerContainer,
} from "@/hooks/useScrollAnimation";
import SectionHeading from "@/components/ui/SectionHeading";
import TiltCard from "@/components/ui/TiltCard";
import { projects } from "@/data/portfolio";

const projectIcons: Record<string, React.ReactNode> = {
  Marketplace: <HiOutlineShoppingCart className="w-16 h-16 md:w-20 md:h-20 text-[var(--primary)] opacity-40 group-hover:opacity-70 transition-all duration-500" />,
  Farmer: <RiPlantLine className="w-16 h-16 md:w-20 md:h-20 text-[var(--accent)] opacity-40 group-hover:opacity-70 transition-all duration-500" />,
  Dental: <HiOutlineGlobe className="w-16 h-16 md:w-20 md:h-20 text-[var(--primary-light)] opacity-40 group-hover:opacity-70 transition-all duration-500" />,
  SaaS: <HiOutlineChartBar className="w-16 h-16 md:w-20 md:h-20 text-[var(--accent)] opacity-40 group-hover:opacity-70 transition-all duration-500" />,
};

function getProjectIcon(title: string) {
  for (const key of Object.keys(projectIcons)) {
    if (title.includes(key)) return projectIcons[key];
  }
  return <HiOutlineGlobe className="w-16 h-16 md:w-20 md:h-20 text-[var(--primary)] opacity-40 group-hover:opacity-70 transition-all duration-500" />;
}

export default function Projects() {
  const [ref, controls] = useScrollAnimation();

  return (
    <section id="projects" className="section-padding">
      <div className="container-custom">
        <SectionHeading
          title="Featured Projects"
          subtitle="Real-world applications built with modern technologies"
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
          className="grid gap-10 md:grid-cols-2"
        >
          {projects.map((project) => (
            <motion.div key={project.title} variants={fadeUp}>
              <TiltCard tiltAmount={6} className="h-full">
                <div className="glass h-full flex flex-col overflow-hidden">
                  {/* Image area */}
                  <div className="relative h-52 md:h-64 bg-gradient-to-br from-[var(--surface-light)] to-[var(--surface)] flex items-center justify-center overflow-hidden group">
                    {getProjectIcon(project.title)}
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent opacity-60" />
                  </div>

                  {/* Content */}
                  <div className="p-7 md:p-8 flex flex-col flex-1">
                    <h3 className="text-xl md:text-2xl font-semibold mb-4 leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-sm md:text-base text-[var(--muted)] mb-6 leading-7 flex-1">
                      {project.description}
                    </p>

                    {/* Tech badges */}
                    <div className="flex flex-wrap gap-2.5 mb-6">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs px-3.5 py-1.5 rounded-full bg-[var(--surface-light)] text-[var(--muted)] border border-[var(--border-clr)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-5">
                      <a
                        href={project.demo}
                        className="inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)] hover:text-[var(--primary-light)] transition-colors"
                      >
                        <FiExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                      <a
                        href={project.github}
                        className="inline-flex items-center gap-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                      >
                        <FiGithub className="w-4 h-4" />
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
