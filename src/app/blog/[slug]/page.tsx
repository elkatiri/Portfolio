import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import { getAllPosts, getPostBySlug } from "@/data/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Ahmed Elkatiri`,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: ["Ahmed Elkatiri"],
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Ahmed Elkatiri",
      url: "https://ahmedelkatiri.vercel.app",
    },
    publisher: {
      "@type": "Person",
      name: "Ahmed Elkatiri",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://ahmedelkatiri.vercel.app/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
    inLanguage: post.lang === "fr" ? "fr-FR" : post.lang === "ar" ? "ar-MA" : "en-US",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main
        className="relative z-10 section-padding pt-32 md:pt-40"
        lang={post.lang}
        dir={post.lang === "ar" ? "rtl" : "ltr"}
      >
        <article className="container-custom max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[var(--fg-secondary)] hover:text-[var(--accent)] transition-colors mb-10"
          >
            <FiArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <header className="mb-10 md:mb-14">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <time dateTime={post.date} className="mono-label">
                {new Date(post.date).toLocaleDateString(
                  post.lang === "fr" ? "fr-FR" : post.lang === "ar" ? "ar-MA" : "en-US",
                  { year: "numeric", month: "long", day: "numeric" },
                )}
              </time>
              <span className="text-[var(--border)]">·</span>
              <span className="mono-label">{post.readTime}</span>
            </div>

            <h1 className="text-2xl md:text-4xl lg:text-[2.75rem] font-semibold tracking-tight leading-[1.15]">
              {post.title}
            </h1>

            <div className="mt-5 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-[11px] font-medium text-[var(--fg-secondary)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <footer className="mt-16 border-t border-[var(--border)] pt-8">
            <p className="text-[var(--fg-secondary)] text-sm leading-relaxed">
              Written by{" "}
              <Link href="/#about" className="text-[var(--accent)] hover:underline">
                Ahmed Elkatiri
              </Link>{" "}
              — Full Stack Developer specializing in Next.js, React, Laravel & SaaS.
            </p>
            <div className="mt-6 flex gap-4">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-2.5 text-sm text-[var(--fg)] hover:border-[var(--fg-secondary)] transition-colors"
              >
                ← More Articles
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-[var(--bg)]"
              >
                Get in Touch
              </Link>
            </div>
          </footer>
        </article>
      </main>
    </>
  );
}
