# Phase 0 Research: Telegram Marketing Landing Page

## Framework and Runtime Baseline

**Decision**: Use Next.js 16.3.3 with React 19.2, strict TypeScript 5.x, and Node.js 22.12 or
newer. Scaffold with App Router, `src/`, ESLint, the `@/*` alias, pnpm, and no React Compiler.
Commit only `pnpm-lock.yaml` and pin the package-manager version in `package.json`.

**Rationale**: Next.js 16.3.3 is the active LTS security release at planning time. Node.js 22.12
satisfies both Next.js and Vitest 5 requirements. App Router is the current recommended routing model,
and strict TypeScript enforces the constitution's explicit-contract rule.

**Alternatives considered**:

- Next.js canary: rejected because the landing page needs stability, not experimental features.
- Pages Router: rejected because this is a new application and App Router is the current default.
- Node.js 20: supported by Next.js but rejected because Vitest 5 requires Node.js 22.12 or newer.

**Sources**:

- [Next.js installation](https://nextjs.org/docs/app/getting-started/installation)
- [Next.js 16 security and LTS releases](https://nextjs.org/blog)
- [Vitest 5 migration prerequisites](https://vitest.dev/guide/migration/)

## Rendering and Deployment Model

**Decision**: Build `/` as a synchronous Server Component and configure a static export. Do not add
Client Components, route handlers, middleware, Server Actions, or runtime hosting in this release.

**Rationale**: The page is public, content-driven, and has no runtime data. A static export produces
the smallest deployable surface and minimizes client JavaScript. The project can remove static-export
mode when a later authenticated, database-backed feature requires server capabilities.

**Alternatives considered**:

- Node.js server deployment: rejected because no runtime behavior currently needs it.
- Client-rendered single-page application: rejected because it adds JavaScript without user value.
- Permanent static-only architecture: rejected because the product roadmap includes authenticated
  configuration capabilities.

**Source**: [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports)

## Styling and Brand Foundation

**Decision**: Use Tailwind CSS 4 as the primary styling system. Define Gastto's semantic colors,
typography, spacing, radii, and motion values with Tailwind's CSS-first `@theme` variables in a shared
theme file. Use Gastto teal as the owned brand color, dark navy for text, restrained mint surfaces,
and Telegram blue only as an integration cue. Do not install a component library.

**Rationale**: The page needs durable semantic tokens now, while the roadmap includes a larger
configuration frontend where Tailwind's utilities will speed consistent responsive and state styling.
Tailwind 4 exposes theme variables as both CSS variables and semantic utilities, preserving the
Gastto-owned palette without hardcoded framework colors in components.

**Alternatives considered**:

- CSS Modules as the primary system: initially favored for the bounded landing page, but rejected
  after considering the larger frontend roadmap and the product owner's Tailwind preference. They
  remain an exception for complex selectors that utilities cannot express clearly.
- Telegram blue as the primary brand: rejected because it would make Gastto look like an unofficial
  Telegram surface.
- Finance navy alone: rejected because it is credible but generic and less conversational.
- Bright money green: rejected because it can be confused with success/status feedback.

**Sources**:

- [Next.js CSS guidance](https://nextjs.org/docs/app/getting-started/css)
- [Tailwind CSS PostCSS installation](https://tailwindcss.com/docs/installation/using-postcss)
- [Tailwind CSS theme variables](https://tailwindcss.com/docs/theme)
- [Tailwind CSS compatibility](https://tailwindcss.com/docs/compatibility)

## UX and Content Structure

**Decision**: Use a mobile-first narrative with six semantic regions: compact header, outcome-led
hero, three-step explanation, three benefit cards, reassurance strip, and final CTA/footer. Repeat
the same Telegram CTA in the header, hero, and closing region without adding competing conversions.

**Rationale**: Visitors first learn the outcome, then how Gastto works, then why it helps, and finally
act. A single conversion goal matches the specification and avoids navigation or feature clutter.

**Alternatives considered**:

- Dashboard-like preview: rejected because configuration UI is not available in this release.
- Carousel, parallax, or autoplay media: rejected because they add motion and interaction risk.
- FAQ and marketing blog: rejected because the first release is intentionally limited to selling and
  explaining the current workflow.

## Accessibility Standard

**Decision**: Target WCAG 2.2 AA. Normal text pairs require at least 4.5:1 contrast, large text and
essential non-text boundaries at least 3:1, controls at least 44 by 44 CSS pixels, a two-color
focus-visible indicator, full keyboard operation, 200% zoom support, 320 CSS-pixel reflow, semantic
landmarks/headings, and reduced-motion behavior.

**Rationale**: These rules make the conversion journey perceivable and operable while exceeding the
24 by 24 CSS-pixel AA pointer-target minimum for the primary action.

**Alternatives considered**:

- Browser-default focus only: rejected because focus must remain visible across varied brand surfaces.
- Color-only hover/focus communication: rejected because color alone is not a sufficient state cue.

**Sources**:

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)
- [Focus Appearance](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html)

## Testing Strategy

**Decision**: Use Vitest 5, React Testing Library, and jsdom for synchronous rendered behavior. Use
Playwright with `@axe-core/playwright` for the critical browser journey, automated accessibility
checks, keyboard access, outbound-link contract, reflow, and a small device/browser matrix. Test the
Telegram destination's href, not Telegram's service behavior.

**Rationale**: Component tests give fast feedback on semantic contracts, while Playwright verifies
the user-critical journey in a browser. Telegram remains an external boundary.

**Alternatives considered**:

- Snapshots as the primary check: rejected because they overfit markup and do not prove behavior.
- Vitest only: rejected because responsive layout and actual focus/navigation need browser coverage.
- Cypress or Jest in addition: rejected because duplicate runners add cost without feature value.

**Sources**:

- [Next.js Vitest guide](https://nextjs.org/docs/app/guides/testing/vitest)
- [Next.js testing overview](https://nextjs.org/docs/app/guides/testing)
- [Playwright installation](https://playwright.dev/docs/intro)
- [Playwright accessibility testing](https://playwright.dev/docs/accessibility-testing)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## Axios and Future API Boundary

**Decision**: Axios is the mandatory HTTP client for future application API calls, but it MUST NOT be
installed or wrapped in this landing-page release. The first API-consuming feature will add a typed,
service-scoped Axios instance with a validated base URL, finite timeout, cancellation, normalized
errors, and instance-scoped credentials.

**Rationale**: There is no API consumer in the approved scope. Installing Axios or creating an empty
client now would violate the constitution's no-unused-dependency and no-speculative-abstraction rules.
Recording the future contract preserves the user's technology decision without shipping dead code.

**Alternatives considered**:

- Install Axios immediately: rejected because no request exercises or verifies it.
- Native `fetch` for future APIs: technically sufficient but rejected because Axios is an explicit
  project decision.
- Browser-to-database calls: rejected because privileged data access belongs behind an authenticated
  application boundary.

**Sources**:

- [Creating an Axios instance](https://axios-http.com/docs/instance)
- [Axios request configuration](https://axios-http.com/docs/req_config)
- [Axios cancellation](https://axios-http.com/docs/cancellation)

## Internationalization and Public Configuration

**Decision**: Use `next-intl` 4.13.4 without locale-based routing. Spanish (`es`) is the default and
only enabled release locale at `/`. Keep language-neutral public settings in `src/config/site.ts`, the
locale registry in `src/i18n/config.ts`, request configuration in `src/i18n/request.ts`, and every
user-visible string in the namespaced `messages/es.json` catalog. Enable TypeScript augmentation from
the Spanish source catalog, generate exact message declarations for ICU argument typing, and enforce
catalog key parity in tests when another locale is added. Validate the Telegram destination during
build and expose no secret configuration.

**Rationale**: `next-intl` officially supports a static locale in request configuration that can be
adapted later, works with Server Components and static rendering, and provides ICU messages and
type-safe keys. This keeps the approved `/` route and static export simple while ensuring a new
language does not require component or layout edits. Locale selection and localized URLs become
meaningful only when a second catalog is approved.

**Alternatives considered**:

- Hardcoded strings inside components: rejected by the constitution.
- A custom translation helper: rejected because it would recreate message lookup, interpolation,
  pluralization, and typing already provided by the chosen dependency.
- Locale-prefixed routes and automatic negotiation now: rejected because they add routing and
  redirect behavior for a release with one selectable language and would change the approved `/`
  contract.
- Runtime content management: rejected because content publishing is outside this release.

**Sources**:

- [next-intl first translations](https://learn.next-intl.dev/chapters/03-translations/01-setup)
- [next-intl capabilities](https://next-intl.dev/)
- [next-intl TypeScript augmentation](https://next-intl.dev/docs/workflows/typescript)
- [next-intl releases](https://github.com/amannn/next-intl/releases)
