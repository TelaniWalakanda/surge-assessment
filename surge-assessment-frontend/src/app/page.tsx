import Header from "@/components/header";
import Hero from "@/components/hero";
import Specifications from "@/components/specifications";
import Audience from "@/components/audience";
import About from "@/components/about";
import SmartPaper from "@/components/smart-paper";
import InsideTheBox from "@/components/inside-the-box";
import Colors from "@/components/colors";
import Signup from "@/components/signup";
import Footer from "@/components/footer";
import { mapHome } from "@/lib/home-mapper";
import { fetchAPI } from "@/lib/strapi";
import type { HomeContent } from "@/lib/home-content";

export const dynamic = "force-dynamic";

async function loadHome(): Promise<HomeContent> {
  const res = await fetchAPI<{ data: unknown }>("/home?populate=*");
  return mapHome(res?.data);
}

export default async function Home() {
  const content = await loadHome().catch(() => null);

  if (!content) {
    return (
      <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 text-center">
        <h1 className="text-2xl font-semibold">Content unavailable</h1>
        <p className="mt-3 text-sm text-white/60">
          The home page could not be loaded from the CMS. Make sure Strapi is
          running, the Public role has “find” access to the Home single type,
          and it has content.
        </p>
      </main>
    );
  }

  return (
    <>
      <Header
        brand={content.brand}
        tagline={content.brandTagline}
        nav={content.nav}
      />
      <main>
        <Hero {...content.hero} />
        <div className="relative z-10 bg-[#0a0a0b]">
          <Specifications {...content.specifications} />
          <Audience {...content.audience} />
          <About {...content.about} />
          <SmartPaper {...content.smartPaper} />
          <InsideTheBox {...content.insideTheBox} />
          <Colors {...content.colors} />
          <Signup {...content.signup} />
        </div>
      </main>
      <Footer
        brand={content.brand}
        nav={content.nav}
        {...content.footer}
      />
    </>
  );
}
