# SPEC-021 — Configurable event showcase

Recorded 2026-10-26 for AEGLYSAI-PORTAL-EVENT-001. Status: IMPLEMENTED locally for review; not deployed. See [delivery report](../hackathons/EVENT-001-REVIEW.md) for baseline, discovery, validation and limitations.

## Scope and contracts

Extend the existing static Astro/file-owned content architecture; no CMS, API, database, scheduler or registration export pipeline. `src/data/eventShowcase.ts` owns strict Astro-provided Zod schemas, typed contracts, sanitized public projection and the initial configuration. `EventShowcase.astro` separates rendering from data; `showcase-controller.js` progressively enhances native scrolling and a category select. The existing community route hosts the showcase. Existing empty legacy speaker/judge slots remain for compatibility; author new showcase people once in `people`, with role records referencing `personId` rather than copying identities. Legacy guest slots are not an alternate publishing pipeline for these records.

Seven categories: Partner, Keynote Speaker, Judge, Mentor, Participant, Team, Event Announcement. Stable IDs are unique within events/people/records. Roles and team members reference known people; team associations must reference the same event. Duplicate active public team membership within an event is rejected; private roster review remains authoritative. Public optional metadata includes reviewed identity/title/affiliation, biography/expertise, local image with alt, HTTPS website/LinkedIn, session, challenge, team association and announcement date. No optional field needs placeholder content. Unknown fields are rejected. Plain text is escaped by Astro, never inserted as HTML.

Editorial workflow: Draft → Approved → Scheduled → Published → Archived, manually reviewed through configuration changes. These values express editorial state, not proof of approval: independent content/organizer/consent/branding flags gate publication. Draft/Approved/Archived are hidden. Published or Scheduled additionally require public visibility, approved copy and applicable approvals. A Scheduled record requires `visibility.from`; time passing does not mutate editorial state. Suppression overrides publication. One build instant is supplied to each renderer, injectable for deterministic tests.

Visibility uses local calendar dates (`YYYY-MM-DD`), inclusive `from`, exclusive `until`, in the configured IANA event timezone. `announcementDate` is informational, never an automatic publication trigger. No official timezone was found: AEGYTHON's timezone is deliberately null. Date-gated records fail closed until an organizer supplies it. Builds evaluate visibility, so a fresh build/deployment is required at publication/expiry/withdrawal boundaries; a previously deployed static file cannot withdraw itself. No client clock or hidden-source payload. No social-media publication side effect.

## Authoring and approvals

1. Add a sanitized event/profile/record to configuration; a fourth partner uses the same shape/template with a new stable ID. Never add raw intake responses or private evidence, even to draft Git content. This repository is public.
2. Obtain official role, exact copy, affiliation, image/link and publication approvals privately. Set flags only after review. The `partner-announcement` template renders reviewed name/category/copy through the shared card; no endorsement or agreement is inferred.
3. For a person, use one profile and multiple event-role records. Confirm participation and consent on the profile. Reviewed affiliations require `affiliationVerified`; image publication requires branding approval. Public individual display always requires explicit profile consent.
4. Participant/team records additionally require public-display consent, organizer/content approval and private qualification/selection verification. All one-to-four team members must have confirmed, approved, consenting unsuppressed profiles. Team membership IDs never enter rendered output. These are administrative attestations, not automatic checks of Forms or private rosters. They do not change eligibility or selection rules.
5. Set public visibility/status/date bounds only after approval. Withdrawal: suppress the profile to hide all its roles and associated teams, or suppress one record; promptly rebuild/deploy and review cached copies. Remove withdrawn personal data from current configuration under the retention process. Git history is not erased by suppression.

PARTNER-001 Kalam Academy (2026-10-26), PARTNER-002 Startup Jharkhand (2026-10-27), PARTNER-003 GDG Ranchi (2026-10-28) are supplied planned records only: Draft, private visibility, all approvals false, no logos/copy/role claims.

## Presentation and acceptance

Configurable section ID/title/description/event/category plus cards/carousel layout. Only public records determine filter options. Cards use 3/2/1 columns at desktop/tablet/mobile sizes. Optional carousel uses native overflow, scroll snapping/touch swipe, Previous/Next, track ArrowLeft/ArrowRight/Home/End keys, labels and polite filter count. No autoplay. Links stay keyboard accessible; missing images use a neutral initial fallback, existing images lazy load at fixed square dimensions. Reduced motion disables smooth navigation. No JavaScript: all approved cards remain readable and native scroll works; enhancement-only filters/buttons stay hidden.

Acceptance: configuration-only fourth partner; shared speaker/judge identity; event/category filtering; strict references/links/assets; seven editorial/visibility/consent restrictions; timezone/DST boundaries; responsive/no-overflow/keyboard behavior; hidden drafts absent from generated HTML; unchanged challenge/forms/rules/rubrics/dates. Tests: `scripts/community/event-showcase.test.mjs`, optional local browser harness, existing check/build/test gates. Actual outcomes belong in delivery report/log.

Social assets: [reusable specification and templates](../hackathons/EVENT-SOCIAL-TEMPLATES.md). No image rendering engine or public unapproved partner graphic. No restricted research/enterprise claims added; Model D remains `enforcement_authority=NONE`.
