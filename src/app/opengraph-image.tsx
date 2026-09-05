import {ImageResponse} from "next/og";
import {getTranslations} from "next-intl/server";

import {defaultLocale} from "@/i18n/config";
import {siteConfig} from "@/config/site";

export const size = {width: 1200, height: 630};
export const contentType = "image/png";
export const dynamic = "force-static";

export default async function OpenGraphImage() {
  const t = await getTranslations({locale: defaultLocale, namespace: "Metadata"});
  return new ImageResponse(
    <div style={{alignItems: "center", background: "#0f172a", color: "#ffffff", display: "flex", height: "100%", justifyContent: "space-between", padding: "80px", width: "100%"}}>
      <div style={{display: "flex", flexDirection: "column", maxWidth: 720}}>
        <div style={{color: "#99f6e4", fontSize: 34, fontWeight: 700}}>{siteConfig.productName}</div>
        <div style={{fontSize: 72, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, marginTop: 28}}>{t("title")}</div>
        <div style={{color: "#cbd5e1", fontSize: 28, lineHeight: 1.4, marginTop: 30}}>{t("description")}</div>
      </div>
      <div style={{alignItems: "center", background: "#ccfbf1", borderRadius: 48, color: "#115e59", display: "flex", fontSize: 90, height: 260, justifyContent: "center", width: 260}}>G</div>
    </div>,
    size
  );
}
