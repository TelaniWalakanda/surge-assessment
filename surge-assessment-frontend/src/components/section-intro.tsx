type SectionIntroProps = {
  eyebrow: string;
  title: string;
  tone?: "light" | "dark";
  className?: string;
};

export default function SectionIntro({
  eyebrow,
  title,
  tone = "light",
  className = "",
}: SectionIntroProps) {
  const bgClass = tone === "dark" ? "bg-black" : "bg-white";
  const eyebrowClass = tone === "dark" ? "text-white/50" : "text-black/50";
  const titleClass = tone === "dark" ? "text-white" : "text-black";

  return (
    <section
      className={`${bgClass} flex min-h-screen items-center justify-center ${className}`}
    >
      <div className="px-6 text-center md:px-11">
        <p
          className={`font-serif text-4xl leading-none md:text-6xl ${eyebrowClass}`}
        >
          {eyebrow}
        </p>
        <h2
          className={`mt-3 font-serif text-6xl leading-none md:text-8xl ${titleClass}`}
        >
          {title}
        </h2>
      </div>
    </section>
  );
}
