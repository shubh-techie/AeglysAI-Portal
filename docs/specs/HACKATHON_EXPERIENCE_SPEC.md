# PORTAL-012 — AeglysAI Hackathon Experience Specification

## Current status — 2026-10-07 synchronization

COMPLETED / IMPLEMENTED experience and closure: `8431b47`, merged by `9030455`
(PR #12), tagged `v1.1.0` at the merge. Sponsorship extension `280fd65` merged by
`ba5c514` (PR #13). The original PLANNED heading/record tables below are a proposal
snapshot; later extensions plus this update identify actual implementation.
Current components are SeriesHero, EventCard, ParticipantJourney, PeopleSection,
FormCta, TechnicalIcon and EventDetails, with shared components reused; not every
original proposed component/type was implemented. Speaker event assignments and
fully specified milestone/activity schemas remain proposals, not existing typed records.
The red stylesheet is imported by the series and sponsors; event details/community
retain neutral styling. Five canonical form URLs remain null/closed. Handbook,
qualification, fork workflow and conditional certificate policy exist as static documents;
actual events, selection, certificates, challenge/research implementation, forms and
confirmed people remain PLANNED. No new dependency or backend is introduced.
Speaking & Presentations is a distinct planned portal module in the existing
[README roadmap](../../README.md#next-work); existing proposed talks and keynote do not
establish completed presentations.

Current baseline: `74c2963`, verified against local source and Git history. Implementation/merge
is not deployment evidence. The original dated task record follows unchanged.

### Speaking module follow-up — 2026-10-07

The subsequent user-authorized module is IMPLEMENTED locally in
[SPEC-010](SPEC-010-speaking-presentations.md): /speaking/, approved-record detail templates
and conditional featured cards. The earlier roadmap-only status above records the prior
snapshot. Creator metadata remains unchanged; no supplied PDF/content, recorded delivery,
keynote confirmation or new public person is inferred. Existing proposed talks and hackathon
speaker/judge arrangements retain their original status.

## Original task record

Recorded: 2026-10-03 (America/Chicago). Status: **PLANNED — specification for review**.
Baseline: clean `feature/hackathon-experience` at `9bb31ec`, which includes the repository-name cleanup, domain/brand migrations and theme work. This document defines future work; it does not implement a redesign, create forms, confirm arrangements or establish launch readiness.

## 1. Product objective and scope

AeglysAI Community Hackathons is proposed as a recurring, genuine engineering/community program for university students, graduate students, early-career engineers, platform engineers, cloud engineers, security engineers, SREs, AI/ML engineers and researchers. Software and distributed-systems practitioners remain welcome.

Goals are to attract participants to AeglysAI, support hands-on experimentation, generate independent technical contributions, build an engineering community, encourage GitHub participation, produce reproducible projects, create mentorship opportunities and connect students with experienced engineers/researchers. Goals are intentions, not evidence of existing participation or outcomes. Recurrence beyond the proposed series requires organizer approval and configured events.

**The dramatic red treatment is limited to `/hackathons/` and hackathon-specific components/styles mounted there.** Preserve Home, Research, Architecture, Experiments, Publications and About: their research identity, typography, layouts, architecture, navigation and accessibility behavior. Preserve the existing light/dark/system infrastructure everywhere. The shared header/footer retain their existing visual treatment; only a demonstrated minimal route-support change is permitted, and none is currently necessary.

Preserve `/hackathons/events/` and `/hackathons/community/`, existing event IDs/fragments, conduct information, application states and navigation. Those detail routes may consume updated shared event/profile/configuration data but retain their current styling; extending the dramatic treatment to them requires a separate scope decision. Do not remove existing content while reorganizing the landing page.

No custom authentication, participant database, judge login, Supabase, bulk-email infrastructure, Discord/Slack integration, new UI framework or hosting architecture in V1. Production remains static Astro on GitHub Pages at `https://aeglysai.com`, base `/`.

## 2. Observed baseline and evidence boundary

| Area | Existing implementation / evidence | This specification proposes |
| --- | --- | --- |
| Routes and navigation | Three hackathon routes, shared Layout/Header/Footer, HackathonNav | New landing-page section composition; existing routes survive |
| Events | Three PLANNED records in `src/data/hackathons.ts`, with month-only launch/submission windows | Track descriptions, lifecycle phases, configurable prize and engagement records |
| People | Three empty speaker slots and three empty judge slots in `src/data/hackathonPeople.ts`; confirmation plus public-display approval required | Speaker event assignments and explicit keynote reuse; no invented appointments |
| Creator | `src/data/creator.ts` owns Shubh Prabhat's identity, biography, original photo and verified links; keynote schedule PLANNED | Reuse this source, never copy a second biography/photo record |
| Forms | Registration, judge application and submission URLs null; disabled/missing-link states | Four named form settings, including a new speaker-interest setting |
| Theme | ThemeInit/ThemeControls use `aeglysai-theme`, root data attributes, localStorage and matchMedia; CSS uses light-dark() | Scoped red semantic tokens using the same theme engine |
| SEO | Layout accepts per-page metadata/social image; shared local 1200×630 preview; sitemap/robots derive from Astro site | Landing-only event-oriented metadata/preview; conditional structured event data |
| Operations | Draft workflow, submission requirements, proposed scoring and factual communication templates | Align UI/handbook with those drafts after official organizer decisions |

Models A–C remain described as implemented according to the portal content specification; the separate application source has not been audited here. Model D remains **PLANNED research**. Behavioral intelligence and autonomous resilience are challenge topics, not claims of deployed capabilities, validated research results or existing autonomous operation.

Related records: [program foundation](SPEC-003-hackathon-program.md), [participation workflow](SPEC-004-participation-workflow.md), [launch readiness specification](SPEC-005-launch-readiness.md), [production domain](SPEC-006-aeglysai-domain.md), [brand](SPEC-007-aeglysai-brand.md), [theme](SPEC-008-light-dark-theme.md), [operations](../hackathons/OPERATIONS.md), [judging](../hackathons/JUDGING_FRAMEWORK.md), [submission requirements](../hackathons/SUBMISSION_REQUIREMENTS.md) and [launch checklist](../hackathons/LAUNCH_READINESS.md). Earlier documents retain their original recording context. This proposal refines the landing experience without silently finalizing draft rules.

## 3. Page architecture: `/hackathons/`

Reuse Layout and one `<main>`; place an isolated `.hackathon-experience` wrapper **inside** main, outside the shared header/footer. One h1, ordered h2 sections, descriptive IDs and existing URL helpers. Keep Program/Events/Community navigation and an accessible Code of Conduct link.

| Section | Anchor | Content and behavior |
| --- | --- | --- |
| A. Hero | `series` | Series identity, headline, summary, interest/explore CTAs, technical motif and explicit planned status |
| B. Hackathon series | `challenges` | Three numbered event cards: question, themes, track summary, launch/submission windows, status, prize qualification and existing detail link |
| C. Why participate | `why-participate` | Six value cards; no outcome guarantees |
| D. How it works | `how-it-works` | Ordered registration-to-results workflow, requirements and privacy boundary |
| E. Community / engagement | `engagement` | Planned activities with required/optional/future labels and GitHub pathways |
| F. Speakers | `speakers` | Creator/planned keynote, three anonymous guest slots or approved confirmed profiles |
| G. Judges | `judges` | Three anonymous independent slots or approved confirmed profiles, rubric summary and Apply to Judge |
| H. Timeline | `timeline` | Three overlapping month windows plus ordered lifecycle; exact milestones only when configured |
| I. Resources | `resources` | Approved resource links, availability labels and core GitHub reference |
| J. FAQ | `faq` | Native details/summary or equivalent accessible static content; TBD answers remain explicit |
| K. Final CTA | `register-interest` | Repeat interest CTA and free-participation/provisional-terms note; secondary Explore Challenges link |

Use a clear reading sequence rather than carousels, animated counters or a mandatory sticky subnav. A section index is optional if it improves navigation without crowding mobile. Preserve the existing `#code-of-conduct` destination by keeping the conduct notice/link target on the landing page; do not break current invitation URLs.

### Hero copy

Eyebrow: **AEGLYSAI HACKATHON SERIES**. Series label: **2026–2027**. This uppercase treatment is intentional; prose and accessible names use AeglysAI.

Headline, with controlled visual line breaks:

```text
Build Secure.
Think Adaptive.
Engineer Resilience.
```

Supporting copy:

> Three community engineering challenges exploring adaptive authorization, behavioral intelligence and resilient distributed systems.

Primary CTA: **Register Interest**. Secondary CTA: **Explore Challenges**, linking to `#challenges` without JavaScript. Interest submission is a receipt of interest, not acceptance, eligibility or a reserved place. Form mode must accurately match the CTA; see configuration below.

Use a subtle technical grid and distributed-system/network motif, built with local SVG/CSS. Restrain the red gradient to small decorative regions. Do not use stock photographs, imply a deployed topology, show simulated live telemetry or invent participant counts.

## 4. Visual and theme contract

The research portal remains professional and restrained. Hackathons can be energetic, technical, competitive and community-oriented. Red communicates challenge, security and competition; it is not a danger/error indicator. Avoid gaming, cyberpunk, neon-heavy and casino-style treatments, heavy glow, flashing, parallax and excessive animation.

Reuse existing font stacks, readable body scale, spacing conventions and component geometry. More dramatic composition must come from the hero, red accents and restrained technical decoration, not a new type system. Keep long copy at a comfortable reading width and card text legible.

| Semantic token, local to wrapper | Light candidate | Dark candidate | Purpose |
| --- | --- | --- | --- |
| `--hackathon-background` | Off-white `#faf8f8` | Charcoal `#121214` | Section canvas, never a global body override |
| `--hackathon-surface` | White `#ffffff` | `#1c1c20` | Cards |
| `--hackathon-surface-secondary` | Red-tinted `#fff1f1` | Deep neutral/red `#281b1e` | Secondary panels |
| `--hackathon-text` | `#202024` | `#f5f5f6` | Primary text |
| `--hackathon-text-secondary` | `#55515a` | `#c3bcc5` | Supporting text |
| `--hackathon-accent` | Deep red `#b42332` | Restrained bright red `#ff8792` | Links, emphasis, outlines |
| `--hackathon-accent-hover` | `#921b28` | `#ffa8af` | Interactive hover |
| `--hackathon-border` | Subtle neutral `#c9bec3` | `#51464d` | Surface boundaries |
| `--hackathon-focus-ring` | Deep red `#b42332` | `#ffb0b8` | Visible keyboard focus |

These are **unvalidated candidate colors**, not an approved contrast result. Choose contrasting button text separately for each filled-button treatment; never assume white text works on the dark theme's light red. Validate actual foreground/background/gradient combinations before acceptance. Existing code-background, fonts and research-status tokens remain reusable; do not remap every semantic status to red.

Implement future tokens through CSS light-dark() inside the wrapper, respecting root color-scheme. Do not redefine `:root`, global `--cyan`, body styling, ThemeInit, storage keys or theme-color logic to create a second theme system. Shared components rendered outside the wrapper must not inherit hackathon colors. Header/footer and other routes must remain visually identical before/after. Existing no-JavaScript system styling and storage-failure behavior remain functional.

## 5. Event series and student difficulty tracks

All dates below are existing **planned month windows**. Launches are staggered approximately one month apart. Launch through submission covers approximately three calendar months; judging/showcase/results/follow-up may extend beyond that build window. Do not promise an exact 90-day duration, exact deadline or a new results date.

| Event / retained ID | Planned launch | Planned submission | Themes and core question |
| --- | --- | --- | --- |
| AeglysAI Adaptive Authorization Challenge / `adaptive-authorization` | November 2026 | January 2027 | Adaptive authorization, Zero Trust, RBAC, ABAC, contextual risk, policy explainability. How can authorization decisions adapt to changing risk while remaining explainable and policy-controlled? |
| AeglysAI Behavioral Risk Challenge / `behavioral-risk` | December 2026 | February 2027 | Behavioral signals, anomaly detection, risk scoring, identity/context intelligence, false-positive reduction. How can multiple behavioral and contextual signals be transformed into useful, explainable security risk evidence? |
| AeglysAI Autonomous Resilience Challenge / `autonomous-resilience` | January 2027 | March 2027 | Incident detection, resilience, observability, policy-bounded response, distributed-system recovery. How can systems respond intelligently to operational/security events without surrendering deterministic control? |

Each card includes its problem/question, theme tags, status text, the existing `/hackathons/events/#<id>` destination, planned dates and configured prize. Preserve detailed problem, challenge, eligibility, deliverables, rules and open-source expectations on the existing events route.

| Challenge | FOUNDATION: students/new engineers | ADVANCED: experienced engineers/researchers |
| --- | --- | --- |
| Authorization | Implement a contextual authorization prototype; explain rules and test permitted/denied cases | Design and experimentally evaluate adaptive risk-aware authorization against explicit baselines and policy constraints |
| Behavioral risk | Combine a few synthetic identity/context signals into explainable risk evidence; document false positives | Evaluate multiple signal methods, calibration and uncertainty with reproducible comparisons and false-positive analysis |
| Resilience | Detect an isolated failure, expose useful telemetry and perform a bounded recovery action | Evaluate closed-loop detection/response under varied failures, with explicit safeguards, rollback and resilience measurements |

Both tracks address the same broad problem at different depth. Track choice does not establish existing platform functionality. Starter support, track-specific expectations and whether tracks have separate rankings/awards are TBD; do not imply two prizes per event. Avoid compulsory specialist cloud spend; a reproducible local/synthetic path is the proposed default. Final technology constraints are TBD.

### Prize

Configure each event independently: planned amount `300`, currency `USD`, award status PLANNED, finalized official-rules URL nullable. Until terms/funding are finalized, display **Planned USD $300 Prize** with the exact qualification **“Prize details subject to official event rules.”** A compact “USD $300 Prize” label is acceptable only when the planned qualifier and qualification remain adjacent and accessible.

No sponsorship implied. No award or payment claim without supporting evidence. Funding, number of winning entries, track allocation, payment eligibility/process and any award conditions remain organizer decisions. Do not remove the qualification when a form becomes available.

## 6. Value and engagement model

| Value card | Proposed message / limitation |
| --- | --- |
| Learn | Explore authorization, risk and resilience through documented engineering problems |
| Build | Produce a scoped prototype or evaluation with reproducible evidence |
| Collaborate | Discuss tradeoffs and exchange constructive feedback; team eligibility TBD |
| Get Mentored | Proposed clinics/office hours, subject to confirmed mentor availability; no mentorship guarantee |
| Showcase Your Work | Planned demos or community writeups, subject to approval and consent; no guaranteed selection |
| Contribute to Open Source | Share useful code, tests, issues and documentation through normal maintainer review |

No promises of jobs, internships, recruitment, employment, publication or certificates. Contributions are not automatically accepted into the core project.

Activity classification is separate from evidence status: REQUIRED/OPTIONAL/FUTURE describes a proposed participation role; PLANNED/CONFIRMED/COMPLETED describes actual arrangements. Every session currently remains PLANNED or FUTURE, with no implied invitation, attendance or availability.

| Lifecycle/activity | Classification | Proposed handling |
| --- | --- | --- |
| Registration / review of finalized terms | REQUIRED for an entry seeking judging | Organizer must define whether interest converts to registration; interest alone is insufficient |
| Kickoff | OPTIONAL | Recorded/readable challenge brief must substitute for live attendance |
| Learning / technical workshop | OPTIONAL | Offer only if confirmed; no attendance-based scoring |
| Architecture clinic / office hours / mentor session | FUTURE | Publish availability only after mentors and capacity confirmed |
| Build phase | REQUIRED | Code/evaluation, safe tests and documentation |
| Midpoint / mentor checkpoint | OPTIONAL | Proposed progress template and feedback; no new eligibility gate |
| GitHub discussion / technical AMA | OPTIONAL | Asynchronous questions if an approved discussion destination exists |
| Submission | REQUIRED for judging | Official form, frozen artifact and required materials |
| Eligibility review / independent judging | REQUIRED organizer operations | Consistent published rules and non-conflicted review |
| Demo day / final showcase | OPTIONAL | Consent and accessible alternatives; not a hidden scoring requirement |
| Winner announcement | REQUIRED organizer operation if an award is selected | Verified selection only; payment reported separately |
| Open-source follow-up | OPTIONAL | Maintainer review, issues and approved public technical summaries |

The timeline orders Registration → Kickoff → Learning/Workshops → Build → Mentor Checkpoint → Submission → Judging → Demo/Showcase → Winner Announcement → Open-source Follow-up. Display unscheduled phases as “Schedule TBD”; optional/future activities must not appear confirmed. No countdown before an exact configured timestamp and time zone; countdowns are unnecessary in V1.

## 7. V1 participation workflow and forms

```text
Hackathon page → Participant Google Form → private Google Sheet
→ organizer-verified email confirmation → GitHub challenge/resources → build
→ Project Submission Form → eligibility check → independent judging
→ approved scoring/results → verified winner announcement → follow-up
```

Forms/Sheets and email are manual external operations. No browser-side Sheets writes, embedded spreadsheet, portal response storage or automatic email dispatch. Registration/interest confirmation acknowledges the actual response only; submission receipt is not eligibility, scoring is not a winner and selection is not payment. Reuse existing communication templates after verifying their send conditions.

### Configuration contract (proposed, no URLs supplied)

| Required new name | Purpose / current compatibility mapping |
| --- | --- |
| `PARTICIPANT_REGISTRATION_URL` | Public registration/interest responder URL; map existing PARTICIPANT_REGISTRATION_FORM_URL and PARTICIPANT_FORM_URL to one source |
| `JUDGE_APPLICATION_URL` | Apply to Judge; map existing JUDGE_INVITATION_FORM_URL |
| `SPEAKER_INTEREST_URL` | Speaker interest; new nullable setting, no existing URL |
| `PROJECT_SUBMISSION_URL` | Submit Project; map existing SUBMISSION_FORM_URL |

All four remain `null` until verified public responder URLs are provided. Retain old exported names as compatibility aliases if consumers still use them; do not maintain competing independently editable URLs. Conflicting duplicate values must fail validation. Event-specific overrides take precedence over the shared canonical setting; document whether explicit null means unavailable versus inherited. Proposed representation: undefined/inherit uses shared URL, null explicitly disables, string supplies the override; normalize current null data explicitly during migration, never activate an event accidentally.

A registration form also needs configured `mode: INTEREST | REGISTRATION`. The landing primary label stays Register Interest; its destination must accept interest honestly. If the organizer chooses registration-only collection, resolve CTA/form wording before opening that link; do not relabel registration as interest silently. Event detail Register for Hackathon CTAs require a true registration destination. Any automatic conversion of interest to registration is TBD, not implemented by aliases.

Unconfigured/unavailable links render a disabled native button plus visible availability text and aria-describedby, never `href="#"`, guessed URLs or clickable nonfunctional controls. Explore Challenges remains available. A string alone does not make applications open: organizer approval, lifecycle gate, privacy notice and finalized applicable terms are also required. Judge/speaker-interest collection has its own approval/privacy gates.

Allow only approved HTTPS public form responder URLs; reject malformed, private editor/Drive/Sheet links and unsafe schemes. Do not fetch external form status on page load. Test signed-out desktop/mobile access privately before publishing. Form IDs inside intentionally approved responder URLs are not an excuse to expose private Drive IDs or access-management URLs.

## 8. Data and component architecture

Keep existing source ownership; extend rather than duplicate `hackathons.ts`, `hackathonPeople.ts` and `hackathonSeo.ts`. Use explicit TypeScript models during future implementation; no production schema is changed by this document.

| Proposed record | Fields / constraints |
| --- | --- |
| Series | id, title, yearLabel, hero copy, audience, value cards, recurrence note, FAQ records, resource references |
| Event | retained id, title, problem, challenge, coreQuestion, themes, FOUNDATION/ADVANCED descriptions, evidence status, launch/submission month labels, nullable exact milestones/time zone, prize object, nullable officialRulesUrl, form overrides and availability gates, resource/activity references |
| Milestone | stable id, phase, ordered position, approximate month label or nullable exact timestamp/time zone, evidence status; no fabricated dates |
| Activity | id, eventId, title, REQUIRED/OPTIONAL/FUTURE classification, PLANNED/CONFIRMED/COMPLETED arrangement status, nullable schedule/destination/approved host reference, accessibility alternative |
| Forms | four canonical nullable URLs, compatibility aliases, mode, per-purpose availability; public links only |
| Speaker | name, title, nullable organization, nullable photo(path/alt), bio, topics[], nullable linkedin, event assignment(s), INVITED/CONFIRMED status, publicDisplayApproved boolean |
| Judge | name, title, nullable organization, nullable photo(path/alt), expertise[], bio, nullable linkedin, assigned_event assignment(s), INVITED/CONFIRMED status, publicDisplayApproved boolean |
| Person slot | id, role label, nullable person; three additional guest slots and three independent judge slots retained |
| Keynote | creator reference, event assignment(s), planned arrangement/schedule/topic; do not duplicate creator metadata |
| Resource / FAQ | stable id, label/question, approved URL or answer, availability PLANNED/AVAILABLE/TBD, related event; unavailable resources are not links |

Map `linkedin` to existing `linkedinUrl`, `expertise` to `technicalExpertise`, `assigned_event` to `eventAssignments`. Extend Speaker with event assignment support; keep existing consumers compatible. A speaker's event/topic arrangement is separate from profile approval. Null organization/LinkedIn/photo must not be inferred; missing photo uses an accessible initials or neutral placeholder, never a generated person.

Default publication remains the existing stricter policy: **CONFIRMED plus explicit publicDisplayApproved**. Invited people stay private and render anonymous planned slots. If a later organizer authorizes displaying an invited profile, require explicit permission and a prominent INVITED label and implement that policy separately; V1 does not relax the filter. Empty slots do not mean an invitation was sent. Never display fake judges, participants, speakers, partners, sponsors, winners, submissions or attendance counts.

Shubh Prabhat is the creator and proposed keynote; reuse verified identity/photo from creator.ts. Do not upgrade the existing keynote PLANNED arrangement to CONFIRMED or invent an affiliation, topic/date or LinkedIn address.

Proposed components, all under `src/components/hackathons/`: HackathonExperience, SeriesHero, EventCard, ValueCards, ParticipationSteps, EngagementSection, SpeakerSection, JudgeSection, SeriesTimeline, ResourcesSection, FaqSection and FinalCta. Prefer semantic sections and shared primitives over one component per decorative element. Reuse existing HackathonNav, HackathonPersonCard and CreatorProfile where practical; a scoped CTA wrapper may extend HackathonRegistration with an explicit label/mode prop without changing existing default labels. Import a dedicated `src/styles/hackathon-experience.css` only on the landing route. Static Astro/native HTML should be sufficient; no new client dependency proposed.

## 9. Judging and submissions

The following rubric is **proposed**, not finalized official terms. Map labels to the existing rubric without changing weights or discarding explainability.

| Category | Weight | Expected evidence |
| --- | --- | --- |
| Technical Correctness | 25% | Working behavior, appropriate tests and honest failure cases |
| Security Reasoning | 20% | Threat assumptions, policy boundaries, privacy and safeguards |
| Architecture Quality | 20% | Component/control flows, engineering tradeoffs and maintainability |
| Reproducibility | 15% | Versioned setup, review commit/tag, inputs and repeatable commands |
| Innovation | 10% | Useful original contribution relative to disclosed prior work |
| Documentation | 10% | Clear explanation, decision evidence, architecture and limitations |
| Total | 100% | No hidden attendance, video or reputation points |

Before opening submissions, finalize track scoring, eligibility, weights/anchors, tie handling and correction/appeal rules. Preserve the existing proposed 0–5 anchors and formula: category score / 5 × weight, summed to 100; average valid totals from at least two independent non-conflicted judges. Review a frozen artifact independently before seeing peer scores. Retain the proposed moderation threshold/third-review and security → correctness → reproducibility tie ordering from JUDGING_FRAMEWORK until explicitly reviewed; unresolved final tie fallback remains TBD. Do not invent a split prize or new tie category after submissions.

Require private disclosure of employment/reporting, collaboration, mentorship, personal/family, financial and submission-involvement conflicts before assignment and whenever discovered. Recuse/reassign affected judges; disclosure alone is insufficient. Keep conflicts and scoring records private. If qualified independent capacity is insufficient, defer/reassign review rather than fabricate it. Publish only approved results and consented identities.

Required submission components: public GitHub repository unless a prior exception is approved; README; **problem statement**; architecture; setup instructions; runnable demo or reproducible walkthrough; tests/evidence; security considerations; limitations; license information. Include event/track choice, exact review commit/tag, data provenance, dependency versions and attribution of reused work. Optional: video demo, benchmark results, research notes. Benchmarks need an honest method/environment; optional artifacts are not hidden eligibility requirements. A negative result may be valuable with sound evidence.

Use synthetic or appropriately licensed data and isolated systems the entrant is authorized to test. No secrets, personal data or sensitive incident material in public submissions. Do not imply repository licensing transfers ownership or guarantees acceptance into AeglysAI. Final license choices, repository-exception policy, prior-work limits, AI-assistance disclosure requirements and late/correction handling are TBD organizer terms.

## 10. Participant handbook and resources (future artifacts)

Phase 5 should create `docs/hackathons/README.md`, not in this task. It becomes a participant handbook with these sections:

| Section | Required future content / unresolved decisions |
| --- | --- |
| Welcome | Program purpose, engineering ethos and factual planned status |
| Who Can Participate | Intended audience; finalized age/geographic/student eligibility |
| Hackathon Series | Three challenges, difficulty tracks and configured dates |
| How to Register | Interest versus registration, approved form and confirmation meaning |
| Teams | Individual/team rules, maximum size and registration changes — TBD |
| Rules | Versioned official rules, exceptions and prior-work treatment — TBD |
| Code of Conduct | Existing expectations, approved private reporting and enforcement procedure — TBD |
| Challenge Requirements | Problem scope, foundation/advanced expectations and safe environment |
| Submission Requirements | Required/optional package, frozen artifact and submission channel |
| Judging | Final rubric, independent review, ties and appeals |
| Prize | Planned USD $300 per event and finalized award/payment conditions |
| Timeline | Month windows and exact dates/time zones only once configured |
| GitHub Guidelines | README, attribution, issue/PR conventions and maintainer review |
| Academic Integrity | Original contribution, reuse attribution and institution-compatible expectations; detailed policy TBD |
| AI Tool Usage | Proposed transparent assistance disclosure; allowed uses and review limits TBD |
| Security Rules | Authorized isolated testing, data/secret hygiene and private vulnerability reporting |
| FAQ | Consistent answers below, with visible TBD decisions |
| Contact | Approved organizer/conduct/accessibility channels — TBD; no guessed address |

Resources section specifies Hackathon README, Rules, Challenge specification, Starter repository, Architecture examples, Submission template, Judging rubric and Code of Conduct. Existing operational documents can inform participant-friendly resources, but must not be advertised as finalized official rules. Do not invent starter repositories, resource URLs, contacts or completed workshops. Resources have AVAILABLE/PLANNED/TBD labels; future files are plain “Coming soon” text until a real approved destination exists. Use the current core repository `https://github.com/shubh-techie/AeglysAI`; use `https://github.com/shubh-techie/AeglysAI-Portal` when referring to the website repository.

## 11. Community continuity

GitHub remains the primary engineering platform. Propose approved GitHub Discussions destinations (only if enabled), technical questions/AMAs, open issues, reviewed Good First Issues, follow-up challenges, technical writeups, community showcases and research discussions. Participants can continue contributing through normal issue/PR review. Contributor recognition and showcases require factual contribution evidence and permission for public identity; no automatic roster or claimed adoption.

Mentorship remains FUTURE until people/capacity are confirmed. Curate useful submitted work after consent and review; do not promise external publication. Preserve license/attribution and mark experimental findings appropriately. No Discord/Slack implementation, public participant database or community counters. Organizer capacity, discussion moderation and post-event ownership are TBD.

## 12. FAQ answer specification

| Question | Proposed answer |
| --- | --- |
| Is participation free? | Yes, participation is free. Do not require paid platform/cloud access; approved low-cost/local alternatives should be documented. |
| Who can participate? | Students, engineers and researchers are the intended audience. Final age, geography and eligibility terms: TBD. |
| Can students participate? | Students are explicitly welcome to express interest; FOUNDATION is designed for students/new engineers. Final eligibility: TBD. |
| Can teams participate? | TBD: organizer must approve team entry, size and composition. |
| Can I participate individually? | TBD: organizer must approve individual entry alongside any team rules. |
| Do I need prior AeglysAI experience? | Proposed: no prior experience required for FOUNDATION. Actual prerequisites/starter readiness: TBD. |
| What technologies can I use? | TBD: challenge constraints and reproducibility requirements must be published; no unsupported technology mandate. |
| Is the project open source? | AeglysAI is an open-source initiative. Public submission repositories are proposed unless a prior exception is approved; final licensing terms: TBD. |
| How are winners selected? | Proposed independent judging of eligible submissions using the published 100% rubric; final ties/appeals and track handling: TBD. |
| What is the prize? | Planned USD $300 per event. Prize details subject to official event rules. Funding/payment/award allocation: TBD. |
| Can international participants participate? | TBD: organizer must finalize geographic eligibility and award conditions before registration opens. |
| How do I become a judge? | Apply to Judge through the approved Google Form once configured; application does not confirm appointment. Criteria/assignment: TBD. |
| How do I become a speaker? | Express interest through the approved speaker form once configured; topic, availability and public-profile permission require organizer review. |

FAQ records must never silently replace TBD with a guessed policy. Use the same terms in the handbook, event detail pages and forms.

## 13. Privacy and safety of public information

Google Forms/Sheets responses remain private, with restricted organizer access. Do not publish emails, phone numbers, private applications, judge contact information, participant personal data, Drive/Sheet access links, conflict disclosures, score sheets or internal notes. Public profile permission is separate from participation consent. Only explicitly approved public speaker/judge fields may be rendered, subject to confirmation.

Before collection, organizers must decide and publish purpose, required/minimal fields, access roles, retention/deletion, correction/withdrawal and approved private contact. Do not prescribe a fabricated retention period or assume approval. Form permissions must be checked independently of the portal. Accessibility questions and sensitive reports need a private channel, not a public GitHub issue. Mentors/judges must not receive unnecessary application data. Do not embed tracking, analytics or a form/Sheet integration in the static portal.

## 14. SEO and social specification

For the landing only, propose title prop **“Community Hackathons 2026–2027”**, retaining Layout's current `| AeglysAI Research` suffix. Description:

> Explore three planned, free AeglysAI engineering hackathons on adaptive authorization, behavioral risk and resilient distributed systems, with student-friendly tracks.

Canonical and og:url remain `https://aeglysai.com/hackathons/`. Open Graph title/description and Twitter title/description match the page; retain the current factual site_name. Use an optional approved local 1200×630 hackathon-specific preview with AeglysAI name, 2026–2027 series and hero headline, restrained red design and readable text. No sponsors, people or prize-award claims in artwork. Retain the existing shared preview as fallback; do not replace the preview for other pages. Configure image path/alt/dimensions via the existing hackathon SEO interface and resolve absolute URLs from Astro site.

Existing event/community routes retain accurate metadata; no SEO changes to non-hackathon pages. Preserve sitemap/robots and root-path assets. Do not add a manifest/feed merely for this feature.

Structured Event metadata is conditional future output, not a fabricated launch signal: emit only for a real configured event with confirmed exact start/end/time zone and accurate event URL, organizer and attendance/location details. Do not convert month labels into invented day timestamps or assume a venue/online location. Prefer truthful omission while dates/arrangements are planned. Schema fields, event-status transitions, location and offers must mirror visible facts; never invent sponsorship, attendance, results or awards. If a small optional Layout head slot is eventually necessary, make it opt-in and preserve all other page output; no general metadata rewrite. Eligibility for external search presentation is not promised.

## 15. Responsive, accessibility and performance requirements

| Viewport | Proposed behavior |
| --- | --- |
| Desktop (above existing 1100px breakpoint) | Restrained two-column hero when useful; three event cards; balanced grids and readable timeline |
| Tablet (761–1100px) | Hero stacks when text needs room; event cards reflow to two or one column without equal-width cramped text; last card not artificially stretched |
| Mobile (760px and below) | Single-column hero/event/value/person content; CTAs stack as needed; timeline is an ordered vertical list; existing header/nav wraps and theme controls stay available |

Honor the existing 1280px header behavior and global 1100/760/360px responsive rules without overriding global breakpoints. Test at 1440, 1100, 768, 390 and 320px, portrait/landscape and zoom. No horizontal scroll, clipped headings, obstructed theme controls or essential text inside decorative imagery. Preserve full event titles; do not require swiping a carousel to discover events.

Target WCAG AA: normal text 4.5:1, large text 3:1 and relevant UI/focus boundaries 3:1, verified in both themes and interaction states. Red never carries status alone: use visible PLANNED/CONFIRMED/INVITED/COMPLETED text and distinct icon/line treatment. Do not confuse program status with research IMPLEMENTED/EXPERIMENTAL/PLANNED/IN PREPARATION badges. Preserve semantic labels and current model status.

Use native links/buttons/details, logical heading order, keyboard access, visible focus and meaningful names. Decoration is aria-hidden; informative diagrams get title/description. Preserve creator photo alt text and original photograph; new artwork must not alter photos. Disabled actions have nearby availability explanation; external links identify their purpose, and new-tab behavior requires appropriate disclosure/rel attributes. Prefer same-tab forms in V1.

No essential motion; respect prefers-reduced-motion and existing scroll behavior. No auto-playing media or animation-only information. Without JavaScript, content, anchors, FAQs and system theme still work; retain existing head initialization to prevent theme flash when JavaScript is available. Use static rendering and local SVG/CSS assets; avoid large dependencies, external fonts, new theme scripts and runtime network calls. Preserve image dimensions/lazy loading below the fold and avoid material layout shift.

## 16. Organizer decisions and launch gates

Decisions requiring explicit ownership before public collection/event launch:

- Exact dates/time zones for registration, kickoff, submission, judging, showcase and results; whether the approximately three-month window includes review/results or extends afterward.
- Interest versus registration form mode/conversion; approved responder URLs and per-event availability, including speaker interest.
- Age/geographic eligibility, individual/team participation, team limits, academic requirements if any, allowed technologies and difficulty-track award/ranking policy.
- Prize funding, allocation, award/payment conditions and official rules; no sponsor presumed.
- Confirmed keynote/session schedules, guest speakers, mentor capacity, independent judge selection and conflicts; no names invented.
- Rubric/anchors, repository exceptions, license/AI/prior-work rules, deadlines/correction windows, final tie fallback and appeals.
- Privacy/access/retention, private contact, conduct enforcement and accessibility arrangements.
- Starter/resources readiness, enabled GitHub discussion URLs, moderation, showcase consent and follow-up maintenance.

Approval of a visual implementation does not satisfy these gates. Until resolved, show PLANNED/TBD and unavailable form states. Never fabricate participants, invitations, winners, event partners or achievements to fill visual space.

Risks: CSS leakage into research pages; unreadable red-on-red text; theme flash from duplicate logic; false confirmation of keynote/guest roles; inconsistent dates/forms between routes; privacy exposure via public configuration; schedule/mentor capacity across overlapping events; unclear track fairness or provisional prize copy; missing starter material for students; maintainability from duplicate data. Mitigate with wrapper-scoped tokens, one theme/data source, confirmed-and-approved publication filtering, build validations, launch gates and incremental review.

## 17. Implementation plan (future authorization required)

### PHASE 1 — Hackathon page visual foundation

- Expected files: `src/pages/hackathons/index.astro`; new `src/components/hackathons/HackathonExperience.astro`, `SeriesHero.astro`, `FinalCta.astro`; new `src/styles/hackathon-experience.css`.
- Data/config: hero/series content added to existing `src/data/hackathons.ts`; keep unconfigured CTA state.
- Components: shared Layout/Header/Footer/ThemeInit untouched; reuse existing HackathonNav and scoped CTA primitive.
- Acceptance: only landing receives red treatment; both themes/no-JavaScript system behavior work; exact hero copy, one h1, disabled Register Interest with explanation and working Explore Challenges; existing research routes/header/footer visually unchanged. Recommended first implementation task: this phase alone, with theme-isolation checks.

### PHASE 2 — Three event cards and timeline

- Expected files: landing, scoped CSS; new EventCard and SeriesTimeline; extend existing hackathons.ts. Events route only for necessary shared-data/track consistency, preserving current visual layout and IDs.
- Data/config: core questions, FOUNDATION/ADVANCED track descriptions, month windows, ordered milestones, per-event prize/qualification; exact dates null.
- Acceptance: three accurate PLANNED cards; launch/submission months preserved; every existing fragment resolves; lifecycle and optional phases clear; no fabricated timestamps or awards; readable responsive timeline and adjacent prize terms.

### PHASE 3 — Speakers, judges and community

- Expected files: landing; new SpeakerSection, JudgeSection, EngagementSection, ValueCards and ParticipationSteps; extend hackathonPeople.ts/hackathons.ts; reuse HackathonPersonCard/CreatorProfile. Community route only if needed for consistent data/filtering, without red redesign.
- Data/config: speaker event assignments, activity classifications, three empty guest/three judge slots; keynote creator reference and planned arrangement.
- Acceptance: original creator photo reused; no duplicate metadata; no invited/unapproved fields in generated HTML; empty honest states; no guaranteed mentorship/showcase; proposed judging summary and unavailable judge/speaker actions.

### PHASE 4 — Google Form integration

- Expected files: hackathons.ts or dedicated `src/data/hackathonForms.ts` if it improves ownership; hackathon-only CTA component; existing HackathonRegistration and consumers only for compatibility/explicit props.
- Data/config: four required canonical names, compatibility aliases, form mode, overrides and availability gates; approved URLs supplied by organizers, not implementation guesses.
- Acceptance: null/invalid URLs remain unavailable; matching interest/registration semantics; deterministic override handling; no private links/contact data; signed-out mobile/desktop form destinations verified once provided; no portal authentication/database/Sheets writes/email infrastructure.

### PHASE 5 — README and resources

- Expected files: new `docs/hackathons/README.md`; new resource artifacts only after content approval; ResourcesSection/FaqSection; existing rule/submission/judging/operations drafts updated explicitly if official decisions change.
- Data/config: resource availability/destinations and FAQ answers; contact/policies remain TBD until approved.
- Acceptance: all 18 handbook sections specified above; required submission includes problem statement; existing operational documents aligned without inventing policies; valid links and visible unavailable resources; student track guidance and honest FAQ.

### PHASE 6 — SEO, accessibility and testing

- Expected files: hackathonSeo.ts, landing/component accessibility adjustments, scripts/site.test.mjs; optional local hackathon preview SVG/PNG under public/images. Opt-in Layout metadata hook only if conditional Event output actually warrants it; other page metadata unchanged.
- Data/config: landing-only title/description/image; structured event facts only if confirmed; no new engine/dependency.
- Acceptance: Node 24 npm ci/check/build/test and git diff --check pass; correct canonical/social/crawl artifacts, resolved routes/assets and no project base path; both themes at required viewports, keyboard/focus/reduced motion/zoom/no-JavaScript and contrast checked; no private, invited, fabricated or unsupported content. Stop preview processes. No commit/push/merge/deployment without separate authorization.

## 18. Validation and review boundary

This specification-only task creates **only this file**, as explicitly requested; no spec-index, development-log, production component/page or resource implementation changes. Document verification checks referenced local paths, coverage, factual baseline and whitespace. No implementation build, browser run, form creation, communication sending or deployment is claimed for PORTAL-012.

Future regression review covers `/`, `/research/`, `/architecture/`, `/experiments/`, `/publications/`, `/about/`, all three hackathon routes and `/404.html`. Compare non-hackathon screenshots and metadata with the baseline to catch style/SEO leakage. Validate empty forms/people, approved confirmed fixtures and exclusion of invited/unapproved/private sentinel fields; restore fixtures before final build. Verify weights total 100%, date ordering, one source for aliases, submission requirements, resource existence and safe root links. Real organizer decisions and public launch remain independent of technical acceptance.


## PORTAL-012B implementation extension — 2026-10-03

IMPLEMENTED locally for review: landing-only red visual system, technical hero, three event cards, contributor journey/qualification checklist, values, planned engagement, equal tracks, configurable planned prizes, approved real profiles, existing resources, FAQ and closing CTA. This does not confirm sessions, open forms, select participants or finalize rules.

The PORTAL-012B instruction supersedes the original Register Interest hero CTA with Start Qualification, adds the proposed Register → Fork → Clone & Run → Qualification → Submit → Selection → Build & Compete pathway, and adds QUALIFICATION_SUBMISSION_URL. All five URL constants live in hackathonForms.ts, default null, with separate closed collection gates. Legacy names derive from that one source; existing per-event override behavior remains unchanged. Participant intake must match qualification/registration semantics before opening; no interest-to-registration conversion exists.

PORTAL-012B also supersedes public anonymous role cards on the landing: empty/invited/unapproved people are omitted. The existing real creator/keynote remains PLANNED; event/community detail routes and their current layouts remain unchanged. Resources point only to existing drafts/routes or the implemented inline qualification/GitHub guidance. The full participant handbook, starter repositories, live forms, finalized policies, optional red social preview and structured Event metadata remain PLANNED.

Evidence: src/pages/hackathons/index.astro, scoped hackathon components/CSS, hackathonForms/hackathonExperience data and the extended event prize data. Shared layout/header/footer/global tokens/theme engine unchanged. Node 24 install/check/build and fifteen tests passed; Chrome passed 110 route/theme/viewport cases. Twelve sampled foreground/background pairs per theme exceeded 4.5:1 (minimum 5.92 light, 6.26 dark); reduced motion, focus, native FAQ keyboard operation and existing preference behavior passed. Forty non-landing screenshots and nine non-landing HTML outputs matched the baseline exactly. These are local bounded checks, not full WCAG certification or a deployment. See the development log for validation limits and remaining organizer work.

## PORTAL-013-FINAL closure extension — 2026-10-04

Foundation stabilized without redesign. This extension supersedes earlier future-artifact
and no-certificate-program notes: the participant handbook, qualification template, fork
workflow and conditional certificate framework now exist. No certificates are generated
or guaranteed for registration. Minimum valid-project requirements and issuance operations
remain organizer launch gates. Three event-specific routes reuse EventDetails and retain
the overview route/fragments; dramatic red styling remains landing-only.

Seven-step applicant pathway, qualification/<github-username> in participant forks,
community/qualification/<github-username>.md, four evidence fields, non-guaranteed selection
and hackathon-01/02/03 fork branches are defined in the handbook. Final submission is
separate from optional upstream PR review. Model D remains PLANNED; event themes are
not deployed capability claims. V1 is Google Forms/Sheets/Drive, GitHub and email only.
All five canonical form URLs remain null and closed. Exact dates, eligibility/teams,
selection capacity/criteria, challenge tasks/resources, funding/payment, independent
judges, sessions, privacy/contact and certificate verification details remain TBD.
No further visual redesign is part of closure; next streams are real form integration,
CORE-012 Model D and challenge implementation.

## PORTAL-014 sponsorship extension — 2026-10-04

Authorized scope adds /hackathons/sponsors/ using the existing red wrapper/tokens and
shared theme; landing receives only a Become a Sponsor discovery link. Other routes,
global styling, research and historical records remain unchanged. Local implementation:
configurable proposed tiers, null/closed sponsor form/contact, private manual workflow,
confirmed-and-approved public filter and verified event cash prize allocations.

Acceptance: proposed thresholds 250/500/1000/2500 USD; no invented sponsors/assets;
no private review states publicly rendered; no increased pool from pledges/in-kind;
base 300 remains planned until verified funding exists; certificate acknowledgement
requires four approvals and preserves issuer/eligibility; independence/privacy/IP
boundaries visible. No payments/accounts/backend/database/automatic acceptance.
Draft terms and SPONSORSHIP.md contain intake fields, organizer/legal TBDs and process.
Validate install/typecheck/build/tests, both themes/responsive/keyboard, canonical and
assets, unconfirmed fixture exclusion and unchanged unrelated page outputs. Public
launch, actual contributions/agreements and form integration remain separate work.

## COM-003B-FIX-001 — finalized rule correction, 2026-10-11

Supersedes prior three-event, optional-video, team-TBD and single-rubric proposals; preserved historical records are not current instructions. One hackathon, five existing canonical challenge records. Mandatory individual registration/fork/clone/run A/B/C/understanding/evidence/selection; every team member qualifies, Model D not required. Individuals or teams of two to four, one leader, unique team ID, no duplicate membership, approved changes verified in private Sheets. Executable MVP/prototype/PoC and maximum-two-minute video required, no webcam requirement; slides/walkthrough alone insufficient. Exact required artifacts and both 100-point rubrics in [handbook](../hackathons/README.md), [submission](../hackathons/SUBMISSION_REQUIREMENTS.md) and [judging](../hackathons/JUDGING_FRAMEWORK.md). Round 1 selects finalists; Round 2 Google Meet five-minute demo/five-minute Q&A ranks, no combined scores. Capacity five to ten proposed, quality-dependent. Legacy URLs preserved as retired proposal pages. No new dates/prizes/appointments. Google Forms/Sheets/Drive and Meet only, no database/accounts/private-data API.

Acceptance/tests: site.test.mjs COM-003B-FIX-001 asserts five choices, qualification/team rules, working project/video fields, independent round weights, private-roster language, closed Forms and legacy compatibility; existing privacy/contracts/reporting/media/speaking regressions retained. Operational Forms, deadlines and privacy/permissions remain pending; no live intake or judging claim.

HACK-VISUAL-001 (2026-10-11): shared EventCard/ChallengeDiagram now render the five existing choices with code-authored conceptual SVGs, HTML focus/minimum prototypes and larger diagrams at existing detail anchors. [SPEC-018](SPEC-018-challenge-architecture-visuals.md) governs this visual enhancement; qualification/team/submission/judging rules unchanged.

HACK-CHALLENGE-006: the Portal list now has six choices, including AI for Everyday Life as an explicit extension pending COM-003A alignment. Project validation/filtering derives from that list (sixth filter index 5); dashboard/report evidence levels, units and contract schemas remain unchanged. No new participation/adoption counts inferred. [SPEC-019](SPEC-019-everyday-ai-challenge.md) records content, Form mapping and upstream requirements.

HACK-PORTAL-OPS-001: [SPEC-020](SPEC-020-hackathon-portal-operations.md) refines contextual registration/qualification/team/role actions and eight approval-based recognition categories; existing six diagrams and finalized rules preserved. Certificate reference missing, preview gated; all seven verified links active.

## AEGLYSAI-HACK-DESIGN-002 — 2026-10-14

IMPLEMENTED locally: exclusive international-facing landing experience at `/hackathons/`.
This supersedes the original red landing visual direction only; Sponsors keeps the existing
stylesheet. [ADR-011](../adr/ADR-011-scoped-hackathon-event-landing.md) records the boundary.
No homepage, research, global header/footer, detail page, community or infrastructure change.

Acceptance: approved AeglysAI brand icon, specified Build Intelligence / Secure Tomorrow
hero, six factual event badges, six equal architecture cards at 3/2/1 columns, six student
opportunities, complete seven-step individual qualification plus detailed evidence checklist,
separate nine-stage TBA competition timeline, proposed configurable $300 award with trophy,
eight conditional certificate categories and original invalid sample, exact independent
100-point rubrics, five-minute demo/five-minute Q&A, consent-filtered profiles and honest
unconfirmed appointments, resources/FAQs/conduct, contextual registry-resolved Forms CTAs.
All original tracks, planned activities, eligibility, team, submission, tie/conflict rules and
privacy guidance retained. Geographic eligibility remains pending; international presentation
is not evidence of participant geography or partners. Funding/first-place allocation remains
unapproved. Registration alone earns no certificate. No countdown date or new dependency.

Accessibility: one h1, descriptive links, named section navigation, aria-current location,
visible focus, native details, reserved SVG/image dimensions, optional progressive entrances,
four-second network motion, reduced-motion override. Global themes are retained while the
landing deliberately uses dark color-scheme in either theme. Native section links work without
JavaScript; only the active indicator needs a small inline script with no requests/storage.

Validation: Node 24 check/build/test plus generated route/anchor/CTA checks, browser desktop,
tablet/mobile, SVG contrast, focus, reduced motion and output isolation. Actual outcomes and
limits are recorded in the [review](../hackathons/HACK-DESIGN-002-REVIEW.md) and development log.
No remote CI, release or deployment is asserted.
