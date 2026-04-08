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
  return (
    <div
      className={`section-pin-target mb-14 md:mb-20 ${align === "center" ? "text-center" : "text-left"}`}
    >
      {number && (
        <span className="mono-label mb-4 block">
          {number}
        </span>
      )}
      <h2
        className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold tracking-tight leading-[1.15]"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-[var(--fg-secondary)] text-base max-w-lg mt-4 leading-relaxed" style={{ marginInline: align === "center" ? "auto" : undefined }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
