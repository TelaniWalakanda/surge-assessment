"use client";

import { useEffect, useRef } from "react";
import type { HomeContent } from "@/lib/home-content";

type SpecificationsProps = HomeContent["specifications"];

export default function Specifications({
  label,
  heading,
  groups,
  desktopImage,
  mobileImage,
}: SpecificationsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const groupRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRef = useRef<HTMLImageElement>(null);
  const curtainRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let rafId = 0;

    const update = () => {
      rafId = 0;
      const section = sectionRef.current;
      if (!section) return;

      if (window.innerWidth < 1024) {
        section.removeAttribute("data-header-hidden");
        groupRefs.current.forEach((group) => {
          if (!group) return;
          group.style.opacity = "";
          group.style.transform = "";
        });
        if (imageRef.current) {
          imageRef.current.style.opacity = "";
          imageRef.current.style.transform = "";
        }
        curtainRefs.current.forEach((brick) => {
          if (!brick) return;
          brick.style.transform = "";
          brick.style.opacity = "";
        });
        return;
      }

      const rect = section.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      const groupCount = groupRefs.current.length;

      // The header disappears while the white specification scene takes over.
      section.toggleAttribute(
        "data-header-hidden",
        progress > 0.04 && progress < 0.96,
      );

      // First phase: white staircase curtains rise over the previous hero.
      const curtainProgress = Math.min(1, Math.max(0, progress / 0.2));
      const curtainOpacity =
        progress < 0.08
          ? progress / 0.08
          : progress < 0.24
            ? 1
            : Math.max(0, 1 - (progress - 0.24) / 0.12);
      const curtainLayer = section.querySelector<HTMLElement>(
        "[data-spec-curtains]",
      );
      if (curtainLayer) curtainLayer.style.opacity = String(curtainOpacity);
      curtainRefs.current.forEach((brick, index) => {
        if (!brick) return;
        const local = Math.min(
          1,
          Math.max(0, (curtainProgress - index * 0.12) / 0.55),
        );
        const eased = 1 - Math.pow(1 - local, 3);
        brick.style.transform = `translate3d(0, ${(1 - eased) * 100}%, 0)`;
      });

      // Second phase: reveal the pen rising from the bottom into position.
      if (imageRef.current) {
        const local = Math.min(1, Math.max(0, (progress - 0.16) / 0.28));
        const eased = 1 - Math.pow(1 - local, 3);
        imageRef.current.style.opacity = String(eased);
        imageRef.current.style.transform = `translate(-50%, ${(1 - eased) * 100}%)`;
      }

      groupRefs.current.forEach((group, index) => {
        if (!group) return;
        const start = 0.48 + (index / Math.max(groupCount, 1)) * 0.3;
        const local = Math.min(1, Math.max(0, (progress - start) / 0.2));
        const eased = 1 - Math.pow(1 - local, 3);
        group.style.opacity = String(eased);
        group.style.transform = `translate3d(0, ${(1 - eased) * 120}px, 0)`;
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
  }, [groups.length]);

  return (
    <section
      id="specifications"
      ref={sectionRef}
      className="scroll-mt-20 bg-white text-black lg:h-[320vh]"
    >
      <div className="relative lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] lg:overflow-hidden">
        {desktopImage ? (
          <img
            ref={imageRef}
            src={desktopImage}
            alt=""
            aria-hidden="true"
            style={{ opacity: 0, transform: "translate(-90%, 100%)" }}
            className="pointer-events-none absolute left-[50%] top-[30%] z-0 hidden h-[100%] w-auto object-contain lg:block"
          />
        ) : null}
        <div className="mx-auto flex h-full flex-col px-6 md:px-11 py-20 lg:py-16">
          <div className="relative z-10 text-center">
            <p className="font-serif text-5xl leading-none text-black/50 lg:text-7xl">
              {label}
            </p>
            <h2 className="font-serif text-6xl leading-none lg:text-8xl">
              {heading}
            </h2>
          </div>

          <div className="relative mt-12 flex-1 overflow-hidden lg:mt-8">
            {mobileImage ? (
              <img
                src={mobileImage}
                alt=""
                aria-hidden="true"
                className="pointer-events-none mx-auto mb-8 block h-auto max-h-[34vh] w-auto object-contain lg:hidden"
              />
            ) : null}

            <div
              aria-hidden="true"
              data-spec-curtains
              className="pointer-events-none absolute inset-0 z-20 hidden overflow-hidden lg:block"
            >
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <div
                  key={index}
                  ref={(element) => {
                    curtainRefs.current[index] = element;
                  }}
                  className="absolute bottom-0 bg-white will-change-transform"
                  style={{
                    left: `${index * 16.6667}%`,
                    width: "16.6667%",
                    height: `${58 + index * 10}%`,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 grid grid-cols-1 gap-8 lg:absolute lg:inset-x-0 lg:bottom-[10%] lg:grid-cols-3 lg:gap-4">
              {groups.map((group, index) => (
                <div
                  key={group.title || index}
                  ref={(element) => {
                    groupRefs.current[index] = element;
                  }}
                  className="rounded-2xl bg-white/90 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-sm will-change-transform lg:min-h-[250px]"
                >
                  <h3 className="text-xl font-semibold tracking-tight lg:text-2xl">
                    {group.title}
                  </h3>
                  <ul className="mt-5 divide-y divide-black/10 border-y border-black/10">
                    {group.items.map((item, itemIndex) => (
                      <li
                        key={`${item}-${itemIndex}`}
                        className="flex items-center justify-between gap-4 py-3 text-sm lg:text-base"
                      >
                        <span>{item}</span>
                        <span className="h-2 w-2 shrink-0 rounded-full bg-black/20" />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
