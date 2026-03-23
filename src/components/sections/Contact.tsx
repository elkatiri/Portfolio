"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { FiSend, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import {
  useScrollAnimation,
  fadeUp,
  staggerContainer,
} from "@/hooks/useScrollAnimation";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { socialLinks } from "@/data/portfolio";

export default function Contact() {
  const [ref, controls] = useScrollAnimation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:${socialLinks.email}?subject=Portfolio Contact from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}`;
    window.location.href = mailtoLink;
  };

  const inputClasses =
    "w-full bg-[var(--surface)] border border-[var(--border-clr)] rounded-xl px-5 py-4 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all duration-300 text-base leading-7";

  return (
    <section id="contact" className="section-padding">
      <div className="container-custom">
        <SectionHeading
          title="Get in Touch"
          subtitle="Have a project in mind? Let's work together"
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-16 lg:gap-20 max-w-5xl mx-auto items-center"
        >
          {/* Form */}
          <motion.div variants={fadeUp}>
            <GlassCard hover={false} className="p-9 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-8 md:space-y-9">
                <div>
                  <label className="block text-sm font-medium text-[var(--muted)] mb-3 leading-6">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    className={inputClasses}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--muted)] mb-3 leading-6">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    className={inputClasses}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--muted)] mb-3 leading-6">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell me about your project..."
                    className={`${inputClasses} resize-none min-h-[160px]`}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  />
                </div>
                <Button type="submit" variant="primary" className="w-full">
                  <FiSend className="w-4 h-4" />
                  Send Message
                </Button>
              </form>
            </GlassCard>
          </motion.div>

          {/* Info */}
          <motion.div
            variants={fadeUp}
            className="space-y-12 flex flex-col justify-center text-center md:text-left max-w-xl mx-auto"
          >
            <div className="space-y-5">
              <h3 className="text-2xl md:text-3xl font-semibold leading-[1.2]">
                Let&apos;s build something{" "}
                <span className="gradient-text">amazing</span>
              </h3>
              <p className="text-[var(--muted)] text-base md:text-lg leading-8 mt-5">
                I&apos;m always open to discussing new projects, creative ideas,
                or opportunities to be part of your vision. Whether it&apos;s a
                SaaS platform, a web app, or a consultation — drop me a message!
              </p>
            </div>

            {/* Social links */}
            <div className="space-y-5">
              {[
                {
                  icon: FiGithub,
                  label: "GitHub",
                  href: socialLinks.github,
                  value: "@ahmedelkatiri",
                },
                {
                  icon: FiLinkedin,
                  label: "LinkedIn",
                  href: socialLinks.linkedin,
                  value: "Ahmed Elkatiri",
                },
                {
                  icon: FiMail,
                  label: "Email",
                  href: `mailto:${socialLinks.email}`,
                  value: socialLinks.email,
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-5 p-5 glass-sm hover:glow-sm transition-all duration-300 group text-left"
                >
                  <social.icon className="w-6 h-6 text-[var(--primary)] group-hover:text-[var(--accent)] transition-colors" />
                  <div>
                    <div className="text-sm md:text-base font-medium">{social.label}</div>
                    <div className="text-xs md:text-sm text-[var(--muted)] leading-6">
                      {social.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
