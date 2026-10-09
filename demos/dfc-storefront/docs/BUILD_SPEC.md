# Phasefield / DFC independent concept — build specification v1
Date: 2026-10-09 UTC / session initiated 2026-10-08 Detroit. Scope: Phases 1–4 only.

## Source and evidence contract
Foundation: 43-page *Phasefield — Deep Research & Adaptive Storefront Strategy.pdf*, saved project research, all pages reviewed. Drive PROJECT_STATE and validation brief read, plus agency model, sales plan and decision history. GitHub main inspected at 10751f08c7703616f96ff669374ea519c5226f8b; only index.html, styles.css, README and rebrand workflow present. No AGENTS.md or storefront found. New path demos/dfc-storefront on branch phasefield/dfc-adaptive-demo-20261009. Preserve root site byte-for-byte.

VO = verified public observation; SH = evidence-supported implementation hypothesis; IE = deliberately illustrative fixture/estimate; CV = needs client validation. All operational state and inventory in this demo are IE. Research supports a prototype, not uplift. No customer data, orders, analytics exports or commissioned relationship exists.

Public recheck 2026-10-09: homepage says online before 11 a.m. eligible, after 11 a.m. next business day, Sunday closed; exact delivery times not guaranteed. Header’s after-noon call language differs from 11 a.m. body. Implement conservative no online same-day eligibility at/after 11 a.m.; call-to-check advisory only, never guarantee exception. SAP requires consent and is unsuitable for a specific date/known recipient. Floral Letters has 3-day lead time; interpretation CV. Do not promise Mother's Day Sunday opening. The seasonal demo deliberately uses a Friday before-cutoff fixture and a Sunday closure scenario.

## Environment and commerce boundary
No Shopify connector/development-store authorization is available. Repository-based static multipage build is the primary verified implementation; theme-native OS 2.0 source is an uninstalled adapter, not a tested merchant theme. Static baseline is pre-rendered; adaptation adds client-side state. Cart is an in-memory simulation, with page navigation snapshot in history/session browser state only if needed; no checkout endpoint, no payments, no personal fields. No production claims or real recipients. All pages carry independent-concept and illustrative-catalog labeling; noindex robots. Private hosting only.

## Catalog contract
15 records in data/product_reference_manifest.json. Each reference price is a publicly displayed base/listing price captured on date, not a quote or live variant feed. All simulated inventory, zero-day lead time, SAP eligibility and occasion/style tags explicitly classified. Floral Letters lead 3 overrides general same-day. Add-ons never treated as complete gifts. IDs stable; price numeric and nonnegative; reject malformed entries. Category illustrations never claimed to depict actual products. Client-authorized variant IDs required before any commerce integration.

## Information architecture and baseline
Persistent header: typographic Detroit Flower Company reference identity, Shop, Signature & Custom, Secret Admirer, Delivery & FAQ, demo cart. No copied logo. Narrow layouts wrap navigation rather than hide essential links behind script. Homepage: concept strip → operational bar → bold editorial hero → mission shortcuts → catalog controls and product grid → personalization/signature story → SAP introduction → delivery/FAQ → footer. Collections share catalog and price/style/category controls. PDP: title and price → lead-time/availability warning → category illustration → customization guidance (only approved preset demo choices, no free text) → demo cart action → policy links. Cart: item, options, reference unit price, quantity, subtotal, remove, no-checkout explanation. Delivery page includes cutoff, Sunday, lead-time precedence, no exact-time guarantee, CV zones/policies, no invented refund policy.

## Visual system and responsive rules
Expressive floral editorial, not beige luxury: saturated pink #fc5ab8, lime #d9ff3f, violet #b3a0ff, near-black #171717, white #fff. Black type on color, white on black; verify contrast rather than assume. System sans with oversized tightly stacked headline, monospaced small labels. Thick border details, large photographic surfaces, minimal decorative UI. Body 16px minimum, control labels 14px minimum; 44px controls. Main content max 1440px, gutters clamp(16px,4vw,64px). Grid desktop 4, tablet 2, narrow 1–2 depending safe card width; no horizontal overflow at 320px or zoom. Image sizes fixed aspect ratios and width/height to reduce CLS. Natural page flow; no purchase control obscuring content. Reduced-motion honors preference. No remote fonts.

## Component inventory / configuration
| Component | Client-specific inputs | Common behavior |
|---|---|---|
| Header | store title, link map | stable across states |
| Availability | timezone, cutoff, closed days, policy copy | unknown/invalid => advisory, never available |
| Adaptive hero | approved headline, body, CTA, illustration | static default present before script |
| Mission chooser | state label and mission map | explicit selection wins; reset clears URL context |
| Guided grid | product records, hard eligibility, merchandising priority | constrain first, stable rank second |
| Preference controls | price bands, styles, mode, timing | no inferred identity; preserve preference across mission |
| SAP guide | consent steps, caveat, standard exit | no editable recipient handle |
| PDP | approved variants, properties, lead time | no same-day generic override |
| Cart | adapter mode and product IDs | simulation only here; Shopify cart future |
| Presenter | simulated clock, state, unavailable fixture, fail/reset | visibly labeled, shows source/rule/events |
| Operations/FAQ | validated policies and service zones | available without JS |

