export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO date string
  readTime: string;
  tags: string[];
  content: string; // HTML content
  lang: "en" | "fr" | "ar";
}

export const blogPosts: BlogPost[] = [
  {
    slug: "building-saas-dashboard-nextjs-react",
    title: "How I Built a SaaS Dashboard with Next.js & React",
    description:
      "A deep dive into building a production-ready SaaS dashboard with Next.js App Router, server components, and real-time data.",
    date: "2026-04-08",
    readTime: "8 min read",
    tags: ["Next.js", "React", "SaaS", "TypeScript"],
    lang: "en",
    content: `
<p>Building a SaaS dashboard requires careful consideration of performance, user experience, and scalability. In this post, I'll walk through how I built a production-ready dashboard using <strong>Next.js App Router</strong> and <strong>React Server Components</strong>.</p>

<h2>Why Next.js for SaaS?</h2>
<p>Next.js provides the perfect foundation for SaaS applications. With server components, you get faster initial loads. With API routes, you get a built-in backend. And with Vercel deployment, you get global edge delivery out of the box.</p>

<h2>Architecture Decisions</h2>
<p>I structured the app using the App Router with the following pattern:</p>
<ul>
<li><strong>Server Components</strong> for data-heavy pages (dashboards, reports)</li>
<li><strong>Client Components</strong> only for interactive elements (forms, modals, charts)</li>
<li><strong>API Routes</strong> for webhook handlers and third-party integrations</li>
<li><strong>Middleware</strong> for authentication and tenant isolation</li>
</ul>

<h2>Real-time Data with Server-Sent Events</h2>
<p>Instead of WebSockets (which add complexity), I used Server-Sent Events for live dashboard updates. This keeps the infrastructure simple while providing real-time feedback to users.</p>

<h2>Key Takeaways</h2>
<p>The biggest lesson: <strong>start with server components everywhere</strong>, then add client interactivity only where needed. This approach cut initial JS by over 60% compared to a fully client-rendered SPA.</p>

<p>If you're building a SaaS product and want to discuss architecture, feel free to <a href="/#contact">reach out</a>.</p>
`,
  },
  {
    slug: "laravel-api-best-practices-2026",
    title: "Laravel API Best Practices I Follow in Every Project",
    description:
      "My battle-tested patterns for building clean, secure, and scalable REST APIs with Laravel — from validation to caching.",
    date: "2026-04-01",
    readTime: "6 min read",
    tags: ["Laravel", "PHP", "API", "Backend"],
    lang: "en",
    content: `
<p>After building several production APIs with Laravel, I've developed a set of patterns that I apply to every new project. These practices have saved me from bugs, security issues, and performance bottlenecks.</p>

<h2>1. Always Use Form Requests</h2>
<p>Never validate in the controller. Create dedicated <code>FormRequest</code> classes for every endpoint. This keeps controllers thin and makes validation rules reusable and testable.</p>

<h2>2. API Resources for Consistent Output</h2>
<p>Use <code>JsonResource</code> and <code>ResourceCollection</code> classes to control your API shape. Never return Eloquent models directly — this leaks database structure and makes versioning impossible.</p>

<h2>3. Repository Pattern for Complex Queries</h2>
<p>For simple CRUD, Eloquent in the controller is fine. But once you have complex filters, joins, or caching needs, extract a Repository class. It makes testing much easier.</p>

<h2>4. Rate Limiting & Throttling</h2>
<p>Apply rate limits to every public endpoint. Laravel makes this trivial with <code>RateLimiter</code> in the <code>RouteServiceProvider</code>. I typically set different limits for authenticated vs. guest users.</p>

<h2>5. Cache Aggressively</h2>
<p>Use Redis caching for frequently accessed data. Implement cache invalidation with model observers. The performance improvement is dramatic — 10x faster response times on read-heavy endpoints.</p>

<p>Want to see these patterns in action? Check out my <a href="/#projects">projects</a> or <a href="/#contact">get in touch</a>.</p>
`,
  },
  {
    slug: "creer-portfolio-developpeur-nextjs",
    title: "Créer un Portfolio de Développeur avec Next.js",
    description:
      "Guide complet pour construire un portfolio professionnel avec Next.js, optimisé pour le SEO et les performances.",
    date: "2026-03-25",
    readTime: "7 min de lecture",
    tags: ["Next.js", "Portfolio", "SEO", "Français"],
    lang: "fr",
    content: `
<p>Un portfolio bien conçu est essentiel pour tout développeur qui cherche à se démarquer. Dans cet article, je partage mon approche pour créer un portfolio performant avec <strong>Next.js</strong>.</p>

<h2>Pourquoi Next.js ?</h2>
<p>Next.js offre le rendu côté serveur (SSR) et la génération statique (SSG), ce qui est crucial pour le SEO. Google indexe mieux les pages pré-rendues, et vos visiteurs obtiennent un chargement ultra-rapide.</p>

<h2>Structure du Projet</h2>
<p>J'organise mon portfolio en sections distinctes :</p>
<ul>
<li><strong>Hero</strong> — première impression avec animation subtile</li>
<li><strong>À propos</strong> — parcours et compétences</li>
<li><strong>Projets</strong> — études de cas détaillées</li>
<li><strong>Blog</strong> — articles techniques pour le SEO</li>
<li><strong>Contact</strong> — formulaire et liens sociaux</li>
</ul>

<h2>Optimisation SEO</h2>
<p>Les éléments clés pour un bon référencement :</p>
<ul>
<li>Métadonnées multilingues (français, anglais, arabe)</li>
<li>Données structurées JSON-LD</li>
<li>Sitemap XML automatique</li>
<li>Fichier robots.txt</li>
<li>URLs canoniques</li>
</ul>

<h2>Conclusion</h2>
<p>Un portfolio n'est pas juste une vitrine — c'est un outil de marketing. En combinant Next.js avec une bonne stratégie SEO, vous pouvez attirer du trafic organique et convertir les visiteurs en clients.</p>

<p>Besoin d'aide pour créer votre portfolio ? <a href="/#contact">Contactez-moi</a>.</p>
`,
  },
  {
    slug: "mern-stack-ecommerce-guide",
    title: "Building a Full E-Commerce Platform with the MERN Stack",
    description:
      "Step-by-step guide to building a marketplace with MongoDB, Express, React, and Node.js — from auth to payments.",
    date: "2026-03-18",
    readTime: "10 min read",
    tags: ["MERN", "MongoDB", "React", "Node.js"],
    lang: "en",
    content: `
<p>The MERN stack (MongoDB, Express, React, Node.js) is one of the most popular choices for building full-stack JavaScript applications. In this post, I'll walk through the key decisions I made while building a marketplace platform.</p>

<h2>Database Design with MongoDB</h2>
<p>For an e-commerce platform, I use a hybrid approach: embed frequently-accessed data (like product variants) and reference rarely-joined collections (like order history). This balances read performance with data consistency.</p>

<h2>Authentication & Authorization</h2>
<p>I implement JWT-based auth with refresh tokens stored in HTTP-only cookies. Role-based access control (RBAC) separates buyer, seller, and admin permissions at the middleware level.</p>

<h2>Payment Integration</h2>
<p>Stripe handles payments. The key is to always verify prices server-side — never trust the client. I use webhooks to confirm payment completion before updating order status.</p>

<h2>Real-time Features</h2>
<p>Socket.IO powers real-time notifications for new orders, messages between buyers and sellers, and inventory updates. The event-driven architecture keeps the system responsive.</p>

<h2>Performance Optimizations</h2>
<ul>
<li>Redis caching for product listings and search results</li>
<li>Image optimization with Cloudinary</li>
<li>Pagination with cursor-based queries</li>
<li>MongoDB indexes on frequently queried fields</li>
</ul>

<p>Interested in building something similar? Check out my <a href="/#projects">marketplace project</a> or <a href="/#contact">let's talk</a>.</p>
`,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}
