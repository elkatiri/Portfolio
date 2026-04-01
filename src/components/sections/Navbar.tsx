"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { BsSun, BsMoon } from "react-icons/bs";
import { HiOutlineArrowDownTray } from "react-icons/hi2";
import { navLinks } from "@/data/portfolio";
import { useTheme } from "@/components/ThemeProvider";
import { triggerCvCelebration } from "@/lib/cvCelebration";
import gsap from "gsap";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current, { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.1 });
    }
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--border)] py-3"
          : "bg-transparent py-5"
      }`}
      style={{ opacity: 0 }}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="text-sm font-semibold tracking-tight text-[var(--fg)] cursor-hover">
          Ahmed Elkatiri
        </a>

        {/* Desktop Links */}
        <div
          className="hidden md:flex items-center gap-2 rounded-full border border-transparent bg-[color:color-mix(in_srgb,var(--surface)_30%,transparent)] px-2 py-1.5"
          onMouseLeave={() => setHoveredLink(null)}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onMouseEnter={() => setHoveredLink(link.href)}
              className="group relative rounded-full px-4 py-2 text-xs text-[var(--muted)] transition-colors duration-300 hover:text-[var(--fg)] cursor-hover"
            >
              {hoveredLink === link.href && (
                <motion.span
                  layoutId="navbar-hover"
                  className="absolute inset-0 -z-10 rounded-full border border-[color:color-mix(in_srgb,var(--accent)_20%,var(--border))] bg-[linear-gradient(135deg,color-mix(in_srgb,var(--surface-2)_88%,transparent),color-mix(in_srgb,var(--accent-soft)_72%,transparent))] shadow-[0_10px_30px_rgba(0,0,0,0.16)]"
                  transition={{ type: "spring", stiffness: 360, damping: 28, mass: 0.7 }}
                />
              )}
              {link.label}
              <span className="absolute inset-x-4 -bottom-px h-px origin-center scale-x-0 bg-[var(--accent)] transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
          <a
            href="/AhmedElkatiri_CV.pdf"
            download
            onClick={triggerCvCelebration}
            className="group inline-flex items-center gap-2 rounded-full border border-[color:color-mix(in_srgb,var(--accent)_24%,var(--border))] bg-[color:color-mix(in_srgb,var(--surface)_84%,transparent)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--fg)] shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[color:color-mix(in_srgb,var(--surface-2)_92%,transparent)] hover:text-[var(--accent)] hover:shadow-[0_14px_30px_rgba(0,0,0,0.22)] cursor-hover"
          >
            <HiOutlineArrowDownTray className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
            <span>CV</span>
          </a>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-[var(--surface-2)] transition-colors cursor-hover"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <BsSun className="w-3.5 h-3.5 text-[var(--muted)]" />
            ) : (
              <BsMoon className="w-3.5 h-3.5 text-[var(--muted)]" />
            )}
          </button>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-3 md:hidden">
          <button onClick={toggleTheme} className="p-2 cursor-pointer" aria-label="Toggle theme">
            {theme === "dark" ? <BsSun className="w-4 h-4 text-[var(--muted)]" /> : <BsMoon className="w-4 h-4 text-[var(--muted)]" />}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 cursor-pointer" aria-label="Toggle menu">
            {mobileOpen ? <HiX className="w-5 h-5" /> : <HiMenuAlt3 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-[var(--border)] bg-[var(--bg)] overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-[var(--muted)] hover:text-[var(--fg)] py-2 px-3 rounded-lg hover:bg-[var(--surface)] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/AhmedElkatiri_CV.pdf"
                download
                onClick={(event) => {
                  triggerCvCelebration(event);
                  setMobileOpen(false);
                }}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-[color:color-mix(in_srgb,var(--accent)_24%,var(--border))] bg-[color:color-mix(in_srgb,var(--surface)_86%,transparent)] px-4 py-3 text-sm font-semibold tracking-[0.04em] text-[var(--fg)] transition-all duration-300 hover:border-[var(--accent)] hover:bg-[var(--surface)]"
              >
                <HiOutlineArrowDownTray className="h-4 w-4" />
                <span>Download CV</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
