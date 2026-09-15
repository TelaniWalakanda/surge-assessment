"use client";

import { useEffect, useRef } from "react";
import type { HomeContent } from "@/lib/home-content";
import InsideTheBoxMedia from "@/components/inside-the-box-media";

type InsideTheBoxProps = HomeContent["insideTheBox"];

function RevealText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const spans = Array.from(el.querySelectorAll("span"));
    if (!spans.length) return;

    let rafId = 0;

    const update = () => {
      rafId = 0;
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const center = rect.top + rect.height / 2;
      const progress = Math.max(
        0,
        Math.min(1, (viewportHeight - center) / (viewportHeight / 2)),
      );

      spans.forEach((span, index) => {
        // Typewriter reveal: each letter flips to black as its threshold passes.
        const threshold = (index + 1) / spans.length;
        const value = progress >= threshold ? 0 : 221;
        span.style.color = `rgb(${value}, ${value}, ${value})`;
      });
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
  }, [text]);

  return (
    <p
      ref={ref}
      className="max-w-7xl px-6 text-center font-serif text-2xl leading-snug md:text-5xl"
    >
      {Array.from(text).map((letter, index) => (
        <span key={index} style={{ color: "rgb(221, 221, 221)" }}>
          {letter}
        </span>
      ))}
    </p>
  );
}

export default function InsideTheBox({
  eyebrow,
  title,
  introTitle,
  introDescription,
  introMedia,
  smartPenDescription,
  items,
  mediaFiles,
}: InsideTheBoxProps) {
  return (
    <section id="inside-the-box" className="scroll-mt-20 bg-white text-black">
      <div className="mx-auto py-24 md:py-32">
        <div
          className="relative mt-20 flex h-[100vh] w-full justify-end overflow-hidden rounded-3xl"
          style={
            introMedia
              ? {
                  backgroundImage: `url(${introMedia})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : undefined
          }
        >
          <div className="max-w-lg p-6 md:p-6">
            <h3 className="font-serif text-3xl font-semibold leading-tight text-black md:text-5xl">
              {introTitle}
            </h3>
            <p className="mt-4 text-black/60">{introDescription}</p>
          </div>
        </div>

        {smartPenDescription ? (
          <div className="flex h-screen w-full items-center justify-center bg-white">
            <RevealText text={smartPenDescription} />
          </div>
        ) : null}

        <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-2 px-6 h-[100vh]">
          {items.map((item) => (
            <article key={item.title} className="relative flex h-full w-full flex-col overflow-hidden bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <div className="absolute right-0"><h3 className="mt-6 font-sans text-2xl font-semibold text-left">{item.title}</h3>
              <p className="mt-3 max-w-md font-sans text-lg leading-relaxed text-black/60 float-right">
                {item.description}
              </p></div>
              
              {item.media ? (
                <img
                  src={item.media}
                  alt={item.title}
                  className="w-full object-cover h-[80%]"
                />
              ) : null}
            </article>
          ))}
        </div>

        <InsideTheBoxMedia mediaFiles={mediaFiles} />
      </div>
    </section>
  );
}
