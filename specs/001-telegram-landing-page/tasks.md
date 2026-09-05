---

description: "Dependency-ordered implementation tasks for the Gastto Telegram marketing landing page"
---

# Tasks: Telegram Marketing Landing Page

**Input**: Design documents from `specs/001-telegram-landing-page/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/`, and
`quickstart.md`

**Tests**: Automated tests are required by the implementation plan and project constitution. Within
each story, add or extend the named tests before completing the corresponding behavior.

**Organization**: Tasks are grouped by user story so each story produces a reviewable and
independently testable increment. Shared scaffold and contracts are completed first.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel because it changes different files and does not depend on unfinished
  work in the same phase.
- **[Story]**: Maps the task to User Story 1, 2, or 3 from `spec.md`.
- Every checklist item names its implementation or verification path.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the Next.js, TypeScript, Tailwind, i18n, and test scaffold without adding any
database, API, authentication, analytics, or Axios runtime code.

- [X] T001 Initialize the pnpm project with pinned Next.js 16.3.3, React 19.2, `next-intl` 4.13.4, Tailwind 4, Vitest 5, React Testing Library, Playwright, axe, and development-only `@formatjs/icu-messageformat-parser` dependencies and scripts in `package.json` and `pnpm-lock.yaml`
- [X] T002 [P] Configure strict TypeScript, the `@/*` alias, Next.js types, and JSON-module support in `tsconfig.json` and `next-env.d.ts`
- [X] T003 [P] Configure ESLint and Tailwind's PostCSS integration in `eslint.config.mjs` and `postcss.config.mjs`
- [X] T004 [P] Configure Vitest with jsdom and shared cleanup/matcher initialization in `vitest.config.mts` and `src/test/setup.ts`
- [X] T005 [P] Configure Chromium pull-request coverage plus Chromium, Firefox, and WebKit release projects in `playwright.config.ts` and create the `e2e/` directory
- [X] T006 [P] Define safe public configuration examples and ignore local environment, build, coverage, and generated message-declaration files in `.env.example` and `.gitignore`

**Checkpoint**: The empty application scaffold installs and exposes `dev`, `lint`, `typecheck`,
`test`, `build`, and `test:e2e` commands.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Implement the validated public configuration, Spanish-first translation boundary,
message validation, and Gastto design tokens required by every user story.

**⚠️ CRITICAL**: No user-story component work begins until this phase is complete.

- [X] T007 [P] Add failing tests for canonical site URL and allowlisted Telegram URL validation, normalization, and secret-free failure behavior in `src/test/site-config.test.ts`
- [X] T008 [P] Add failing tests for the `es` default locale, BCP 47 registry entries, exact catalog-key parity, ICU argument parity, and malformed-message rejection in `src/test/i18n.test.ts`
- [X] T009 Implement immutable public site configuration with production-build validation for `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_TELEGRAM_BOT_URL` in `src/config/site.ts`
- [X] T010 Create the complete factual Spanish source catalog with the required `Metadata`, `Header`, `Hero`, `HowItWorks`, `Benefits`, `Reassurance`, `FinalCta`, and `Footer` namespaces in `messages/es.json`
- [X] T011 Configure the readonly locale registry, static Spanish request loader, `next-intl` plugin, and typed `AppConfig` augmentation in `src/i18n/config.ts`, `src/i18n/request.ts`, `next.config.ts`, and `global.ts`
- [X] T012 Implement catalog key and ICU-argument validation with the declared ICU parser and run it before production builds through `scripts/validate-messages.mjs` and `package.json`
- [X] T013 [P] Define the approved Gastto semantic color, typography, spacing, shape, focus, and motion tokens with Tailwind CSS 4 in `src/styles/theme.css` and `src/app/globals.css`
- [X] T014 Add a reusable `next-intl` test renderer after the Spanish catalog and i18n request configuration exist in `src/test/render.tsx`

**Checkpoint**: Configuration and translation tests pass; invalid URLs or catalogs fail clearly;
Spanish is available to Server Components; and semantic Tailwind utilities compile.

---

## Phase 3: User Story 1 - Understand Gastto Quickly (Priority: P1) 🎯 MVP

**Goal**: Deliver a complete Spanish landing-page narrative that identifies Gastto, explains its
current conversational expense workflow, and avoids advertising future dashboard functionality.

**Independent Test**: Render `/` with the Spanish catalog and verify that a first-time reviewer can
identify Gastto, conversational expense capture, Google Sheets or Excel organization, the three-step
journey, and an opening Telegram invitation without encountering future-feature claims.

### Tests for User Story 1

- [X] T015 [US1] Add failing rendered-behavior tests for the Spanish value proposition, single H1, semantic region order, three workflow steps, three benefits, spreadsheet destinations, opening Telegram invitation, and absence of future-feature claims in `src/test/landing-page.test.tsx`

### Implementation for User Story 1

