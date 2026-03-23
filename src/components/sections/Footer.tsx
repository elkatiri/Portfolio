"use client";

import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { socialLinks } from "@/data/portfolio";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] py-10 md:py-14">
      <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-xs text-[var(--muted)]">
          &copy; {currentYear}{" "}
          <span className="text-[var(--fg)] font-medium">Ahmed Elkatiri</span>
        </div>

        <div className="flex items-center gap-4">
          {[
            { icon: FiGithub, href: socialLinks.github },
            { icon: FiLinkedin, href: socialLinks.linkedin },
            { icon: FiMail, href: `mailto:${socialLinks.email}` },
          ].map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[var(--muted)] hover:text-[var(--accent)] transition-colors cursor-hover"
            >
              <s.icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
