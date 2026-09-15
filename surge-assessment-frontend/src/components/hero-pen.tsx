"use client";

import { useEffect, useRef, type ReactNode } from "react";

type LottiePlayerElement = HTMLElement & {
  seek: (value: number | string) => void;
  pause: () => void;
  getLottie: () => { totalFrames: number } | null;
};

type HeroPenProps = {
  /** Content overlaid on top of the pinned hero viewport (e.g. the headline). */
  children?: ReactNode;
};

/**
 * Scroll-driven hero animation.
 *
 * The attached Lottie (`0_refinedcover_03_09.json`) is a 76-frame image
 * sequence of the pen rotating 360°. The hero is pinned with `position:
 * sticky` while the page scrolls, and the animation frame is scrubbed to the
 * scroll progress through the pin range — recreating the "scroll animated"
 * cover without any of the reference site's code.
 */
export default function HeroPen({ children }: HeroPenProps) {
  const wrapperRef = useRef<HTMLElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<LottiePlayerElement | null>(null);
  const totalFramesRef = useRef(76);

  useEffect(() => {
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

      // Gentle "camera push-in" that mirrors the reference cover: the pen is
      // slightly oversized and drifts while the rotation is scrubbed.
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
    <section ref={wrapperRef} className="relative h-[270vh]">
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{
          background:
            "radial-gradient(at 50% 0%, rgb(150, 156, 166) 0%, rgb(58, 60, 64) 80%)",
        }}
      >
        <div
          ref={hostRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 will-change-transform"
          style={{ transform: "scale(1.05)" }}
        />
        {children}
      </div>
    </section>
  );
}
