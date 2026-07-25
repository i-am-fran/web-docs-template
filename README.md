This is a template for the documentation website of my projects on GitHub.

It's a two-page site: a simple home page (`index.html`) and a one-page docs layout (`docs.html`) with a sidebar / TOC on the left and content on the right.

It follows my styling, same as my website.

Plain HTML/CSS/JS — no build step, no npm, no framework. Open `index.html` or `docs.html` directly in a browser, or serve the folder as static files.

## Using this template

1. **Rename**: update the `<title>` in both `index.html` and `docs.html`, the `.topnav__logo` text (plain `"Project"`, shared by both pages), the footer copyright text, and the GitHub link href (appears in both pages' topnav and, on `index.html`, in the hero and CTA buttons).
2. **Home page (`index.html`)**: replace the placeholder hero title/subtitle, the three placeholder feature cards, and the CTA card copy. All of it is plain markup — no wiring required.
3. **Docs page (`docs.html`)**: ships with three placeholder top-level sections (Getting Started / Guides / API Reference) to show the nesting depth the layout supports. Swap in real content inside `<main class="content">`.
   - Because there's no build step, every heading is hand-wired in **three places** that must stay in sync: the sidebar link (`<a class="sidebar__link" data-heading="...">`), the actual `<h3 id="...">` in the content, and the matching link inside its `.toc__panel`. Renaming or removing a heading means editing all three.
4. **Add or remove a whole docs section**: a top-level section is a matched trio — a `.sidebar__group`, a `.doc-section`, and a `.toc__panel` — all keyed by the same slug (e.g. `data-group="guides"`, `id="guides"`, `data-toc-panel="guides"`). Add/remove all three together.
5. **Callout variants**: `.callout--tip` is used by default; `.callout--wip`, `.callout--win`, and `.callout--legenda` are also defined in `css/style.css` if you want the other aside styles from iamfran.com.
6. **Logo (optional)**: drop a square image at `assets/logo.png`, then uncomment the `<img class="topnav__logo-icon">` line inside `.topnav__logo` in both `index.html` and `docs.html`. It renders as a circular crop to the left of the title (`.topnav__logo-icon` in `css/style.css`). Left commented out by default because, unlike a missing favicon, a missing `<img src>` shows a visible broken-image icon.
7. **Favicon / social preview**: both pages' `<head>` already ship the full set of tags — `theme-color`, Open Graph, Twitter Card, and the six icon `<link>`s (`favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png` @180×180, `android-chrome-192x192.png`, `android-chrome-512x512.png`). Replace the placeholder files under `assets/` with your own set generated from your logo, and swap the `https://you.github.io/project/...` URLs for your real ones.

## Styling

Design tokens (zinc grayscale, amber link accents, IBM Plex Sans/Inter/Cascadia Code fonts, dark mode) are ported from `iamfran.com` (the `realm-2025` project) — not from the `gfx-style-guide`/GreenFlux brand, which is a separate (work) design system. Fonts are loaded from Google Fonts rather than the `@fontsource` npm packages the real site uses, since this template has no build step; swap to self-hosted files later if you want to drop the Google Fonts request.

Dark mode is handled the same way as the real site: a pre-paint inline script in each page's `<head>` reads `localStorage.theme` (or falls back to `prefers-color-scheme`) and toggles a `.dark` class on `<html>` before CSS loads, avoiding a flash of the wrong theme. The light/dark/system toggle buttons live in the footer.

## Structure

```
index.html      — home page (hero, feature cards, CTA card, topnav, footer)
docs.html       — docs page (sidebar, content sections, TOC panels, topnav, footer)
css/style.css   — design tokens (from iamfran.com) + layout for both pages
js/script.js    — scrollspy, mobile sidebar toggle, code-block copy buttons, theme toggle
```
