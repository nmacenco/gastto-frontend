import type {Metadata} from "next";
import {getTranslations} from "next-intl/server";

import {BenefitsSection} from "@/components/landing/benefits-section";
import {FinalCtaSection} from "@/components/landing/final-cta-section";
import {HeroSection} from "@/components/landing/hero-section";
import {HowItWorksSection} from "@/components/landing/how-it-works-section";
import {ReassuranceSection} from "@/components/landing/reassurance-section";
import {SiteFooter} from "@/components/landing/site-footer";
import {SiteHeader} from "@/components/landing/site-header";
import {buildMetadata} from "@/config/metadata";
import {defaultLocale} from "@/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({locale: defaultLocale, namespace: "Metadata"});
  return buildMetadata({title: t("title"), description: t("description"), socialImageAlt: t("socialImageAlt")});
}

export default function LandingPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <HeroSection />
        <HowItWorksSection />
        <BenefitsSection />
        <ReassuranceSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