- [X] T016 [US1] Implement the primary accessible Telegram link using the single validated destination and translated labels in `src/components/ui/telegram-link.tsx`
- [X] T017 [P] [US1] Implement the outcome-led hero and supplementary message-to-spreadsheet visual using translated content in `src/components/landing/hero-section.tsx`
- [X] T018 [P] [US1] Implement the ordered three-step product explanation using translated content in `src/components/landing/how-it-works-section.tsx`
- [X] T019 [P] [US1] Implement the three factual outcome cards using translated content and decorative-only icons in `src/components/landing/benefits-section.tsx`
- [X] T020 [P] [US1] Implement the Telegram and spreadsheet expectation-setting strip using translated content in `src/components/landing/reassurance-section.tsx`
- [X] T021 [P] [US1] Implement the Gastto identity header and minimal footer without unsupported navigation in `src/components/landing/site-header.tsx` and `src/components/landing/site-footer.tsx`
- [X] T022 [US1] Add the approved Inter variable font asset, load it locally with system fallbacks, and assemble the semantic page, Spanish document language, localized metadata, canonical URL, and generated social preview in `src/app/fonts/inter-var.woff2`, `src/app/page.tsx`, `src/app/layout.tsx`, and `src/app/opengraph-image.tsx`

**Checkpoint**: User Story 1 passes its component tests and works as a standalone Spanish marketing
page with one clear opening conversion invitation.

---

## Phase 4: User Story 2 - Start Using Gastto on Telegram (Priority: P2)

**Goal**: Make Telegram conversion clear and consistent from the header, hero, and closing region,
with accessible, predictable same-context navigation.

**Independent Test**: From each CTA placement, inspect and activate the link by keyboard and pointer;
all variants must explicitly name Telegram, expose the same accessible intent, and resolve to the one
approved public bot URL without testing Telegram's service behavior.

### Tests for User Story 2

- [X] T023 [US2] Extend component tests to fail unless header, hero, and closing CTA variants share the exact canonical href, translated accessible intent, real-link semantics, and supported variants in `src/test/landing-page.test.tsx`
- [X] T024 [P] [US2] Add a failing browser journey that intercepts external navigation and verifies keyboard traversal, focus visibility, and the three Telegram link placements in `e2e/landing.spec.ts`

### Implementation for User Story 2

- [X] T025 [US2] Complete the `primary` and `compact` Telegram link variants with 44-by-44-pixel targets and contract-compliant hover, focus-visible, and active states in `src/components/ui/telegram-link.tsx`
- [X] T026 [P] [US2] Implement the translated closing conversion section in `src/components/landing/final-cta-section.tsx`
- [X] T027 [US2] Add the compact header CTA and closing CTA to the page while preserving one destination and logical navigation order in `src/components/landing/site-header.tsx` and `src/app/page.tsx`

**Checkpoint**: User Stories 1 and 2 pass independently, and every conversion path is accessible and
consistent without invoking Telegram during automated tests.

---

## Phase 5: User Story 3 - Evaluate Gastto on Any Common Device (Priority: P3)

**Goal**: Make the complete Spanish page readable and operable across the supported browser,
viewport, zoom, keyboard, assistive-technology, and motion-preference matrix.

**Independent Test**: Review the complete page at 320 px, tablet, and 1280 px widths; at 200% text
zoom; with reduced motion; and by keyboard. Confirm correct Spanish content and metadata, no essential
horizontal overflow or clipping, preserved content order, visible focus, and no serious or critical
axe finding.

### Tests for User Story 3

- [X] T028 [US3] Extend component tests for Spanish metadata/messages, `<html lang="es">`, translated accessible text, supplementary imagery, and source-catalog use in `src/test/landing-page.test.tsx`
- [X] T029 [P] [US3] Extend browser tests for 320 px, tablet, and desktop reflow, 200% zoom, reduced motion, minimum target size, semantic order, and axe results in `e2e/landing.spec.ts`

### Implementation for User Story 3

- [X] T030 [US3] Apply the mobile-first 320/768/1024 responsive layout, resilient text wrapping, reading order, and maximum content measures across `src/app/page.tsx`, `src/components/landing/hero-section.tsx`, `src/components/landing/how-it-works-section.tsx`, `src/components/landing/benefits-section.tsx`, `src/components/landing/reassurance-section.tsx`, and `src/components/landing/final-cta-section.tsx`
- [X] T031 [P] [US3] Implement global 200% zoom resilience, reduced-motion overrides, and the two-color focus-visible treatment in `src/app/globals.css` and `src/styles/theme.css`
- [X] T032 [US3] Resolve all story-level accessibility and responsive failures while preserving semantic-token use in `src/components/landing/site-header.tsx`, `src/components/landing/site-footer.tsx`, and `src/components/ui/telegram-link.tsx`

**Checkpoint**: All three user stories pass their component and browser verification across the
supported experience matrix.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Prove translation extensibility, static output, performance, scope discipline, and
documentation completeness before release.

