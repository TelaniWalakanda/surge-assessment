import type { MediaChip } from "@/lib/home-content";

type InsideTheBoxMediaProps = {
  mediaFiles: MediaChip[];
};

function MediaFigure({
  entry,
  figureClass = "",
  mediaClass,
}: {
  entry?: MediaChip;
  figureClass?: string;
  mediaClass: string;
}) {
  if (!entry) return null;
  const media = entry.media[0];
  if (!media) return null;
  const isVideo = (media.mime ?? "").startsWith("video");

  return (
    <figure
      className={`relative overflow-hidden ${figureClass}`}
    >
      {isVideo ? (
        <video
          src={media.url}
          autoPlay
          muted
          loop
          playsInline
          className={mediaClass}
        />
      ) : (
        <img
          src={media.url}
          alt={entry.chipText ?? ""}
          className={mediaClass}
        />
      )}
      {entry.chipText ? (
        <figcaption className="absolute bottom-[50%] left-[50%] bg-white/90 px-4 py-1.5 text-xs font-medium text-black backdrop-blur">
          {entry.chipText}
        </figcaption>
      ) : null}
    </figure>
  );
}

export default function InsideTheBoxMedia({
  mediaFiles,
}: InsideTheBoxMediaProps) {
  if (mediaFiles.length === 0) return null;

  const [first, second, third, fourth, fifth, sixth] = mediaFiles;
  const rest = mediaFiles.slice(6);

  return (
    <div className="mt-20 space-y-10">
      {/* First three: left rows 3:1, right single full-height image */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:grid-rows-[80vh_10vh]">
        <MediaFigure
          entry={first}
          figureClass="md:col-start-1 md:row-start-1"
          mediaClass="aspect-[4/3] w-full object-cover md:aspect-auto md:h-full rounded-xl"
        />
        <MediaFigure
          entry={second}
          figureClass="md:col-start-1 md:row-start-2"
          mediaClass="w-full object-cover md:h-full md:w-1/4 float-right rounded-xl"
        />
        <MediaFigure
          entry={third}
          figureClass="md:col-start-2 md:row-start-1 md:row-span-2"
          mediaClass="aspect-[4/3] object-cover md:aspect-auto md:h-full rounded-2xl"
        />
      </div>

      {/* Fourth: single column, full width */}
      {fourth ? (
        <MediaFigure
          entry={fourth}
          mediaClass="aspect-[16/9] w-full object-cover rounded-full"
        />
      ) : null}

      {/* Fifth & sixth: two columns, 2fr / 1fr */}
      {fifth || sixth ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[2fr_1fr] md:auto-rows-[40vh]">
          <MediaFigure
            entry={fifth}
            mediaClass="aspect-[4/3] w-full object-cover md:aspect-auto md:h-full"
          />
          <MediaFigure
            entry={sixth}
            mediaClass="aspect-[4/3] w-full object-cover md:aspect-auto md:h-full"
          />
        </div>
      ) : null}

      {/* Remaining media */}
      {rest.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {rest.map((entry, index) => (
            <MediaFigure
              key={index}
              entry={entry}
              mediaClass="aspect-[4/3] w-full object-cover"
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
