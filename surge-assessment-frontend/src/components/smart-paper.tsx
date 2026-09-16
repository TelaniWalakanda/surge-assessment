"use client";

import { useEffect, useRef, useState } from "react";
import type { HomeContent } from "@/lib/home-content";

type SmartPaperProps = HomeContent["smartPaper"];
type Story = SmartPaperProps["stories"][number];

function StorySlide({
  story,
  active,
}: {
  story: Story;
  active: boolean;
}) {
  return (
    <article
      className={`
        relative h-full w-screen shrink-0 overflow-hidden
        bg-[#101011] text-white
      `}
    >
      {/* Ambient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.055),transparent_42%)]" />

      {/* Image */}
      {story.image ? (
        <div
          className={`
            absolute
            left-1/2 top-1/2
            h-[58vh] w-[78vw]
            max-w-[1100px]
            -translate-x-1/2
            -translate-y-1/2
            overflow-hidden
            transition-all
            duration-[1200ms]
            ease-[cubic-bezier(0.22,1,0.36,1)]
            md:h-[72vh]
            md:w-[58vw]
            lg:w-[52vw]
            ${
              active
                ? "scale-100 opacity-100"
                : "scale-[0.94] opacity-70"
            }
          `}
        >
          <img
            src={story.image}
            alt={story.title}
            className={`
              h-full
              w-full
              object-cover
              transition-transform
              duration-[1400ms]
              ease-[cubic-bezier(0.22,1,0.36,1)]
              ${active ? "scale-100" : "scale-[1.04]"}
            `}
          />
        </div>
      ) : null}

      {/* Eyebrow — top left */}
      {story.eyebrow ? (
        <p
          className={`
            absolute
            left-6
            top-8
            z-10
            max-w-[80vw]
            font-serif
            text-2xl
            leading-[1.08]
            text-white/90
            transition-all
            duration-1000
            ease-[cubic-bezier(0.22,1,0.36,1)]
            md:left-12
            md:top-16
            md:max-w-md
            md:text-5xl
            lg:left-20
            lg:text-6xl
            ${
              active
                ? "translate-y-0 opacity-100"
                : "-translate-y-6 opacity-0"
            }
          `}
        >
          {story.eyebrow}
        </p>
      ) : null}

      {/* Title + description — bottom right */}
      <div
        className="
          absolute
          bottom-20
          right-6
          z-10
          flex
          max-w-[85vw]
          flex-col
          items-end
          gap-3
          md:bottom-24
          md:right-12
          md:max-w-lg
          lg:right-20
        "
      >
        <div
          className={`
            w-full
            rounded-2xl
            bg-[#1c1c1e]/90
            p-5
            backdrop-blur
            transition-all
            duration-1000
            ease-[cubic-bezier(0.22,1,0.36,1)]
            md:p-6
            ${
              active
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }
          `}
        >
          <h3
            className="
              font-serif
              text-2xl
              leading-tight
              text-white
              md:text-3xl
            "
          >
            {story.title}
          </h3>
        </div>

        {story.description ? (
          <div
            className={`
              rounded-2xl
              bg-[#1c1c1e]/90
              p-5
              backdrop-blur
              transition-all
              delay-150
              duration-1000
              ease-[cubic-bezier(0.22,1,0.36,1)]
              md:p-6
              ${
                active
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }
            `}
          >
            <p
              className="
                text-sm
                leading-relaxed
                text-white/60
                md:text-base
              "
            >
              {story.description}
            </p>
          </div>
        ) : null}
      </div>
    </article>
  );
}

/**
 * NŌTA-inspired scroll story carousel.
 *
 * Desktop:
 * - Sticky viewport
 * - One story per scroll step
 * - Editorial product presentation
 * - Large centered imagery
 * - Minimal counter + progress
 *
 * Mobile:
 * - Horizontal touch carousel
 * - Snap scrolling
 * - Manual navigation
 */
