"use client";

import { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { BsSun, BsMoon } from "react-icons/bs";
import { HiOutlineArrowDownTray } from "react-icons/hi2";
import { navLinks } from "@/data/portfolio";
import { useTheme } from "@/components/ThemeProvider";
import { triggerCvCelebration } from "@/lib/cvCelebration";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)] bg-[color:color-mix(in_srgb,var(--bg)_92%,transparent)] py-3 backdrop-blur-sm"
    >
      <div className="container-custom flex items-center justify-between">
        <a href="#hero" className="text-sm font-semibold tracking-tight text-[var(--fg)] cursor-hover">
          Ahmed Elkatiri
        </a>

        <div className="hidden md:flex items-center gap-2 rounded-full border border-[var(--border)] bg-[color:color-mix(in_srgb,var(--surface)_60%,transparent)] px-2 py-1.5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-xs text-[var(--fg-secondary)] transition-colors duration-200 hover:text-[var(--fg)] cursor-hover"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/AhmedElkatiri_CV.pdf"
            download
            onClick={triggerCvCelebration}
            className="inline-flex items-center gap-2 rounded-full border border-[color:color-mix(in_srgb,var(--accent)_24%,var(--border))] bg-[color:color-mix(in_srgb,var(--surface)_84%,transparent)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--fg)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)] cursor-hover"
          >
            <HiOutlineArrowDownTray className="h-3.5 w-3.5" />
            <span>CV</span>
          </a>
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 transition-colors hover:bg-[var(--surface-2)] cursor-hover"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <BsSun className="w-3.5 h-3.5 text-[var(--fg-secondary)]" />
            ) : (
              <BsMoon className="w-3.5 h-3.5 text-[var(--fg-secondary)]" />
            )}
          </button>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button onClick={toggleTheme} className="rounded-full p-2" aria-label="Toggle theme">
            {theme === "dark" ? <BsSun className="w-4 h-4 text-[var(--fg-secondary)]" /> : <BsMoon className="w-4 h-4 text-[var(--fg-secondary)]" />}
          </button>
          <button onClick={() => setMobileOpen((current) => !current)} className="rounded-full p-2" aria-label="Toggle menu" aria-expanded={mobileOpen} aria-controls="mobile-navigation">
            {mobileOpen ? <HiX className="w-5 h-5" /> : <HiMenuAlt3 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div id="mobile-navigation" className="border-t border-[var(--border)] bg-[var(--bg)] md:hidden">
          <div className="flex flex-col gap-1 p-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-[var(--fg-secondary)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--fg)]"
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
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-[color:color-mix(in_srgb,var(--accent)_24%,var(--border))] bg-[color:color-mix(in_srgb,var(--surface)_86%,transparent)] px-4 py-3 text-sm font-semibold tracking-[0.04em] text-[var(--fg)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <HiOutlineArrowDownTray className="h-4 w-4" />
              <span>Download CV</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
