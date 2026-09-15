import type { HomeContent } from "@/lib/home-content";

type SignupProps = HomeContent["signup"];

export default function Signup({
  heading,
  description,
  placeholder,
  button,
}: SignupProps) {
  return (
    <section className="border-t border-white/10">
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {heading}
        </h2>
        <p className="mt-4 text-white/60">{description}</p>

        <form className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            required
            placeholder={placeholder}
            className="flex-1 rounded-full border border-white/20 bg-transparent px-5 py-3 text-sm outline-none placeholder:text-white/40 focus:border-white/60"
          />
          <button
            type="submit"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-white/80"
          >
            {button}
          </button>
        </form>
      </div>
    </section>
  );
}
