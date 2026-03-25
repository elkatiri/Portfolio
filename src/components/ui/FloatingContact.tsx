"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMail } from "react-icons/fi";
import { HiOutlineChatBubbleLeftRight, HiXMark } from "react-icons/hi2";
import { SiWhatsapp } from "react-icons/si";
import { socialLinks } from "@/data/portfolio";

const contactActions = [
  {
    label: "WhatsApp",
    href: `https://wa.me/${socialLinks.whatsapp}`,
    icon: SiWhatsapp,
    className:
      "border-[rgba(37,211,102,0.28)] bg-[linear-gradient(135deg,rgba(37,211,102,0.18),rgba(9,18,12,0.92))] text-[#d8ffe5] hover:border-[#25D366] hover:shadow-[0_16px_36px_rgba(37,211,102,0.22)]",
  },
  {
    label: "Email",
    href: `mailto:${socialLinks.email}`,
    icon: FiMail,
    className:
      "border-[rgba(196,248,42,0.2)] bg-[linear-gradient(135deg,rgba(196,248,42,0.18),rgba(12,12,12,0.92))] text-[var(--fg)] hover:border-[var(--accent)] hover:shadow-[0_16px_36px_rgba(196,248,42,0.18)]",
  },
];

export default function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-[80] md:bottom-8 md:right-8">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="mb-3 flex flex-col items-end gap-3"
          >
            {contactActions.map((action, index) => (
              <motion.a
                key={action.label}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.2, delay: index * 0.04 }}
                className={`group inline-flex min-w-[12.5rem] items-center justify-between gap-4 rounded-2xl border px-4 py-3 backdrop-blur-xl transition-all duration-300 cursor-hover ${action.className}`}
                onClick={() => setOpen(false)}
              >
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-white/45">
                    Contact
                  </div>
                  <div className="text-sm font-semibold tracking-[0.03em]">
                    {action.label}
                  </div>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/20 transition-transform duration-300 group-hover:scale-105">
                  <action.icon className="h-4 w-4" />
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        aria-label={open ? "Close contact actions" : "Open contact actions"}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="group flex h-15 w-15 items-center justify-center rounded-full border border-[rgba(196,248,42,0.28)] bg-[linear-gradient(145deg,rgba(196,248,42,0.22),rgba(11,11,11,0.95))] text-[var(--fg)] shadow-[0_16px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[0_22px_44px_rgba(196,248,42,0.22)] cursor-hover"
      >
        <span className="absolute inset-1 rounded-full border border-white/8" />
        {open ? (
          <HiXMark className="relative h-6 w-6 transition-transform duration-300 group-hover:rotate-90" />
        ) : (
          <HiOutlineChatBubbleLeftRight className="relative h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
        )}
      </button>
    </div>
  );
}