## Mission matrix and approved experience copy
| State | Buying job | Hero / CTA | Ordering and guidance |
|---|---|---|---|
| default | explore expressive gifts | Detroit flowers with personality. / Browse bouquets | all complete gifts; normal merchant order |
| urgent | find a gift that fits timing | A great gift. A clear plan. / See timing-ready picks | availability first; exclude 3-day and unavailable fixtures; budget guidance |
| mothers_day_discovery | explore for Mom or a mother figure | Find their kind of beautiful. / Explore the collection | seasonal demo badge, style inspiration, occasion-first ranking; no gender inference |
| secret_admirer | consent-gated surprise | A surprise, with consent first. / Choose the surprise | consent explainer before selection; no date promise; fixed @example_recipient only; normal gifting exit |

## Context, transition and ranking rules
Only pf_mission=urgent|discovery|secret_admirer and pf_occasion=mothers_day affect experience; other params ignored. Multiple copies of controlling key are ambiguous and ignored. Inputs bounded/allowlisted and never inserted as HTML. Explicit user state remains authoritative over campaign; history pushState stores full validated preferences and source, popstate restores. Default reset removes owned pf_ params and choices. Unknown/missing context uses default. A discovery campaign implies Mother's Day only as a labeled seasonal simulation, not today's calendar. Urgent can retain that occasion when visitor switches from discovery. SAP clears date urgency and shows consent warning. Full catalog always reachable through reset.

Hard constraints: missing/invalid records rejected; unavailable fixtures excluded from guided results, zero-day eligibility required for urgent today, addon-only products excluded from gift ranking, SAP eligibility required for SAP. Before 11:00 eligible fixture; 11:00 and later no simulated online same-day selection. Sunday always closed; scheduled next-business-day advances past Sunday; 3-day calendar fixture starts next day, skips closed target date, explicitly CV. No promised real dates. Pickup does not bypass cutoff without merchant validation. Budget hard-filter after availability; style and occasion stable ranking, never alter prices. Empty result has clear broaden/reset path; never silently widen a selected budget.

## Acceptance tests and release gates
Phase 1: complete dataset fields, internally consistent rules, default/PDP/cart/operations layouts and acceptance matrix. Phase 2: rendered navigation, all products reachable, functional simulated PDP/cart, filters, mobile, no-JS browse/PDP/cart-guidance baseline. Phase 3: all four states; campaign/visitor precedence; URL conflict/unknown safety; transitions/back-forward; prices invariant; availability and cutoff simulation; default failure restoration. Phase 4: Chromium/Firefox/WebKit desktop and mobile emulation, keyboard, contrast, accessibility automated + manual smoke (report limits), 200% zoom, narrow viewport, reduced motion, no JS and engine exception, unavailable/missing data, Sunday and 10:59/11:00/11:01 boundaries, cart preservation and event integrity, performance lab observations and screenshots. Field CWV and full screen-reader/device-lab verification cannot be claimed from emulation.

Performance target: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 at p75 eventually field-tested; demo lab metrics are not field conformance. No LLM, vendor analytics, tracking IDs, local identity or customer history. Validated visitor mission/timing and demo bag use sessionStorage, scoped to the current browser session; no identity or free text. Events live only in presenter memory; bounded payload state/source/component/product/position/time, no raw URL/referrer/personal text. Fail mode restores default DOM and disables enhancement controls without losing cart. Theme installation/checkout validation remains a separate authorized future gate.

## Repository layout and commands
assets/engine.mjs pure rules; assets/app.mjs DOM adapter; assets/storefront.css; data/*.json; index.html and product-*.html generated static pages; delivery.html, cart.html; build.py generator; tests/engine.test.mjs; tests/browser.cjs; theme/{assets,sections,snippets,templates,layout,config}; docs/{BUILD_SPEC,QA_REPORT,PITCH,STATUS,SOURCE_LOG}. Run python3 build.py, node --test tests/engine.test.mjs, then browser suite with documented runtime dependency. Never publish the repository root or imply live checkout.

## Decisions and parked scope
Deterministic four states; no server decision API, identity/profile layer, public app, SaaS or CRM agent. Original illustrative visuals instead of merchant photo reuse. Static baseline first; Shopify source prepared but only labeled compatible candidate until installed. Checkout deliberately absent. Client outreach, prices for agency services and production deployments remain outside scope.
