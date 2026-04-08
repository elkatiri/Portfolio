import { HiOutlineArrowDownTray } from "react-icons/hi2";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";

export default function About() {
  return (
    <section id="about" className="section-padding section-border relative overflow-hidden">
      <div className="absolute inset-x-0 top-16 flex justify-center pointer-events-none">
        <div
          className="h-64 w-[min(36rem,82vw)] rounded-full"
          style={{
            background: "radial-gradient(circle, color-mix(in srgb, var(--accent) 18%, transparent) 0%, transparent 72%)",
            filter: "blur(26px)",
          }}
        />
      </div>
      <div className="container-custom relative">
        <SectionHeading
          number="01"
          title="About"
          subtitle="Who I am and what I do"
        />

        <div className="max-w-3xl space-y-8">
          <p className="text-lg md:text-xl leading-relaxed text-[var(--fg)]">
            I&apos;m <strong className="text-[var(--accent)]">Ahmed Elkatiri</strong> — a
            <strong className="text-[var(--accent)]"> Full Stack </strong>Developer  specializing in the <strong className="text-[var(--accent)]">MERN Stack, Next.js,
            Laravel, and SaaS applications.</strong>
          </p>
          <p className="text-[var(--fg-secondary)] text-base md:text-lg leading-relaxed">
            I build scalable, responsive, and modern web applications with
            clean UI/UX. From marketplace platforms with real-time features to
            subscription-based SaaS dashboards, I focus on delivering
            production-ready solutions.
          </p>
          <p className="text-[var(--fg-secondary)] text-base md:text-lg leading-relaxed">
            I also have experience with <strong className="text-[var(--fg)]">WordPress</strong> and follow{" "}
            <strong className="text-[var(--fg)]">Agile (Scrum)</strong> methodology using tools like{" "}
            <strong className="text-[var(--fg)]">Jira</strong> and <strong className="text-[var(--fg)]">Slack</strong> for
            team collaboration.
          </p>

          <div
            className="relative overflow-hidden flex flex-col gap-5 rounded-[calc(var(--radius)+6px)] border border-[var(--border)] bg-[linear-gradient(135deg,color-mix(in_srgb,var(--surface)_92%,transparent),color-mix(in_srgb,var(--surface-2)_88%,transparent))] p-6 md:flex-row md:items-center md:justify-between"
          >
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-32"
              style={{ background: "linear-gradient(135deg, transparent 0%, color-mix(in srgb, var(--accent) 14%, transparent) 100%)" }}
            />
            <div className="max-w-xl">
              <p className="mono-label mb-2">Resume</p>
              <p className="text-base md:text-lg text-[var(--fg)] leading-relaxed">
                Want the concise version of my experience, stack, and project work? Download my CV here.
              </p>
            </div>
            <Button
              href="/AhmedElkatiri_CV.pdf"
              variant="download"
              download
              className="w-full justify-center md:w-auto md:min-w-[12rem]"
            >
              <HiOutlineArrowDownTray className="text-base transition-transform duration-300 group-hover:translate-y-0.5" />
              <span>Download CV</span>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex gap-6 pt-6 border-t border-[var(--border)] md:gap-12">
            {[
              { value: "10+", label: "Projects" },
              { value: "8+", label: "Technologies" },
              { value: "SaaS", label: "Focus" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-bold text-[var(--fg)] leading-none">
                  {stat.value}
                </div>
                <div className="mono-label mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
