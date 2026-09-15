import type { HomeContent } from "@/lib/home-content";

type HeaderProps = HomeContent["header"];

export default function Header({
  logo,
  nav,
  productCardText,
  price,
  ctaText,
}: HeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white/60 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-[1400px] items-center justify-between px-6">
        <a href="#" className="flex items-center gap-2">
          {logo ? (
            <img src={logo} alt="Nōta" className="h-7 w-auto" />
          ) : (
            <span className="font-serif text-2xl text-black">Nōta</span>
          )}
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((link, index) => (
            <a
              key={`${link.href}-${index}`}
              href={link.href}
              className="text-sm font-medium text-black/70 transition-colors hover:text-black"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#order"
          className="flex items-center gap-2 rounded-full bg-white p-2 pl-4 shadow-sm transition-opacity hover:opacity-90"
        >
          <img
            src="/order-logo.svg"
            alt=""
            aria-hidden="true"
            className="h-5 w-auto shrink-0"
          />
          <span className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white">
            {ctaText}
            {productCardText ? ` ${productCardText}` : ""}
            {price ? ` • ${price}` : ""}
          </span>
        </a>
      </div>
    </header>
  );
}
