<!--
Sync Impact Report
- Version change: 1.0.0 -> 1.1.0
- Modified principles:
  - IV. Verification Is Required -> expanded boundary-mocking and regression-test rules
- Added principles:
  - VI. Documentation Tracks Delivery
- Materially expanded sections:
  - Engineering Constraints: canonical tooling and internationalization policy
  - Development Workflow: Definition of Ready, documentation mapping, and completion gates
- Added sections: none
- Removed sections: none
- Follow-up TODOs: none
-->
# Gastto Frontend Constitution

## Core Principles

### I. User-Centered and Accessible
Every user-facing change MUST begin with a defined user outcome and MUST preserve keyboard
operation, semantic structure, readable contrast, visible focus, and assistive-technology support.
Loading, empty, error, and success states MUST be intentionally designed when they can occur.
Accessibility defects are functional defects, because the product is incomplete when users cannot
perceive or operate it.

### II. Cohesive Components
UI behavior and presentation MUST be implemented through components with a single clear purpose,
explicit inputs and outputs, and ownership close to the feature that uses them. Shared components
MUST represent proven reuse across features and MUST document their supported variants; speculative
abstractions and feature-specific behavior in global components are prohibited. Existing design
tokens and interaction patterns MUST be reused before introducing new ones so the interface remains
consistent and maintainable.

### III. Explicit State and Contracts
Remote data, local state, navigation state, and derived values MUST have distinct ownership. API
boundaries MUST validate or safely narrow untrusted data, model expected failures, and avoid leaking
transport details into presentation components. A single source of truth MUST exist for each piece
of mutable state, and duplicated derived state is prohibited unless a documented performance
measurement justifies it. These rules make behavior predictable under latency, failure, and change.

### IV. Verification Is Required
Each behavior change MUST include automated verification at the lowest effective level. Pure logic
and component behavior require focused tests; user-critical journeys, integration boundaries, and
regressions require integration or end-to-end coverage. Tests MUST assert observable behavior rather
than private implementation details. Tests MUST mock external boundaries such as network, storage,
time, and authentication rather than the core behavior under test. Every reproducible production
defect MUST first be captured by a failing regression test; an exception requires its rationale and
manual verification to be recorded in the review. The relevant lint, type-check, test, and build
checks MUST pass before merge, and skipped tests MUST NOT be used to make a required check pass.

### V. Simplicity and Measured Quality
Implementations MUST use the smallest design that fully satisfies the approved specification.
Dependencies, abstractions, caching, and client-side state MUST NOT be added without a concrete need
and a stated ownership cost. Performance or bundle optimizations MUST be based on reproducible
measurements and MUST preserve correctness and accessibility. Complexity that remains after review
MUST be documented with its tradeoff so future maintainers can reassess it.

### VI. Documentation Tracks Delivery
Documentation is part of the delivered product and MUST change in the same work as the behavior it
describes. Functional and API changes MUST update their feature contract; data-model, configuration,
security, and UX changes MUST update the corresponding architecture or design documentation. A
decision with meaningful alternatives and lasting consequences MUST be recorded as an architecture
decision record, while routine choices MUST NOT generate ceremonial records. New documents MUST be
linked from the canonical documentation index. Code remains the runtime truth, but stale or missing
documentation blocks completion because it makes that truth unsafe to operate and extend.

## Engineering Constraints

- The selected framework, language, package manager, and browser support policy MUST be recorded in
  the implementation plan before application code depends on them. The repository MUST use one
  canonical package manager and commit only its lockfile.
- Secrets, credentials, and privileged authorization logic MUST NOT be shipped to the browser.
  Sensitive values MUST be excluded from source, logs, analytics, fixtures, and client persistence.
- User-controlled content MUST be treated as untrusted at every rendering and API boundary. Security
  controls supplied by the chosen framework MUST remain enabled unless an equivalent, reviewed
  control replaces them.
- Layouts MUST support the viewport sizes and input methods named in the feature specification.
  Browser-only APIs MUST have an explicit compatibility decision or a safe fallback.
- Source identifiers, file names, machine-readable keys, and technical contracts MUST use English.
  User-visible text MUST be supplied through translation resources rather than embedded directly in
  components, and every supported locale MUST define or deliberately inherit each shipped message.
- Production code MUST expose actionable failures without disclosing sensitive internals. Diagnostic
  output MUST be structured enough to identify the failed operation and MUST respect user privacy.

## Development Workflow

1. Work is ready for implementation only when it has a testable outcome, explicit included and
   excluded scope, expected affected artifacts, accessibility needs, and documented material risks.
2. The implementation plan MUST identify component boundaries, state ownership, data contracts,
   security implications, verification levels, documentation impacts, and any constitution exception
   before coding begins.
3. Tasks MUST be dependency-ordered and small enough to produce a reviewable, verifiable increment.
4. Reviewers MUST confirm specification acceptance criteria and constitution compliance. A reviewer
   MUST reject unexplained complexity, missing failure states, inaccessible interactions, or absent
   verification.
5. Documentation updates MUST follow the affected concern: feature or API behavior to the feature
   contract, data changes to the data model, UX changes to design guidance, configuration changes to
   environment guidance, and lasting tradeoffs to an architecture decision record.
6. A change is complete only when required checks pass with meaningful assertions, documentation and
   contracts reflect the delivered behavior, and any approved exception has an owner and removal
   condition.

## Governance

This constitution is the highest-priority engineering policy for Gastto Frontend. Feature
specifications, plans, tasks, reviews, and implementation decisions MUST comply with it. When another
project document conflicts with this constitution, this constitution governs until it is formally
amended.

Amendments MUST be proposed as a documented change that states the rationale, affected principles,
migration or remediation work, and intended semantic version bump. Approval requires explicit review
by the project's maintainers. An amendment takes effect only after this file, its Sync Impact Report,
version, and amendment date are updated together.

Constitution versions follow semantic versioning: MAJOR for removal or incompatible redefinition of
a principle or governance rule, MINOR for a new principle or materially expanded obligation, and
PATCH for clarifications that do not change required behavior. Compliance MUST be reviewed during
planning and code review. Exceptions MUST be narrow, time-bounded, documented in the relevant plan or
review, and include an accountable owner plus a condition for removal.

**Version**: 1.1.0 | **Ratified**: 2026-09-04 | **Last Amended**: 2026-09-04
