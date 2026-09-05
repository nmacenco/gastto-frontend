import {describe, expect, it} from "vitest";

import {createSiteConfig} from "@/config/site";

describe("public site configuration", () => {
  it("normalizes a canonical HTTPS origin and Telegram bot URL", () => {
    const config = createSiteConfig({
      NEXT_PUBLIC_SITE_URL: "https://gastto.example/",
      NEXT_PUBLIC_TELEGRAM_BOT_URL: "https://T.ME/gastto_bot/"
    });

    expect(config.canonicalSiteUrl).toBe("https://gastto.example");
    expect(config.telegramBotUrl).toBe("https://t.me/gastto_bot");
    expect(Object.isFrozen(config)).toBe(true);
  });

  it.each([
    ["site URL must use HTTPS", {NEXT_PUBLIC_SITE_URL: "http://gastto.example", NEXT_PUBLIC_TELEGRAM_BOT_URL: "https://t.me/gastto_bot"}],
    ["site URL must be an origin", {NEXT_PUBLIC_SITE_URL: "https://gastto.example/landing?secret=value", NEXT_PUBLIC_TELEGRAM_BOT_URL: "https://t.me/gastto_bot"}],
    ["Telegram host is allowlisted", {NEXT_PUBLIC_SITE_URL: "https://gastto.example", NEXT_PUBLIC_TELEGRAM_BOT_URL: "https://evil.example/gastto_bot"}],
    ["Telegram bot path is present", {NEXT_PUBLIC_SITE_URL: "https://gastto.example", NEXT_PUBLIC_TELEGRAM_BOT_URL: "https://t.me"}]
  ])("rejects invalid public configuration: %s", (_label, env) => {
    expect(() => createSiteConfig(env)).toThrow("Invalid public site configuration");
  });

  it("never includes the rejected value in its failure", () => {
    const secretBearingUrl = "https://attacker.example/bot?token=do-not-leak";

    expect(() =>
      createSiteConfig({
        NEXT_PUBLIC_SITE_URL: "https://gastto.example",
        NEXT_PUBLIC_TELEGRAM_BOT_URL: secretBearingUrl
      })
    ).toThrowError(new Error("Invalid public site configuration: Telegram bot URL is not approved."));
  });
});