export default function SmartPaper({
  stories,
}: SmartPaperProps) {
  const count = stories.length;

  const [active, setActive] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  const wrapperRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const activeRef = useRef(0);
  const isDesktopRef = useRef(false);

  /*
   * Desktop scroll controller
   */
  useEffect(() => {
    if (!count) return;

    const wrapper = wrapperRef.current;
    const track = trackRef.current;

    if (!wrapper || !track) return;

    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const updateDesktop = () => {
      const desktop = mediaQuery.matches;

      isDesktopRef.current = desktop;
      setIsDesktop(desktop);

      if (!desktop) {
        track.style.transform = "";
        return;
      }

      const rect = wrapper.getBoundingClientRect();

      const scrollDistance =
        wrapper.offsetHeight - window.innerHeight;

      if (scrollDistance <= 0) return;

      const rawProgress =
        -rect.top / scrollDistance;

      const progress = Math.max(
        0,
        Math.min(1, rawProgress)
      );

      /*
       * Each story occupies one scroll step.
       */
      const index = Math.min(
        count - 1,
        Math.round(progress * (count - 1))
      );

      if (index !== activeRef.current) {
        activeRef.current = index;
        setActive(index);
      }

      track.style.transform =
        `translate3d(${-index * 100}vw, 0, 0)`;
    };

    const handleScroll = () => {
      updateDesktop();
    };

    const handleResize = () => {
      updateDesktop();
    };

    updateDesktop();

    mediaQuery.addEventListener(
      "change",
      updateDesktop
    );

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      handleResize,
      { passive: true }
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        updateDesktop
      );

      window.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, [count]);

  /*
   * Manual navigation
   */
  const goTo = (index: number) => {
    const next = Math.max(
      0,
      Math.min(count - 1, index)
    );

    activeRef.current = next;
    setActive(next);

    if (isDesktopRef.current) {
      const wrapper = wrapperRef.current;

      if (wrapper) {
        const scrollDistance =
          wrapper.offsetHeight - window.innerHeight;

        const progress =
          count > 1
            ? next / (count - 1)
            : 0;

        window.scrollTo({
          top:
            wrapper.offsetTop +
            scrollDistance * progress,
          behavior: "smooth",
        });
      }
    } else {
      const slide =
        trackRef.current?.children[next] as HTMLElement;

      slide?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  if (!count) return null;

  return (
    <section
      id="smart-paper"
      ref={wrapperRef}
      className="
        relative
        scroll-mt-20
        bg-[#101011]
        text-white
      "
      style={
        isDesktop
          ? {
              height: `${count * 100}vh`,
            }
          : undefined
      }
    >
      {/* Sticky viewport */}
      <div
        className={
          isDesktop
            ? `
              sticky
              top-0
              h-screen
              w-full
              overflow-hidden
            `
            : `
              relative
              w-full
              overflow-hidden
            `
        }
      >
        {/* Slides */}
        <div
          ref={trackRef}
          className={`
            flex
            ${
              isDesktop
                ? `
                  h-screen
                  will-change-transform
                  transition-transform
                  duration-[1100ms]
                  ease-[cubic-bezier(0.22,1,0.36,1)]
                `
                : `
                  overflow-x-auto
                  snap-x
                  snap-mandatory
                  scrollbar-none
                `
            }
          `}
        >
          {stories.map((story, index) => (
            <div
              key={`${story.title}-${index}`}
              className="
                h-[85vh]
                w-screen
                shrink-0
                snap-center
                md:h-full
              "
            >
              <StorySlide
                story={story}
                active={index === active}
              />
            </div>
          ))}
        </div>

        {/* Bottom navigation */}
        {count > 1 && (
          <div
            className="
              absolute
              bottom-7
              left-0
              right-0
              z-30
              flex
              items-center
              justify-between
              px-6
              md:px-12
              lg:px-20
            "
          >
            {/* Progress */}
            <div
              className="
                absolute
                left-1/2
                flex
                -translate-x-1/2
                items-center
                gap-1.5
              "
            >
              {stories.map((story, index) => (
                <button
                  key={`${story.title}-indicator`}
                  type="button"
                  aria-label={`Go to story ${index + 1}`}
                  onClick={() => goTo(index)}
                  className="
                    group
                    flex
                    h-5
                    items-center
                  "
                >
                  <span
                    className={`
                      block
                      h-px
                      transition-all
                      duration-500
                      ${
                        index === active
                          ? "w-10 bg-white"
                          : "w-5 bg-white/20 group-hover:bg-white/50"
                      }
                    `}
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}