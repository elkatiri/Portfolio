"use client";

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
    "inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-sm font-medium transition-all duration-200 cursor-hover";

  const variants = {
    primary:
      "bg-[var(--accent)] text-[var(--bg)] hover:opacity-85",
    outline:
      "border border-[var(--border)] text-[var(--fg)] hover:border-[var(--fg-secondary)] hover:bg-[var(--surface)]",
    ghost:
      "text-[var(--muted)] hover:text-[var(--fg)]",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
