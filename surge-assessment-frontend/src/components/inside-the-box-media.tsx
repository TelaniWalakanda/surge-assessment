import type { MediaChip } from "@/lib/home-content";

type InsideTheBoxMediaProps = {
  mediaFiles: MediaChip[];
};

export default function InsideTheBoxMedia({
  mediaFiles,
}: InsideTheBoxMediaProps) {
  if (mediaFiles.length === 0) return null;

  return (
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
  );
}
