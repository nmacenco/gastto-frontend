import {useTranslations} from "next-intl";

export function SiteFooter() {
  const t = useTranslations("Footer");

  return (
    <footer className="border-t border-border-decorative bg-surface-strong text-surface" data-page-region="footer">
      <div className="mx-auto flex max-w-[75rem] flex-col gap-2 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div><strong>{t("productName")}</strong><span className="ml-2 text-border-decorative">{t("tagline")}</span></div>
        <small className="text-sm text-border-decorative">{t("copyright", {year: new Date().getUTCFullYear()})}</small>
      </div>
    </footer>
  );
}
