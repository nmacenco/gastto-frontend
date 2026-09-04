# Implementation Plan: Telegram Marketing Landing Page

**Branch**: `001-telegram-landing-page` | **Date**: 2026-09-04 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/001-telegram-landing-page/spec.md`

**Note**: This template is filled in by the `$speckit-plan` command; its definition describes the
execution workflow.

## Summary

Create the initial Gastto frontend as a single public marketing page that explains the
conversational expense workflow and sends qualified visitors to the approved Telegram bot. Scaffold
the repository with Next.js App Router and strict TypeScript, render the route as a static export,
establish a reusable Gastto UX and visual-token foundation, and render all copy from a Spanish-first
`next-intl` message catalog that can accept additional locales without component changes. The
release has no database, authentication, internal API, chatbot integration, or client-side data
fetching. Axios is the
required client for future API integrations but is intentionally not installed until a real API
consumer and contract exist.

## Technical Context

**Language/Version**: TypeScript 5.x in strict mode; Node.js 22.12 or newer for development and
build tooling

**Primary Dependencies**: Next.js 16.3.3, React 19.2, React DOM 19.2, Tailwind CSS 4.x,
`@tailwindcss/postcss`, and `next-intl` 4.13.4. Axios is approved for future API calls but deferred
from this release because there are no API calls.

**Storage**: N/A; compile-time content and public configuration only, with no database or browser
persistence

**Testing**: Vitest 5 with React Testing Library and jsdom for component/integration behavior;
Playwright with `@axe-core/playwright` for the critical landing-to-Telegram journey, automated
accessibility checks, responsive checks, and keyboard behavior; manual accessibility and
content-comprehension review

**Target Platform**: Static web export for the Tailwind CSS 4 browser baseline: Chrome/Edge 111+,
Firefox 128+, and Safari 16.4+; responsive from 320 CSS pixels upward

**Project Type**: Single Next.js web application

**Performance Goals**: Primary value proposition and Telegram action visible within 2 seconds under
the agreed mobile-network profile; static output with no page-specific client JavaScript unless an
interaction proves it necessary

**Constraints**: No database, authentication, API route, Axios runtime dependency, analytics,
embedded chatbot, dashboard, or configuration UI; 200% text zoom without information loss; reduced
motion honored; all essential color pairs meet WCAG 2.2 AA contrast

**Scale/Scope**: One public route, Spanish as the only enabled launch locale, one locale registry and
message schema ready for additional catalogs, six semantic page regions, one canonical Telegram
destination, and a small shared design-token foundation intended to grow with later web features

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Pre-research evaluation: PASS**

- **I. User-Centered and Accessible**: The plan defines semantic structure, keyboard access,
  contrast-safe tokens, 200% zoom, responsive behavior, focus visibility, reduced motion, and
  explicit failure behavior for the Telegram destination.
- **II. Cohesive Components**: Components map to independent semantic landing sections. Only the
  repeated Telegram CTA is promoted to a shared UI primitive; speculative dashboard primitives are
  prohibited.
- **III. Explicit State and Contracts**: This release has no remote or mutable application state.
  Public site configuration, content, and CTA behavior have explicit compile-time contracts.
- **IV. Verification Is Required**: Vitest covers rendered semantics and CTA behavior; Playwright
  covers the critical browser journey and responsive/keyboard behavior. Telegram itself is treated
  as an external boundary and is not tested.
- **V. Simplicity and Measured Quality**: Static export, Server Components, Tailwind utilities, and
  no component library minimize complexity. `next-intl` has an immediate consumer in every rendered
  message; Axios is deferred until it has a concrete consumer.
- **VI. Documentation Tracks Delivery**: The UI contract, design tokens, data model, research, and
  quickstart are delivered with the plan.
- **Engineering Constraints**: pnpm is the sole package manager; only `pnpm-lock.yaml` is committed.
  Copy is outside components in a Spanish message catalog with stable English keys. No secret or
  privileged data reaches the browser.

**Post-design evaluation: PASS**

Phase 1 preserves every gate. The UI contract assigns component ownership and accessible states;
the i18n contract defines catalog ownership, typing, validation, and locale-addition boundaries; the
data model remains compile-time only; the HTTP client contract explicitly prevents premature Axios
installation and direct browser-to-database access. No constitution exception is required.

## Project Structure

### Documentation (this feature)

```text
specs/001-telegram-landing-page/
├── plan.md              # This file ($speckit-plan command output)
├── research.md          # Phase 0 output ($speckit-plan command)
├── data-model.md        # Phase 1 output ($speckit-plan command)
├── quickstart.md        # Phase 1 output ($speckit-plan command)
├── contracts/
│   ├── landing-page-ui.md
│   ├── i18n.md
│   └── http-client.md
└── tasks.md             # Phase 2 output ($speckit-tasks command - NOT created by $speckit-plan)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── landing/
│   │   ├── benefits-section.tsx
│   │   ├── final-cta-section.tsx
│   │   ├── hero-section.tsx
│   │   ├── how-it-works-section.tsx
│   │   ├── reassurance-section.tsx
│   │   ├── site-footer.tsx
│   │   └── site-header.tsx
│   └── ui/
│       └── telegram-link.tsx
├── config/
│   └── site.ts
├── i18n/
│   ├── config.ts
│   └── request.ts
├── styles/
│   └── theme.css
└── test/
    ├── landing-page.test.tsx
    └── setup.ts

e2e/
└── landing.spec.ts

public/
└── brand/

messages/
└── es.json

.env.example
.gitignore
eslint.config.mjs
global.ts
next.config.ts
package.json
playwright.config.ts
pnpm-lock.yaml
postcss.config.mjs
tsconfig.json
vitest.config.mts
```

**Structure Decision**: Use one App Router application at the repository root. The page remains a
synchronous Server Component composed from semantic landing-section components. Site facts and the
public Telegram destination live in `src/config/site.ts`; `src/i18n/config.ts` owns the locale
registry and default locale; `src/i18n/request.ts` loads the active catalog; all user-visible launch
copy lives in `messages/es.json` and is consumed through `next-intl`; `global.ts` augments
`next-intl` from the locale registry and source catalog, while generated message declarations remain
ignored; Tailwind's semantic brand theme lives in `src/styles/theme.css` and is imported once by
`src/app/globals.css`. Components use semantic utility classes, with CSS Modules
reserved only for a proven selector or interaction that utilities cannot express clearly. No `api`,
`services`, `database`, `auth`, or dashboard directories are created. The HTTP boundary described in
`contracts/http-client.md` is activated only by a later API-consuming feature. Locale routing,
automatic negotiation, and a language selector are not added until a second locale is approved.
