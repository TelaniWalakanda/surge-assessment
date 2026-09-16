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
  mobileImage,
}: HeaderProps) {
  const [overLight, setOverLight] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  // Header content is dark (black) when over a light background or when the
  // white mobile menu is open.
  const onLight = menuOpen || overLight;
  const orderLogo = productCardLogo ?? "/order-logo.svg";
  const orderLabel = `${ctaText}${productName ? ` ${productName}` : ""}${
    price ? ` • ${price}` : ""
  }`;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-opacity duration-500 ${
          headerHidden ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <div className="mx-auto flex w-full items-center justify-between gap-4 px-6 pt-5 md:px-11 md:pt-10">
          {/* Left: brand + desktop nav */}
          <div className="flex items-center gap-5">
            <a href="#" className="flex items-center gap-2">
              {logo ? (
                <img
                  src={logo}
                  alt="Nōta"
                  className={`h-7 w-auto transition-[filter] ${
                    onLight ? "invert" : ""
                  }`}
                />
              ) : (
                <span
                  className={`font-serif text-2xl transition-colors ${
                    onLight ? "text-black" : "text-white"
                  }`}
                >
                  Nōta
                </span>
              )}
            </a>
            <nav className="hidden items-center gap-8 md:flex">
              {nav.map((link, index) => (
                <a
                  key={`${link.href}-${index}`}
                  href={link.href}
                  className={`text-sm font-medium transition-colors md:text-xl ${
                    overLight
                      ? "text-black/70 hover:text-black"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Center: mobile menu toggle */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
            className="flex items-center justify-center md:hidden"
          >
            {menuOpen ? (
              <span className="text-3xl leading-none text-black">×</span>
            ) : (
              <img
                src="/nav-icon.svg"
                alt=""
                aria-hidden="true"
                className={`h-10 w-10 transition-[filter] ${
                  onLight ? "invert" : ""
                }`}
              />
            )}
          </button>

          {/* Right: product mark (mobile) / order button (desktop) */}
          <div className="flex items-center">
            <img
              src={orderLogo}
              alt=""
              aria-hidden="true"
              className={`h-7 w-7 shrink-0 md:hidden ${
                onLight ? "" : "invert"
              }`}
            />
            <a
              href="#order"
              className="hidden items-center gap-10 bg-white p-[14px] pl-4 shadow-sm transition-opacity hover:opacity-90 md:flex"
            >
              <img
                src={orderLogo}
                alt=""
                aria-hidden="true"
                className="h-[4.03vw] w-[3.83vw] shrink-0"
              />
              <span className="bg-black px-4 py-2 text-sm text-white transition-colors hover:bg-[rgb(255,34,0)] md:text-xl">
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
        </div>
      </header>

      {/* Mobile nav popup — slides down from the top */}
      <div
        className={`fixed inset-0 z-40 flex flex-col bg-white pt-24 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          menuOpen ? "translate-y-0" : "pointer-events-none -translate-y-full"
        }`}
      >
        <nav className="flex flex-col items-center gap-3 px-6">
          {nav.map((link, index) => (
            <a
              key={`${link.href}-${index}`}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-serif text-xl text-black"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="mt-6 flex flex-1 items-center justify-center px-6 w-full h-10 ">
          <div className="relative w-full h-full">
            {mobileImage ? (
              <img
                src={mobileImage}
                alt=""
                className="w-full h-[42vh] object-contain rounded"
              />
            ) : null}
            <a
              href="#order"
              onClick={() => setMenuOpen(false)}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-black/85 px-6 py-3 text-sm font-medium text-white backdrop-blur"
            >
              {orderLabel}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
