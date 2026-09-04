# Data Model: Telegram Marketing Landing Page

## Persistence Decision

This feature has no persistent or user-generated data. It MUST NOT create a database connection,
schema, migration, browser-storage record, API model, authentication state, or chatbot session.
Everything below is immutable site configuration or locale content evaluated at build time.

## Site Configuration

Represents public, machine-readable settings shared by page metadata and calls to action.

| Field | Type | Required | Validation |
|---|---|---:|---|
| `productName` | string | Yes | Non-empty; canonical value is `Gastto` |
| `canonicalSiteUrl` | HTTPS URL | Yes | Absolute public origin; no credentials or query string |
| `telegramBotUrl` | HTTPS URL | Yes | Approved public Telegram bot URL on an allowlisted host |
| `socialImagePath` | public path | Yes | Local static asset or generated static image path |

Rules:

- Configuration is public and MUST contain no secret, token, credential, or private endpoint.
- Invalid or missing required values MUST fail the production build rather than render a broken CTA.
- Every Telegram CTA MUST consume the same normalized `telegramBotUrl` value.

## Locale Registry

Represents the languages known to the application independently from rendering components.

| Field | Type | Required | Validation |
|---|---|---:|---|
| `defaultLocale` | language tag | Yes | Must be a member of `supportedLocales`; initial value `es` |
| `supportedLocales` | readonly language-tag list | Yes | Unique values; initial value `["es"]` |
| `localeLabels` | language-tag map | Yes | One endonym for each supported locale; initial `es: Español` |

Rules:

- Locale tags MUST follow BCP 47 and use the least specific tag that matches the translated content.
- Adding a supported locale MUST require one registry entry and one complete message catalog, but no
  landing-component change.
- Locale routing, negotiation, and selection are separate presentation concerns and MUST NOT be
  inferred merely because a catalog exists.

## Landing Message Catalog

Represents every user-visible message for one locale. `messages/es.json` is the source catalog and
defines the TypeScript message-key schema.

| Field | Type | Required | Validation |
|---|---|---:|---|
| `metadata` | Metadata Copy | Yes | Accurate title and summary; no future-feature claims |
| `header` | Header Copy | Yes | Product label and concise CTA label |
| `hero` | Hero Copy | Yes | One H1, one supporting paragraph, one CTA label |
| `steps` | list of Step | Yes | Exactly three ordered entries |
| `benefits` | list of Benefit | Yes | Exactly three concise entries |
| `reassurance` | Reassurance Copy | Yes | Explains Telegram handoff and spreadsheet destinations |
| `finalCallToAction` | CTA Copy | Yes | Closing prompt and same action intent as the hero |
| `footer` | Footer Copy | Yes | Minimal product identification only |

Rules:

- All copy MUST live outside rendering components.
- Namespace and message keys MUST be stable, descriptive English identifiers; translated values MUST
  contain only one locale.
- Every supported catalog MUST have the same keys and compatible ICU arguments as the Spanish source
  catalog. Missing, extra, or incompatible messages MUST fail validation.
- Copy MUST explain current behavior only: conversational expense capture and organization in a
  linked Google Sheet or Excel workbook.
- Dashboard, category configuration, web accounts, and direct database access MUST NOT appear as
  available capabilities.
- Headings MUST preserve a logical hierarchy when the content object is rendered.

## Step

Represents one stage of the product explanation.

| Field | Type | Required | Validation |
|---|---|---:|---|
| `id` | stable string | Yes | Unique, English, machine-readable identifier |
| `sequence` | integer | Yes | Values 1 through 3 with no gaps |
| `title` | string | Yes | Short action-oriented phrase |
| `description` | string | Yes | Explains one current product action or outcome |

The fixed sequence is:

1. Connect a supported spreadsheet.
2. Send an expense naturally in Telegram.
3. Gastto organizes the record in the selected spreadsheet.

## Benefit

Represents one concise value claim.

| Field | Type | Required | Validation |
|---|---|---:|---|
| `id` | stable string | Yes | Unique, English, machine-readable identifier |
| `title` | string | Yes | User outcome, not technical capability |
| `description` | string | Yes | Must be supported by the current Gastto application |
| `iconName` | approved icon key | No | Decorative by default; no meaning conveyed by icon alone |

Initial benefit themes are fast capture, organized expense records, and continued ownership through
the user's existing spreadsheet workflow.

## Telegram Call to Action

Represents the repeated conversion action.

| Field | Type | Required | Validation |
|---|---|---:|---|
| `label` | string | Yes | Explicitly names Telegram |
| `accessibleLabel` | string | Yes | Describes destination and external navigation |
| `destination` | Site Configuration reference | Yes | Resolves only to `telegramBotUrl` |
| `placement` | enum | Yes | `header`, `hero`, or `final` |

Relationships:

- All three CTA placements reference one site configuration value.
- CTA copy is provided by the active locale's message catalog.
- CTA visual states are governed by `contracts/landing-page-ui.md`.

## Brand Theme

Represents semantic UI tokens, not content or persisted preferences.

| Group | Values |
|---|---|
| Color | surfaces, text, brand, integration cue, borders, feedback |
| Typography | family, size, weight, line-height, measure |
| Spacing | 4-pixel base scale and responsive section spacing |
| Shape | control and card radii |
| Motion | duration, easing, and reduced-motion override |
| Focus | two-color visible focus treatment |

Raw palette values MUST be consumed through semantic tokens. Components MUST NOT introduce new raw
colors without updating the UI contract and verifying contrast.

## State Transitions

The page has no application state machine. The only interactive state belongs to a normal external
link:

```text
idle -> hover or focus-visible -> active -> external navigation
```

- Hover MUST NOT be the only indication of interactivity.
- Focus-visible MUST remain visible on every allowed background.
- Activation MUST use the canonical Telegram destination.
- A failed external destination MUST NOT erase or replace the landing-page content.
