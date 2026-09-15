import type { NavLink } from "@/lib/home-content";

type HeaderProps = {
  brand: string;
  tagline: string;
  nav: NavLink[];
};

export default function Header({ brand, tagline, nav }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <a href="#" className="flex items-baseline gap-3">
          <span className="text-xl font-bold tracking-tight">{brand}</span>
          <span className="hidden text-xs uppercase tracking-[0.2em] text-white/50 sm:inline">
            {tagline}
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#order"
          className="rounded-full border border-white/20 px-5 py-2 text-sm font-medium transition-colors hover:bg-white hover:text-black"
        >
          Order
        </a>
      </div>
    </header>
  );
}
