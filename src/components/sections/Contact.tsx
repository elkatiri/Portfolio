"use client";

import { useId, useState, type FormEvent } from "react";
import { triggerContactCelebration } from "@/lib/contactCelebration";
import { FiSend, FiGithub, FiLinkedin, FiMail, FiArrowUpRight, FiCheck } from "react-icons/fi";
import SectionHeading from "@/components/ui/SectionHeading";
import { socialLinks } from "@/data/portfolio";

export default function Contact() {
  const fieldPrefix = useId();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [focused, setFocused] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const nameId = `${fieldPrefix}-name`;
  const emailId = `${fieldPrefix}-email`;
  const messageId = `${fieldPrefix}-message`;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error();

      setStatus("sent");
      setFormData({ name: "", email: "", message: "" });
      // Trigger celebration animation (center of screen)
      triggerContactCelebration();
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section id="contact" className="section-padding section-border relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-16 flex justify-end">
        <div
          className="mr-[max(2rem,6vw)] h-72 w-72 rounded-full"
          style={{
            background: "radial-gradient(circle, color-mix(in srgb, var(--accent) 18%, transparent) 0%, transparent 72%)",
            filter: "blur(30px)",
          }}
        />
      </div>
      <div className="container-custom relative">
        <SectionHeading
          number="05"
          title="Contact"
          subtitle="Have a project in mind? Let's talk"
        />

        <div className="grid md:grid-cols-5 gap-12 lg:gap-16 items-start">
          <div data-contact-form className="md:col-span-3">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-10">
                <div data-contact-field className="relative">
                  <label
                    htmlFor={nameId}
                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                      focused === "name" || formData.name
                        ? "top-2.5 text-[10px] tracking-wider uppercase text-[var(--accent)]"
                        : "top-4.5 text-sm text-[var(--muted)]"
                    }`}
                  >
                    Name
                  </label>
                  <input
                    id={nameId}
                    name="name"
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

                <div data-contact-field className="relative">
                  <label
                    htmlFor={emailId}
                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                      focused === "email" || formData.email
                        ? "top-2.5 text-[10px] tracking-wider uppercase text-[var(--accent)]"
                        : "top-4.5 text-sm text-[var(--muted)]"
                    }`}
                  >
                    Email
                  </label>
                  <input
                    id={emailId}
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="w-full bg-[var(--surface-2)] border border-[var(--border)] rounded-xl px-4 pt-7 pb-3 text-[var(--fg)] text-sm focus:outline-none focus:border-[var(--accent)] transition-colors duration-200"
                    value={formData.email}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div data-contact-field className="relative">
                  <label
                    htmlFor={messageId}
                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                      focused === "message" || formData.message
                        ? "top-2.5 text-[10px] tracking-wider uppercase text-[var(--accent)]"
                        : "top-4.5 text-sm text-[var(--muted)]"
                    }`}
                  >
                    Message
                  </label>
                  <textarea
                    id={messageId}
                    name="message"
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

                {status === "sent" && (
                  <p className="text-green-500 text-sm flex items-center gap-2">
                    <FiCheck className="w-4 h-4" /> Message sent successfully!
                  </p>
                )}
                {status === "error" && (
                  <p className="text-red-500 text-sm">
                    Failed to send. Please try again.
                  </p>
                )}

                <button
                  data-contact-field
                  type="submit"
                  disabled={status === "sending"}
                  className="group inline-flex items-center gap-3 bg-[var(--accent)] text-[var(--bg)] px-8 py-3.5 rounded-full text-sm font-semibold hover:opacity-90 transition-all duration-200 cursor-hover disabled:opacity-60"
                >
                  <FiSend className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>

          <div data-contact-info className="md:col-span-2 space-y-8">
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

            <div className="space-y-3">
              {[
                { icon: FiGithub, label: "GitHub", href: socialLinks.github, value: "@ahmedelkatiri" },
                { icon: FiLinkedin, label: "LinkedIn", href: socialLinks.linkedin, value: "Ahmed Elkatiri" },
                { icon: FiMail, label: "Email", href: `mailto:${socialLinks.email}`, value: socialLinks.email },
              ].map((social) => (
                <a
                  key={social.label}
                  data-contact-social
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
