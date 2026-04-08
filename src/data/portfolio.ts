import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiBootstrap,
  SiSass,
  SiNodedotjs,
  SiExpress,
  SiLaravel,
  SiPhp,
  SiMongodb,
  SiMysql,
  SiGit,
  SiGithub,
  SiPostman,
  SiCloudinary,
  SiWordpress,
  SiSlack,
  SiJira,
  SiSupabase,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import {
  HiOutlineClipboardList,
  HiOutlineLightningBolt,
  HiOutlineCode,
  HiOutlineBeaker,
  HiOutlineCheckCircle,
} from "react-icons/hi";
import { type IconType } from "react-icons";

export const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Workflow", href: "#workflow" },
  { label: "Contact", href: "#contact" },
];

export const techStack = [
  {
    category: "Frontend",
    items: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "currentColor" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
      { name: "Sass", icon: SiSass, color: "#CC6699" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express.js", icon: SiExpress, color: "currentColor" },
      { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
      { name: "PHP", icon: SiPhp, color: "#777BB4" },
    ],
  },
  {
    category: "Database",
    items: [
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "VS Code", icon: VscVscode, color: "#007ACC" },
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "currentColor" },
      { name: "Cloudinary", icon: SiCloudinary, color: "#3448C5" },
      { name: "Postman", icon: SiPostman, color: "#FF6C37" },
      { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
    ],
  },
  {
    category: "CMS",
    items: [{ name: "WordPress", icon: SiWordpress, color: "#21759B" }],
  },
  {
    category: "Collaboration",
    items: [
      { name: "Slack", icon: SiSlack, color: "#4A154B" },
      { name: "Jira", icon: SiJira, color: "#0052CC" },
    ],
  },
];

export const projects = [
  {
    title:"Invoices Generator",
    description:"A web application that allows users to create and manage invoices  and PDF export functionality.",
    tech:["Next.js", "Tailwind CSS", "Supabase"],
    image:"/projects/Invoices.png",
    demo:"https://invoice-generator-iota-dusky.vercel.app/",
    github:"https://github.com/elkatiri/Invoices",
  }
  ,{
    title: "Marketplace App",
    description:
      "A full-featured marketplace platform with real-time messaging, image uploads via Cloudinary, and a responsive storefront built on the MERN stack.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "Cloudinary"],
    image: "/projects/markete-place.png",
    demo: "https://markete-place.vercel.app",
    github: "https://github.com/elkatiri/markete-place",
  },
  {
    title: "Farmers Platform",
    description:
      "An agricultural management platform with an admin dashboard, data analytics, CSV/PDF export, and role-based access control.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    image: "/projects/farmers.png",
    demo: "https://farmers-platform-beige.vercel.app",
    github: "https://github.com/elkatiri/FarmersPlatform",
  },
  {
    title: "Dental Website",
    description:
      "A modern, responsive dental clinic website featuring appointment booking, service showcases, and clean medical UI design.",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    image: "/projects/dental.png",
    demo: "https://smilecare-dental-center.vercel.app",
    github: "https://github.com/elkatiri/dental-website",
  },
  {
    title: "Startup",
    description:
      "A sleek landing page for a tech startup, built with Next.js and Tailwind CSS, featuring smooth animations and a responsive design.",
    tech: ["Next.js","Tailwind CSS"],
    image: "/projects/startup.png",
    demo: "https://startup-roan-ten.vercel.app",
    github: "https://github.com/elkatiri/Startup",
  },
  {
    title:"Ecommerce Store",
    description:"a store built with wordpress and woocommerce, with custom theme development and plugin integrations.",
    tech:["WordPress", "WooCommerce"],
    image:"/projects/ecommerce.png",
    demo:"https://italiecasa.com",
  },
  {
    title:"Economic Travel Morocco",
    description:"a travel agency website built with wordpress, featuring custom booking forms and interactive maps.",
    tech:["WordPress", "WP Travel Engine"],
    image:"/projects/travel.png",
    demo:"https://economictravelmorocco.com",
  }
];

export const workflowSteps: {
  step: string;
  title: string;
  description: string;
  icon: IconType;
}[] = [
  {
    step: "01",
    title: "Planning",
    description: "Define scope, user stories, and sprint goals using Jira.",
    icon: HiOutlineClipboardList,
  },
  {
    step: "02",
    title: "Sprint",
    description: "Break tasks into sprints with clear deliverables and timelines.",
    icon: HiOutlineLightningBolt,
  },
  {
    step: "03",
    title: "Development",
    description: "Build features with clean, modular code using modern frameworks.",
    icon: HiOutlineCode,
  },
  {
    step: "04",
    title: "Testing",
    description: "QA, cross-browser testing, and performance optimization.",
    icon: HiOutlineBeaker,
  },
  {
    step: "05",
    title: "Review",
    description: "Code review, deploy to production, and retrospective.",
    icon: HiOutlineCheckCircle,
  },
];

export const socialLinks = {
  github: "https://github.com/elkatiri",
  linkedin: "https://www.linkedin.com/in/ahmed-elkatiri-a0347b3b2/",
  email: "ahmedelkatiri2026@gmail.com",
  whatsapp: "212651625941",
};
