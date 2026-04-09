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
    slug: "building-invoice-generator-nextjs-supabase",
    title: "Building an Invoice Generator with Next.js & Supabase",
    description:
      "How I built a full-featured invoice generator with PDF export, tackling Supabase auth, dynamic form state, and PDF rendering challenges.",
    date: "2026-04-08",
    readTime: "8 min read",
    tags: ["Next.js", "Supabase", "Tailwind CSS", "PDF"],
    lang: "en",
    content: `
<p>Managing invoices manually is tedious and error-prone. I built an <strong>Invoice Generator</strong> that lets users create, manage, and export invoices as PDFs — all powered by <strong>Next.js</strong>, <strong>Tailwind CSS</strong>, and <strong>Supabase</strong>.</p>

<h2>Key Functionalities</h2>
<ul>
<li><strong>Invoice CRUD</strong> — Create, edit, duplicate, and delete invoices with a clean, intuitive UI</li>
<li><strong>PDF Export</strong> — Generate professional PDF invoices with proper formatting, logos, and line items</li>
<li><strong>Authentication</strong> — Secure user accounts via Supabase Auth so each user sees only their own invoices</li>
<li><strong>Dynamic Line Items</strong> — Add, remove, and reorder invoice items with automatic subtotal, tax, and total calculations</li>
<li><strong>Responsive Design</strong> — Fully usable on mobile and desktop with Tailwind CSS</li>
</ul>

<h2>Problem: PDF Generation on the Client</h2>
<p>The first challenge was generating PDFs. Server-side solutions like Puppeteer were too heavy for a Vercel deployment. I opted for a client-side approach using <code>html2canvas</code> combined with <code>jsPDF</code>. The tricky part was getting the invoice layout to render identically in the PDF — CSS Grid and Flexbox don't always translate perfectly to canvas. I solved this by creating a hidden "print-ready" version of the invoice with fixed pixel widths and inline styles that canvas could reliably capture.</p>

<h2>Problem: Supabase Row-Level Security</h2>
<p>Supabase's Row-Level Security (RLS) is powerful but initially confusing. My invoices weren't showing up after creation because I had forgotten to add a SELECT policy alongside the INSERT policy. The fix was straightforward — define policies for each operation (SELECT, INSERT, UPDATE, DELETE) filtered by <code>auth.uid() = user_id</code>. Lesson learned: always test every CRUD operation after setting up RLS.</p>

<h2>Problem: Dynamic Form State Management</h2>
<p>Handling a dynamic list of line items with React state was tricky. Adding and removing items while keeping calculations in sync caused stale state bugs. I solved this by using <code>useReducer</code> instead of multiple <code>useState</code> hooks, which gave me predictable state transitions and made the auto-calculation logic (subtotal, tax, discount, total) much cleaner.</p>

<h2>Key Takeaways</h2>
<p>Supabase is an excellent choice for apps that need auth + database without a custom backend. The combination of Next.js for the frontend and Supabase for the backend let me ship a production-ready app fast. The biggest lesson: <strong>always prototype your PDF output early</strong> — it saves hours of layout debugging later.</p>

<p>Try it out at <a href="https://invoice-generator-iota-dusky.vercel.app/" target="_blank" rel="noopener">the live demo</a> or check the <a href="https://github.com/elkatiri/Invoices" target="_blank" rel="noopener">source code</a>.</p>
`,
  },
  {
    slug: "marketplace-app-mern-realtime-messaging",
    title: "How I Built a Marketplace with Real-Time Messaging Using the MERN Stack",
    description:
      "Building a full marketplace with Socket.IO chat, Cloudinary image uploads, and solving real-time sync and auth challenges.",
    date: "2026-04-01",
    readTime: "10 min read",
    tags: ["React", "Node.js", "MongoDB", "Socket.IO"],
    lang: "en",
    content: `
<p>I built a <strong>full-featured marketplace platform</strong> where users can list products, browse listings, and chat with sellers in real time. The stack: <strong>React</strong>, <strong>Node.js</strong>, <strong>Express</strong>, <strong>MongoDB</strong>, <strong>Socket.IO</strong>, and <strong>Cloudinary</strong>.</p>

<h2>Key Functionalities</h2>
<ul>
<li><strong>Product Listings</strong> — Sellers can create, edit, and delete product listings with multiple images</li>
<li><strong>Image Uploads</strong> — Cloudinary handles image storage, transformation, and optimization</li>
<li><strong>Real-Time Chat</strong> — Buyers and sellers can message each other instantly via Socket.IO</li>
<li><strong>User Authentication</strong> — JWT-based auth with role separation between buyers and sellers</li>
<li><strong>Search & Filters</strong> — Filter products by category, price range, and location</li>
<li><strong>Responsive Storefront</strong> — A clean, mobile-friendly shopping experience</li>
</ul>

<h2>Problem: Real-Time Message Sync Across Tabs</h2>
<p>Socket.IO worked great for live messaging, but users who opened multiple browser tabs would see messages duplicated or out of order. The root cause was each tab opening its own socket connection, and the server broadcast messages to all connections for that user. I fixed this by assigning a unique <code>connectionId</code> to each socket and deduplicating messages on the client using a Set of message IDs before rendering.</p>

<h2>Problem: Cloudinary Upload Size & Format</h2>
<p>Users were uploading massive uncompressed images that took forever. I added client-side image compression using the <code>browser-image-compression</code> library before uploading to Cloudinary. I also restricted formats to JPEG, PNG, and WebP, and set a 5MB limit on the server with proper error messages. This cut average upload time by 70%.</p>

<h2>Problem: JWT Expiration During Active Chat</h2>
<p>Users in the middle of a conversation would suddenly get logged out when their JWT expired. I implemented a silent refresh mechanism: the client intercepts 401 responses, hits a <code>/refresh-token</code> endpoint using the stored refresh token (HTTP-only cookie), gets a new access token, and retries the original request — all without interrupting the user's chat session.</p>

<h2>Problem: MongoDB Query Performance</h2>
<p>As product listings grew, search became slow. The fix: compound indexes on the fields used for filtering (category + price + createdAt) and text indexes for full-text search on product titles and descriptions. Query times dropped from 800ms to under 50ms.</p>

<h2>Key Takeaways</h2>
<p>Building a marketplace taught me that <strong>real-time features add significant complexity</strong> to both frontend and backend. Socket.IO is powerful but needs careful connection management. And always index your MongoDB queries from day one — retrofitting indexes on a live database is stressful.</p>

<p>Check out the <a href="https://markete-place.vercel.app" target="_blank" rel="noopener">live marketplace</a> or view the <a href="https://github.com/elkatiri/markete-place" target="_blank" rel="noopener">source code</a>.</p>
`,
  },
  {
    slug: "farmers-platform-admin-dashboard-data-export",
    title: "Building a Farmers Platform with Admin Dashboard & Data Export",
    description:
      "How I created an agricultural management platform with role-based access, analytics, and CSV/PDF export — and the problems I solved along the way.",
    date: "2026-03-25",
    readTime: "9 min read",
    tags: ["React", "Node.js", "Express", "MongoDB"],
    lang: "en",
    content: `
<p>I built a <strong>Farmers Platform</strong> — an agricultural management system that helps administrators track farmer data, visualize analytics, and export reports. The entire stack is <strong>React</strong> + <strong>Node.js</strong> + <strong>Express</strong> + <strong>MongoDB</strong>.</p>

<h2>Key Functionalities</h2>
<ul>
<li><strong>Admin Dashboard</strong> — Overview with charts showing farmer registrations, crop distribution, and regional data</li>
<li><strong>Farmer Management</strong> — Full CRUD for farmer records with detailed profiles</li>
<li><strong>Role-Based Access Control</strong> — Admins can manage everything; regular users have read-only access to relevant data</li>
<li><strong>Data Export</strong> — Export farmer data and reports as CSV or PDF for offline analysis</li>
<li><strong>Analytics & Charts</strong> — Interactive charts built with Chart.js for data visualization</li>
<li><strong>Search & Pagination</strong> — Efficient data browsing with server-side pagination and filters</li>
</ul>

<h2>Problem: Role-Based Access at the API Level</h2>
<p>Initially, I only checked roles on the frontend (hiding admin buttons for regular users). This was insecure — anyone could call admin endpoints directly. I added an <code>authorize</code> middleware that verifies the user's role from the JWT payload before processing the request. Each route now explicitly declares which roles can access it: <code>authorize('admin')</code> or <code>authorize('admin', 'manager')</code>.</p>

<h2>Problem: CSV Export with Arabic Characters</h2>
<p>Farmer names and locations contained Arabic text. When exporting to CSV, Excel displayed garbled characters because it defaulted to ANSI encoding. The fix was adding a UTF-8 BOM (Byte Order Mark) at the start of the CSV file: <code>\\uFEFF</code>. This tells Excel to read the file as UTF-8, and all Arabic text rendered correctly.</p>

<h2>Problem: Chart.js Re-rendering on Data Updates</h2>
<p>Every time the dashboard data refreshed, Chart.js would create a new canvas instance without destroying the old one, causing memory leaks and visual glitches (charts stacking on top of each other). I fixed this by properly destroying the chart instance in the React <code>useEffect</code> cleanup function before re-creating it with new data.</p>

<h2>Problem: Server-Side Pagination with Filters</h2>
<p>Combining pagination with dynamic filters (by region, crop type, date range) was complex. If a user applied a filter on page 3, they'd get empty results because the offset was wrong for the filtered dataset. I reset the page to 1 whenever a filter changed, and built the MongoDB aggregation pipeline to apply filters first, then <code>$skip</code> and <code>$limit</code> for pagination. This ensured consistent results.</p>

<h2>Key Takeaways</h2>
<p><strong>Never trust the frontend for access control</strong> — always enforce it server-side. Data export seems simple until you hit encoding issues across different languages. And Chart.js in React requires careful lifecycle management to avoid memory leaks.</p>

<p>See the <a href="https://farmers-platform-beige.vercel.app" target="_blank" rel="noopener">live platform</a> or explore the <a href="https://github.com/elkatiri/FarmersPlatform" target="_blank" rel="noopener">source code</a>.</p>
`,
  },
  {
    slug: "dental-website-nextjs-framer-motion-animations",
    title: "Creating a Modern Dental Clinic Website with Next.js & Framer Motion",
    description:
      "How I designed and built a responsive dental website with smooth animations, appointment booking, and performance optimization.",
    date: "2026-03-18",
    readTime: "7 min read",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
    lang: "en",
    content: `
<p>A dental clinic approached me to build a modern, trustworthy website that would attract new patients. I used <strong>Next.js</strong>, <strong>Tailwind CSS</strong>, and <strong>Framer Motion</strong> to deliver a fast, animated, and fully responsive site.</p>

<h2>Key Functionalities</h2>
<ul>
<li><strong>Service Showcase</strong> — Dedicated sections for each dental service with descriptions and visuals</li>
<li><strong>Appointment Booking</strong> — A clean contact form for patients to request appointments</li>
<li><strong>Smooth Animations</strong> — Scroll-triggered animations using Framer Motion for a premium feel</li>
<li><strong>Responsive Design</strong> — Looks great on mobile, tablet, and desktop</li>
<li><strong>SEO Optimized</strong> — Server-rendered pages with proper meta tags for local search visibility</li>
</ul>

<h2>Problem: Framer Motion Animations Causing Layout Shifts</h2>
<p>I used Framer Motion's <code>initial</code> and <code>animate</code> props to fade and slide sections in on scroll. But elements with <code>opacity: 0</code> and <code>translateY</code> on initial render caused Cumulative Layout Shift (CLS) — the page would "jump" as sections became visible. I fixed this by using <code>whileInView</code> with the <code>viewport={{ once: true }}</code> option, and setting initial styles so that elements still occupied their full space (using <code>visibility</code> tricks instead of transforms that affect layout).</p>

<h2>Problem: Image Optimization for Dental Photography</h2>
<p>The clinic provided high-resolution photos that were 5-10MB each. Loading them destroyed page performance. I used Next.js's built-in <code>&lt;Image&gt;</code> component with <code>priority</code> for above-the-fold images and lazy loading for the rest. Combined with automatic WebP conversion and responsive <code>sizes</code>, the total image payload dropped by 85% without visible quality loss.</p>

<h2>Problem: Form Validation UX</h2>
<p>The appointment form needed to be simple but validate phone numbers, email, and preferred date/time. I used a combination of HTML5 validation attributes and custom validation logic. The challenge was showing errors without being aggressive — I implemented "validate on blur" (when the user leaves a field) instead of "validate on change" (while typing), which felt much more natural and less frustrating for patients.</p>

<h2>Problem: Tailwind CSS Custom Theme for Medical Branding</h2>
<p>The clinic's brand colors (soft blue and white) needed to feel trustworthy and medical. Default Tailwind colors were too vibrant. I extended the Tailwind config with custom color scales and created utility classes for consistent spacing, shadows, and border radii across the site. This made it easy to maintain visual consistency while building fast.</p>

<h2>Key Takeaways</h2>
<p>For client websites, <strong>animations must enhance, not hinder, performance</strong>. Framer Motion is powerful but needs careful implementation to avoid CLS issues. Next.js Image optimization is essential for media-heavy sites. And always validate forms in a way that respects the user's flow.</p>

<p>Visit the <a href="https://smilecare-dental-center.vercel.app" target="_blank" rel="noopener">live site</a> or check the <a href="https://github.com/elkatiri/dental-website" target="_blank" rel="noopener">source code</a>.</p>
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
