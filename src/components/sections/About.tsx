"use client";

import { motion } from "framer-motion";
import {
  useScrollAnimation,
  fadeUp,
  staggerContainer,
} from "@/hooks/useScrollAnimation";
import TiltCard from "@/components/ui/TiltCard";
import SectionHeading from "@/components/ui/SectionHeading";

export default function About() {
  const [ref, controls] = useScrollAnimation();

  return (
    <section id="about" className="section-padding">
      <div className="container-custom">
        <SectionHeading
          title="About Me"
          subtitle="Passionate about building real-world products"
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center"
        >
          {/* Profile image with 3D tilt */}
          <motion.div variants={fadeUp} className="flex justify-center">
            <TiltCard className="w-72 h-72 md:w-96 md:h-96 rounded-2xl overflow-hidden glass p-1.5">
              <div className="w-full h-full rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-8xl">
                👨‍💻
              </div>
            </TiltCard>
          </motion.div>

          {/* Text */}
          <motion.div variants={fadeUp} className="space-y-8">
            <p className="text-lg md:text-xl leading-8 md:leading-9 text-[var(--foreground)]">
              Hi, I&apos;m <strong className="gradient-text">Ahmed Elkatiri</strong> — a
              Full Stack Developer specializing in the{" "}
              <strong>MERN Stack</strong>, <strong>Next.js</strong>,{" "}
              <strong>Laravel</strong>, and <strong>SaaS applications</strong>.
            </p>
            <p className="text-[var(--muted)] text-base md:text-lg leading-7 md:leading-8">
              I build scalable, responsive, and modern web applications with
              clean UI/UX. From marketplace platforms with real-time features to
              subscription-based SaaS dashboards, I focus on delivering
              production-ready solutions.
            </p>
            <p className="text-[var(--muted)] text-base md:text-lg leading-7 md:leading-8">
              I also have experience with <strong>WordPress</strong> and follow{" "}
              <strong>Agile (Scrum)</strong> methodology using tools like{" "}
              <strong>Jira</strong> and <strong>Slack</strong> to collaborate
              effectively in team environments.
            </p>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-5 pt-6">
              {[
                { value: "4+", label: "Projects" },
                { value: "5+", label: "Technologies" },
                { value: "SaaS", label: "Experience" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="glass-sm text-center py-5 px-4"
                >
                  <div className="text-2xl md:text-3xl font-bold gradient-text leading-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-[var(--muted)] mt-2 leading-5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
