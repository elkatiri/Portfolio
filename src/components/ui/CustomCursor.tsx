"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if ("ontouchstart" in window) {
      setIsTouch(true);
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const move = (e: MouseEvent) => {
      if (!visible) setVisible(true);
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.08, ease: "power2.out" });
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.35, ease: "power2.out" });
    };

    const enterHover = () => setHovering(true);
    const leaveHover = () => setHovering(false);
    const hide = () => setVisible(false);
    const show = () => setVisible(true);

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);

    const targets = document.querySelectorAll('a, button, [role="button"], input, textarea, .cursor-hover');
    targets.forEach((el) => {
      el.addEventListener("mouseenter", enterHover);
      el.addEventListener("mouseleave", leaveHover);
    });

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", enterHover);
        el.removeEventListener("mouseleave", leaveHover);
      });
    };
  }, [visible]);

  if (isTouch) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.2s" }}
      >
        <div
          className="rounded-full bg-white"
          style={{
            width: hovering ? 48 : 6,
            height: hovering ? 48 : 6,
            transform: "translate(-50%, -50%)",
            transition: "width 0.25s cubic-bezier(.4,0,.2,1), height 0.25s cubic-bezier(.4,0,.2,1)",
          }}
        />
      </div>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none mix-blend-difference"
        style={{ opacity: visible && !hovering ? 0.4 : 0, transition: "opacity 0.25s" }}
      >
        <div
          className="rounded-full border border-white"
          style={{ width: 28, height: 28, transform: "translate(-50%, -50%)" }}
        />
      </div>
    </>
  );
}
