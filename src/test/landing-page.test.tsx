import {screen, within} from "@testing-library/react";
import {describe, expect, it} from "vitest";

import messages from "../../messages/es.json";
import LandingPage from "@/app/page";
import {buildMetadata} from "@/config/metadata";
import {siteConfig} from "@/config/site";
import {defaultLocale} from "@/i18n/config";
import {renderWithMessages} from "@/test/render";

describe("Spanish landing page", () => {
  it("explains the current conversational spreadsheet workflow in semantic order", () => {
    const {container} = renderWithMessages(<LandingPage />);

    expect(screen.getByRole("heading", {level: 1, name: /registra tus gastos/i})).toBeInTheDocument();
    expect(screen.getAllByRole("heading", {level: 1})).toHaveLength(1);
    expect(screen.getByText(/mensaje en Telegram/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Google Sheets o Excel/i).length).toBeGreaterThan(0);

    const regions = [...container.querySelectorAll("[data-page-region]")].map((node) => node.getAttribute("data-page-region"));
    expect(regions).toEqual(["header", "hero", "how-it-works", "benefits", "reassurance", "final-cta", "footer"]);

    const workflow = screen.getByRole("region", {name: /de un mensaje/i});
    expect(within(workflow).getAllByRole("listitem")).toHaveLength(3);
    expect(within(workflow).getAllByRole("listitem").map((item) => item.textContent)).toEqual([
      expect.stringMatching(/Conecta tu hoja/i),
      expect.stringMatching(/Cuéntale el gasto/i),
      expect.stringMatching(/Encuéntralo organizado/i)
    ]);

    const benefits = screen.getByRole("region", {name: /forma más natural/i});
    expect(within(benefits).getAllByRole("listitem")).toHaveLength(3);
    expect(container).not.toHaveTextContent(/dashboard|configuraci[oó]n de categor[ií]as|cuenta web/i);
  });

  it("offers exactly three accessible real links to one canonical Telegram destination", () => {
    renderWithMessages(<LandingPage />);

    const links = screen.getAllByRole("link", {name: "Abrir Gastto en Telegram"});
    expect(links).toHaveLength(3);
    for (const link of links) {
      expect(link).toHaveAttribute("href", siteConfig.telegramBotUrl);
      expect(link).not.toHaveAttribute("target");
      expect(link).toHaveAttribute("data-telegram-link");
      expect(link.className).toMatch(/min-h-11|min-h-\[44px\]/);
    }
    expect(links.map((link) => link.getAttribute("data-variant"))).toEqual(["compact", "primary", "primary"]);
  });

  it("uses localized accessible text, supplementary imagery, document language, and metadata", async () => {
    renderWithMessages(<LandingPage />);

    expect(defaultLocale).toBe("es");
    expect(screen.getByRole("img", {name: /ejemplo de un gasto organizado/i})).toBeInTheDocument();
    const metadata = buildMetadata(messages.Metadata);
    expect(metadata.title).toBe("Gastto — Registra gastos conversando");
    expect(metadata.description).toMatch(/Telegram.*Google Sheets o Excel/i);
    expect(metadata.alternates?.canonical).toBe(siteConfig.canonicalSiteUrl);
    expect(metadata.openGraph?.locale).toBe("es_ES");
  });
});
