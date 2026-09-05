import {useTranslations} from "next-intl";

const icons = [
  <path d="M13 2 4.5 13H11l-1 9 8.5-11H12l1-9Z" key="fast" />,
  <path d="M4 4h16v16H4zM4 9h16M9 4v16" fill="none" key="organized" stroke="currentColor" strokeWidth="2" />,
  <path d="M4 7h16v12H4zM7 4h10v3M8 12h8M8 15h5" fill="none" key="ownership" stroke="currentColor" strokeWidth="2" />
];

export function BenefitsSection() {
  const t = useTranslations("Benefits");
  const benefits = ["fast", "organized", "ownership"] as const;

  return (
    <section aria-labelledby="benefits-title" className="bg-surface py-16 lg:py-24" data-page-region="benefits">
      <div className="mx-auto max-w-[75rem] px-4 sm:px-6 lg:px-8">
        <p className="font-semibold text-brand">{t("eyebrow")}</p>
        <h2 id="benefits-title" className="mt-3 max-w-[24ch] text-[clamp(1.75rem,4vw,3rem)] font-bold leading-[1.15] tracking-[-0.04em] text-text">{t("title")}</h2>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {benefits.map((benefit, index) => (
            <li className="rounded-feature border border-border-decorative p-6" key={benefit}>
              <span className="flex size-12 items-center justify-center rounded-control bg-brand-soft text-brand-soft-text" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="size-6 fill-current">{icons[index]}</svg>
              </span>
              <h3 className="mt-5 text-xl font-bold text-text">{t(`${benefit}Title`)}</h3>
              <p className="mt-3 text-text-muted">{t(`${benefit}Description`)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
