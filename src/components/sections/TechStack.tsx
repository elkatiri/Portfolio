"use client";

import { motion } from "framer-motion";
import {
  useScrollAnimation,
  fadeUp,
  staggerContainer,
} from "@/hooks/useScrollAnimation";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { techStack } from "@/data/portfolio";
import { type IconType } from "react-icons";

function TechIcon({ Icon, color, name }: { Icon: IconType; color: string; name: string }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ scale: 1.1, y: -6 }}
      className="flex flex-col items-center gap-3 group"
    >
      <div className="glass-sm p-5 rounded-2xl transition-all duration-300 group-hover:glow-sm">
        <Icon className="w-9 h-9 md:w-10 md:h-10 transition-colors duration-300" style={{ color }} />
      </div>
      <span className="text-xs md:text-sm text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors font-medium">
        {name}
      </span>
    </motion.div>
  );
}

export default function TechStack() {
  const [ref, controls] = useScrollAnimation();

  return (
    <section id="skills" className="section-padding">
      <div className="container-custom">
        <SectionHeading
          title="Tech Stack"
          subtitle="Technologies and tools I use to build great products"
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {techStack.map((group) => (
            <GlassCard key={group.category} className="p-8">
              <motion.div variants={fadeUp}>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-[var(--primary)] mb-7 leading-5">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-6">
                  {group.items.map((item) => (
                    <TechIcon
                      key={item.name}
                      Icon={item.icon}
                      color={item.color}
                      name={item.name}
                    />
                  ))}
                </div>
              </motion.div>
            </GlassCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