- [X] T033 [P] Add a non-shipping test catalog and verification case proving a locale can match keys and ICU arguments and render without component edits in `src/test/fixtures/messages/test.json` and `src/test/i18n.test.ts`
- [X] T034 [P] Link the feature specification, plan, contracts, tasks, quickstart guide, and validation evidence from the repository documentation index in `README.md`
- [ ] T035 Run `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`, and `pnpm test:e2e`, require every automated gate to pass, and record dated results in `specs/001-telegram-landing-page/validation.md`
- [X] T036 Add and run a Chromium performance test with 20 cold contexts at 390-by-844 pixels, 1.6 Mbps download, 750 Kbps upload, 150 ms round-trip latency, and 4x CPU slowdown; require the hero heading and primary CTA to be visible within 2 seconds in at least 19 runs and record results in `e2e/performance.spec.ts` and `specs/001-telegram-landing-page/validation.md`
- [X] T037 Inspect the generated `out/` and browser network trace for static `/` output, absent API/database/auth/analytics traffic, and absent Axios runtime code, then record the evidence in `specs/001-telegram-landing-page/validation.md`
- [ ] T038 Complete Spanish copy/claims, visual, keyboard, screen-reader, font-fallback, and social-preview review against all release inputs and record approval status in `specs/001-telegram-landing-page/validation.md`
- [ ] T039 Run the comprehension and conversion protocol with at least 20 representative first-time participants—10 seconds exposure for SC-001/SC-002 and a timed CTA-finding attempt for SC-003—then record anonymized counts, percentages, timings, device mix, and pass/fail results in `specs/001-telegram-landing-page/validation.md`

**Checkpoint**: All automated gates pass, manual reviews are recorded, the output remains static and
scope-clean, and the feature documentation matches the delivered behavior.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Starts immediately.
- **Foundational (Phase 2)**: Depends on Setup and blocks every user story.
- **User Story 1 (Phase 3)**: Depends on Foundational and is the MVP.
- **User Story 2 (Phase 4)**: Depends on the page and initial Telegram link delivered by User Story 1.
- **User Story 3 (Phase 5)**: Depends on the complete content and conversion journey from User Stories
  1 and 2 so it can verify the final responsive experience.
- **Polish (Phase 6)**: Depends on all selected user stories.

### User Story Dependency Graph

```text
Setup -> Foundation -> US1 (MVP) -> US2 -> US3 -> Polish/Release
```

The stories remain independently testable at their checkpoints even though this single-page feature
is most efficiently assembled in priority order.

### Within Each User Story

- Add the story's failing observable-behavior tests before completing its implementation.
- Resolve translated content and validated configuration through their shared boundaries; do not
  embed Spanish strings or duplicate the Telegram URL in components.
- Build semantic content before responsive polish.
- Finish and verify the story checkpoint before moving to the next priority.

### Parallel Opportunities

- In Setup, T002–T006 can proceed in parallel after T001 establishes the dependency manifest.
- In Foundation, T007 and T008 can be authored in parallel; T013 can proceed independently while
  T009–T012 complete the configuration and i18n chain. T014 follows T010 and T011.
- In User Story 1, T017–T021 can proceed in parallel after T016 defines the shared CTA contract.
- In User Story 2, T024 and T026 can proceed in parallel with work that does not edit their files.
- In User Story 3, T029 and T031 can proceed in parallel with the component-layout work.
- In Polish, T033 and T034 can proceed in parallel before the final sequential gates.

---

## Parallel Example: User Story 1

```text
Task T017: Implement src/components/landing/hero-section.tsx
Task T018: Implement src/components/landing/how-it-works-section.tsx
Task T019: Implement src/components/landing/benefits-section.tsx
Task T020: Implement src/components/landing/reassurance-section.tsx
Task T021: Implement src/components/landing/site-header.tsx and src/components/landing/site-footer.tsx
```

## Parallel Example: User Story 2

```text
Task T024: Add the Telegram browser journey in e2e/landing.spec.ts
Task T026: Implement src/components/landing/final-cta-section.tsx
```

## Parallel Example: User Story 3

```text
Task T029: Add responsive and accessibility browser coverage in e2e/landing.spec.ts
Task T031: Implement global zoom, motion, and focus behavior in src/app/globals.css and src/styles/theme.css
```

---

## Implementation Strategy

### MVP First: User Story 1

1. Complete Setup and Foundation.
2. Complete User Story 1 through T022.
3. Stop and run the User Story 1 component tests.
4. Demo the Spanish page and validate product comprehension before expanding conversion placement.

### Incremental Delivery

1. **Foundation**: installable scaffold, validated public configuration, typed Spanish messages, and
   Gastto tokens.
2. **US1**: understandable, factual Spanish landing page.
3. **US2**: complete and accessible Telegram conversion journey.
4. **US3**: responsive and accessible release matrix.
5. **Polish**: translation proof, static-output evidence, approvals, and full gates.

### Scope Guardrails

- Do not install Axios until an approved API-consuming feature exists.
- Do not create API, database, authentication, analytics, dashboard, or chatbot-integration code.
- Do not add locale routes, negotiation, cookies, or a language selector in this release.
- Do not assert Telegram's live content or uptime in automated tests.
- Commit after each task or small logical group and validate at every checkpoint.
