"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { loadSlim } from "@tsparticles/slim";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Engine } from "@tsparticles/engine";
import type { ISourceOptions } from "@tsparticles/engine";

export default function ParticleBackground() {
  const [init, setInit] = useState(false);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  useEffect(() => {
    const syncTheme = () => {
      setIsLight(document.documentElement.getAttribute("data-theme") === "light");
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const particlesLoaded = useCallback(async () => {}, []);

  const options = useMemo<ISourceOptions>(() => {
    const palette = isLight
      ? {
          particle: ["#1a1a1a", "#6a7f24", "#64748b"],
          link: "rgba(26,26,26,0.08)",
          glow: "rgba(26,26,26,0.06)",
        }
      : {
          particle: ["#c4f82a", "#7dd3fc", "#f8fafc"],
          link: "rgba(196,248,42,0.08)",
          glow: "rgba(196,248,42,0.08)",
        };

    return {
      fullScreen: false,
      fpsLimit: 60,
      background: { color: { value: "transparent" } },
      particles: {
        number: { value: 48, density: { enable: true, area: 1100 } },
        color: { value: palette.particle },
        shape: { type: "circle" },
        opacity: { value: { min: 0.08, max: 0.28 } },
        size: { value: { min: 1, max: 2.8 } },
        move: {
          enable: true,
          speed: 0.4,
          direction: "none",
          random: true,
          outModes: { default: "out" },
        },
        links: {
          enable: true,
          distance: 150,
          color: palette.link,
          opacity: 0.7,
          width: 1,
        },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: "grab" },
          resize: { enable: true },
        },
        modes: {
          grab: { distance: 150, links: { opacity: 0.18 } },
        },
      },
      detectRetina: true,
    };
  }, [isLight]);

  if (!init) return null;

  return (
    <div className="page-background pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="page-background__mesh" />
      <div className="page-background__orb page-background__orb--primary" />
      <div className="page-background__orb page-background__orb--secondary" />
      <div className="page-background__orb page-background__orb--tertiary" />
      <Particles
        id="page-particles"
        className="absolute inset-0"
        particlesLoaded={particlesLoaded}
        options={options}
      />
      <div className="page-background__vignette" />
    </div>
  );
}
