"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { BsSun, BsMoon } from "react-icons/bs";
import { navLinks } from "@/data/portfolio";
import { useTheme } from "@/components/ThemeProvider";
import gsap from "gsap";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMounted(true);
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
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs text-[var(--muted)] hover:text-[var(--fg)] transition-colors duration-200 cursor-hover"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-[var(--surface-2)] transition-colors cursor-hover"
            aria-label="Toggle theme"
          >
            {!mounted || theme === "dark" ? (
              <BsSun className="w-3.5 h-3.5 text-[var(--muted)]" />
            ) : (
              <BsMoon className="w-3.5 h-3.5 text-[var(--muted)]" />
            )}
          </button>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-3 md:hidden">
          <button onClick={toggleTheme} className="p-2 cursor-pointer" aria-label="Toggle theme">
            {!mounted || theme === "dark" ? <BsSun className="w-4 h-4 text-[var(--muted)]" /> : <BsMoon className="w-4 h-4 text-[var(--muted)]" />}
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
