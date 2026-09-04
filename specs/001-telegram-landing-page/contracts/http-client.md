# Deferred Contract: Future HTTP Client Boundary

## Status

Approved architecture for the later database-backed configuration frontend. It is documented now
because Axios is a project decision, but it MUST NOT be implemented or installed by the Telegram
landing-page feature.

## Activation Criteria

Activate this contract only when an approved feature specification defines at least one real
application API endpoint, its authentication model, request and response shapes, error behavior, and
user-facing loading/empty/error/success states.

## Boundary Rules

- Axios is the required HTTP client for application API calls.
- UI components MUST NOT import Axios directly.
- Each external service receives one typed, service-scoped Axios instance created with
  `axios.create()`; global Axios defaults MUST NOT be mutated.
- Feature/domain service functions consume the client and return validated domain values rather than
  raw transport responses.
- The base URL MUST be a validated HTTPS origin. Request paths MUST come from owned relative endpoint
  definitions, not untrusted user input.
- `allowAbsoluteUrls: false` MUST be set as defense in depth, but MUST NOT be treated as URL
  validation.
- Every client MUST use a finite timeout. The initial default is 10 seconds and may change only from
  observed endpoint behavior.
- Public callers MUST be able to pass an `AbortSignal`; obsolete requests are canceled with
  `AbortController`, never deprecated cancellation tokens.
- Default non-success status rejection is preserved. Unknown failures are narrowed and normalized to
  stable UI categories: canceled, timeout, unauthenticated, unauthorized, validation/conflict,
  unavailable/network, and unexpected.
- User-visible errors come from localized application copy. Raw response bodies, request config,
  stack traces, tokens, and credentials MUST NOT be rendered or logged.
- Credentials and interceptors are scoped to the owned instance and origin. Interceptors are added
  only for an evidenced cross-cutting concern and require focused tests.
- Automatic retries are disabled initially. A later plan MAY add bounded retry with backoff for safe,
  idempotent transient failures; mutations MUST NOT be retried automatically without an idempotency
  contract.

## Data and Security Boundary

The browser MUST communicate with an authenticated application API or backend-for-frontend. It MUST
NOT receive database credentials or connect directly to privileged database interfaces. Secrets MUST
never use public browser environment variables.

## Deferred Structure

When activated, a feature plan may introduce the smallest proven structure, for example:

```text
src/
├── lib/http/
│   ├── client.ts
│   └── errors.ts
└── features/category-settings/api/
    ├── contracts.ts
    └── service.ts
```

These paths are illustrative and MUST NOT be created before a consumer exists.

## Required Verification When Activated

- Instance configuration and URL validation.
- Timeout and cancellation normalization.
- Authentication and authorization failure mapping.
- Validation/conflict and unavailable/network states.
- Redaction of secret-bearing error fields.
- No transport types crossing into presentation components.
- Loading, empty, error, and success behavior at the consuming user journey.

## Sources

- [Creating an Axios instance](https://axios-http.com/docs/instance)
- [Axios request configuration](https://axios-http.com/docs/req_config)
- [Axios error handling](https://axios-http.com/docs/handling_errors)
- [Axios cancellation](https://axios-http.com/docs/cancellation)
