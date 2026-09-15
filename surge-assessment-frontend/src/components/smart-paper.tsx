import MediaPlaceholder from "@/components/media-placeholder";
import type { HomeContent } from "@/lib/home-content";

type SmartPaperProps = HomeContent["smartPaper"];

export default function SmartPaper({
  headingTop,
  headingBottom,
  features,
}: SmartPaperProps) {
  return (
    <section id="smart-paper" className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {headingTop}{" "}
          <span className="text-white/50">{headingBottom}</span>
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {features.map((feature, index) => (
            <article
              key={feature.title}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-8"
            >
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-white/60">
                {feature.description}
              </p>
              {index === 1 && (
                <MediaPlaceholder
                  label="Paper pattern visual"
                  className="mt-8 aspect-video"
                />
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
