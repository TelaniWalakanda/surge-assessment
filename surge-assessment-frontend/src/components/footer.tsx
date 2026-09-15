import type { HomeContent } from "@/lib/home-content";

type FooterProps = HomeContent["footer"];

export default function Footer({ text, navTitle, nav, year, footnote }: FooterProps) {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-[1400px] px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <p className="max-w-md font-serif text-2xl leading-snug md:text-3xl">
            {text}
          </p>

          <div>
            <h3 className="text-sm uppercase tracking-[0.2em] text-white/50">
              {navTitle}
            </h3>
            <ul className="mt-4 space-y-2">
              {nav.map((link, index) => (
                <li key={`${link.href}-${index}`}>
                  <a
                    href={link.href}
                    className="text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-10 text-sm text-white/50">Year {year}</p>
            <p className="mt-2 text-sm text-white/50">{footnote}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
