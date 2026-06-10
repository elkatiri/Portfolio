"use client";

import ThemeProvider from "@/components/ThemeProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import DownloadCelebration from "@/components/ui/DownloadCelebration";
import ContactCelebration from "@/components/ui/ContactCelebration";
import FloatingContact from "@/components/ui/FloatingContact";
import ParticleBackground from "@/components/ui/ParticleBackground";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import TechStack from "@/components/sections/TechStack";
import Projects from "@/components/sections/Projects";
import Workflow from "@/components/sections/Workflow";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import { useGsapSectionTransitions } from "@/hooks/useGsap";

export default function Home() {
  const mainRef = useGsapSectionTransitions<HTMLElement>();

  return (
    <ThemeProvider>
      <ParticleBackground />
      <CustomCursor />
      <DownloadCelebration />
      <ContactCelebration />
      <FloatingContact />
      <Navbar />
      <main ref={mainRef} className="section-stage-root relative z-10">
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Workflow />
        <Contact />
      </main>
      <Footer />
    </ThemeProvider>
  );
}
