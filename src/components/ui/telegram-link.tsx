import type {ReactNode} from "react";

import {siteConfig} from "@/config/site";

export type TelegramLinkVariant = "primary" | "compact";

interface TelegramLinkProps {
  readonly label: string;
  readonly accessibleLabel: string;
  readonly variant?: TelegramLinkVariant;
  readonly placement: "header" | "hero" | "final";
}

function TelegramIcon(): ReactNode {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 shrink-0 fill-current">
      <path d="M21.7 3.4 18.5 19c-.2 1.1-.9 1.4-1.8.9l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.4-5 9.1-8.2c.4-.4-.1-.6-.6-.2L6 12.8l-4.8-1.5c-1-.3-1.1-1 .2-1.5L20 2.6c.9-.3 1.7.2 1.7.8Z" />
    </svg>
  );
}

export function TelegramLink({label, accessibleLabel, placement, variant = "primary"}: TelegramLinkProps) {
  const shared = "inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-control font-semibold transition duration-[var(--animate-duration)] ease-[var(--ease-gastto)] hover:-translate-y-0.5 active:translate-y-0 motion-reduce:transform-none";
  const variants: Record<TelegramLinkVariant, string> = {
    primary: "w-full bg-brand px-6 py-3 text-surface shadow-card hover:bg-brand-hover sm:w-auto",
    compact: "bg-brand-soft px-4 py-2 text-brand-soft-text hover:bg-surface hover:underline"
  };

  return (
    <a
      aria-label={accessibleLabel}
      className={`${shared} ${variants[variant]}`}
      data-placement={placement}
      data-telegram-link=""
      data-variant={variant}
      href={siteConfig.telegramBotUrl}
    >
      <TelegramIcon />
      <span>{label}</span>
    </a>
  );
}
