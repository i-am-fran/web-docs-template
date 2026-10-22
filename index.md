---
layout: home
sections:
  - id: how-it-works
    label: How it works
  - id: install
    label: Install
  - id: explore
    label: Explore
---
{% if site.logo %}<img src="{{ site.logo | relative_url }}" alt="{{ site.title }} logo" class="home-logo">{% endif %}

<p class="lede">{{ site.tagline }}</p>

<!-- Optional showcase: drop a screenshot or demo GIF at assets/showcase.png, then uncomment:
<img src="assets/showcase.png" alt="Describe what the screenshot/demo shows." class="showcase">
-->

## How it works {#how-it-works}

Placeholder paragraph explaining what the project does in one or two sentences. Show the smallest useful example below.

```bash
project-name do-something --with-flag
```

Placeholder follow-up line describing what the example produces.

***

## Install {#install}

Placeholder sentence about how to get it.

```bash
curl -fsSL https://example.com/install.sh | sh
```

***

<div class="section-head">
  <h2 id="explore">Explore</h2>
  <a class="pill" href="{{ '/docs.html' | relative_url }}">All docs</a>
</div>

<ul class="arrow-list">
  <li><a class="arrow-card" href="{{ '/docs.html#getting-started' | relative_url }}"><span class="arrow-card__text"><span class="arrow-card__title">Getting Started</span><span class="arrow-card__desc">Install and run it for the first time.</span></span>{% include arrow-icon.html %}</a></li>
  <li><a class="arrow-card" href="{{ '/docs.html#guides' | relative_url }}"><span class="arrow-card__text"><span class="arrow-card__title">Guides</span><span class="arrow-card__desc">Common and advanced usage patterns.</span></span>{% include arrow-icon.html %}</a></li>
  <li><a class="arrow-card" href="{{ '/docs.html#api-reference' | relative_url }}"><span class="arrow-card__text"><span class="arrow-card__title">API Reference</span><span class="arrow-card__desc">Endpoints, parameters and error codes.</span></span>{% include arrow-icon.html %}</a></li>
  <li><a class="arrow-card" href="{{ site.github_url }}" target="_blank" rel="noopener noreferrer"><span class="arrow-card__text"><span class="arrow-card__title">GitHub</span><span class="arrow-card__desc">Source code, issues and releases.</span></span>{% include arrow-icon.html %}</a></li>
</ul>
