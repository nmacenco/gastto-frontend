# Quickstart Validation: Telegram Marketing Landing Page

## Purpose

Use this guide after implementation to prove the scaffold, landing experience, Telegram handoff,
brand system, and release gates work end to end. It does not introduce implementation tasks or
duplicate the [UI contract](./contracts/landing-page-ui.md).

## Prerequisites

- Node.js 22.12 or newer.
- pnpm enabled through Corepack at the version pinned in `package.json`.
- The approved public Gastto Telegram bot URL.
- The approved canonical site URL, final Spanish copy, and brand assets.
- Browsers required by the release matrix installed through Playwright.

## Public Configuration

Create `.env.local` from the committed `.env.example` and set only public values:

```dotenv
NEXT_PUBLIC_SITE_URL=https://www.example.com
NEXT_PUBLIC_TELEGRAM_BOT_URL=https://t.me/example_bot
```

The example values are not release values. No database URL, bot token, authentication secret, or API
base URL belongs in this feature. Production build validation MUST reject a missing, malformed, or
unapproved Telegram destination.

## Install and Run

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Open `http://localhost:3000` and confirm that `/` displays the complete landing page. The console and
terminal MUST show no runtime error or missing-configuration warning.

## Automated Quality Gates

Run each gate independently so a failure identifies its source:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

Expected outcomes:

- Lint and strict type checking complete with no error.
- Component tests verify the product claim, semantic heading hierarchy, CTA accessible names, and
  the canonical Telegram href.
- Translation tests verify that rendered copy comes from `messages/es.json`, the document language
  is `es`, and every registered locale has the same keys and ICU arguments as the Spanish catalog.
- Tailwind compiles the Gastto `@theme` tokens into the semantic utilities used by the page without
  warnings or missing classes.
- The production build completes and writes the static export to `out/`.
- Browser tests verify the critical journey, keyboard access, and small-screen reflow without calling
  or depending on Telegram's live service.
- No skipped test is used to make a gate pass.

## Scenario 1: Understand Gastto

1. Open `/` in a clean browser session.
2. Read only the content visible before scrolling.
3. Confirm it identifies Gastto as a conversational financial assistant and offers a Telegram CTA.
4. Continue through the page.
5. Confirm the three-step explanation says expenses are submitted naturally and organized in a
   linked Google Sheet or Excel workbook.
6. Confirm no dashboard, category editor, account, or database-backed feature is advertised as
   available.

Pass condition: a first-time participant can state the product purpose and current workflow without
assistance, matching SC-001 and SC-002 in the feature specification.

## Scenario 2: Reach Telegram

1. Locate the header, hero, and closing Telegram links.
2. Inspect each accessible name and destination.
3. Navigate to each link using keyboard only and confirm visible focus.
4. Activate the link while intercepting external navigation or using a safe test destination.

Pass condition: all variants use the same approved destination, explicitly name Telegram, and can be
found and activated within the limits in SC-003 and SC-004.

Do not assert Telegram page content or availability; Telegram is an external system.

## Scenario 3: Responsive and Accessible Experience

Verify at minimum:

- 320 px phone viewport.
- Representative tablet viewport.
- 1280 px desktop viewport.
- 200% browser text zoom.
- Reduced-motion preference.
- Keyboard-only navigation.
- Chromium on each pull request and Chromium, Firefox, and WebKit before release.

Pass conditions:

- No essential horizontal scrolling, clipped copy, obscured focus, or unreachable CTA.
- The content order remains header, hero, explanation, benefits, reassurance, and closing region.
- Every primary action has a minimum 44 by 44 CSS-pixel target.
- Automated accessibility scanning reports no serious or critical issue.
- Manual keyboard and screen-reader smoke tests find no blocker to understanding Gastto or reaching
  Telegram.

## Scenario 4: Brand Token Review

1. Compare implemented semantic colors with the palette in the UI contract.
2. Confirm components use semantic tokens rather than new raw colors.
3. Recalculate contrast for any approved palette change.
4. Confirm Telegram blue is an integration cue rather than the Gastto primary brand.
5. Confirm focus remains visible on white, subtle, strong, and brand surfaces.

Pass condition: every essential text and control pair meets the recorded WCAG 2.2 AA ratio and no
state depends on color alone.

## Scenario 5: Static Output and Scope Guard

Inspect `out/` after `pnpm build` and the browser's network activity while loading `/`.

Pass conditions:

- The landing page is present in the static output.
- The page performs no application API, database, authentication, analytics, or chatbot request.
- Axios is not present in runtime dependencies or the client bundle.
- The only conversion navigation is the user's explicit activation of the Telegram link.

## Scenario 6: Translation Readiness

1. Copy `messages/es.json` to `messages/{new-locale}.json`.
2. Translate values without changing the English keys or ICU argument names.
3. Register the BCP 47 language tag and endonym in `src/i18n/config.ts`.
4. Run lint, type checking, catalog validation, component tests, and the production build.
5. Confirm no landing component or page structure required an edit.

Pass condition: the new catalog passes key and ICU-argument parity checks and renders when selected
by a test request configuration. Shipping its localized URL, negotiation behavior, and selector
still requires an explicit follow-up feature.

## Release Inputs Still Requiring Product Approval

- Final Telegram bot URL.
- Canonical production site URL.
- Final Spanish marketing copy.
- Final wordmark, social preview, and any illustrative assets.

These are release inputs already modeled by the specification; they do not change feature scope.
