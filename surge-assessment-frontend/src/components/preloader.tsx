"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Full-screen preloader shown on page load.
 *
 * A counter runs 0% → 80% while the page assets load, then 80% → 100% once
 * the window `load` event fires, before the overlay fades out to reveal the
 * hero. The background matches the hero's radial gradient so the transition
 * feels seamless.
 */
export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);
  const [unmounted, setUnmounted] = useState(false);

  const progressRef = useRef(0);

  useEffect(() => {
    let rafId = 0;
    let fadeTimer = 0;
    let unmountTimer = 0;
    const targetRef = { current: 80 };

    const handleLoad = () => {
      targetRef.current = 100;
    };

    if (document.readyState === "complete") {
      targetRef.current = 100;
    } else {
      window.addEventListener("load", handleLoad);
    }

    const tick = () => {
      const current = progressRef.current;
      const target = targetRef.current;

      if (current < target) {
        const increment = target === 100 ? 1.5 : 0.7;
        const next = Math.min(target, current + increment);
        progressRef.current = next;
        setProgress(Math.round(next));
        rafId = requestAnimationFrame(tick);
        return;
      }

      if (current < 100) {
        // Waiting for the load event.
        rafId = requestAnimationFrame(tick);
        return;
      }

      // Complete: fade out, then unmount.
      fadeTimer = window.setTimeout(() => setFading(true), 250);
      unmountTimer = window.setTimeout(() => setUnmounted(true), 850);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("load", handleLoad);
      if (rafId) cancelAnimationFrame(rafId);
      if (fadeTimer) window.clearTimeout(fadeTimer);
      if (unmountTimer) window.clearTimeout(unmountTimer);
    };
  }, []);

  if (unmounted) return null;

  return (
    <div
      aria-hidden={fading}
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-500 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
      style={{
        backgroundSize: "auto",
        backgroundImage:
          "radial-gradient(farthest-corner at center top, rgba(150, 156, 166, 1) 0%, rgba(58, 60, 64, 1) 80%)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left 0px top 0px",
        backgroundAttachment: "scroll",
      }}
    >
      <div className="flex items-baseline gap-1 font-serif text-white">
        <span className="text-7xl md:text-9xl">{progress}</span>
        <span className="text-3xl md:text-5xl">%</span>
      </div>
    </div>
  );
}
