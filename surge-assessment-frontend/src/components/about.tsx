import MediaPlaceholder from "@/components/media-placeholder";
import type { HomeContent } from "@/lib/home-content";

type AboutProps = HomeContent["about"];

export default function About({ heading, paragraphs }: AboutProps) {
  return (
    <section id="about" className="border-t border-white/10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-24 lg:grid-cols-2">
        <MediaPlaceholder label="About imagery" className="aspect-[4/5]" />
        <div>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {heading}
          </h2>
          <div className="mt-8 space-y-6">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={
                  index === 0
                    ? "text-xl leading-relaxed text-white/85"
                    : "text-base leading-relaxed text-white/60"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
