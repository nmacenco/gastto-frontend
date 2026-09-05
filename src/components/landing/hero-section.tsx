import {useTranslations} from "next-intl";

import {TelegramLink} from "@/components/ui/telegram-link";

export function HeroSection() {
  const t = useTranslations("Hero");

  return (
    <section className="overflow-hidden bg-surface pb-16 pt-14 sm:pt-20 lg:pb-24 lg:pt-24" data-page-region="hero">
      <div className="mx-auto grid max-w-[75rem] items-center gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(22rem,0.85fr)] lg:px-8">
        <div className="min-w-0">
          <p className="mb-4 font-semibold text-brand">{t("eyebrow")}</p>
          <h1 className="max-w-[15ch] text-[clamp(2.5rem,6vw,4.75rem)] font-extrabold leading-[1.05] tracking-[-0.055em] text-balance text-text">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-[62ch] text-lg leading-8 text-text-muted sm:text-xl">{t("description")}</p>
          <div className="mt-8">
            <TelegramLink label={t("cta")} accessibleLabel={t("ctaAccessible")} placement="hero" />
          </div>
        </div>

        <div
          aria-label={t("visualLabel")}
          className="relative mx-auto w-full max-w-lg rounded-feature border border-border-decorative bg-surface-subtle p-5 shadow-card sm:p-8"
          role="img"
        >
          <div className="absolute -right-20 -top-20 -z-10 size-64 rounded-full bg-brand-soft blur-3xl" aria-hidden="true" />
          <div className="ml-auto max-w-[85%] rounded-[1.25rem_1.25rem_0.25rem_1.25rem] bg-telegram px-5 py-4 text-base font-medium text-text">
            {t("message")}
          </div>
          <div className="my-5 flex items-center justify-center gap-3 text-sm font-semibold text-brand-soft-text" aria-hidden="true">
            <span className="h-px flex-1 bg-border-essential" />
            <span>{t("processing")}</span>
            <span className="h-px flex-1 bg-border-essential" />
          </div>
          <div className="overflow-hidden rounded-control border border-border-essential bg-surface">
            <div className="border-b border-border-decorative bg-surface-strong px-4 py-2 text-sm font-semibold text-surface">
              {t("spreadsheetDestination")}
            </div>
            <div className="grid grid-cols-[1fr_1fr_auto] gap-2 px-4 py-4 font-mono text-sm tabular-nums text-text">
              {t("spreadsheet").split(" · ").map((cell) => <span className="min-w-0 break-words" key={cell}>{cell}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
