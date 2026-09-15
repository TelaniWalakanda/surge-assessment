import type { HomeContent } from "@/lib/home-content";

type SpecificationsProps = HomeContent["specifications"];

export default function Specifications({
  label,
  heading,
  groups,
  image,
}: SpecificationsProps) {
  return (
    <section id="specifications" className="scroll-mt-20 bg-white text-black">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-serif text-5xl md:text-7xl">{label}</h2>
          <span className="pb-2 text-sm uppercase tracking-[0.3em] text-black/50">
            {heading}
          </span>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-[1fr_auto]">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
            {groups.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-semibold uppercase tracking-[0.15em]">
                  {group.title}
                </h3>
                <ul className="mt-6 divide-y divide-black/10 border-y border-black/10">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center justify-between gap-4 py-4 text-sm"
                    >
                      <span>{item}</span>
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-black/30" />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {image ? (
            <img
              src={image}
              alt={label}
              className="h-auto w-44 self-center rounded-2xl object-cover md:w-56"
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
