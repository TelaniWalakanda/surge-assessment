import HeroPen from "@/components/hero-pen";
import type { HomeContent } from "@/lib/home-content";

type HeroProps = HomeContent["hero"];

export default function Hero({ eyebrow, headline, mobileBgImage }: HeroProps) {
  return (
    <HeroPen
      eyebrow={eyebrow}
      headline={headline}
      mobileBgImage={mobileBgImage}
    />
  );
}
