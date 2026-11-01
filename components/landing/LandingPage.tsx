import type { Dictionary, Locale } from "@/lib/i18n/types";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { HeroSection } from "./HeroSection";
import { ResultsSection } from "./ResultsSection";
import { ServicesSection } from "./ServicesSection";
import { MethodSection } from "./MethodSection";
import { WorkSection } from "./WorkSection";
import { ToolsSection } from "./ToolsSection";
import { ContactSection } from "./ContactSection";

export function LandingPage({ locale, d }: { locale: Locale; d: Dictionary }) {
  return (
    <>
      <Header locale={locale} d={{ nav: d.nav, brand: d.brand }} />
      <main id="main">
        <HeroSection d={d} />
        <ResultsSection d={d} />
        <ServicesSection d={d} />
        <MethodSection d={d} />
        <WorkSection d={d} />
        <ToolsSection d={d} />
        <ContactSection d={d} />
      </main>
      <Footer locale={locale} d={d} />
    </>
  );
}
