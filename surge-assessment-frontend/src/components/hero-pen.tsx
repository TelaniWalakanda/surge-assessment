"use client";

import { useEffect, useRef } from "react";

type LottiePlayerElement = HTMLElement & {
  seek: (value: number | string) => void;
  pause: () => void;
  getLottie: () => { totalFrames: number } | null;
};

type HeroPenProps = {
  /** First headline line (from CMS `hero.eyebrow`). */
  eyebrow?: string;
  /** Second headline line (from CMS `hero.headline`). */
  headline?: string;
  /** Static vertical pen shot used as the hero image on mobile. */
  mobileBgImage?: string | null;
};

/**
 * Scroll-driven hero animation (desktop only).
 *
 * On desktop the hero is pinned with `position: sticky` and the Lottie pen
 * rotation is scrubbed with scroll, with the headline bottom-left. On mobile
 * the heavy animation is skipped entirely: the static `hero_mobile_bg_image`
 * is centered (zoomed out) with the headline centered below it.
 */
export default function HeroPen({
  eyebrow,
  headline,
  mobileBgImage,
}: HeroPenProps) {
  const wrapperRef = useRef<HTMLElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<LottiePlayerElement | null>(null);
  const totalFramesRef = useRef(76);

  useEffect(() => {
    // Desktop only — never load the ~1.8MB animation on mobile.
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    let disposed = false;
    let ready = false;
    let rafId = 0;

    const update = () => {
      rafId = 0;
      const wrapper = wrapperRef.current;
      const host = hostRef.current;
      const player = playerRef.current;
      if (!wrapper) return;

      const rect = wrapper.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;

      if (player) {
        const frame = Math.round(progress * (totalFramesRef.current - 1));
        player.seek(frame);
      }

      // Gentle "camera push-in" that mirrors the reference cover.
      if (host) {
        const scale = 1.05 + progress * 0.1;
        const driftY = progress * 6;
        host.style.transform = `scale(${scale}) translateY(${driftY}%)`;
      }
    };

    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    import("@lottiefiles/lottie-player").then(() => {
      if (disposed || !hostRef.current) return;

      const player = document.createElement(
        "lottie-player",
      ) as LottiePlayerElement;
      player.setAttribute("src", "/animations/hero_animation.json");
      player.setAttribute("background", "transparent");
      player.setAttribute("preserveAspectRatio", "xMidYMid slice");
      player.setAttribute("aria-hidden", "true");
      player.style.width = "100%";
      player.style.height = "100%";

      hostRef.current.appendChild(player);
      playerRef.current = player;

      const handleReady = () => {
        if (disposed || ready || !player) return;
        ready = true;
        const lottie = player.getLottie();
        if (lottie && lottie.totalFrames > 0) {
          totalFramesRef.current = lottie.totalFrames;
        }
        player.pause();
        player.seek(0);
        update();
      };

      player.addEventListener("load", handleReady);
      player.addEventListener("ready", handleReady);
    });

    return () => {
      disposed = true;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
      if (playerRef.current) {
        playerRef.current.remove();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <section ref={wrapperRef} className="relative h-screen md:h-[270vh]">
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{
          background:
            "radial-gradient(at 50% 0%, rgb(150, 156, 166) 0%, rgb(58, 60, 64) 80%)",
        }}
      >
        {/* Mobile: zoomed-out pen stuck to the top, headline centered below. */}
        <div className="flex h-full flex-col pt-20 md:hidden">
          <div className="flex justify-center overflow-hidden">
            {mobileBgImage ? (
              <img
                src={mobileBgImage}
                alt=""
                aria-hidden="true"
                className="h-[62vh] w-auto object-contain"
              />
            ) : null}
          </div>
          <div className="mt-auto px-6 pb-14 text-center">
            <h1 className="font-serif text-[12.5vw] text-4xl leading-[0.95] tracking-tight text-white">
              {eyebrow}
              <br />
              {headline}
            </h1>
          </div>
        </div>

        {/* Desktop: scroll-scrubbed Lottie with the headline bottom-left. */}
        <div
          ref={hostRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden will-change-transform md:block"
          style={{ transform: "scale(1.05)" }}
        />
        <div className="absolute bottom-10 left-12 z-10 hidden md:block">
          <h1 className="font-serif text-[clamp(2.75rem,6.5vw,7rem)] leading-[0.95] tracking-tight text-white">
            {eyebrow}
            <br />
            {headline}
          </h1>
        </div>
      </div>
    </section>
  );
}
