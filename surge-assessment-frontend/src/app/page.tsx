import Header from "@/components/header";
import Hero from "@/components/hero";
import SteppedWipeSection from "@/components/SteppedWipeSection";
import Specifications from "@/components/specifications";
import BarsWipeSection from "@/components/BarsWipeSection";
import Audience from "@/components/audience";
import SmartPaper from "@/components/smart-paper";
import InsideTheBox from "@/components/inside-the-box";
import Colors from "@/components/colors";
import Footer from "@/components/footer";
import SectionIntro from "@/components/section-intro";
import { mapHome } from "@/lib/home-mapper";
import { fetchAPI } from "@/lib/strapi";
import type { HomeContent } from "@/lib/home-content";

export const dynamic = "force-dynamic";

/**
 * Populate every nested component + media field the home page reads from.
 * Strapi v5 does not expand these automatically with a bare `populate=*`.
 */
const HOME_POPULATE = [
  "populate[hero][populate]=*",
  "populate[specificationsSection][populate][specifications_group][populate][specification_text]=true",
  "populate[specificationsSection][populate][image_desktop]=true",
  "populate[specificationsSection][populate][image_mobile]=true",
  "populate[audienceSection][populate][audiences]=true",
  "populate[audienceSection][populate][image]=true",
  "populate[paperIntro]=true",
  "populate[featuresSection][populate][image]=true",
  "populate[boxIntro]=true",
  "populate[inside_box_section][populate][media]=true",
  "populate[inside_box][populate][media]=true",
  "populate[media_files][populate][media_file]=true",
  "populate[colors][populate][image]=true",
  "populate[signup]=true",
  "populate[seo][populate][shareImage]=true",
].join("&");

async function loadHome(): Promise<HomeContent> {
  const [home, header, footer] = await Promise.all([
    fetchAPI<{ data: unknown }>(`/home?${HOME_POPULATE}`),
    fetchAPI<{ data: unknown }>("/header?populate=*").catch(() => null),
    fetchAPI<{ data: unknown }>("/footer?populate=*").catch(() => null),
  ]);

  return mapHome(home?.data, header?.data, footer?.data);
}

export default async function Home() {
  const content = await loadHome().catch(() => null);

  if (!content) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="text-2xl font-semibold">Content unavailable</h1>
        <p className="mt-3 max-w-xl text-sm text-white/60">
          The home page could not be loaded from the CMS. Make sure Strapi is
          running, the Public role has “find” access to the Home single type,
          and it has content.
        </p>
      </main>
    );
  }

  return (
    <>
      <Header {...content.header} />
      <main>
        <Hero {...content.hero} />
        {/*
          The wipe is `margin-top: -100vh`, so it starts inside the hero's last
          pinned viewport and stays pinned over it while the curtains rise —
          it must sit immediately after the hero for that overlap to line up.
        */}
        <SteppedWipeSection />
        <div className="relative z-10">
          <Specifications {...content.specifications} />
          {/*
            Sits inside this wrapper (and after the specs section) so it paints
            over it: the wrapper is a stacking context, so a later positioned
            sibling is exactly the layer that must cover the section before it.
          */}
          <BarsWipeSection />
          <Audience {...content.audience} />
          <SectionIntro
            eyebrow={content.paperIntro.eyebrow}
            title={content.paperIntro.title}
          />
          <SmartPaper {...content.smartPaper} />
          <SectionIntro
            eyebrow={content.boxIntro.eyebrow}
            title={content.boxIntro.title}
          />
          <InsideTheBox {...content.insideTheBox} />
          <Colors {...content.colors} />
        </div>
      </main>
      <Footer {...content.footer} />
    </>
  );
}
