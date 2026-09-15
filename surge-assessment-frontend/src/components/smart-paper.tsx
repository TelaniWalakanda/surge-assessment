import type { HomeContent } from "@/lib/home-content";

type SmartPaperProps = HomeContent["smartPaper"];

export default function SmartPaper({ eyebrow, title, stories }: SmartPaperProps) {
  return (
    <section id="smart-paper" className="scroll-mt-20 bg-black text-white">
      <div className="mx-auto px-6 md:px-11 py-24 md:py-32">
        <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-20 md:grid-cols-2">
          {stories.map((story) => (
            <article key={story.title}>
              {story.image ? (
                <img
                  src={story.image}
                  alt={story.title}
                  className="aspect-[4/3] w-full rounded-2xl object-cover"
                />
              ) : null}
              <p className="mt-8 text-sm text-white/50">{story.eyebrow}</p>
              <h3 className="mt-2 text-2xl font-semibold">{story.title}</h3>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/60">
                {story.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
