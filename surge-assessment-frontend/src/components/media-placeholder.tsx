type MediaPlaceholderProps = {
  label?: string;
  className?: string;
};

/**
 * Stand-in for imagery/video. The reference site is heavily visual, but per
 * requirements we ship no real images or videos yet. Replace these blocks with
 * <Image /> / <video /> once Strapi media is wired up.
 */
export default function MediaPlaceholder({
  label,
  className = "",
}: MediaPlaceholderProps) {
  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.03] ${className}`}
    >
      <span className="px-4 text-center text-xs uppercase tracking-[0.2em] text-white/40">
        {label ?? "Media"}
      </span>
    </div>
  );
}
