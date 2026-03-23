"use client";

import { useState, useRef, type FormEvent } from "react";
import { FiSend, FiGithub, FiLinkedin, FiMail, FiArrowUpRight } from "react-icons/fi";
import { useGsapFadeUp } from "@/hooks/useGsap";
import SectionHeading from "@/components/ui/SectionHeading";
import { socialLinks } from "@/data/portfolio";

export default function Contact() {
  const ref = useGsapFadeUp<HTMLDivElement>();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [focused, setFocused] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:${socialLinks.email}?subject=Portfolio Contact from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}`;
    window.location.href = mailtoLink;
  };

  return (
    <section id="contact" className="section-padding section-border">
      <div className="container-custom">
        <SectionHeading
          number="05"
          title="Contact"
          subtitle="Have a project in mind? Let's talk"
        />

        <div
          ref={ref}
          className="grid md:grid-cols-5 gap-12 lg:gap-16 items-start"
        >
          {/* Form — takes 3 cols */}
          <div data-animate className="md:col-span-3">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 md:p-12">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-10">
                {/* Name field */}
                <div className="relative">
                  <label
                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                      focused === "name" || formData.name
                        ? "top-2.5 text-[10px] tracking-wider uppercase text-[var(--accent)]"
                        : "top-4.5 text-sm text-[var(--muted)]"
                    }`}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-[var(--surface-2)] border border-[var(--border)] rounded-xl px-4 pt-7 pb-3 text-[var(--fg)] text-sm focus:outline-none focus:border-[var(--accent)] transition-colors duration-200"
                    value={formData.name}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                {/* Email field */}
                <div className="relative">
                  <label
                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                      focused === "email" || formData.email
                        ? "top-2.5 text-[10px] tracking-wider uppercase text-[var(--accent)]"
                        : "top-4.5 text-sm text-[var(--muted)]"
                    }`}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full bg-[var(--surface-2)] border border-[var(--border)] rounded-xl px-4 pt-7 pb-3 text-[var(--fg)] text-sm focus:outline-none focus:border-[var(--accent)] transition-colors duration-200"
                    value={formData.email}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                {/* Message field */}
                <div className="relative">
                  <label
                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                      focused === "message" || formData.message
                        ? "top-2.5 text-[10px] tracking-wider uppercase text-[var(--accent)]"
                        : "top-4.5 text-sm text-[var(--muted)]"
                    }`}
                  >
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    className="w-full bg-[var(--surface-2)] border border-[var(--border)] rounded-xl px-4 pt-7 pb-3 text-[var(--fg)] text-sm focus:outline-none focus:border-[var(--accent)] transition-colors duration-200 resize-none"
                    value={formData.message}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="group inline-flex items-center gap-3 bg-[var(--accent)] text-[var(--bg)] px-8 py-3.5 rounded-full text-sm font-semibold hover:opacity-90 transition-all duration-200 cursor-hover"
                >
                  <FiSend className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Info — takes 2 cols */}
          <div data-animate className="md:col-span-2 space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-semibold text-[var(--fg)] leading-tight">
                Let&apos;s build something{" "}
                <span className="text-[var(--accent)]">great</span>.
              </h3>
              <p className="text-[var(--fg-secondary)] text-sm leading-relaxed">
                I&apos;m open to new projects, creative ideas, or opportunities.
                Whether it&apos;s a SaaS platform, a web app, or a
                consultation — reach out.
              </p>
            </div>

            {/* Social links as cards */}
            <div className="space-y-3">
              {[
                { icon: FiGithub, label: "GitHub", href: socialLinks.github, value: "@ahmedelkatiri" },
                { icon: FiLinkedin, label: "LinkedIn", href: socialLinks.linkedin, value: "Ahmed Elkatiri" },
                { icon: FiMail, label: "Email", href: `mailto:${socialLinks.email}`, value: socialLinks.email },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--muted)] hover:bg-[var(--surface-2)] transition-all duration-200 group cursor-hover"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--surface-2)] group-hover:bg-[var(--accent)] transition-colors duration-200">
                    <social.icon className="w-4 h-4 text-[var(--fg-secondary)] group-hover:text-[var(--bg)] transition-colors duration-200" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] uppercase tracking-wider text-[var(--muted)] mb-0.5">{social.label}</div>
                    <div className="text-sm text-[var(--fg)] truncate">{social.value}</div>
                  </div>
                  <FiArrowUpRight className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
