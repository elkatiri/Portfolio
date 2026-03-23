"use client";

import { motion } from "framer-motion";
import {
  useScrollAnimation,
  fadeUp,
  staggerContainer,
} from "@/hooks/useScrollAnimation";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { workflowSteps } from "@/data/portfolio";

export default function Workflow() {
  const [ref, controls] = useScrollAnimation();

  return (
    <section id="workflow" className="section-padding">
      <div className="container-custom">
        <SectionHeading
          title="My Workflow"
          subtitle="Following Agile/Scrum methodology for efficient delivery"
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
          className="relative"
        >
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-20 -translate-y-1/2" />

          <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-5">
            {workflowSteps.map((step, i) => (
              <motion.div key={step.step} variants={fadeUp}>
                <GlassCard className="p-8 text-center relative h-full">
                  {/* Step icon */}
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[var(--surface-light)] border border-[var(--border-clr)] mb-5">
                    <step.icon className="w-7 h-7 text-[var(--primary)]" />
                  </div>
                  <div className="text-xs font-mono text-[var(--primary)] mb-4 tracking-wider leading-4">
                    Step {step.step}
                  </div>
                  <h3 className="font-semibold text-lg md:text-xl mb-4 leading-snug">{step.title}</h3>
                  <p className="text-sm md:text-base text-[var(--muted)] leading-7">
                    {step.description}
                  </p>

                  {/* Arrow connector on large screens */}
                  {i < workflowSteps.length - 1 && (
                    <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 text-[var(--primary)] opacity-40 z-10 text-xl">
                      →
                    </div>
                  )}
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
