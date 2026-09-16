"use client";

import { useEffect, useRef } from "react";
import type { MediaItem } from "@/lib/home-content";

type AudienceMediaProps = {
  video?: MediaItem;
  image?: MediaItem;
};

const MIN_SCALE = 0.7;
const EXIT_SCALE = 0.65;
const SETTLE_VH = 0.3;
const EXIT_SPAN_VH = 1;

export default function AudienceMedia({ video, image }: AudienceMediaProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const box = boxRef.current;
    if (!wrapper || !box) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let rafId = 0;

    const update = () => {
      rafId = 0;

      if (reduceMotion.matches) {
        box.style.transform = "";
        box.style.transformOrigin = "";
        return;
      }

      const rect = wrapper.getBoundingClientRect();
      const vh = window.innerHeight;
      const clamp = (value: number) => Math.max(0, Math.min(1, value));

      const enter = clamp((vh - rect.top) / (vh - vh * SETTLE_VH));
      const exit = clamp((vh * SETTLE_VH - rect.top) / (vh * EXIT_SPAN_VH));

      const scale =
        (MIN_SCALE + (1 - MIN_SCALE) * enter) *
        (1 - (1 - EXIT_SCALE) * exit);

      box.style.transformOrigin = exit > 0 ? "50% 50%" : "100% 0%";
      box.style.transform = `scale(${scale})`;
    };

    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    reduceMotion.addEventListener("change", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      reduceMotion.removeEventListener("change", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  if (!video && !image) return null;

  return (
    <div ref={wrapperRef} className="mt-16 flex justify-end">
      <div
        ref={boxRef}
        className="w-full will-change-transform md:w-full"
      >
        {video ? (
          <video
            src={video.url}
            autoPlay
            muted
            playsInline
            className="h-auto max-h-[70vh] max-w-[90vw] mx-auto object-cover"
          />
        ) : image ? (
          <img
            src={image.url}
            alt=""
            className="h-auto max-h-[75vh]  object-cover"
          />
        ) : null}
      </div>
    </div>
  );
}
