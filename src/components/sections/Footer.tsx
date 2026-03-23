"use client";

import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { socialLinks } from "@/data/portfolio";

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-clr)] py-12 md:py-16 px-8 md:px-10 lg:px-12">
      <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-sm text-[var(--muted)]">
          &copy; {CURRENT_YEAR}{" "}
          <span className="gradient-text font-medium">Ahmed Elkatiri</span>.
          All rights reserved.
        </div>

        <div className="flex items-center gap-6">
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
              className="p-3 text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
            >
              <s.icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
