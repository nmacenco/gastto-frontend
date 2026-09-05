import {readFile} from "node:fs/promises";
import {resolve} from "node:path";
import {pathToFileURL} from "node:url";

import {describe, expect, it} from "vitest";

import messages from "../../messages/es.json";
import testMessages from "./fixtures/messages/test.json";
import LandingPage from "@/app/page";
import {defaultLocale, localeLabels, supportedLocales} from "@/i18n/config";
import {renderWithMessages} from "@/test/render";
import {screen} from "@testing-library/react";

const validatorUrl = pathToFileURL(
  resolve(process.cwd(), "scripts/message-validation.mjs")
).href;

async function loadValidator() {
  return import(validatorUrl) as Promise<{
    validateCatalogs: (catalogs: Record<string, unknown>, sourceLocale: string) => void;
  }>;
}

describe("locale configuration", () => {
  it("uses Spanish as the readonly BCP 47 default registry entry", () => {
    expect(defaultLocale).toBe("es");
    expect(supportedLocales).toEqual(["es"]);
    expect(localeLabels).toEqual({es: "Español"});
    expect(Intl.getCanonicalLocales([...supportedLocales])).toEqual([...supportedLocales]);
  });

  it("loads a complete Spanish source catalog", async () => {
    expect(Object.keys(messages)).toEqual([
      "Metadata",
      "Header",
      "Hero",
      "HowItWorks",
      "Benefits",
      "Reassurance",
      "FinalCta",
      "Footer"
    ]);
    const raw = await readFile(resolve(process.cwd(), "messages/es.json"), "utf8");
    expect(JSON.parse(raw)).toEqual(messages);
  });
});

describe("message validation", () => {
  it("accepts catalogs with exact keys and ICU argument parity", async () => {
    const {validateCatalogs} = await loadValidator();
    expect(() => validateCatalogs({es: messages, test: messages}, "es")).not.toThrow();
  });

  it("validates and renders a second catalog without component edits", async () => {
    const {validateCatalogs} = await loadValidator();
    expect(() => validateCatalogs({es: messages, test: testMessages}, "es")).not.toThrow();
    renderWithMessages(<LandingPage />, testMessages);
    expect(screen.getByRole("heading", {level: 1, name: "TEST localized hero title"})).toBeInTheDocument();
    expect(screen.getAllByRole("link", {name: "TEST Open Telegram"})).toHaveLength(3);
  });

  it("rejects missing or extra keys", async () => {
    const {validateCatalogs} = await loadValidator();
    const invalid = structuredClone(messages) as Record<string, unknown>;
    delete (invalid.Hero as Record<string, unknown>).title;
    (invalid.Hero as Record<string, unknown>).unexpected = "No permitido";

    expect(() => validateCatalogs({es: messages, invalid}, "es")).toThrow(/catalog keys/i);
  });

  it("rejects incompatible ICU arguments and malformed ICU messages", async () => {
    const {validateCatalogs} = await loadValidator();
    const incompatible = structuredClone(messages) as Record<string, unknown>;
    (incompatible.Footer as Record<string, unknown>).copyright = "© {year} {product}";
    expect(() => validateCatalogs({es: messages, incompatible}, "es")).toThrow(/ICU arguments/i);

    const malformed = structuredClone(messages) as Record<string, unknown>;
    (malformed.Footer as Record<string, unknown>).copyright = "© {year";
    expect(() => validateCatalogs({es: messages, malformed}, "es")).toThrow(/malformed ICU/i);
  });
});
