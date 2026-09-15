"use client";

import { useEffect, useRef, useState } from "react";
import type { ColorOption } from "@/lib/home-content";

type ColorsProps = {
  options: ColorOption[];
};

function Slide({ option }: { option: ColorOption }) {
  return (
    <div className="relative h-full w-screen shrink-0 overflow-hidden">
      {option.image ? (
        <img
          src={option.image}
          alt={`${option.name} ${option.tagline}`.trim()}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{ backgroundColor: option.color ?? "#1c1c1e" }}
        />
      )}

      <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-between px-6 md:px-20">
        <span className="font-serif text-2xl text-white md:text-6xl">
          {option.name}
        </span>
        <span className="max-w-[45%] text-right font-serif text-2xl text-white/80 md:text-6xl">
          {option.tagline}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-white/20" />
    </div>
  );
}

export default function Colors({ options }: ColorsProps) {
  const [isDesktop, setIsDesktop] = useState(false);
  const isDesktopRef = useRef(false);
  const wrapperRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const countRef = useRef(options.length);

  useEffect(() => {
    countRef.current = options.length;
  }, [options.length]);

  useEffect(() => {
    const update = () => {
      const wrapper = wrapperRef.current;
      const track = trackRef.current;
      if (!wrapper || !track) return;

      if (!isDesktopRef.current) {
        track.style.transform = "";
        return;
      }

      const rect = wrapper.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const progress =
        total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;

      const maxShift = (countRef.current - 1) * 100;
      track.style.transform = `translateX(${(-progress * maxShift).toFixed(3)}vw)`;
    };

    const onScroll = () => update();

    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => {
      isDesktopRef.current = mq.matches;
      setIsDesktop(mq.matches);
      update();
    };

    apply();
    mq.addEventListener("change", apply);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      mq.removeEventListener("change", apply);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      id="colors"
      ref={wrapperRef}
      className={`bg-black ${isDesktop ? "relative h-[400vh]" : ""}`}
    >
      <div
        className={
          isDesktop
            ? "sticky top-0 h-screen w-full overflow-hidden"
            : "flex snap-x snap-mandatory overflow-x-auto"
        }
      >
        <div
          ref={trackRef}
          className={`flex will-change-transform ${isDesktop ? "h-full" : ""}`}
        >
          {options.map((option) => (
            <div
              key={option.name}
              className={`w-screen shrink-0 ${
                isDesktop ? "h-full" : "h-[85vh] snap-center"
              }`}
            >
              <Slide option={option} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
