# UI Contract: Telegram Marketing Landing Page

## Experience Intent

Gastto's first web experience communicates calm financial clarity and conversational ease. It MUST
feel trustworthy enough for expense-related work, approachable enough for chat-based capture, and
visually distinct from Telegram. The page has one conversion goal: open the Gastto Telegram bot.

## Information Architecture

The `/` route MUST render these regions in order:

1. **Header**: Gastto wordmark and compact Telegram CTA.
2. **Hero**: outcome-led H1, short explanation, primary Telegram CTA, and an optional noninteractive
   visual showing a message becoming an organized spreadsheet row.
3. **How it works**: three ordered steps covering spreadsheet connection, conversational expense
   submission, and organized recording.
4. **Benefits**: three concise outcomes—fast capture, organized records, and continuity with the
   user's existing spreadsheet workflow.
5. **Reassurance**: accurate expectation that the CTA opens Telegram and Gastto works with Google
   Sheets or Excel; no unsupported trust badges, testimonials, or security promises.
6. **Closing region**: final CTA followed by a minimal footer.

The hero H1 is the page's only level-one heading. Each major region after the hero uses a level-two
heading. Cards MAY use level-three headings when they introduce independently titled content.

## Responsive Layout

| Range | Layout contract |
|---|---|
| 320–767 CSS px | Single column; 16 px gutters; full-width primary CTA where useful |
| 768–1023 CSS px | 24 px gutters; cards MAY use two columns when content remains balanced |
| 1024 CSS px and above | 32 px gutters; maximum 1200 px container; hero MAY use a 55/45 split |

- Essential content MUST reflow without horizontal scrolling at 320 CSS pixels.
- Body text measure MUST remain between approximately 45 and 72 characters where practical.
- Section spacing is 64 px on small screens and scales to 96 px on large screens.
- Header behavior MUST not obscure focused elements or require a menu for this release.
- The desktop hero visual MUST follow the CTA in reading order when the layout becomes one column.

## Semantic Color Tokens

Tokens MUST be declared in `src/styles/theme.css` through Tailwind CSS 4's `@theme` directive and
imported once from `src/app/globals.css` after `@import "tailwindcss"`. Each `--color-*` token below
therefore exposes matching semantic utilities such as `bg-brand`, `text-muted`, and
`border-essential`. Components MUST use semantic utilities and MUST NOT use raw palette utilities or
arbitrary hexadecimal values.

| Token | Value | Intended use |
|---|---|---|
| `--color-surface` | `#FFFFFF` | Primary page and card surface |
| `--color-surface-subtle` | `#F8FAFC` | Alternating section surface |
| `--color-surface-strong` | `#0F172A` | Dark emphasis surface |
| `--color-text` | `#0F172A` | Primary text |
| `--color-text-muted` | `#475569` | Secondary text |
| `--color-brand` | `#0F766E` | Gastto primary action and emphasis |
| `--color-brand-hover` | `#115E59` | Gastto interactive hover/active state |
| `--color-brand-soft` | `#CCFBF1` | Brand-tinted surface |
| `--color-brand-soft-text` | `#115E59` | Text on brand-tinted surface |
| `--color-telegram` | `#229ED9` | Telegram icon or large decorative cue only |
| `--color-border-essential` | `#64748B` | Boundary when the border identifies a control |
| `--color-border-decorative` | `#E2E8F0` | Decorative separation only |
| `--color-danger` | `#DC2626` | Destructive/error emphasis |
| `--color-danger-soft` | `#FEF2F2` | Error surface |
| `--color-danger-text` | `#991B1B` | Error text on soft error surface |
| `--color-warning-soft` | `#FFFBEB` | Warning surface |
| `--color-warning-text` | `#92400E` | Warning text |
| `--color-success-soft` | `#F0FDF4` | Success surface |
| `--color-success-text` | `#166534` | Success text |

Gastto teal is the primary brand. Telegram blue MUST NOT replace it as the general interface color.
Because Telegram blue against white is only 3.02:1, it MUST NOT carry normal-size white text. The
primary CTA uses white text on Gastto teal and names Telegram in its copy.

## Verified Contrast Pairs

| Foreground | Background | Ratio | Approved use |
|---|---|---:|---|
| `#0F172A` | `#FFFFFF` | 17.85:1 | All text |
| `#475569` | `#FFFFFF` | 7.58:1 | Normal secondary text |
| `#0F172A` | `#F8FAFC` | 17.06:1 | All text |
| `#FFFFFF` | `#0F766E` | 5.47:1 | Normal CTA text |
| `#FFFFFF` | `#115E59` | 7.58:1 | Normal CTA text in hover/active state |
| `#115E59` | `#CCFBF1` | 6.73:1 | Normal text on brand-soft surface |
| `#0F766E` | `#CCFBF1` | 4.86:1 | Normal brand text on brand-soft surface |
| `#64748B` | `#FFFFFF` | 4.76:1 | Essential control boundary |
| `#DC2626` | `#FFFFFF` | 4.83:1 | Normal error text |
| `#991B1B` | `#FEF2F2` | 7.60:1 | Normal error text on error surface |
| `#92400E` | `#FFFBEB` | 6.84:1 | Normal warning text |
| `#166534` | `#F0FDF4` | 6.81:1 | Normal success text |

