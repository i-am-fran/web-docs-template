This is a template for the documentation website of my projects on GitHub.

It's a two-page site: a home page (`index.md`) and a one-page docs layout (`docs.html`). Both share the same shell: a fixed left column (wordmark, links, section nav) next to one centered reading column.

The design follows [pele.run](https://pele.run) (by kepano): the [Flexoki](https://stephango.com/flexoki) dark palette, the system font stack, no top bar. Dark only.

Built with Jekyll, which GitHub Pages runs for you automatically on every push — no CI workflow to set up, no Node/npm involved. Docs content is written in Markdown. `bundle exec jekyll serve` gives you a local preview (see [Local preview](#local-preview)) but isn't required — pushing is enough.

## Using this template

1. **Rename**: edit `_config.yml` — `title`, `tagline` (the large lede sentence at the top of the home page), `description`, `github_url`, `author_url`/`author_label`, and `url`/`baseurl` (see step 7). These values drive the `<title>`, meta tags, wordmark, nav links and footer on both pages, so most of the old "edit this in three places" renaming is now one edit in one file. The exceptions: `docs.html`'s own `description` front matter (a separate one-line summary for the docs page) and the body of `index.md`, which is hand-written.
2. **Home page (`index.md`)**: Markdown with a few HTML bits. Replace the placeholder "How it works" and "Install" sections and the "Explore" `.link-grid` cards. Each `## Heading {#id}` that should appear in the left nav also needs an entry in the `sections:` front matter list (`id` + `label`), the same pairing the docs headings use.
3. **Docs page (`docs.html`)**: content lives in `_docs/*.md`, one file per top-level section — ships with three placeholders (`getting-started.md`, `guides.md`, `api-reference.md`) to show the nesting depth the layout supports. `docs.html` itself is just front matter; don't edit its body.
   - Each file's front matter has a `headings:` list (`id` + `label`) that drives the sidebar links for that section. Every heading you want to appear in the nav needs **two** things kept in sync (down from three, and now both live in the same file): an entry in that `headings:` list, and a matching explicit ID on the actual heading in the content — `### Quick Start {#quick-start}`.
4. **Add or remove a whole docs section**: add or delete a file in `_docs/`. Front matter needs `title`, `slug` (used as the section's anchor id and sidebar `data-group`), and `order` (controls position — sections render sorted by this).
5. **Markdown authoring conventions**:
   - **Code blocks**: just use a plain fenced block (` ```bash `). JS automatically wraps it with the copy-button chrome at load time — no manual `<div class="code-block">` markup needed anymore.
   - **Callouts**: `.callout--tip` is used by default; `.callout--wip`, `.callout--win`, and `.callout--legenda` are also defined in `css/tailwind-input.css`. Write them as raw HTML with `markdown="1"` so kramdown still processes Markdown inside, and `not-prose` so the Tailwind Typography plugin (which styles the rest of the doc content) doesn't add its own paragraph spacing inside the box: `<aside class="callout callout--tip not-prose" markdown="1">**Tip:** ...</aside>`.
   - **Tables**: plain Markdown tables — no class needed. The Tailwind Typography plugin (`.prose`, applied to all doc content) styles them automatically.
   - **Images with a class** (e.g. the doc-section media slot below): `![alt](assets/demo.gif){: .doc-section__media}`.
6. **Logo (optional)**: drop a square image under `assets/` and set `logo: /assets/your-logo.png` in `_config.yml`. It renders as a small rounded icon next to the wordmark (`.wordmark__icon`) and as a larger mark at the top of the home page (`.home-logo`), like pele.run's logo. Config-driven rather than a line to uncomment in the layouts specifically so a `remote_theme` consumer (which has no local layout files to edit) can still set a logo — see [Using this as a remote theme](#using-this-as-a-remote-theme).
7. **Favicon / social preview**: both layouts' `<head>` (via `_includes/head.html`) already ship the full set of tags — `theme-color`, Open Graph, Twitter Card, and the six icon `<link>`s (`favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png` @180×180, `android-chrome-192x192.png`, `android-chrome-512x512.png`), all built from `_config.yml`. Replace the placeholder files under `assets/` with your own set generated from your logo, and set `url`/`baseurl` in `_config.yml` to your real GitHub Pages URL — a project page at `you.github.io/project/` needs `baseurl: "/project"`; a user/org root page or custom domain needs `baseurl: ""`.
8. **Showcase (optional)**: a commented-out `.showcase` image sits under the lede on `index.md`, for a product screenshot or demo GIF (contained, max 480px, rounded). Uncomment it and point the `<img>` at your own asset.
9. **Doc-section media (optional)**: a commented-out `.doc-section__media` image sits at the top of `_docs/getting-started.md`, for a screenshot or demo GIF inline with the prose. Uncomment it and point it at your own asset — reuse the `{: .doc-section__media}` IAL anywhere else you want the same treatment on a Markdown image.

## Local preview

Requires Ruby (no Node/npm). Once per checkout:

```bash
bundle install
bundle exec jekyll serve
```

If `bundle install` fails on a newer Ruby (4.x can't build the pinned `github-pages` gems), use Homebrew's `ruby@3.1` by putting `/opt/homebrew/opt/ruby@3.1/bin` first on your `PATH`. If Sass complains about an "Invalid US-ASCII character", set `LANG=en_US.UTF-8` before `jekyll serve`.

This pins Jekyll/kramdown/Rouge to the same versions GitHub Pages builds with (see `Gemfile`), so the local preview matches production.

## Styling

Built with [Tailwind CSS v4](https://tailwindcss.com) via the **standalone CLI** — a self-contained downloaded binary, no Node/npm involved. `css/tailwind-input.css` is the real source; `assets/css/style.css` is generated from it and committed (same spirit as `_site/` in reverse — here the *build output* is what ships, since GitHub Pages has no way to run a Tailwind build for you). It lives under `assets/` rather than a top-level `css/` folder specifically so a `remote_theme` consumer picks it up automatically — see [Using this as a remote theme](#using-this-as-a-remote-theme). **Never hand-edit `assets/css/style.css` directly** — edit `css/tailwind-input.css` and rebuild.

One-time setup (macOS Apple Silicon shown; see the [releases page](https://github.com/tailwindlabs/tailwindcss/releases) for other platforms — `tailwindcss-macos-x64`, `tailwindcss-linux-x64`, `tailwindcss-linux-arm64`, `tailwindcss-windows-x64.exe`):

```bash
curl -sLO https://github.com/tailwindlabs/tailwindcss/releases/download/v4.3.3/tailwindcss-macos-arm64
chmod +x tailwindcss-macos-arm64
mv tailwindcss-macos-arm64 tailwindcss
```

Rebuild after any change to `css/tailwind-input.css`:

```bash
./tailwindcss -i css/tailwind-input.css -o assets/css/style.css
```

Design tokens are measured from [pele.run](https://pele.run): the Flexoki dark values live in `@theme` as `--color-ink`, `--color-panel`, `--color-line`, `--color-faint`, `--color-muted`, `--color-body` plus the eight accents (`--color-red` … `--color-magenta`, used only by callouts), so utilities like `bg-panel` and `text-muted` work. Fonts are the system stack (`-apple-system`, Inter, …) and `ui-monospace`, so there's no web-font request. The reading width is `42 × --font-size-body` (about 650px).

Docs content (`_docs/*.md`) has no hand-placed classes, so it's styled via the [Tailwind Typography plugin](https://github.com/tailwindlabs/tailwindcss-typography) (bundled in the standalone CLI, zero extra install) — see the `.prose` wrapper in `_layouts/docs.html` and the `--tw-prose-*` overrides at the bottom of `css/tailwind-input.css`. Custom elements the plugin doesn't know about (callouts, the code-block chrome, doc-section media images) opt out via `not-prose` and get their own `@layer components` classes instead — same pattern as `.sidebar`, `.wordmark`, `.footer`, etc.

The site is dark only, like pele.run: `color-scheme: dark` and a single `theme-color`, with no theme toggle and no pre-paint script.

Code blocks: GitHub Pages' Jekyll always runs fenced code through Rouge (there's no config that turns this off — verified locally), which wraps each block in `<div class="language-x highlighter-rouge">...`. `assets/js/script.js`'s `initCodeBlockChrome()` unwraps that down to a plain `<pre><code>` inside the existing `.code-block` chrome at load time. Since no Rouge theme stylesheet is included, the token `<span>`s Rouge adds render in plain inherited text color — visually identical to the old hand-written markup. Adding a Rouge theme for real syntax coloring is a deliberate follow-up, not something this template does today.

## Using this as a remote theme

Rather than copy-pasting this repo into another project's `docs/` folder (the old way — drifts out of sync as this template evolves), a consuming repo can reference it directly via Jekyll's [`remote_theme`](https://github.com/benbalter/jekyll-remote-theme), which GitHub Pages supports natively. Only `_layouts/`, `_includes/`, `_sass/`, and `assets/` are shared this way — a consumer still needs its own `index.md` (or `index.html`), `docs.html`, and `_docs/*.md` content, following the exact same structure as this repo's own (use them as the reference).

A consuming repo's `_config.yml` needs:

```yaml
remote_theme: i-am-fran/web-docs-template
plugins:
  - jekyll-remote-theme

collections:
  docs:
    output: false

title: "Your Project"
tagline: "..."
description: "..."
github_url: "https://github.com/you/your-project"
author_url: "https://iamfran.com"
author_label: "iamfran.com"
repository: "you/your-project"
url: "https://you.github.io"
baseurl: "/your-project"
logo: "/assets/your-logo.png"   # optional — see step 6 in "Using this template" above
markdown: kramdown
```

The `plugins` and `collections` entries are **not optional, and not inherited from the theme** — `jekyll-remote-theme` is bundled with the `github-pages` gem but isn't one of the handful of plugins GitHub Pages auto-enables, so it needs to be listed explicitly. Collection registration is site-level config a theme can't supply on a consumer's behalf either, even though the layout that loops over `site.docs` lives entirely in this repo.

A consumer's own file always overrides a theme file at the same path (e.g. a real `assets/favicon.ico` in the consumer repo wins over this template's placeholder). Real per-project assets (logos, favicons, screenshots) belong in the consumer's own `assets/` folder, alongside the shared `assets/css/style.css` and `assets/js/script.js` that come from the theme.

**Updates aren't always instant**: GitHub Pages doesn't reliably re-fetch a theme on a consumer's very next build right after this repo changes (a known `jekyll-remote-theme` limitation). If a consumer's site doesn't reflect a recent template update, push an empty/nudge commit to that consumer repo to force a fresh build.

## Structure

```
_config.yml         — site-wide values (title, tagline, description, GitHub/author URLs, deploy url/baseurl)
_layouts/base.html  — shared <head>/footer/scripts, wraps home.html and docs.html
_layouts/home.html  — home page shell: left nav (from the page's sections: list) + <main>
_layouts/docs.html  — docs page shell: left nav + content — all generated from _docs/
_includes/head.html — meta tags, favicons, stylesheet
_includes/site-nav.html — wordmark + Docs/GitHub links at the top of the left column
_includes/mobile-header.html — slim header with wordmark + menu button, shown below 860px
_includes/footer.html — footer links + author
_docs/               — one Markdown file per top-level docs section (title/slug/order/headings front matter)
index.md              — home page content (lede, sections, link grid) — layout: home
docs.html             — empty; front matter only, layout: docs — all content comes from _docs/
css/tailwind-input.css — Tailwind source (edit this one) — Flexoki theme tokens, component classes, prose overrides
assets/css/style.css   — generated from tailwind-input.css — never hand-edit
assets/js/script.js    — scrollspy, mobile sidebar toggle, code-block chrome + copy buttons
Gemfile                — pins the github-pages gem for local preview parity with GitHub's build
```

`_layouts/`, `_includes/`, and `assets/` are the parts a `remote_theme` consumer inherits automatically — see [Using this as a remote theme](#using-this-as-a-remote-theme). `css/tailwind-input.css` (the Tailwind source, not the compiled output) is intentionally outside `assets/` and excluded from the Jekyll build (`_config.yml`), since it's a build input, not something either this site or a consumer should serve.
