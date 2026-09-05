import {useTranslations} from "next-intl";

import {TelegramLink} from "@/components/ui/telegram-link";

export function FinalCtaSection() {
  const t = useTranslations("FinalCta");

  return (
    <section aria-labelledby="final-cta-title" className="bg-surface-strong py-16 text-surface lg:py-24" data-page-region="final-cta">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <p className="font-semibold text-brand-soft">{t("eyebrow")}</p>
        <h2 id="final-cta-title" className="mt-3 text-[clamp(1.75rem,4vw,3rem)] font-bold leading-[1.15] tracking-[-0.04em] text-balance">{t("title")}</h2>
        <p className="mx-auto mt-5 max-w-[62ch] text-lg text-border-decorative">{t("description")}</p>
        <div className="mt-8 flex justify-center">
          <TelegramLink label={t("cta")} accessibleLabel={t("ctaAccessible")} placement="final" />
        </div>
      </div>
    </section>
  );
}
