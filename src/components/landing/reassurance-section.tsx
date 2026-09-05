import {useTranslations} from "next-intl";

export function ReassuranceSection() {
  const t = useTranslations("Reassurance");

  return (
    <section aria-labelledby="reassurance-title" className="bg-surface px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24" data-page-region="reassurance">
      <div className="mx-auto grid max-w-[75rem] gap-4 rounded-feature bg-brand-soft p-6 sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:p-12">
        <h2 id="reassurance-title" className="text-[clamp(1.75rem,4vw,3rem)] font-bold leading-[1.15] tracking-[-0.04em] text-brand-soft-text">{t("title")}</h2>
        <p className="max-w-[62ch] text-lg text-text">{t("description")}</p>
      </div>
    </section>
  );
}
