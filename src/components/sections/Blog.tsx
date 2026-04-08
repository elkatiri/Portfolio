"use client";

import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import SectionHeading from "@/components/ui/SectionHeading";
import { useGsapFadeUp } from "@/hooks/useGsap";
import { getAllPosts } from "@/data/blog";

export default function Blog() {
  const ref = useGsapFadeUp<HTMLDivElement>();
  const posts = getAllPosts().slice(0, 3);

  return (
    <section id="blog" className="section-padding section-border">
      <div className="container-custom">
        <SectionHeading
          number="05"
          title="Blog"
          subtitle="Articles on web development and SaaS"
        />

        <div ref={ref} className="grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              data-animate
              className="group flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-300 hover:border-[var(--fg-secondary)] hover:bg-[var(--surface-2)] cursor-hover"
            >
              <div className="flex items-center gap-2 mb-3">
                <time dateTime={post.date} className="mono-label">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
                {post.lang !== "en" && (
                  <>
                    <span className="text-[var(--border)]">·</span>
                    <span className="mono-label uppercase">{post.lang}</span>
                  </>
                )}
              </div>

              <h3 className="text-base font-semibold text-[var(--fg)] leading-snug group-hover:text-[var(--accent)] transition-colors duration-200 mb-2">
                {post.title}
              </h3>

              <p className="text-sm text-[var(--fg-secondary)] leading-relaxed line-clamp-2 mb-4 flex-1">
                {post.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--border)] px-2.5 py-0.5 text-[10px] font-medium text-[var(--fg-secondary)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-6 py-3 text-sm font-medium text-[var(--fg)] transition-all duration-300 hover:border-[var(--fg-secondary)] hover:bg-[var(--surface)] cursor-hover"
          >
            View All Articles
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
