import AxeBuilder from "@axe-core/playwright";
import {expect, test} from "@playwright/test";

const telegramUrl = "https://t.me/gastto_bot";

test.describe("landing-to-Telegram journey", () => {
  test("exposes three consistent keyboard-accessible Telegram links", async ({page}) => {
    await page.goto("/");
    const links = page.getByRole("link", {name: "Abrir Gastto en Telegram"});
    await expect(links).toHaveCount(3);

    for (let index = 0; index < 3; index += 1) {
      await expect(links.nth(index)).toHaveAttribute("href", telegramUrl);
      await page.keyboard.press("Tab");
      await expect(links.nth(index)).toBeFocused();
      expect(await links.nth(index).evaluate((node) => getComputedStyle(node).outlineStyle)).not.toBe("none");
    }

    let intercepted = 0;
    await page.route(telegramUrl, async (route) => {
      intercepted += 1;
      await route.abort();
    });
    for (let index = 0; index < 3; index += 1) {
      await page.goto("/");
      await Promise.all([
        page.waitForRequest(telegramUrl),
        page.getByRole("link", {name: "Abrir Gastto en Telegram"}).nth(index).click()
      ]);
    }
    expect(intercepted).toBe(3);
  });

  for (const viewport of [
    {name: "phone", width: 320, height: 700},
    {name: "tablet", width: 768, height: 900},
    {name: "desktop", width: 1280, height: 900}
  ]) {
    test(`reflows without essential overflow at ${viewport.name}`, async ({page}) => {
      await page.setViewportSize(viewport);
      await page.goto("/");
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(1);
      await expect(page.getByRole("heading", {level: 1})).toBeVisible();
      await expect(page.getByRole("link", {name: "Abrir Gastto en Telegram"}).last()).toBeVisible();
    });
  }

  test("preserves content, targets, and accessibility at 200% text zoom and reduced motion", async ({page}) => {
    await page.emulateMedia({reducedMotion: "reduce"});
    await page.setViewportSize({width: 640, height: 900});
    await page.goto("/");
    await page.evaluate(() => { document.documentElement.style.fontSize = "200%"; });

    const regions = await page.locator("[data-page-region]").evaluateAll((nodes) => nodes.map((node) => node.getAttribute("data-page-region")));
    expect(regions).toEqual(["header", "hero", "how-it-works", "benefits", "reassurance", "final-cta", "footer"]);
    for (const link of await page.getByRole("link", {name: "Abrir Gastto en Telegram"}).all()) {
      const box = await link.boundingBox();
      expect(box?.height).toBeGreaterThanOrEqual(44);
      expect(box?.width).toBeGreaterThanOrEqual(44);
    }
    const accessibility = await new AxeBuilder({page}).analyze();
    expect(accessibility.violations.filter(({impact}) => impact === "critical" || impact === "serious")).toEqual([]);
  });

  test("declares Spanish and keeps the visual supplementary", async ({page}) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    await expect(page.getByRole("img", {name: /ejemplo de un gasto organizado/i})).toBeVisible();
    await expect(page).toHaveTitle("Gastto — Registra gastos conversando");
  });
});
