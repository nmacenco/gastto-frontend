import {useTranslations} from "next-intl";

export function HowItWorksSection() {
  const t = useTranslations("HowItWorks");
  const steps = [1, 2, 3] as const;

  return (
    <section aria-labelledby="how-it-works-title" className="bg-surface-subtle py-16 lg:py-24" data-page-region="how-it-works">
      <div className="mx-auto max-w-[75rem] px-4 sm:px-6 lg:px-8">
        <p className="font-semibold text-brand">{t("eyebrow")}</p>
        <h2 id="how-it-works-title" className="mt-3 max-w-[22ch] text-[clamp(1.75rem,4vw,3rem)] font-bold leading-[1.15] tracking-[-0.04em] text-text">
          {t("title")}
        </h2>
        <p className="mt-4 max-w-[62ch] text-lg text-text-muted">{t("description")}</p>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <li className="rounded-feature border border-border-decorative bg-surface p-6" key={step}>
              <span className="font-mono text-sm font-bold text-brand" aria-hidden="true">{t(`step${step}Number`)}</span>
              <h3 className="mt-4 text-xl font-bold text-text">{t(`step${step}Title`)}</h3>
              <p className="mt-3 text-text-muted">{t(`step${step}Description`)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
