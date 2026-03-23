"use client";

import { motion } from "framer-motion";
import { useScrollAnimation, fadeUp } from "@/hooks/useScrollAnimation";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  const [ref, controls] = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeUp}
      className={`mb-20 ${align === "center" ? "text-center" : "text-left"}`}
    >
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-[1.15]">
        {title.split(" ").map((word, i) =>
          i === title.split(" ").length - 1 ? (
            <span key={i} className="gradient-text">
              {word}
            </span>
          ) : (
            <span key={i}>{word} </span>
          )
        )}
      </h2>
      {subtitle && (
        <p className="text-[var(--muted)] text-lg md:text-xl max-w-2xl mx-auto leading-8">{subtitle}</p>
      )}
      <div className="mt-8 h-1 w-20 rounded-full bg-[var(--primary)] mx-auto opacity-80" />
    </motion.div>
  );
}
