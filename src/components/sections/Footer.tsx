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
            { icon: FiGithub, href: socialLinks.github, label: "GitHub profile" },
            { icon: FiLinkedin, href: socialLinks.linkedin, label: "LinkedIn profile" },
            { icon: FiMail, href: `mailto:${socialLinks.email}`, label: "Send email" },
          ].map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="p-2 text-[var(--fg-secondary)] hover:text-[var(--accent)] transition-colors cursor-hover"
            >
              <s.icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
