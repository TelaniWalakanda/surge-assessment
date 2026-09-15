import type { HomeContent } from "@/lib/home-content";

type ColorsProps = HomeContent["colors"];

const swatches = [
  "#1c1c1e", // Graphite Black
  "#9fb4c7", // Mist Blue
  "#c0392b", // Precision Red
  "#e67e22", // Bright Orange
];

export default function Colors({ heading, options }: ColorsProps) {
  return (
    <section id="colors" className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {heading}
        </h2>

        <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {options.map((option, index) => (
            <article
              key={option.name}
              className="rounded-2xl border border-white/10 p-4"
            >
              <div
                className="aspect-square rounded-xl"
                style={{
                  backgroundColor:
                    option.color ?? swatches[index % swatches.length],
                }}
              />
              <h3 className="mt-4 text-sm font-semibold">{option.name}</h3>
              <p className="mt-1 text-sm text-white/50">{option.tagline}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
