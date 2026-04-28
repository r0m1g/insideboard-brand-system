(function () {

  // ─── SIDEBAR GROUPS ──────────────────────────────────────
  var GROUPS = [
    {
      num: '01', name: 'Design System',
      items: [
        { id: 'foundations', href: 'foundations.html', label: 'Foundations' },
        { id: 'components',  href: 'components.html',  label: 'Components'  },
        { id: 'patterns',    href: 'patterns.html',    label: 'Patterns'    },
      ],
    },
    {
      num: '02', name: 'Resources',
      items: [
        { id: 'assets', href: 'assets.html', label: 'Assets' },
        { id: 'icons',  href: 'icons.html',  label: 'Icons'  },
      ],
    },
    {
      num: '03', name: 'Project',
      items: [
        { id: 'docs',    href: 'docs.html',    label: 'Docs'    },
        { id: 'audit',   href: 'audit.html',   label: 'Audit'   },
        { id: 'logbook', href: 'logbook.html', label: 'Logbook' },
      ],
    },
  ];

  // ─── PAGE METADATA (header injection) ────────────────────
  var PAGES = {
    foundations: { num: '01', section: 'Design System', title: 'Foundations.', deck: 'Design tokens — palette, typography, spacing. The raw values everything else is built from. Source: <code>tokens.json</code> (W3C Design Tokens), generated to CSS by <code>scripts/build-tokens.js</code>.' },
    components:  { num: '01', section: 'Design System', title: 'Components.',  deck: 'Live component prototypes using real CSS from <code>brandOS-components.css</code>. All content is fake.' },
    patterns:    { num: '01', section: 'Design System', title: 'Patterns.',    deck: 'Recurring compositions and layout conventions — how components combine into larger structures.' },
    assets:      { num: '02', section: 'Resources',     title: 'Assets.',      deck: 'Logos, fonts, and production-ready files. Source of truth for export and usage.' },
    icons:       { num: '02', section: 'Resources',     title: 'Icons.',       deck: 'Browse, search, and download icons. All icons are 24×24, stroke-based, and use <code>currentColor</code>. Source of truth: <code>assets/icons/icons.md</code>.' },
    docs:        { num: '03', section: 'Project',       title: 'Docs.',        deck: 'Roadmap, decisions, devlog, and backlog — the living record of how the Brand OS is built.' },
    audit:       { num: '03', section: 'Project',       title: 'Audit.',       deck: 'Full alignment audit history. One entry per run — layers checked, findings logged, corrections applied.' },
    logbook:     { num: '03', section: 'Project',       title: 'Logbook.',     deck: 'Daily activity log — one entry per session. Résumé of changes, analysis of patterns and risks, decisions made, actions taken.' },
  };

  function currentPage() {
    return location.pathname.split('/').pop().replace('.html', '') || 'index';
  }

  function renderSidebar() {
    var el = document.getElementById('sys-sidebar');
    if (!el) return;
    var current = currentPage();

    // Same HTML structure as Brand OS nav, just with workbench labels
    var html =
      '<a href="../index.html" class="nav-system-link">← Brand OS</a>' +
      '<a href="index.html" class="brand">' +
        '<span class="nav-brand-name">InsideBoard AI</span>' +
        '<span class="nav-brand-sub">Workbench</span>' +
      '</a>';

    GROUPS.forEach(function (group) {
      var groupActive = group.items.some(function (it) { return it.id === current; });
      html +=
        '<div class="ng">' +
          '<a class="ngl-link' + (groupActive ? ' active' : '') + '" href="' + group.items[0].href + '">' +
            '<span class="ng-num">' + group.num + '</span>' +
            '<span class="ng-sep">·</span>' +
            '<span class="ng-name">' + group.name + '</span>' +
          '</a>' +
          '<ol>';
      group.items.forEach(function (item) {
        var active = item.id === current ? ' class="active"' : '';
        html += '<li><a href="' + item.href + '"' + active + '>' + item.label + '</a></li>';
      });
      html += '</ol></div>';
    });

    html +=
      '<div class="nav-footer">' +
        '<img src="../assets/logos/mark-insideboard-white.svg" alt="" class="nav-mark">' +
      '</div>';

    el.innerHTML = html;
  }

  function renderHeader() {
    var el = document.getElementById('sys-header');
    if (!el) return;
    var data = PAGES[currentPage()];
    if (!data) return;

    el.innerHTML =
      '<a href="index.html" class="sys-back-page">← Workbench</a>' +
      '<div class="sys-header-eyebrow">' +
        '<span>' + data.num + '</span>' +
        '<span class="sep">·</span>' +
        '<span>' + data.section + '</span>' +
      '</div>' +
      '<h1 class="sys-header-display">' + data.title + '</h1>' +
      '<p class="sys-header-deck">' + data.deck + '</p>';
  }

  function init() {
    renderSidebar();
    renderHeader();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
