"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * Decorative, parallax background for the home page hero.
 *
 * The SVG is a Lottie-style animation export. It is rendered on an oversized
 * layer that shifts slower than the page as you scroll, creating depth. The
 * layer is larger than its container so the edges never show while moving.
 */
export default function HeroBackground() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    let rafId = 0;

    const update = () => {
      const wrapper = layer.parentElement;
      if (!wrapper) return;

      const rect = wrapper.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const sectionCenter = rect.top + rect.height / 2;
      const delta = sectionCenter - viewportCenter;

      // Shift the layer by a fraction of its distance from the viewport
      // center, so the background drifts more slowly than the content.
      layer.style.transform = `translate3d(-50%, calc(-50% + ${delta * 0.25}px), 0)`;
      rafId = 0;
    };

    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        ref={layerRef}
        className="absolute left-1/2 top-1/2 h-[180%] w-[180%] will-change-transform"
        style={{ transform: "translate3d(-50%, -50%, 0)" }}
      >
        <Image
          src="/animation.svg"
          alt=""
          fill
          priority
          className="object-cover opacity-25"
        />
      </div>
    </div>
  );
}
