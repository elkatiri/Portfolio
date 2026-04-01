"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hook for GSAP scroll-triggered fade-up animation on child elements.
 */
export function useGsapFadeUp<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.querySelectorAll("[data-animate]");
    if (children.length === 0) return;

    gsap.set(children, { opacity: 0, y: 60 });

    const ctx = gsap.context(() => {
      gsap.to(children, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}

/**
 * Hook for GSAP parallax effect on an element.
 */
export function useGsapParallax<T extends HTMLElement>(speed = 50) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: speed,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [speed]);

  return ref;
}

/**
 * Hook for GSAP text split & reveal animation.
 */
export function useGsapTextReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const text = el.textContent || "";
    el.innerHTML = "";

    // Create word wrappers
    const words = text.split(" ");
    words.forEach((word, i) => {
      const wordSpan = document.createElement("span");
      wordSpan.style.display = "inline-block";
      wordSpan.style.overflow = "hidden";
      wordSpan.style.verticalAlign = "top";

      const inner = document.createElement("span");
      inner.textContent = word;
      inner.style.display = "inline-block";
      inner.style.transform = "translateY(110%)";
      inner.className = "reveal-word";

      wordSpan.appendChild(inner);
      el.appendChild(wordSpan);

      if (i < words.length - 1) {
        const space = document.createTextNode("\u00A0");
        el.appendChild(space);
      }
    });

    const ctx = gsap.context(() => {
      gsap.to(el.querySelectorAll(".reveal-word"), {
        y: 0,
        duration: 0.9,
        stagger: 0.04,
        ease: "power3.out",
        delay: 0.3,
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}

/**
 * Hook for horizontal scroll-triggered scale animation.
 */
export function useGsapScale<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, scale: 0.92 });

    const ctx = gsap.context(() => {
      gsap.to(el, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}

/**
 * Hook for page-level section transitions with desktop pinning and mobile-safe fallbacks.
 */
export function useGsapSectionTransitions<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const sections = Array.from(root.querySelectorAll<HTMLElement>(":scope > section"));
    if (sections.length === 0) return;

    const mm = gsap.matchMedia();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const buildSectionTransitions = (withPinning: boolean) => {
      const ctx = gsap.context(() => {
        sections.forEach((section, index) => {
          if (index === 0) return;

          const pinTarget = section.querySelector<HTMLElement>(".section-pin-target");

          gsap.set(section, {
            opacity: withPinning ? 0.42 : 0.78,
            y: withPinning ? 110 : 42,
            scale: withPinning ? 0.965 : 0.985,
            filter: withPinning ? "blur(12px)" : "blur(4px)",
            transformOrigin: "center top",
            willChange: "transform, opacity, filter",
          });

          gsap.to(section, {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: withPinning ? "top 92%" : "top 88%",
              end: withPinning ? "top 38%" : "top 62%",
              scrub: withPinning ? 1.15 : 0.7,
            },
          });

          gsap.to(section, {
            yPercent: withPinning ? -6 : -2,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: withPinning ? 1.2 : 0.8,
            },
          });

          if (withPinning && pinTarget && section.id !== "projects" && section.id !== "contact") {
            ScrollTrigger.create({
              trigger: section,
              start: "top 14%",
              end: "bottom 55%",
              pin: pinTarget,
              pinSpacing: false,
              anticipatePin: 1,
            });
          }
        });
      }, root);

      return () => ctx.revert();
    };

    mm.add("(min-width: 1024px)", () => buildSectionTransitions(true));
    mm.add("(max-width: 1023px)", () => buildSectionTransitions(false));

    return () => mm.revert();
  }, []);

  return ref;
}
