import type { HomeContent } from "@/lib/home-content";

type HeaderProps = HomeContent["header"];

/**
 * Fixed header that stays legible over both dark and light sections using
 * `mix-blend-difference` (white text inverts over white backgrounds).
 */
export default function Header({
  logo,
  nav,
  productCardText,
  price,
  ctaText,
}: HeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference">
      <div className="mx-auto flex h-20 w-full max-w-[1400px] items-center justify-between px-6">
        <a href="#" className="flex items-center gap-2">
          {logo ? (
            <img src={logo} alt="NŌTA" className="h-7 w-auto" />
          ) : (
            <span className="font-serif text-2xl italic text-white">Nota</span>
          )}
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white transition-opacity hover:opacity-60"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#order"
          className="flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-90"
        >
          <span className="font-serif">{ctaText}</span>
          <span className="opacity-50">·</span>
          <span>{productCardText}</span>
          <span className="opacity-50">·</span>
          <span>{price}</span>
        </a>
      </div>
    </header>
  );
}
