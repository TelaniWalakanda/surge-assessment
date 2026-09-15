import type { HomeContent } from "@/lib/home-content";

type InsideTheBoxProps = HomeContent["insideTheBox"];

export default function InsideTheBox({
  eyebrow,
  title,
  introTitle,
  introDescription,
  smartPenDescription,
  items,
  mediaFiles,
}: InsideTheBoxProps) {
  return (
    <section id="inside-the-box" className="scroll-mt-20 bg-white text-black">
      <div className="mx-auto px-6 md:px-11 py-24 md:py-32">
        <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-2 md:items-end">
          <div>
            <h3 className="text-2xl font-semibold">{introTitle}</h3>
            <p className="mt-4 max-w-md text-black/60">{introDescription}</p>
          </div>
          {smartPenDescription ? (
            <p className="font-serif text-2xl leading-snug md:text-3xl">
              {smartPenDescription}
            </p>
          ) : null}
        </div>

        <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-2">
          {items.map((item) => (
            <article key={item.title}>
              {item.media ? (
                <img
                  src={item.media}
                  alt={item.title}
                  className="aspect-[4/3] w-full rounded-2xl object-cover"
                />
              ) : null}
              <h3 className="mt-6 text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-black/60">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        {mediaFiles.length > 0 ? (
          <div className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-3">
            {mediaFiles.map((entry, index) => {
              const media = entry.media[0];
              if (!media) return null;
              const isVideo = (media.mime ?? "").startsWith("video");
              return (
                <figure key={index} className="relative">
                  {isVideo ? (
                    <video
                      src={media.url}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="aspect-[4/3] w-full rounded-2xl object-cover"
                    />
                  ) : (
                    <img
                      src={media.url}
                      alt={entry.chipText ?? ""}
                      className="aspect-[4/3] w-full rounded-2xl object-cover"
                    />
                  )}
                  {entry.chipText ? (
                    <figcaption className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-1.5 text-xs font-medium text-black backdrop-blur">
                      {entry.chipText}
                    </figcaption>
                  ) : null}
                </figure>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}
