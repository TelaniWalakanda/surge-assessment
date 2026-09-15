import type { HomeContent } from "@/lib/home-content";

type SpecificationsProps = HomeContent["specifications"];

export default function Specifications({
  label,
  heading,
  groups,
}: SpecificationsProps) {
  return (
    <section id="specifications" className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="flex items-baseline justify-between">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {heading}
          </h2>
          <span className="text-xs uppercase tracking-[0.3em] text-white/40">
            {label}
          </span>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
          {groups.map((group) => (
            <div key={group.title}>
              <h3 className="border-b border-white/15 pb-4 text-sm font-semibold uppercase tracking-[0.15em] text-white/70">
                {group.title}
              </h3>
              <ul className="mt-6 space-y-3">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-relaxed text-white/70"
                  >
                    <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-white/40" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
