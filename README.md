This is a template for the documentation website of my projects on GitHub.

It's a simple one page website, with a sidebar / TOC on the left and content on right.

It follows my styling, same as my website.

Plain HTML/CSS/JS — no build step, no npm, no framework. Open `index.html` directly in a browser, or serve the folder as static files.

## Using this template

1. **Rename**: update the `<title>` in `index.html`'s `<head>` and the `.topnav__logo` text (and the GitHub link href) to your project's name.
2. **Replace the example content**: the template ships with three placeholder top-level sections (Getting Started / Guides / API Reference) to show the nesting depth the layout supports. Swap in real content inside `<main class="content">`.
   - Because there's no build step, every heading is hand-wired in **three places** that must stay in sync: the sidebar link (`<a class="sidebar__link" data-heading="...">`), the actual `<h3 id="...">` in the content, and the matching link inside its `.toc__panel`. Renaming or removing a heading means editing all three.
3. **Add or remove a whole section**: a top-level section is a matched trio — a `.sidebar__group`, a `.doc-section`, and a `.toc__panel` — all keyed by the same slug (e.g. `data-group="guides"`, `id="guides"`, `data-toc-panel="guides"`). Add/remove all three together.
4. **Callout variants**: `.callout--tip` is used by default; `.callout--wip`, `.callout--win`, and `.callout--legenda` are also defined in `css/style.css` if you want the other aside styles from iamfran.com.

## Styling

Design tokens (zinc grayscale, amber link accents, IBM Plex Sans/Inter/Cascadia Code fonts, dark mode) are ported from `iamfran.com` (the `realm-2025` project) — not from the `gfx-style-guide`/GreenFlux brand, which is a separate (work) design system. Fonts are loaded from Google Fonts rather than the `@fontsource` npm packages the real site uses, since this template has no build step; swap to self-hosted files later if you want to drop the Google Fonts request.

Dark mode is handled the same way as the real site: a pre-paint inline script in `index.html`'s `<head>` reads `localStorage.theme` (or falls back to `prefers-color-scheme`) and toggles a `.dark` class on `<html>` before CSS loads, avoiding a flash of the wrong theme. The light/dark/system toggle buttons live in the footer.

## Structure

```
index.html      — page content (nav, sidebar, doc sections, TOC panels, footer)
css/style.css   — design tokens (from iamfran.com) + docs layout
js/script.js    — scrollspy, mobile sidebar toggle, code-block copy buttons, theme toggle
```
