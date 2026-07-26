This is a template for the documentation website of my projects on GitHub.

It's a two-page site: a simple home page (`index.html`) and a one-page docs layout (`docs.html`) with a sidebar / TOC on the left and content on the right.

It follows my styling, same as my website.

Built with Jekyll, which GitHub Pages runs for you automatically on every push — no CI workflow to set up, no Node/npm involved. Docs content is written in Markdown. `bundle exec jekyll serve` gives you a local preview (see [Local preview](#local-preview)) but isn't required — pushing is enough.

## Using this template

1. **Rename**: edit `_config.yml` — `title`, `tagline` (hero subtitle), `description`, `github_url`, `author_url`/`author_label`, and `url`/`baseurl` (see step 7). These values drive the `<title>`, meta tags, topnav, and footer on both pages, so most of the old "edit this in three places" renaming is now one edit in one file. The exceptions: `docs.html`'s own `description` front matter (a separate one-line summary for the docs page) and the three feature cards / CTA copy on `index.html`, which are still hand-written HTML.
2. **Home page (`index.html`)**: replace the placeholder feature cards and CTA copy. It's plain markup — no wiring required — the hero and GitHub links already come from `_config.yml`.
3. **Docs page (`docs.html`)**: content lives in `_docs/*.md`, one file per top-level section — ships with three placeholders (`getting-started.md`, `guides.md`, `api-reference.md`) to show the nesting depth the layout supports. `docs.html` itself is just front matter; don't edit its body.
   - Each file's front matter has a `headings:` list (`id` + `label`) that drives both the sidebar links and the TOC panel for that section. Every heading you want to appear in the nav needs **two** things kept in sync (down from three, and now both live in the same file): an entry in that `headings:` list, and a matching explicit ID on the actual heading in the content — `### Quick Start {#quick-start}`.
4. **Add or remove a whole docs section**: add or delete a file in `_docs/`. Front matter needs `title`, `slug` (used as the section's anchor id and sidebar `data-group`), and `order` (controls position — sections render sorted by this).
5. **Markdown authoring conventions**:
   - **Code blocks**: just use a plain fenced block (` ```bash `). JS automatically wraps it with the copy-button chrome at load time — no manual `<div class="code-block">` markup needed anymore.
   - **Callouts**: `.callout--tip` is used by default; `.callout--wip`, `.callout--win`, and `.callout--legenda` are also defined in `css/tailwind-input.css`. Write them as raw HTML with `markdown="1"` so kramdown still processes Markdown inside, and `not-prose` so the Tailwind Typography plugin (which styles the rest of the doc content) doesn't add its own paragraph spacing inside the box: `<aside class="callout callout--tip not-prose" markdown="1">**Tip:** ...</aside>`.
   - **Tables**: plain Markdown tables — no class needed. The Tailwind Typography plugin (`.prose`, applied to all doc content) styles them automatically.
   - **Images with a class** (e.g. the doc-section media slot below): `![alt](assets/demo.gif){: .doc-section__media}`.
6. **Logo (optional)**: drop a square image at `assets/logo.png`, then uncomment the `<img class="topnav__logo-icon">` line inside `.topnav__logo` in both `_layouts/home.html` and `_layouts/docs.html`. It renders as a circular crop to the left of the title (`.topnav__logo-icon` in `css/tailwind-input.css`). Left commented out by default because, unlike a missing favicon, a missing `<img src>` shows a visible broken-image icon.
7. **Favicon / social preview**: both layouts' `<head>` (via `_includes/head.html`) already ship the full set of tags — `theme-color`, Open Graph, Twitter Card, and the six icon `<link>`s (`favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png` @180×180, `android-chrome-192x192.png`, `android-chrome-512x512.png`), all built from `_config.yml`. Replace the placeholder files under `assets/` with your own set generated from your logo, and set `url`/`baseurl` in `_config.yml` to your real GitHub Pages URL — a project page at `you.github.io/project/` needs `baseurl: "/project"`; a user/org root page or custom domain needs `baseurl: ""`.
8. **CTA banner (optional)**: the CTA card at the bottom of `index.html` has a commented-out `.cta-card__banner` slot right after the closing card — a small (max 320px), rounded-corner image. Uncomment it and point it at a wide (roughly 2:1) image of your own.
9. **Showcase (optional)**: a commented-out `.showcase` section sits between the hero and "What you get" on `index.html`, for a full-width product screenshot or demo GIF. Uncomment it and point the `<img>` at your own asset.
10. **Doc-section media (optional)**: a commented-out `.doc-section__media` image sits at the top of `_docs/getting-started.md`, for a screenshot or demo GIF inline with the prose. Uncomment it and point it at your own asset — reuse the `{: .doc-section__media}` IAL anywhere else you want the same treatment on a Markdown image.

## Local preview

Requires Ruby (no Node/npm). Once per checkout:

```bash
bundle install
bundle exec jekyll serve
```

This pins Jekyll/kramdown/Rouge to the same versions GitHub Pages builds with (see `Gemfile`), so the local preview matches production.

## Styling

Built with [Tailwind CSS v4](https://tailwindcss.com) via the **standalone CLI** — a self-contained downloaded binary, no Node/npm involved. `css/tailwind-input.css` is the real source; `css/style.css` is generated from it and committed (same spirit as `_site/` in reverse — here the *build output* is what ships, since GitHub Pages has no way to run a Tailwind build for you). **Never hand-edit `css/style.css` directly** — edit `css/tailwind-input.css` and rebuild.

One-time setup (macOS Apple Silicon shown; see the [releases page](https://github.com/tailwindlabs/tailwindcss/releases) for other platforms — `tailwindcss-macos-x64`, `tailwindcss-linux-x64`, `tailwindcss-linux-arm64`, `tailwindcss-windows-x64.exe`):

```bash
curl -sLO https://github.com/tailwindlabs/tailwindcss/releases/download/v4.3.3/tailwindcss-macos-arm64
chmod +x tailwindcss-macos-arm64
mv tailwindcss-macos-arm64 tailwindcss
```

Rebuild after any change to `css/tailwind-input.css`:

```bash
./tailwindcss -i css/tailwind-input.css -o css/style.css
```

Design tokens (zinc grayscale, amber link accents, IBM Plex Sans/Inter/Cascadia Code fonts, dark mode) are ported from `iamfran.com` (the `realm-2025` project) — not from the `gfx-style-guide`/GreenFlux brand, which is a separate (work) design system. The zinc/amber/teal/orange/stone colors are Tailwind's own default palette (used directly, not overridden) rather than hand-pinned hex values. Fonts are loaded from Google Fonts rather than the `@fontsource` npm packages the real site uses, since this template avoids Node tooling; swap to self-hosted files later if you want to drop the Google Fonts request.

Docs content (`_docs/*.md`) has no hand-placed classes, so it's styled via the [Tailwind Typography plugin](https://github.com/tailwindlabs/tailwindcss-typography) (bundled in the standalone CLI, zero extra install) — see the `.prose` wrapper in `_layouts/docs.html` and the `--tw-prose-*` overrides at the bottom of `css/tailwind-input.css`. Custom elements the plugin doesn't know about (callouts, the code-block chrome, doc-section media images) opt out via `not-prose` and get their own `@layer components` classes instead — same pattern as `.topnav`, `.sidebar`, `.hero`, etc., which keep their original class names from before this rewrite (only what those classes resolve to changed, not the markup using them).

Dark mode is handled the same way as the real site: a pre-paint inline script in `_includes/head.html` reads `localStorage.theme` (or falls back to `prefers-color-scheme`) and toggles a `.dark` class on `<html>` before CSS loads, avoiding a flash of the wrong theme. In Tailwind terms this is a `@custom-variant dark (&:where(.dark, .dark *));` declaration in `css/tailwind-input.css`. The light/dark/system toggle buttons live in the footer.

Code blocks: GitHub Pages' Jekyll always runs fenced code through Rouge (there's no config that turns this off — verified locally), which wraps each block in `<div class="language-x highlighter-rouge">...`. `js/script.js`'s `initCodeBlockChrome()` unwraps that down to a plain `<pre><code>` inside the existing `.code-block` chrome at load time. Since no Rouge theme stylesheet is included, the token `<span>`s Rouge adds render in plain inherited text color — visually identical to the old hand-written markup. Adding a Rouge theme for real syntax coloring is a deliberate follow-up, not something this template does today.

## Structure

```
_config.yml         — site-wide values (title, tagline, description, GitHub/author URLs, deploy url/baseurl)
_layouts/base.html  — shared <head>/footer/scripts, wraps home.html and docs.html
_layouts/home.html  — home page topnav + <main> wrapper
_layouts/docs.html  — docs page topnav, sidebar, content, and TOC — all generated from _docs/
_includes/head.html — meta tags, favicons, pre-paint theme script, fonts, stylesheet
_includes/footer.html — theme toggle + copyright
_docs/               — one Markdown file per top-level docs section (title/slug/order/headings front matter)
index.html            — home page content (hero, feature cards, CTA) — front matter only, layout: home
docs.html             — empty; front matter only, layout: docs — all content comes from _docs/
css/tailwind-input.css — Tailwind source (edit this one) — theme, dark-mode variant, @layer components, prose overrides
css/style.css          — generated from tailwind-input.css — never hand-edit
js/script.js           — scrollspy, mobile sidebar toggle, code-block chrome + copy buttons, theme toggle
Gemfile                — pins the github-pages gem for local preview parity with GitHub's build
```
