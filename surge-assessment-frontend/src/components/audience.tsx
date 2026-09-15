import type { HomeContent } from "@/lib/home-content";

type AudienceProps = HomeContent["audience"];

export default function Audience({
  introduction,
  eyebrow,
  title,
  description,
  cards,
  media,
}: AudienceProps) {
  const video = media.find((m) => (m.mime ?? "").startsWith("video"));
  const image = media.find((m) => (m.mime ?? "").startsWith("image"));

  return (
    <section id="about" className="scroll-mt-20 bg-black text-white">
      <div className="mx-auto px-6 md:px-11 py-24 md:py-32">
        <p className="max-w-4xl font-serif text-3xl leading-tight md:text-5xl">
          {introduction}
        </p>

        <div id="who-its-for" className="mt-24 scroll-mt-24">
          <h2 className="text-sm uppercase tracking-[0.3em] text-white/50">
            {eyebrow}
          </h2>
          {title ? (
            <h3 className="mt-4 font-serif text-3xl">{title}</h3>
          ) : null}
          {description ? (
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/70">
              {description}
            </p>
          ) : null}

          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
            {cards.map((card) => (
              <article key={card.title}>
                <h3 className="text-xl font-semibold">{card.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-white/60">
                  {card.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        {video ? (
          <div className="mt-16 overflow-hidden rounded-2xl">
            <video
              src={video.url}
              autoPlay
              muted
              loop
              playsInline
              className="h-auto w-full"
            />
          </div>
        ) : image ? (
          <img
            src={image.url}
            alt=""
            className="mt-16 h-auto w-full rounded-2xl"
          />
        ) : null}
      </div>
    </section>
  );
}
