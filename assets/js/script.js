(function () {
  "use strict";

  var sidebar = document.getElementById("sidebar");
  var sidebarToggle = document.getElementById("sidebarToggle");
  var sidebarOverlay = document.getElementById("sidebarOverlay");

  function openSidebar() {
    sidebar.classList.add("is-open");
    sidebarToggle.setAttribute("aria-expanded", "true");
    sidebarOverlay.hidden = false;
  }

  function closeSidebar() {
    sidebar.classList.remove("is-open");
    sidebarToggle.setAttribute("aria-expanded", "false");
    sidebarOverlay.hidden = true;
  }

  function initSidebarToggle() {
    if (!sidebar || !sidebarToggle || !sidebarOverlay) return;

    sidebarToggle.addEventListener("click", function () {
      var isOpen = sidebar.classList.contains("is-open");
      if (isOpen) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });
  }

  function initSidebarDismissal() {
    if (!sidebar || !sidebarToggle || !sidebarOverlay) return;

    sidebarOverlay.addEventListener("click", closeSidebar);

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && sidebar.classList.contains("is-open")) {
        closeSidebar();
        sidebarToggle.focus();
      }
    });

    var sidebarLinks = sidebar.querySelectorAll(".sidebar__link");
    sidebarLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        // Only matters on mobile where the sidebar is an overlay drawer;
        // harmless no-op on desktop where it's always visible.
        closeSidebar();
      });
    });
  }

  function setActiveHeading(headingId) {
    var activeLinks = document.querySelectorAll(".is-active");
    activeLinks.forEach(function (link) {
      link.classList.remove("is-active");
      link.removeAttribute("aria-current");
    });

    var sidebarLink = document.querySelector(
      '.sidebar__link[data-heading="' + headingId + '"]'
    );
    if (sidebarLink) {
      sidebarLink.classList.add("is-active");
      sidebarLink.setAttribute("aria-current", "location");
    }
  }

  // Standard scrollspy technique: track which observed elements are
  // currently intersecting, and treat the first one in document order
  // as "active". This avoids flicker when multiple entries fire in the
  // same frame during fast scrolling.
  function createSpy(elements, onActiveChange) {
    var elementList = Array.prototype.slice.call(elements);
    var intersecting = new Set();

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            intersecting.add(entry.target);
          } else {
            intersecting.delete(entry.target);
          }
        });

        for (var i = 0; i < elementList.length; i++) {
          if (intersecting.has(elementList[i])) {
            onActiveChange(elementList[i]);
            break;
          }
        }
      },
      { rootMargin: "-16px 0px -60% 0px", threshold: 0 }
    );

    elementList.forEach(function (element) {
      observer.observe(element);
    });
  }

  function initScrollSpy() {
    // Only headings that have a sidebar link — the docs page's ### headings,
    // or the home page's ## sections.
    var headings = Array.prototype.filter.call(
      document.querySelectorAll("main h2[id], main h3[id]"),
      function (heading) {
        return document.querySelector('.sidebar__link[data-heading="' + heading.id + '"]');
      }
    );
    createSpy(headings, function (heading) {
      setActiveHeading(heading.id);
    });
  }

  // Markdown fenced code blocks render as Rouge-highlighted markup
  // (<div class="language-x highlighter-rouge"><div class="highlight">
  // <pre class="highlight"><code>...</code></pre></div></div>) with no
  // copy-button chrome. This unwraps that down to a plain <pre><code>
  // inside the same .code-block markup that used to be hand-written
  // directly in HTML, so authors can just write a fenced code block and
  // get the copy button for free. No Rouge theme stylesheet is included,
  // so the token <span>s Rouge adds render in plain inherited text color —
  // visually identical to the old hand-written markup.
  function initCodeBlockChrome() {
    var rougeBlocks = document.querySelectorAll("main div.highlighter-rouge");
    var counter = 0;

    rougeBlocks.forEach(function (rougeDiv) {
      var pre = rougeDiv.querySelector("pre");
      var codeEl = pre && pre.querySelector("code");
      if (!pre || !codeEl) return;

      counter += 1;
      var id = "code-block-" + counter;
      codeEl.id = id;
      pre.className = "";

      var langMatch = /language-(\S+)/.exec(rougeDiv.className);
      var lang = langMatch && langMatch[1] !== "plaintext" ? langMatch[1] : "";

      var wrapper = document.createElement("div");
      wrapper.className = "code-block not-prose";

      var header = document.createElement("div");
      header.className = "code-block__header";

      var langLabel = document.createElement("span");
      langLabel.className = "code-block__lang";
      langLabel.textContent = lang;

      var copyButton = document.createElement("button");
      copyButton.className = "code-block__copy";
      copyButton.type = "button";
      copyButton.setAttribute("data-copy-target", id);
      copyButton.textContent = "Copy";

      header.appendChild(langLabel);
      header.appendChild(copyButton);
      wrapper.appendChild(header);
      wrapper.appendChild(pre);

      rougeDiv.parentNode.replaceChild(wrapper, rougeDiv);
    });
  }

  function initCodeCopyButtons() {
    var buttons = document.querySelectorAll(".code-block__copy");
    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        var targetId = button.getAttribute("data-copy-target");
        var codeEl = document.getElementById(targetId);
        if (!codeEl) return;

        var text = codeEl.textContent;
        var originalLabel = button.textContent;

        function showCopied() {
          button.textContent = "Copied";
          setTimeout(function () {
            button.textContent = originalLabel;
          }, 1500);
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(showCopied, function () {
            /* clipboard write failed; no-op */
          });
        }
      });
    });
  }

  // Back-to-top button: shown once the page has scrolled a bit.
  function initBackToTop() {
    var button = document.getElementById("backToTop");
    if (!button) return;

    function onScroll() {
      document.documentElement.classList.toggle("scrolled", window.scrollY > 400);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    button.addEventListener("click", function () {
      window.scrollTo({ top: 0 });
    });
  }

  function init() {
    initSidebarToggle();
    initSidebarDismissal();
    initScrollSpy();
    initCodeBlockChrome();
    initCodeCopyButtons();
    initBackToTop();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
