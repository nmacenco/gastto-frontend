export interface PublicEnvironment {
  readonly NEXT_PUBLIC_SITE_URL?: string;
  readonly NEXT_PUBLIC_TELEGRAM_BOT_URL?: string;
}

export interface SiteConfig {
  readonly productName: "Gastto";
  readonly canonicalSiteUrl: string;
  readonly telegramBotUrl: string;
  readonly socialImagePath: "/opengraph-image";
}

const TELEGRAM_HOSTS = new Set(["t.me", "telegram.me"]);

function invalid(reason: string): never {
  throw new Error(`Invalid public site configuration: ${reason}`);
}

function parseHttpsUrl(value: string | undefined, field: "site" | "telegram"): URL {
  if (!value) invalid(field === "site" ? "Site URL is required." : "Telegram bot URL is required.");

  try {
    const url = new URL(value);
    if (url.protocol !== "https:") invalid(field === "site" ? "Site URL must use HTTPS." : "Telegram bot URL is not approved.");
    if (url.username || url.password) invalid(field === "site" ? "Site URL must be a public origin." : "Telegram bot URL is not approved.");
    return url;
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("Invalid public site configuration:")) throw error;
    return invalid(field === "site" ? "Site URL is malformed." : "Telegram bot URL is not approved.");
  }
}

export function createSiteConfig(environment: PublicEnvironment): Readonly<SiteConfig> {
  const site = parseHttpsUrl(environment.NEXT_PUBLIC_SITE_URL, "site");
  if (site.pathname !== "/" || site.search || site.hash || site.port) {
    invalid("Site URL must be a public HTTPS origin.");
  }

  const telegram = parseHttpsUrl(environment.NEXT_PUBLIC_TELEGRAM_BOT_URL, "telegram");
  const botPath = telegram.pathname.replace(/^\/+|\/+$/g, "");
  if (!TELEGRAM_HOSTS.has(telegram.hostname.toLowerCase()) || !/^[A-Za-z0-9_]{5,}$/.test(botPath) || telegram.search || telegram.hash || telegram.port) {
    invalid("Telegram bot URL is not approved.");
  }

  return Object.freeze({
    productName: "Gastto",
    canonicalSiteUrl: site.origin,
    telegramBotUrl: `https://${telegram.hostname.toLowerCase()}/${botPath}`,
    socialImagePath: "/opengraph-image"
  });
}

const developmentEnvironment: PublicEnvironment = {
  NEXT_PUBLIC_SITE_URL: "https://gastto.example",
  NEXT_PUBLIC_TELEGRAM_BOT_URL: "https://t.me/gastto_bot"
};

export const siteConfig = createSiteConfig(
  process.env.NODE_ENV === "production"
    ? {
        NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
        NEXT_PUBLIC_TELEGRAM_BOT_URL: process.env.NEXT_PUBLIC_TELEGRAM_BOT_URL
      }
    : {...developmentEnvironment, ...process.env}
);
