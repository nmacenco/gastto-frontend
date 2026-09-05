import {expect, test} from "@playwright/test";

test("hero and primary CTA appear within two seconds in at least 19 of 20 cold contexts", async ({browser}) => {
  const timings: number[] = [];

  for (let run = 0; run < 20; run += 1) {
    const context = await browser.newContext({viewport: {width: 390, height: 844}});
    const page = await context.newPage();
    const session = await context.newCDPSession(page);
    await session.send("Network.enable");
    await session.send("Network.emulateNetworkConditions", {
      offline: false,
      latency: 150,
      downloadThroughput: (1.6 * 1024 * 1024) / 8,
      uploadThroughput: (750 * 1024) / 8,
      connectionType: "cellular3g"
    });
    await session.send("Emulation.setCPUThrottlingRate", {rate: 4});

    const started = performance.now();
    await page.goto("/", {waitUntil: "domcontentloaded"});
    await expect(page.getByRole("heading", {level: 1})).toBeVisible();
    await expect(page.getByRole("link", {name: "Abrir Gastto en Telegram"}).nth(1)).toBeVisible();
    timings.push(performance.now() - started);
    await context.close();
  }

  console.log(`PERFORMANCE_TIMINGS_MS=${timings.map(Math.round).join(",")}`);
  expect(timings.filter((duration) => duration <= 2000).length).toBeGreaterThanOrEqual(19);
});

test("static page makes no API, authentication, analytics, or Telegram request", async ({page}) => {
  const requests: string[] = [];
  page.on("request", (request) => requests.push(request.url()));

  await page.goto("/", {waitUntil: "networkidle"});

  expect(requests.length).toBeGreaterThan(0);
  expect(requests.every((url) => new URL(url).origin === "http://127.0.0.1:4173")).toBe(true);
  expect(requests.some((url) => /\/api(?:\/|$)|auth|analytics|t\.me/i.test(url))).toBe(false);
});
