import MediaPlaceholder from "@/components/media-placeholder";
import type { HomeContent } from "@/lib/home-content";

type InsideTheBoxProps = HomeContent["insideTheBox"];

export default function InsideTheBox({
  heading,
  intro,
  items,
}: InsideTheBoxProps) {
  return (
    <section id="inside-the-box" className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {heading}
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-white/60">{intro}</p>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {items.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-8"
            >
              <MediaPlaceholder
                label={`${item.title} visual`}
                className="mb-6 aspect-square"
              />
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                {item.description}
              </p>
              {item.specs.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {item.specs.map((spec) => (
                    <li
                      key={spec}
                      className="flex gap-3 text-sm text-white/70"
                    >
                      <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-white/40" />
                      {spec}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
