source "https://rubygems.org"

# Pins Jekyll/kramdown/Rouge to the exact versions GitHub Pages builds with,
# so `bundle exec jekyll serve` matches production. No Node/npm involved.
gem "github-pages", group: :jekyll_plugins

# github-pages pins Jekyll 3.x, which assumes stdlib gems that Ruby stopped
# bundling by default in 3.4+ (this repo installs against a newer Homebrew
# Ruby locally than GitHub Pages' own build image uses).
gem "csv"
gem "logger"
gem "base64"
gem "bigdecimal"
