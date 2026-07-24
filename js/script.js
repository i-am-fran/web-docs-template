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

  function setActiveSection(sectionId) {
    var panels = document.querySelectorAll(".toc__panel");
    panels.forEach(function (panel) {
      panel.hidden = panel.getAttribute("data-toc-panel") !== sectionId;
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
    var tocLink = document.querySelector('.toc__link[href="#' + headingId + '"]');

    [sidebarLink, tocLink].forEach(function (link) {
      if (link) {
        link.classList.add("is-active");
        link.setAttribute("aria-current", "location");
      }
    });
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
      { rootMargin: "-64px 0px -60% 0px", threshold: 0 }
    );

    elementList.forEach(function (element) {
      observer.observe(element);
    });
  }

  function initScrollSpy() {
    var sections = document.querySelectorAll(".doc-section[data-section]");
    createSpy(sections, function (section) {
      setActiveSection(section.id);
    });

    var headings = document.querySelectorAll("main h3[id]");
    createSpy(headings, function (heading) {
      setActiveHeading(heading.id);
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

  function init() {
    initSidebarToggle();
    initSidebarDismissal();
    initScrollSpy();
    initCodeCopyButtons();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
