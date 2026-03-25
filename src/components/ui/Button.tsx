"use client";

import {
  type ReactNode,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type MouseEventHandler,
} from "react";
import { triggerCvCelebration } from "@/lib/cvCelebration";

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost" | "download";
  href?: string;
  className?: string;
  download?: AnchorHTMLAttributes<HTMLAnchorElement>["download"];
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  rel?: AnchorHTMLAttributes<HTMLAnchorElement>["rel"];
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
}

export default function Button({
  children,
  variant = "primary",
  href,
  className = "",
  download,
  target,
  rel,
  onClick,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-sm font-medium transition-all duration-300 cursor-hover";

  const variants = {
    primary:
      "bg-[var(--accent)] text-[var(--bg)] hover:opacity-85",
    outline:
      "border border-[var(--border)] text-[var(--fg)] hover:border-[var(--fg-secondary)] hover:bg-[var(--surface)]",
    ghost:
      "text-[var(--muted)] hover:text-[var(--fg)]",
    download:
      "group relative overflow-hidden border border-[color:color-mix(in_srgb,var(--accent)_40%,transparent)] bg-[color:color-mix(in_srgb,var(--surface)_70%,transparent)] text-[var(--fg)] shadow-[0_0_0_1px_rgba(255,255,255,0.02)] before:absolute before:inset-y-0 before:left-[-35%] before:w-1/3 before:-skew-x-20 before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.24),transparent)] before:transition-transform before:duration-500 before:content-[''] hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-[0_14px_40px_rgba(0,0,0,0.22)] hover:before:translate-x-[420%]",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  const handleAnchorClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    onClick?.(event);

    if (download && !event.defaultPrevented) {
      triggerCvCelebration(event);
    }
  };

  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick?.(event);
  };

  if (href) {
    return (
      <a href={href} className={classes} download={download} target={target} rel={rel} onClick={handleAnchorClick}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} onClick={handleButtonClick} {...props}>
      {children}
    </button>
  );
}
