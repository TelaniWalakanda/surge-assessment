"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const BAND_TIMINGS: ReadonlyArray<{ start: number; end: number }> = [
  { start: 0.12, end: 0.92 },
  { start: 0.08, end: 0.85 },
  { start: 0.04, end: 0.7 },
  { start: 0.0, end: 0.55 },
];

export default function BarsWipeSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const barsRef = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    const bars = barsRef.current;
    if (!section || !bars) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      const build = (scrub: number) => {
        const barEls = gsap.utils.toArray<HTMLElement>("[data-bars-bar]", bars);

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub,
          },
        });

        barEls.forEach((el, i) => {
          const timing = BAND_TIMINGS[i % BAND_TIMINGS.length];
          tl.fromTo(
            el,
            { width: "0%" },
            {
              width: "100%",
              duration: timing.end - timing.start,
              ease: "power1.out",
            },
            timing.start
          );
        });

        const used = tl.duration();
        if (used < 1) tl.to({}, { duration: 1 - used });
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
    <section ref={sectionRef} id="bars-wipe" aria-hidden="true" className="bars">
      <div className="bars__camera">
        <div className="bars__stack" ref={barsRef}>
          {BAND_TIMINGS.map((_, i) => (
            <div key={i} data-bars-bar className="bars__bar" />
          ))}
        </div>
      </div>
    </section>
  );
}
