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
