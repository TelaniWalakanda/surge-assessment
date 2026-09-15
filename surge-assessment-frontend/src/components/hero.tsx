import HeroPen from "@/components/hero-pen";
import type { HomeContent } from "@/lib/home-content";

type HeroProps = HomeContent["hero"];

/**
 * The reference cover stacks two lines in a large serif face at the
 * bottom-left of the pinned viewport ("Smart pen" / "for real thinking").
 * The CMS stores those two lines as `eyebrow` and `headline`.
 */
export default function Hero({ eyebrow, headline }: HeroProps) {
  return (
    <HeroPen>
      <div className="absolute bottom-6 left-6 z-10 md:bottom-10 md:left-12">
        <h1 className="font-serif text-[clamp(2.75rem,6.5vw,7rem)] leading-[0.95] tracking-tight text-white">
          {eyebrow}
          <br />
          {headline}
        </h1>
      </div>
    </HeroPen>
  );
}
