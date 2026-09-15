import HeroPen from "@/components/hero-pen";
import type { HomeContent } from "@/lib/home-content";

type HeroProps = HomeContent["hero"];

/**
 * The reference cover stacks two lines in a large serif face ("Smart pen" /
 * "for real thinking"). Desktop places them bottom-left of the pinned
 * viewport; mobile centers them below the static pen image.
 * The CMS stores those two lines as `eyebrow` and `headline`.
 */
export default function Hero({ eyebrow, headline, mobileBgImage }: HeroProps) {
  return (
    <HeroPen
      eyebrow={eyebrow}
      headline={headline}
      mobileBgImage={mobileBgImage}
    />
  );
}
