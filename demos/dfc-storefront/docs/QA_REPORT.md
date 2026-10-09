# QA evidence — 2026-10-09

## Verified scope
Primary implementation: repository static multipage concept. Chromium 153 headless via @sparticuz/chromium, Playwright 1.64.0. Desktop 1440×1000, mobile emulation 390×844 and 320×740. No real phone, Safari, Firefox or screen-reader verification claimed.

- Eight pure-rule tests passed: catalog provenance/fields, URL allowlist/conflicts, visitor precedence, exact cutoff/timezone/Sunday/missing time, availability and lead time before preferences, price invariance, malformed/unavailable records, date fixtures and sanitized event payloads.
- Chromium interaction suite passed at all three widths: four states, no overflow, campaign assignment, visitor override, back/forward, cutoff at 11:00, Sunday, scheduled alternatives, all-unavailable fixture, style ranking, PDP/bag quantity/subtotal, default recovery and URL injection safety.
- JavaScript disabled: baseline headline, 14 reference cards and linked PDP verified. Demo bag deliberately requires baseline JS; static pages say so.
- Actual aborted adaptive-engine request: default/catalog/PDP and independent baseline cart still worked. Malformed session cart JSON handled safely. Missing product returned 404.
- WCAG 2/2.1/2.2 A/AA-tagged axe-core 4.14.0 checks: zero automated violations in 8 state/viewport combinations. 24 rules passed each; link-in-text-block remained flagged for manual review. Source and rendered review: inline paragraph links use underlines, navigational/card links have clear component boundaries. Keyboard smoke confirmed skip-link focus and native controls. Not a full screen-reader or accessibility compliance audit.
- 200% CSS zoom reflow passed at 1440 and 390; reduced-motion preference applied. This is a CSS-zoom lab check, not a real device browser zoom certification.
- Static checks passed on 19 HTML pages: local links/assets, unique IDs, one h1, image alt/dimensions, noindex/disclaimer; seven theme templates reference valid sections; all eleven Liquid section schema blocks parse as JSON. No Shopify Liquid runtime/Theme Check/install performed.
- Visual review: desktop default and mobile Secret Admirer screenshot inspected; all four states captured at desktop/mobile. Bold pink/lime/violet presentation, typographic hierarchy and fixed illustration sizes retained. Shared category illustrations are labeled; not exact product photography.
- Original agency index.html/styles.css have no diff from inspected main SHA.

## Lab performance observations
Unthrottled local headless Chromium only, no production network/CPU model. Measured LCP: 216 ms desktop and 116 ms mobile. Observed lifecycle CLS: 0.00280 desktop and 0.01147 mobile. Resource transfer ~674,614 bytes. No field p75 CWV or INP claim. Images encoded to WebP without composition changes; no remote font or live LLM/analytics dependency. Local lab values are not production promises.

## Fixed defects
- Default recovery cleared stale visitor mission context.
- Secret Admirer explanation moved before catalog in that state, restored below signature in default/failure.
- Narrow hero and presenter controls no longer overflow.
- At 200% zoom, tags, card titles, FAQ grid and headings reflow safely.
- Baseline cart separated from adaptive module and validated session fixture storage.

## Open release gates
Firefox and WebKit binaries unavailable. Browser download attempts failed at the environment network boundary; no successful tests for those browsers. Full assistive-technology smoke, real-device checks and throttled/field performance validation remain open. Shopify development store unavailable; adapter is uninstalled. Screenshots/pitch and a private concept URL exist, but Phase 4 is not marked complete because its wider browser/assistive-technology checks remain unverified.

Evidence: browser-results.json, extended-results.json, static-results.json; tests/engine.test.mjs, tests/browser.cjs, tests/extended.cjs, tests/static_qa.py. No analytics, real orders, pricing changes or third-party contact data collected.
