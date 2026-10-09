# Phasefield independent DFC adaptive storefront demonstration

Primary runnable implementation: generated static multipage storefront. Run `python3 build.py`, then `python3 -m http.server 8765 --bind 127.0.0.1`. Open index.html through HTTP. Baseline has independent `assets/baseline.js`; adaptation uses `assets/app.mjs` + pure `assets/engine.mjs`. Default catalog and PDP/FAQ remain browseable without JavaScript. Simulated cart needs baseline JS; no checkout or real data fields.

Build specification: docs/BUILD_SPEC.md. Catalog: data/product_reference_manifest.json. Rules: data/experience_rules.json. Tests: `node --test tests/engine.test.mjs`; browser suite `npm ci` then `npm run test:browser` (bundled Chromium; Firefox/WebKit require browser binaries). QA evidence and remaining gaps: docs/QA_REPORT.md. Pitch: docs/PITCH.md and pitch.html. No production Shopify installation is claimed.

Repository root agency website remains unchanged. Do not publish this concept publicly. No orders/payments, real recipient handles, analytics identifiers or customer profiles. Demo bag sessionStorage holds only fixture IDs, preset options and quantities; events stay in memory. Independent concept disclaimer must remain visible.
