import {defineConfig, devices} from "@playwright/test";

const port = 4173;
const performanceRun = process.env.PERFORMANCE_TEST === "1";

export default defineConfig({
  testDir: "./e2e",
  testIgnore: performanceRun ? undefined : /performance\.spec\.ts/,
  fullyParallel: true,
  timeout: 60_000,
  workers: 3,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    trace: "retain-on-failure"
  },
  projects: [
    {name: "chromium", use: {...devices["Desktop Chrome"]}},
    {name: "firefox", use: {...devices["Desktop Firefox"]}},
    {name: "webkit", use: {...devices["Desktop Safari"]}}
  ],
  webServer: {
    command: performanceRun
      ? `pnpm build && node scripts/serve-static.mjs ${port}`
      : `pnpm dev --hostname 127.0.0.1 --port ${port}`,
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: !process.env.CI,
    env: {
      NEXT_PUBLIC_SITE_URL: "https://gastto.example",
      NEXT_PUBLIC_TELEGRAM_BOT_URL: "https://t.me/gastto_bot"
    }
  }
});
