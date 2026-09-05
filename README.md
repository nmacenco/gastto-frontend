# Gastto Frontend

Spanish-first, statically exported marketing page for Gastto's conversational expense workflow and Telegram handoff.

## Development

Copy `.env.example` to `.env.local`, replace both public example URLs, then run:

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Quality gates: `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`, `pnpm test:e2e`, and `pnpm test:performance`.

## Feature documentation

- [Specification](specs/001-telegram-landing-page/spec.md)
- [Implementation plan](specs/001-telegram-landing-page/plan.md)
- [Tasks](specs/001-telegram-landing-page/tasks.md)
- [UI, i18n, and deferred HTTP contracts](specs/001-telegram-landing-page/contracts/)
- [Validation quickstart](specs/001-telegram-landing-page/quickstart.md)
- [Release evidence](specs/001-telegram-landing-page/validation.md)
