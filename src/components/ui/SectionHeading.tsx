"use client";

import { useGsapFadeUp } from "@/hooks/useGsap";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  number?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  align = "left",
  number,
}: SectionHeadingProps) {
  const ref = useGsapFadeUp<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`section-pin-target mb-14 md:mb-20 ${align === "center" ? "text-center" : "text-left"}`}
    >
      {number && (
        <span data-animate className="mono-label mb-4 block">
          {number}
        </span>
      )}
      <h2
        data-animate
        className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold tracking-tight leading-[1.15]"
      >
        {title}
      </h2>
      {subtitle && (
        <p data-animate className="text-[var(--fg-secondary)] text-base max-w-lg mt-4 leading-relaxed" style={{ marginInline: align === "center" ? "auto" : undefined }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
