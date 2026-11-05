A Jekyll template for the documentation sites of my GitHub projects.

It makes two pages: a home page (`index.md`) and a single docs page (`docs.html`). Both have a fixed nav column on the left and one reading column. It's dark only, uses the [Flexoki](https://stephango.com/flexoki) palette and the system fonts, and takes its finishing touches from [iamfran.com](https://iamfran.com).

GitHub Pages builds it on every push. There's no Node and no CI to set up.

## Use it in a project

The usual way is as a remote theme. Add this to the project's `_config.yml`:

```yaml
remote_theme: i-am-fran/web-docs-template
plugins:
  - jekyll-remote-theme

collections:
  docs:
    output: false

title: "Your Project"
tagline: "One sentence on what it does."
description: "..."
github_url: "https://github.com/you/your-project"
author_url: "https://iamfran.com"
author_label: "iamfran.com"
repository: "you/your-project"
url: "https://you.github.io"
baseurl: "/your-project"
logo: "/assets/your-logo.png"   # optional
markdown: kramdown
```

The `plugins` and `collections` entries are required. A theme can't set them for you.

The project then needs its own `index.md`, `docs.html` and `_docs/*.md`. Copy them from this repo as a starting point. Any file the project has at the same path as a theme file wins, so put your own favicons and logo in the project's `assets/`.

If a project doesn't pick up a template change, push an empty commit to it to force a rebuild.

## Write the pages

- **Settings**: `_config.yml` sets the title, tagline, links and footer for both pages.
- **Home page**: `index.md`. Each `## Heading {#id}` you want in the nav also needs an `id` and `label` entry in the page's `sections:` front matter.
- **Docs page**: one Markdown file per section in `_docs/`, with `title`, `slug` and `order` front matter. Each heading in the nav needs an entry in the file's `headings:` list and a matching ID on the heading itself: `### Quick start {#quick-start}`. Leave `docs.html` as it is.
- **Logo**: set `logo:` in `_config.yml`. It shows next to the title, at the top of the home page and in the footer.
- **Favicons**: replace the placeholder icons in `assets/`.

## Markdown extras

- **Code blocks**: a normal fenced block gets a copy button.
- **Callouts**: `<aside class="callout callout--tip not-prose" markdown="1">**Tip:** ...</aside>`. Also `callout--wip`, `callout--win` and `callout--legenda`.
- **Buttons**: `<div class="actions"><a class="button button--primary" href="...">Install</a><a class="button" href="...">GitHub</a></div>`.
- **Accordions**: `<details class="accordion"><summary>Question?</summary><div class="accordion__body"><p>Answer.</p></div></details>`.
- **Keys and highlights**: `<kbd>⌘</kbd>` and `<mark>text</mark>`.
- **Images**: add `{: .doc-section__media}` after a Markdown image for the contained, rounded style.
- Tables and `[^1]` footnotes work as normal Markdown.

## Development

Preview locally (needs Ruby):

```bash
bundle install
bundle exec jekyll serve
```

On Ruby 4, use Homebrew's `ruby@3.1` instead. If Sass complains about a US-ASCII character, set `LANG=en_US.UTF-8`.

The styles are written in `css/tailwind-input.css` and built with the [Tailwind CSS](https://tailwindcss.com) standalone CLI into `assets/css/style.css`, which is committed. Don't edit `style.css` by hand. Download the CLI once from the [Tailwind releases](https://github.com/tailwindlabs/tailwindcss/releases), save it as `./tailwindcss`, then rebuild after each change:

```bash
./tailwindcss -i css/tailwind-input.css -o assets/css/style.css
```
