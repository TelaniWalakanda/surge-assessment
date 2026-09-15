import type { HomeContent } from "@/lib/home-content";

type AudienceProps = HomeContent["audience"];

export default function Audience({ heading, intro, cards }: AudienceProps) {
  return (
    <section id="who-its-for" className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {heading}
        </h2>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/60">
          {intro}
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.title}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-8"
            >
              <h3 className="text-lg font-semibold">{card.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-white/60">
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
