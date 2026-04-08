import SectionHeading from "@/components/ui/SectionHeading";
import { techStack } from "@/data/portfolio";
import { type IconType } from "react-icons";

function TechIcon({ Icon, color, name }: { Icon: IconType; color: string; name: string }) {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] transition-colors duration-200">
        <Icon className="w-7 h-7 transition-colors duration-300" style={{ color }} />
      </div>
      <span className="text-[11px] text-[var(--fg-secondary)] font-medium">
        {name}
      </span>
    </div>
  );
}

export default function TechStack() {
  return (
    <section id="skills" className="section-padding section-border">
      <div className="container-custom relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-28 flex justify-center">
          <div
            className="h-48 w-[min(42rem,90vw)] rounded-full"
            style={{
              background: "linear-gradient(90deg, transparent 0%, color-mix(in srgb, var(--accent) 12%, transparent) 50%, transparent 100%)",
              filter: "blur(24px)",
            }}
          />
        </div>
        <SectionHeading
          number="02"
          title="Stack"
          subtitle="Technologies and tools I work with"
        />

        <div className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {techStack.map((group) => (
            <div
              key={group.category}
              className="relative overflow-hidden p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] transition-colors duration-200 hover:border-[var(--fg-secondary)]"
            >
              <div
                className="pointer-events-none absolute inset-x-6 top-0 h-px opacity-60"
                style={{ background: "linear-gradient(90deg, transparent, color-mix(in srgb, var(--accent) 38%, transparent), transparent)" }}
              />
              <span className="mono-label mb-5 block">{group.category}</span>
              <div className="flex flex-wrap gap-4">
                {group.items.map((item) => (
                  <TechIcon
                    key={item.name}
                    Icon={item.icon}
                    color={item.color}
                    name={item.name}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