Every new token pair MUST be measured before use. Decorative borders MUST NOT be the sole means of
identifying a control or state.

## Tailwind Usage Rules

- Tailwind utilities are the default for layout, spacing, typography, responsive behavior, and
  interaction states.
- Class names MUST be statically discoverable; runtime string construction of partial utility names
  is prohibited.
- Repeated utility groups with shared behavior MUST be encapsulated in a component rather than copied
  across unrelated call sites.
- `@theme` holds reusable brand and application tokens. `:root` is reserved for variables that do not
  generate utilities.
- CSS Modules MAY be introduced only when a documented complex selector, third-party override, or
  interaction cannot be expressed clearly with utilities and variants.
- A component library and third-party Tailwind plugin MUST NOT be added without a concrete feature
  need and constitution review.
- Raw Tailwind palette names such as `teal-700` or `slate-900` MUST NOT appear in components when a
  Gastto semantic token exists.

## Typography

- Use one self-hosted variable sans-serif family, Inter, with
  `ui-sans-serif, system-ui, sans-serif` fallbacks.
- Body text: minimum 16 px, line height approximately 1.6.
- Supporting small text: minimum 14 px, line height approximately 1.5.
- H1: `clamp(2.5rem, 6vw, 4.75rem)`, line height 1.05.
- H2: `clamp(1.75rem, 4vw, 3rem)`, line height 1.15.
- Paragraphs MUST NOT use all caps. Letter spacing MUST preserve readability.
- Financial values or spreadsheet examples MUST use tabular numerals when alignment matters.

## Spacing, Shape, and Elevation

- Base spacing unit: 4 px.
- Approved spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, and 96 px.
- Control radius: 12 px.
- Feature-card or hero-visual radius: 20–24 px.
- Shadows MUST be subtle, MUST NOT be the sole boundary, and MUST NOT reduce text contrast.
- Primary actions MUST be at least 44 by 44 CSS pixels.

## Component Contracts

### Telegram Link

- Renders a real external link, not a scripted button.
- Uses the one validated Telegram destination from site configuration.
- Visible text explicitly names Telegram; no generic `Click here` label.
- Minimum target size is 44 by 44 CSS pixels.
- Variants are limited to `primary` and `compact`; both preserve the same accessible name and
  destination.
- If a new tab is later required, visible and accessible copy MUST announce that behavior. The
  default for this release is normal same-context navigation.

### Landing Sections

- Each section owns one content concern and accepts typed copy, not raw configuration access.
- Cards are not clickable containers; only the CTA is interactive.
- Imagery is supplementary. Informative imagery requires accurate alternative text; decorative
  imagery uses empty alternative text and cannot contain essential copy.
- Components remain Server Components unless a documented interaction requires browser state.

## Interaction and Motion

- Hover supplements but never replaces focus or active feedback.
- `:focus-visible` uses a two-color indicator: a 2 px white inner outline plus a 4 px
  `#0F172A` outer ring. It remains visible on light, dark, and teal surfaces.
- Transitions are limited to opacity or transform at approximately 150–200 ms.
- No carousel, autoplay, parallax, or information-bearing animation is allowed.
- Under reduced motion, nonessential animation and smooth scrolling are removed.
- Information and state MUST NOT be communicated by color alone.

## Content and Metadata Contract

- All user-facing strings—including metadata, accessible names, and informative alternative
  text—originate from the active `messages/{locale}.json` catalog and are read through `next-intl`.
- Spanish (`es`) is the only enabled locale in this release; the document root MUST render
  `lang="es"`.
- Components receive or resolve stable English message keys and MUST NOT contain Spanish literals.
- Page title, summary, canonical URL, and social preview MUST describe current capabilities only.
- The CTA destination originates from `src/config/site.ts`; it MUST NOT be duplicated in components.
- Message namespaces MUST follow page concerns (`Metadata`, `Header`, `Hero`, `HowItWorks`,
  `Benefits`, `Reassurance`, `FinalCta`, and `Footer`) so translators can work by context.
- Product review MUST approve the Spanish catalog, claims, canonical URL, Telegram destination, and
  social preview before release.
- This release MUST NOT show a language selector or perform locale detection.

## Release Verification

- Test semantic headings and landmarks with rendered-role queries.
- Test every CTA variant for accessible name and the same exact href.
- Test keyboard traversal and focus visibility in a real browser.
- Test at 320 px width and 200% zoom without horizontal overflow or lost content.
- Verify reduced-motion behavior.
- Perform automated contrast/accessibility checks plus manual keyboard and screen-reader smoke tests.
