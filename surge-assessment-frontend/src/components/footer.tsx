import type { HomeContent } from "@/lib/home-content";

type FooterProps = HomeContent["footer"] & {
  brand: string;
  nav: HomeContent["nav"];
};

export default function Footer({
  brand,
  nav,
  navigationHeading,
  year,
  copyright,
  credits,
}: FooterProps) {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <p className="text-lg font-bold tracking-tight">{brand}</p>
            <p className="mt-2 text-sm text-white/50">{copyright}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-white/70">
              {navigationHeading}
            </h3>
            <ul className="mt-4 space-y-2">
              {nav.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:text-right">
            <p className="text-sm text-white/50">Year {year}</p>
            <ul className="mt-4 space-y-2">
              {credits.map((credit) => (
                <li key={credit} className="text-sm text-white/50">
                  {credit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
