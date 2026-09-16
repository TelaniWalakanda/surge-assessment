"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const PANEL_COUNT = 6;
const RISE_DURATION = 0.5;
const RISE_STAGGER = 0.1;
const BACKDROP_OPACITY = 0.75;
const BACKDROP_START = 0.25;

export default function SteppedWipeSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const panelsRef = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    const backdrop = backdropRef.current;
    const panels = panelsRef.current;
    if (!section || !backdrop || !panels) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      const build = (scrub: number) => {
        const panelEls = gsap.utils.toArray<HTMLElement>(
          "[data-wipe-panel]",
          panels
        );

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub,
          },
        });

        panelEls.forEach((el, i) => {
          tl.fromTo(
            el,
            { yPercent: 100 },
            { yPercent: 0, duration: RISE_DURATION, ease: "power1.inOut" },
            i * RISE_STAGGER
          );
        });

        tl.fromTo(
          backdrop,
          { opacity: 0 },
          {
            opacity: BACKDROP_OPACITY,
            duration: 1 - BACKDROP_START,
            ease: "none",
          },
          BACKDROP_START
        );
      };

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => build(1)
      );

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(section, { display: "none" });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="stepped-wipe"
      aria-hidden="true"
      className="wipe"
    >
      <div className="wipe__camera">
        <div className="wipe__backdrop" ref={backdropRef} data-wipe-backdrop />

        <div className="wipe__panels" ref={panelsRef}>
          {Array.from({ length: PANEL_COUNT }, (_, i) => (
            <div key={i} data-wipe-panel className="wipe__panel" />
          ))}
        </div>
      </div>
    </section>
  );
}
