# Validation Evidence: Telegram Marketing Landing Page

**Validation date**: 2026-09-05  
**Environment**: Node.js 24.11.1, pnpm 11.1.2, Playwright 1.62.1, Linux  
**Public test configuration**: `https://gastto.example` and `https://t.me/gastto_bot`

The public values above are safe test fixtures, not approved production release values. Production
builds intentionally fail when either required public value is absent or invalid.

## Automated quality gates

| Gate | Result | Evidence |
|---|---|---|
| `pnpm lint` | PASS | ESLint completed with no findings. |
| `pnpm typecheck` | PASS | Strict TypeScript completed with no diagnostics. |
| `pnpm test` | PASS | 3 files and 15 tests passed. |
| `pnpm build` with public test configuration | PASS | Message validation passed and Next.js emitted static `/`, `/_not-found`, and `/opengraph-image` output. |
| Chromium landing suite | PASS | 6 of 6 tests passed. |
| Firefox landing suite | PASS | 6 of 6 tests passed. |
| WebKit landing suite | BLOCKED | The host lacks the GTK, GStreamer, codec, font, and WebKit runtime libraries. `playwright install-deps` could not elevate because interactive sudo credentials are unavailable. No application assertion ran or failed. |
| Full `pnpm test:e2e` release gate | BLOCKED | Chromium and Firefox passed; WebKit could not launch for the host reason above. The performance spec is excluded from this matrix and runs only through `pnpm test:performance`, so the normal matrix contains no intentional skips. |

The browser journey intercepts the external Telegram request and aborts it at the owned test
boundary. It does not depend on Telegram content or availability. Chromium and Firefox verified the
three identical destinations, keyboard traversal, visible focus, 320/768/1280 px reflow, 200% text
zoom, reduced motion, minimum target size, Spanish document metadata, supplementary imagery, and no
serious or critical axe violation.

## SC-005 performance protocol

**Result**: PASS — 20 of 20 cold Chromium contexts completed within 2 seconds; 19 were required.

- Viewport: 390 × 844 CSS pixels
- Network: 1.6 Mbps download, 750 Kbps upload, 150 ms latency
- CPU: 4× slowdown
- Cache isolation: a new browser context for every run
- Measurement: navigation start until both the H1 and hero Telegram CTA were visible
- Timings in milliseconds: 1458, 1128, 1040, 1001, 1050, 1111, 1201, 1014, 1003, 1030, 1099,
  1086, 1144, 1101, 1051, 982, 1014, 1059, 1075, 1064
- Range: 982–1458 ms

The accompanying static-page browser request capture passed and observed no API, authentication,
analytics, or Telegram request during initial load.

## Static output and scope inspection

**Result**: PASS

- `out/index.html` exists and declares `<html lang="es">`.
- The generated page contains the localized title, description, canonical URL, Open Graph fields,
  Twitter fields, complete landing narrative, and all three canonical Telegram links.
- `out/opengraph-image` exists as a 1200 × 630 generated social preview.
- Browser request capture showed only the local static origin during page load.
- Searches of generated HTML, JavaScript, JSON, and text found no Axios, authentication, or
  analytics runtime marker.
- `package.json` and `pnpm-lock.yaml` contain no Axios dependency.
- `src/` contains no API, database, authentication, analytics, or route-handler area.

## Release review status

| Review | Status | Evidence / remaining action |
|---|---|---|
| Spanish copy and current-capability claims | IMPLEMENTATION REVIEW PASS; PRODUCT APPROVAL PENDING | Copy consistently describes Telegram expense capture and Google Sheets/Excel organization. No dashboard, category-management, account, database, pricing, analytics, or other future feature is advertised. Product owner must approve final wording. |
| Responsive visual review | PASS | Full-page Chromium captures at 390 × 844 and 1280 × 900 show intact hierarchy, wrapping, cards, reassurance, CTA, and footer without clipping. |
| Keyboard and automated accessibility | PASS IN CHROMIUM/FIREFOX | The browser suites verify logical CTA focus, visible focus treatment, 44 px targets, semantic order, and no serious/critical axe result. WebKit remains host-blocked. |
| Screen-reader smoke review | PENDING HUMAN REVIEW | Run the release page with the team's supported screen reader/browser combinations and record reviewer, date, and result. |
| Font-fallback review | PENDING HUMAN REVIEW | Block or remove the Inter asset in a release browser, confirm the declared system fallback remains readable without clipping, and record reviewer, date, and result. |
| Social preview review | IMPLEMENTATION REVIEW PASS; PRODUCT APPROVAL PENDING | The generated 1200 × 630 image is readable, on-brand, and describes current functionality only. Product owner must approve the final asset. |
| Production URLs | PENDING PRODUCT APPROVAL | Replace the safe test values with the approved canonical production origin and public Gastto bot URL before release. |

## Representative-participant protocol

**Status**: PENDING — no participant results were supplied or collected during implementation.

Before release, recruit at least 20 representative first-time participants and record anonymized
per-participant purpose/spreadsheet correctness, CTA timing and success, and device type. Aggregate
the results against these required thresholds:

- SC-001: at least 18 of 20 correctly explain Gastto's purpose after 10 seconds.
- SC-002: at least 18 of 20 identify the linked-spreadsheet outcome after 10 seconds.
- SC-003: at least 19 of 20 find and activate a Telegram CTA within 15 seconds.

Do not mark this protocol complete without the anonymized observations, counts, percentages,
timings, device mix, and pass/fail calculations.

## Release conclusion

The implementation, unit/component tests, static build, Chromium/Firefox browser coverage,
performance target, and static scope guard pass. Release approval remains blocked by WebKit host
dependencies, the manual screen-reader and font-fallback smoke reviews, product approval of final
copy/assets/URLs, and the 20-participant comprehension/conversion protocol.
