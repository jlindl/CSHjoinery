import { DatumRail, Header, ScrollProgress, StickyCallBar } from "./components/chrome";
import { Hero } from "./components/hero";
import { Marquee } from "./components/marquee";
import { About, Areas, Reasons, Services, TrustStrip } from "./components/sections";
import { Process } from "./components/process";
import { Contact } from "./components/contact";
import { Footer } from "./components/footer";

/* The page alternates oat and espresso grounds with a hard cut at each seam:
   hero (espresso) → marquee seam → trust/about/services (oat) → areas/process
   (espresso) → reasons/contact (oat) → footer (espresso). */

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <DatumRail />
      <Header />

      <main>
        <Hero />
        <Marquee />
        <TrustStrip />
        <About />
        <Services />
        <Areas />
        <Process />
        <Reasons />
        <Contact />
      </main>

      <Footer />
      <StickyCallBar />
    </>
  );
}
