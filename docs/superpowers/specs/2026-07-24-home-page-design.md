# Home page + docs as secondary page

## Problem

The template currently ships a single page (`index.html`) that *is* the docs. There's no simple landing/home page to introduce a project before sending visitors into the docs. `TODO.md` tracks this as "Add home page (to present the project)".

## Goal

Add a simple home page as the template's primary entry point, and move the existing one-page docs layout to a secondary page. Both pages share the same design tokens, topnav, and footer (including the light/dark/system theme toggle) already defined in `css/style.css` / `js/script.js`.

## File structure

- `index.html` — **new**, the home page (hero, features, CTA, footer).
- `docs.html` — the current `index.html` content, moved as-is (sidebar, TOC, doc sections, footer). No content changes beyond the topnav.
- `css/style.css`, `js/script.js` — stay shared, single files, extended rather than duplicated.

## Shared chrome changes

The topnav logo and footer currently read "Project/docs", which assumed the docs page was the entire site. With two pages, that no longer fits:

- Logo text becomes plain **"Project"** on both pages (drop the `/docs` suffix and its separator span).
- Logo links to `index.html` on both pages.
- Footer copyright text becomes **"© 2026 Project"** on both pages (same component, same markup shape as today, just without `/docs`).
- Topnav links:
  - On `index.html`: `Docs` → `docs.html`, `GitHub` → repo link.
  - On `docs.html`: `Home` → `index.html`, `GitHub` → repo link.
- The sidebar-toggle hamburger button stays only on `docs.html` (it has a sidebar to toggle); it's omitted entirely from `index.html`'s topnav markup.

## Home page content

Placeholder content in the same spirit as the existing docs placeholders ("Placeholder prose describing...") — meant to be replaced by whoever uses the template, not a description of the template itself.

1. **Hero** — page's only `<h1>` (`Project Name`), a one-line placeholder subtitle/tagline, and two buttons: primary "Read the docs" (→ `docs.html`), secondary "GitHub" (→ repo link).
2. **Features grid** — 3 placeholder feature cards, each a short title + one-line description. Generic (`Feature One` / `Feature Two` / `Feature Three`-style), not tied to any real product.
3. **CTA band** — a bordered card near the bottom: heading, one line of body text, and a "Read the docs" button. Mirrors the closing CTA pattern from `markdown-do`'s landing page but restyled with this template's tokens.
4. **Footer** — identical component to the one on `docs.html`, theme toggle included.

Explicitly out of scope for this pass (per trimmed-down direction): no screenshot/showcase section, no CLI/code-example section.

## New CSS

Added to the existing `css/style.css`, reusing existing tokens (zinc grayscale, amber accents, IBM Plex Sans/Inter, existing spacing/radius scale) — not `markdown-do`'s flexoki palette:

- `.hero`, `.hero__subtitle`, `.hero__actions`
- `.button`, `.button--primary`, `.button--secondary` (inverted-fill primary, outlined secondary; light + dark variants following the existing `:root.dark` override pattern)
- `.features-grid`, `.feature`
- `.cta`, `.cta-card`

A new `--text-display` token (56px) is added for the hero `<h1>`, sitting above the existing `--text-hero` (40px, currently used for `<h2>`).

## JS fix required

`js/script.js`'s `initSidebarToggle` and `initSidebarDismissal` currently assume `#sidebar` / `#sidebarToggle` / `#sidebarOverlay` always exist in the DOM. Since `index.html` has none of those elements, both functions get a null-guard at the top (`if (!sidebar || !sidebarToggle || !sidebarOverlay) return;`) so the shared script doesn't throw on the home page. Theme toggle and scrollspy already degrade safely (`querySelectorAll` on absent elements yields an empty list; scrollspy is only wired to elements that exist on `docs.html`).

## Docs updates

- `README.md`'s "Using this template" section updated to describe both pages and the rename steps for each (logo/title in both files, GitHub link in both, hero/feature/CTA copy in `index.html`, doc sections in `docs.html`).
- `TODO.md`'s "Add home page" task marked done via `mdd -c <id>` once implemented (not edited by hand, per this user's task-tracking convention).

## Testing

Open both pages directly in a browser (no build step) and verify:
- Home page renders hero/features/CTA correctly in light and dark mode; buttons link to the right places.
- Docs page still works exactly as before (sidebar, scrollspy, TOC, code-block copy, theme toggle) — the JS guard change should be a no-op there since all three elements exist.
- Nav round-trip: home → docs → home works via the topnav links and logo.
- Mobile breakpoint (≤859px): docs page sidebar drawer still works; home page has no hamburger and its sections stack cleanly.
