# SPEC-029 — Model D status alignment

MD-002, recorded2026-10-29. IMPLEMENTED locally, pending review; no release authorized.
Baseline main8e59328c4427177f797f7dce9d6edfcad37d638a includes FINAL001 PR37 and
BRAND001 PR38. Preserve their commits, event naming, navigation and publication controls.

Use three visual/textual statuses in architecture: solid implemented A–C baseline,
double-bordered completed offline experimental D research, dashed planned operational
extension. D cards must not inherit planned styling. Readable labels and descriptions
must carry the same meaning without color, scripts, hover or interaction.

Show offline behavioral inference, bounded eligibility/drift diagnostics, experimental
non-enforcing integration and mock-feedback simulation as research implementation
complete. Separate this panel from baseline policy outcomes. Never imply D can issue
ALLOW/DENY/STEP-UP/LIMIT; enforcement_authority=NONE. Live telemetry, production adaptive
integration and continuous feedback stay planned; independent external validation and
response effectiveness remain unestablished, drift robustness limited.

Evidence: read-only Research commit530da21f95e6ad863e3e4c121f79564dbb4b9527, SPEC020,
modeld README and final acceptance report/matrix/handoff/frozen index. This is a bounded
status summary, not independent reproduction, scientific effectiveness evidence or
artifact/security/commercial/publication clearance. No protected details copied.

Validate Astro check/build/full suite, homepage/research/architecture widths/themes/
no-JS, exact status/authority separation tests, claim/output scans and preserved byte
fixtures with explicit pinned deltas. No dependencies, backend, source artifacts or
research repository writes. Review and limitations: [MD-002 report](../handoff/MD-002-REVIEW.md).
