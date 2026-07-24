This is a template for the documentation website of my projects on GitHub.

It's a simple one page website, with a sidebar / TOC on the left and content on right.

It follows my styling, same as my website.

Plain HTML/CSS/JS — no build step, no npm, no framework. Open `index.html` directly in a browser, or serve the folder as static files.

## Using this template

1. **Rename**: update the `<title>` in `index.html`'s `<head>` and the `.topnav__logo` text (and the GitHub link href) to your project's name.
2. **Replace the example content**: the template ships with three placeholder top-level sections (Getting Started / Guides / API Reference) to show the nesting depth the layout supports. Swap in real content inside `<main class="content">`.
   - Because there's no build step, every heading is hand-wired in **three places** that must stay in sync: the sidebar link (`<a class="sidebar__link" data-heading="...">`), the actual `<h3 id="...">` in the content, and the matching link inside its `.toc__panel`. Renaming or removing a heading means editing all three.
3. **Add or remove a whole section**: a top-level section is a matched trio — a `.sidebar__group`, a `.doc-section`, and a `.toc__panel` — all keyed by the same slug (e.g. `data-group="guides"`, `id="guides"`, `data-toc-panel="guides"`). Add/remove all three together.
4. **Restore the real brand font**: the CSS already lists `"TWK Everett"` first in `--font-base` (in `css/style.css`), with Inter (loaded from Google Fonts) as a free stand-in since the real font isn't included here. To use the real one: drop the licensed `.woff2` file(s) into a new `fonts/` folder and add an `@font-face` block at the top of `css/style.css` pointing at them — nothing else needs to change, and you can drop the Google Fonts `<link>` tags in `index.html` once it's in place.

## Structure

```
index.html      — page content (nav, sidebar, doc sections, TOC panels)
css/style.css   — greenflux design tokens + docs layout
js/script.js    — scrollspy, mobile sidebar toggle, code-block copy buttons
```
