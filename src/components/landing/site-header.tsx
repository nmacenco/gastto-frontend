import {useTranslations} from "next-intl";

import {TelegramLink} from "@/components/ui/telegram-link";

export function SiteHeader() {
  const t = useTranslations("Header");

  return (
    <header className="border-b border-border-decorative bg-surface" data-page-region="header">
      <div className="mx-auto flex min-h-20 max-w-[75rem] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <span className="text-xl font-extrabold tracking-[-0.04em] text-text">
          <span className="text-brand">G</span>{t("productName").slice(1)}
        </span>
        <TelegramLink label={t("cta")} accessibleLabel={t("ctaAccessible")} placement="header" variant="compact" />
      </div>
    </header>
  );
}
