"use client";

import { motion } from "framer-motion";
import { type ReactNode, type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  href?: string;
  className?: string;
}

export default function Button({
  children,
  variant = "primary",
  href,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-medium text-sm transition-all duration-300 cursor-pointer";

  const variants = {
    primary:
      "bg-[var(--primary)] text-white hover:bg-[var(--primary-light)] glow-sm hover:glow",
    outline:
      "border border-[var(--border-clr)] text-[var(--foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)]",
    ghost:
      "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-light)]",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      {...(props as Record<string, unknown>)}
    >
      {children}
    </motion.button>
  );
}
