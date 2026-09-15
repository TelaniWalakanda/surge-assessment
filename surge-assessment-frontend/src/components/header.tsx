"use client";

import { useEffect, useState } from "react";
import type { HomeContent } from "@/lib/home-content";

type HeaderProps = HomeContent["header"];

/**
 * Fixed, adaptive header: white text/logo by default, switching to black
 * while it sits over a white-background section.
 */
export default function Header({
  logo,
  nav,
  productName,
  price,
  ctaText,
  productCardLogo,
}: HeaderProps) {
  const [overLight, setOverLight] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);

  useEffect(() => {
    const update = () => {
      const specifications = document.getElementById("specifications");
      if (specifications?.hasAttribute("data-header-hidden")) {
        setOverLight(false);
        setHeaderHidden(true);
        return;
      }

      setHeaderHidden(false);

      let overWhite = false;
      for (const section of Array.from(
        document.querySelectorAll("main section, footer"),
      )) {
        const rect = section.getBoundingClientRect();
        // Section currently behind the vertical center of the header.
        if (rect.top <= 40 && rect.bottom > 40) {
          overWhite =
            getComputedStyle(section).backgroundColor === "rgb(255, 255, 255)";
          break;
        }
      }
      setOverLight(overWhite);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    const specifications = document.getElementById("specifications");
    const observer = specifications
      ? new MutationObserver(update)
      : null;
    observer?.observe(specifications as HTMLElement, {
      attributes: true,
      attributeFilter: ["data-header-hidden"],
    });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      observer?.disconnect();
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-opacity duration-500 ${
        headerHidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="mx-auto h-fit flex w-full items-start justify-between px-6 md:px-11 pt-5 md:pt-10 border-b border-white/20 border-0">
        <div className="flex items-center gap-5">
          <a href="#" className="flex items-center gap-2">
            {logo ? (
              <img
                src={logo}
                alt="Nōta"
                className={`h-7 w-auto transition-[filter] ${
                overLight ? "invert" : ""
              }`}
            />
          ) : (
            <span
              className={`font-serif text-2xl transition-colors ${
                overLight ? "text-black" : "text-white"
              }`}
            >
              Nōta
            </span>
          )}
        </a><nav className="hidden items-center gap-8 md:flex">
          {nav.map((link, index) => (
            <a
              key={`${link.href}-${index}`}
              href={link.href}
              className={`text-sm font-medium md:text-xl transition-colors ${
                overLight
                  ? "text-black/70 hover:text-black"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav></div>
        
        <a
          href="#order"
          className="flex items-center gap-10 bg-white pl-4 shadow-sm transition-opacity hover:opacity-90 p-[14px]"
        >
          <img
            src={productCardLogo ?? "/order-logo.svg"}
            alt=""
            aria-hidden="true"
            className="h-[4.03vw] w-[3.83vw] shrink-0"
          />
          <span className="bg-black px-4 py-2 text-sm md:text-xl text-white hover:bg-[rgb(255,34,0)] transition-colors">
            {ctaText}
            {productName ? (
              <span className="text-[rgba(255,255,255,0.4)]">
                {` ${productName}`}
              </span>
            ) : null}
            {price ? ` • ${price}` : ""}
          </span>
        </a>
      </div>
    </header>
  );
}
