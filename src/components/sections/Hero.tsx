import Image from "next/image";
import { HiOutlineArrowDownTray } from "react-icons/hi2";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden section-padding pt-32 md:pt-40">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-8rem] top-8 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(196,248,42,0.22),transparent_72%)] blur-3xl" />
        <div className="absolute right-[-6rem] top-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(125,211,252,0.18),transparent_72%)] blur-3xl" />
      </div>

      <div className="container-custom">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_26rem]">
          <div>
            <p className="mono-label mb-5">Full Stack Developer</p>
            <p className="mb-6 font-mono text-sm uppercase tracking-[0.2em] text-[var(--fg-secondary)]">
              Ahmed Elkatiri
            </p>
            <h1 className="max-w-3xl text-[clamp(2.8rem,8vw,6.4rem)] font-bold tracking-tight leading-[0.98] text-balance">
              I build <span className="text-[var(--accent)]">modern</span> web apps.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-[var(--fg-secondary)] md:text-lg">
              Scalable SaaS products, polished interfaces, and production-ready web applications built with Next.js, React, Laravel, and the MERN stack.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="#projects" variant="primary">View Work</Button>
              <Button href="/AhmedElkatiri_CV.pdf" variant="download" download className="min-w-[11.5rem]">
                <HiOutlineArrowDownTray className="text-base" />
                <span>Download CV</span>
              </Button>
              <Button href="#contact" variant="outline">Get in Touch</Button>
            </div>

            <dl className="mt-12 grid max-w-xl gap-6 border-t border-[var(--border)] pt-6 sm:grid-cols-3">
              <div>
                <dt className="mono-label">Projects</dt>
                <dd className="mt-2 text-2xl font-semibold text-[var(--fg)]">10+</dd>
              </div>
              <div>
                <dt className="mono-label">Focus</dt>
                <dd className="mt-2 text-2xl font-semibold text-[var(--fg)]">SaaS</dd>
              </div>
              <div>
                <dt className="mono-label">Location</dt>
                <dd className="mt-2 text-2xl font-semibold text-[var(--fg)]">Morocco</dd>
              </div>
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-[26rem]">
            <div className="absolute inset-6 rounded-[2rem] bg-[radial-gradient(circle,rgba(196,248,42,0.18),transparent_72%)] blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[linear-gradient(160deg,color-mix(in_srgb,var(--surface)_92%,transparent),color-mix(in_srgb,var(--surface-2)_88%,transparent))] p-3 shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[var(--surface-2)]">
                <Image
                  src="/ahmed.png"
                  alt="Ahmed Elkatiri portrait"
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 26rem"
                />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_top,rgba(6,6,6,0.4),transparent)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
