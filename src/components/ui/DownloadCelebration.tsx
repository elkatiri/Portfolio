"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CV_DOWNLOAD_EVENT } from "@/lib/cvCelebration";

type Particle = {
  id: number;
  dx: number;
  dy: number;
  size: number;
  color: string;
  delay: number;
};

type Burst = {
  id: number;
  x: number;
  y: number;
  particles: Particle[];
};

const burstColors = ["#c4f82a", "#7dd3fc", "#f97316", "#fb7185", "#facc15"];

function createBurst(x: number, y: number): Burst {
  const particleCount = 18;

  return {
    id: Date.now() + Math.floor(Math.random() * 1000),
    x,
    y,
    particles: Array.from({ length: particleCount }, (_, index) => {
      const angle = (Math.PI * 2 * index) / particleCount;
      const distance = 70 + Math.random() * 90;

      return {
        id: index,
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance,
        size: 5 + Math.random() * 6,
        color: burstColors[index % burstColors.length],
        delay: Math.random() * 0.08,
      };
    }),
  };
}

export default function DownloadCelebration() {
  const [bursts, setBursts] = useState<Burst[]>([]);

  useEffect(() => {
    const handleCelebration = (event: Event) => {
      const customEvent = event as CustomEvent<{ x: number; y: number }>;
      const nextBurst = createBurst(customEvent.detail.x, customEvent.detail.y);

      setBursts((current) => [...current, nextBurst]);

      window.setTimeout(() => {
        setBursts((current) => current.filter((burst) => burst.id !== nextBurst.id));
      }, 1400);
    };

    window.addEventListener(CV_DOWNLOAD_EVENT, handleCelebration);

    return () => {
      window.removeEventListener(CV_DOWNLOAD_EVENT, handleCelebration);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] overflow-hidden">
      <AnimatePresence>
        {bursts.map((burst) => (
          <div
            key={burst.id}
            className="absolute"
            style={{ left: burst.x, top: burst.y }}
          >
            <motion.div
              className="absolute h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(196,248,42,0.28),rgba(196,248,42,0))] blur-2xl"
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: [0, 1, 0], scale: [0.3, 1.15, 1.8] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            />

            <motion.div
              className="absolute h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(196,248,42,0.45)]"
              initial={{ opacity: 0.8, scale: 0.2 }}
              animate={{ opacity: 0, scale: 2.1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />

            <motion.div
              className="absolute -translate-x-1/2 -translate-y-[240%] rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(8,8,8,0.75)] px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] shadow-[0_12px_35px_rgba(0,0,0,0.28)] backdrop-blur-md"
              initial={{ opacity: 0, y: 18, scale: 0.8 }}
              animate={{ opacity: [0, 1, 1, 0], y: [18, 0, -6, -18], scale: [0.8, 1, 1, 0.96] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, times: [0, 0.2, 0.75, 1], ease: "easeOut" }}
            >
              CV downloaded
            </motion.div>

            {burst.particles.map((particle) => (
              <motion.span
                key={particle.id}
                className="absolute rounded-full"
                style={{
                  left: -particle.size / 2,
                  top: -particle.size / 2,
                  width: particle.size,
                  height: particle.size,
                  backgroundColor: particle.color,
                  boxShadow: `0 0 16px ${particle.color}`,
                }}
                initial={{ opacity: 0, scale: 0.2, x: 0, y: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0.2, 1, 0.9, 0.2],
                  x: [0, particle.dx * 0.78, particle.dx],
                  y: [0, particle.dy * 0.78, particle.dy],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1,
                  delay: particle.delay,
                  times: [0, 0.18, 0.72, 1],
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}