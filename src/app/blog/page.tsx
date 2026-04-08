import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog | Ahmed Elkatiri – Full Stack Developer",
  description:
    "Articles on Next.js, React, Laravel, MERN stack, SaaS development, and web development best practices by Ahmed Elkatiri.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | Ahmed Elkatiri",
    description:
      "Technical articles on modern web development, SaaS, and full stack engineering.",
    url: "/blog",
  },
};

const tagClasses = [
  "border-[rgba(97,218,251,0.28)] bg-[rgba(97,218,251,0.12)]",
  "border-[rgba(196,248,42,0.28)] bg-[rgba(196,248,42,0.12)]",
  "border-[rgba(125,211,252,0.28)] bg-[rgba(125,211,252,0.12)]",
  "border-[rgba(248,113,113,0.28)] bg-[rgba(248,113,113,0.12)]",
];

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="relative z-10 section-padding pt-32 md:pt-40">
      <div className="container-custom max-w-4xl">
        <div className="mb-14 md:mb-20">
          <span className="mono-label mb-4 block">Blog</span>
          <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold tracking-tight leading-[1.15]">
            Articles & Insights
          </h1>
          <p className="text-[var(--fg-secondary)] text-base max-w-lg mt-4 leading-relaxed">
            Thoughts on web development, SaaS, and building modern applications
          </p>
        </div>

        <div className="space-y-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8 transition-all duration-300 hover:border-[var(--fg-secondary)] hover:bg-[var(--surface-2)]"
            >
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <time
                  dateTime={post.date}
                  className="mono-label"
                >
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span className="text-[var(--border)]">·</span>
                <span className="mono-label">{post.readTime}</span>
                {post.lang !== "en" && (
                  <>
                    <span className="text-[var(--border)]">·</span>
                    <span className="mono-label uppercase">{post.lang}</span>
                  </>
                )}
              </div>

              <h2 className="text-xl md:text-2xl font-semibold text-[var(--fg)] leading-tight group-hover:text-[var(--accent)] transition-colors duration-200">
                {post.title}
              </h2>

              <p className="mt-3 text-[var(--fg-secondary)] text-sm md:text-base leading-relaxed">
                {post.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag, i) => (
                  <span
                    key={tag}
                    className={`rounded-full border px-3 py-1 text-[11px] font-medium text-[var(--fg)] ${tagClasses[i % tagClasses.length]}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 text-sm text-[var(--accent)] hover:underline"
          >
            Have a topic suggestion? Let me know →
          </Link>
        </div>
      </div>
    </main>
  );
}
