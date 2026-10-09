# QA evidence — 2026-10-09

## Verified scope
Primary implementation: repository static multipage concept. Playwright 1.64.0: headless Chromium 153, Firefox 157 and WebKit 27.2. Desktop 1440×1000, mobile emulation 390×844 and 320×740. WebKit testing is not branded Safari or physical iPhone certification. No real-phone or screen-reader verification claimed.

- Nine pure-rule tests passed: catalog provenance/fields, URL allowlist/conflicts, visitor precedence, exact cutoff/timezone/Sunday/missing time, availability and lead time before preferences, price invariance, malformed/unavailable records, date fixtures and sanitized event payloads.
- Chromium, Firefox and WebKit interaction suites passed at all three widths: four states, no overflow, campaign assignment, visitor override, back/forward, cutoff at 11:00, Sunday, scheduled alternatives, all-unavailable fixture, style ranking, PDP/bag quantity/subtotal, default recovery and URL injection safety.
- JavaScript disabled: baseline headline, 14 reference cards and linked PDP verified. Demo bag deliberately requires baseline JS; static pages say so.
- Actual aborted adaptive-engine request: default/catalog/PDP and independent baseline cart still worked. Malformed session cart JSON handled safely. Missing product returned 404.
- WCAG 2/2.1/2.2 A/AA-tagged axe-core 4.14.0 checks: zero automated violations in 24 browser/state/viewport combinations. 24 rules passed each; link-in-text-block remained flagged for manual review. Source and rendered review: inline paragraph links use underlines, navigational/card links have clear component boundaries. Keyboard smoke confirmed skip-link focus and native controls. Not a full screen-reader or accessibility compliance audit.
- 200% CSS zoom reflow passed at 1440 and 390; reduced-motion preference applied. This is a CSS-zoom lab check, not a real device browser zoom certification.
- Static checks passed on 19 HTML pages: local links/assets, unique IDs, one h1, image alt/dimensions, noindex/disclaimer; seven theme templates reference valid sections; all eleven Liquid section schema blocks parse as JSON. No Shopify Liquid runtime/Theme Check/install performed.
- Visual review: desktop default and mobile Secret Admirer screenshot inspected; all four states captured at desktop/mobile. Bold pink/lime/violet presentation, typographic hierarchy and fixed illustration sizes retained. Shared category illustrations are labeled; not exact product photography.
- Original agency index.html/styles.css have no diff from inspected main SHA.

## Initial lab performance observations (historical unthrottled run)
Unthrottled local headless Chromium only, no production network/CPU model. Measured LCP: 216 ms desktop and 116 ms mobile. Observed lifecycle CLS: 0.00280 desktop and 0.01147 mobile. Resource transfer ~674,614 bytes. No field p75 CWV or INP claim. Images encoded to WebP without composition changes; no remote font or live LLM/analytics dependency. Local lab values are not production promises.

## Fixed defects
- Default recovery cleared stale visitor mission context.
- Secret Admirer explanation moved before catalog in that state, restored below signature in default/failure.
- Narrow hero and presenter controls no longer overflow.
- At 200% zoom, tags, card titles, FAQ grid and headings reflow safely.
- Baseline cart separated from adaptive module and validated session fixture storage.

## Final independent-concept release — 2026-10-09
The repository concept meets the Phase 4 acceptance matrix in BUILD_SPEC.md §Acceptance tests and release gates. Ready for an introductory concept meeting; overall checkpoint 80%. Full screen-reader/device-lab and field CWV were explicitly outside what emulation could certify in that specification. The earlier status treated those broader checks as blockers; final certification is limited to the tested independent concept, with those limits retained for authorized production planning.

Strict three-engine suite: 9 viewport interaction runs and 3 disabled-JS runs, no unavailable/skipped engine. Extended release: 24 axe state/viewport checks with zero violations; 6 keyboard/reflow/reduced-motion runs; 3 malformed catalog/engine-abort/cutoff/event integrity runs. Keyboard paths include actual skip-link activation, Enter/Space mission selection, focus retained when SAP moves, FAQ disclosure, consecutive cart quantity changes and removal returning focus to Keep exploring. Four accessibility-tree snapshots were reviewed for heading hierarchy, named controls, pressed mission, descriptive reference links and consent-before-catalog ordering. This is manual semantic/keyboard smoke aided by automation, not an AT user session or full WCAG compliance certification.

Cold mobile lab: 390×844, 150 ms latency, 1.6 Mbps download, 4× CPU, 3 fresh contexts with cache disabled. LCP 532–572 ms; CLS 0.01150; maximum observed interaction event duration 32–40 ms (12 event entries per run). Lab interaction observations are not field INP or p75 CWV. Origin was local HTTP, so private-host authentication/network overhead is not measured. Threshold checks LCP≤2.5s, CLS≤0.1, observed interaction≤200ms passed all 3 runs.

Additional repaired defects: malformed/null catalog and null preferences now fail safely; inherited campaign keys fall to default; main is focusable by skip link; cart and moved SAP preserve keyboard focus; static bag count/reserved width prevents initial nav wrapping. The cold test originally caught CLS≈0.219 from the empty bag count gaining text and wrapping navigation; final CLS≈0.0115 after repair. Later-date label now avoids implying a 3-day product can arrive next business day.

Visual review covered default, urgent, discovery and SAP in desktop/mobile screenshots; illustrations have clear concept labels and readable hierarchy. Final eight screenshots refreshed. No root agency website changes. Runtime downloads and WebKit libraries succeeded this session. Firefox sandbox settings are scoped to the isolated test harness because the container denies user namespaces; no storefront security setting changed.

Remaining limits: no installed Shopify theme/checkout, physical device, VoiceOver/NVDA, Safari application or production traffic/field performance validation. No merchant approval, production readiness, accessibility compliance or revenue uplift claimed. No Phase 5 outreach or commercial deployment.

Evidence: browser-results.json, extended-results.json, release-results.json, static-results.json, accessibility-*.txt; tests/engine.test.mjs, tests/browser.cjs, tests/extended.cjs, tests/release.cjs, tests/static_qa.py.
