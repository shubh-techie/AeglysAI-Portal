# QA-001 — Accessibility and responsive assessment

Recorded 2026-10-26 against `f7e9c12414c2795d7ddcdbdcae965d9406101fbb`.
**Bounded Chromium verification, not WCAG or assistive-technology certification.**
No layout/style/interaction changes. [Release recommendation](QA-001-RELEASE-VERIFICATION.md)
and [issues/limits](QA-001-FINDINGS.md) remain controlling.

## Environment and method

Headless Chrome155.0.8059.86 on macOS arm64. Independent static-build sweep covers all
28 pages at320,375,390,430,768,1024,1440 CSS pixels,900px viewport height, DPR1, light/dark
system preference and both JS/no-JS:784 cases. Wide sweep emulates reduced motion to
avoid transient entrances during structural checks. Existing suites separately exercise
default/reduced/coarse-pointer/lifecycle behavior. Emulation is not physical-device testing.

Per page/case checks: one h1/main, language, metadata, duplicate IDs, horizontal overflow,
visible control naming cues, secure new-tab anchors, images and system theme fallback.
First keyboard Tab at1440/light/JS was inspected for visible focus on every route.
The naming-cue check is a DOM screen, supplemented by accessibility-tree assertions in
existing suites; it is not an exhaustive accessible-name/semantic algorithm.

The404 page intentionally has no canonical and is noindex/follow. Initial generic
canonical flags were reclassified after source/build inspection, without changing app
code; raw and assessed results are both retained.

## Observed behavior

| Area | Evidence and result |
| --- | --- |
| All-route layout |784 assessed cases, no document overflow, duplicate IDs, missing h1/main/lang/description or unnamed visible controls found by the defined checks |
| Global themes | JS follows emulated system preference; no-JS body palette follows CSS light-dark(); homepage suite also exercises theme controls; no new theme code |
| Research | Three destinations exactly: Research, Experiments, Publications; native disclosure, keyboard open/close and current-page semantics retained |
| Hackathon | AEGYTHON2026 and2027 destinations, desktop disclosure/mobile accordion, current-page semantics and no-JS reachability retained |
| Mobile drawer | Existing28-case navigation matrix verifies native modal focus containment/Tab boundaries, Escape/backdrop/Close dismissal, focus restoration, scroll/resize cleanup and fallback disclosure |
| Keyboard/focus | Native anchors/summary/buttons, skip-link behavior, visible outlines and named controls; existing homepage/navigation/channel suites passed |
| Registration/Discord |16-case width/theme/JS matrix verifies Tab order, visible focus,44px minimum link height, both Discord AX link names and descriptive unique context IDs |
|2026 interactions | Six challenge controls, qualification/timeline/two-round sections, native scrolling, pause/reduced motion, lifecycle cleanup and no-JS lists/links passed at1440/768/390 |
| Showcase | Existing isolated synthetic fixture passed eight width/theme cases plus no-JS, filter count/keyboard/touch/carousel/fallback and no overflow; actual production showcase stays empty |
|2027 announcement | All28 width/theme/JS observations on this route passed; no registration/dates/participants introduced; native navigation preserved |
| Console/network | Independent structural sweep: zero runtime exceptions, console API errors or captured failed/HTTP-error resource requests |

No new user-facing defect was reproduced in this coverage. Passing cases do not certify
every possible interaction, zoom setting, operating-system input or browser combination.

## Contrast and visual review

Separate bounded above-fold contrast sample covered six representative routes
(`/`, `/research/`, `/hackathons/`, `/hackathons/2027/`, `/hackathons/community/`, `/media/`)
at390/1440 and both themes:24 viewport snapshots,608 evaluated text samples, no threshold
failures. Calculation used computed RGB/alpha solid backgrounds and sRGB relative
luminance,4.5:1 for normal text and3:1 for applicable large/bold text.

188 complex-background/opacity/gradient/backdrop samples were excluded from that
calculation, not counted as passes. Selected desktop/mobile screenshots were visually
inspected; this is not an exhaustive review of those188 cases, focus-indicator contrast,
non-text contrast, charts, images or all hidden/expanded states. The2026 landing deliberately
uses its established dark presentation under both global themes; that is not a new theme bug.

Current screenshot evidence is archived in
`.community-drafts/qa-001/existing-harness-evidence`. Inspected homepage1440/dark,
registration320/light and synthetic showcase320/dark. Full matrices/results and other
viewport screenshots remain available locally. Older fixed-path generated artifacts were
refreshed by existing harnesses; [QA-L04](QA-001-FINDINGS.md) records that limitation.

## Explicitly unverified

- Safari26.6.2 behavior: installed driver probe timed out; no usable session, no settings
  enabled/changed. This is not evidence Safari itself fails rendering or navigation.
- Firefox: not installed in checked app/command locations; no install performed.
- Physical iOS/Android/touch hardware, alternate input devices and browser-specific zoom.
- Actual VoiceOver/NVDA/JAWS/manual screen-reader operation. Chrome accessibility-tree
  names are structural evidence, not a manual assistive-technology session.
- Full WCAG2.x audit, every contrast/background state, high-contrast/forced-colors,
  cognitive usability, all200%/400% zoom/reflow cases and complete PDF accessibility.

These coverage gaps remain visible for reviewer-led follow-up, not implied acceptance.
No automated accessibility score or legal compliance claim is made.
