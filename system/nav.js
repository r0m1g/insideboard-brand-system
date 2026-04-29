(function () {

  // ─── ARROW SPRITE — change paths here to restyle all arrows ──
  var ARR_R = '<svg class="arr" aria-hidden="true"><use href="#arr-r"/></svg>';
  var ARR_L = '<svg class="arr" aria-hidden="true"><use href="#arr-l"/></svg>';

  // ─── SIDEBAR GROUPS ──────────────────────────────────────────
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
        { id: 'logbook', href: 'logbook.html', label: 'Logbook' },
        { id: 'process', href: 'process.html', label: 'Process' },
      ],
    },
  ];

  // ─── PAGE METADATA (header + hub) ────────────────────────────
  var PAGES = {
    foundations: { num: '01', section: 'Design System', title: 'Foundations.', desc: 'Tokens, color, type scale, spacing',       deck: 'Design tokens — palette, typography, spacing. The raw values everything else is built from. Source: <code>tokens.json</code> (W3C Design Tokens), generated to CSS by <code>scripts/build-tokens.js</code>.' },
    components:  { num: '01', section: 'Design System', title: 'Components.',  desc: 'UI library & specifications',               deck: 'Live component prototypes using real CSS from <code>brandOS-components.css</code>. All content is fake.' },
    patterns:    { num: '01', section: 'Design System', title: 'Patterns.',    desc: 'Composition & layout conventions',          deck: 'Recurring compositions and layout conventions — how components combine into larger structures.' },
    assets:      { num: '02', section: 'Resources',     title: 'Assets.',      desc: 'Logos, fonts, production files',            deck: 'Logos, fonts, and production-ready files. Source of truth for export and usage.' },
    icons:       { num: '02', section: 'Resources',     title: 'Icons.',       desc: 'Icon system & registry',                   deck: 'Browse, search, and download icons. All icons are 24×24, stroke-based, and use <code>currentColor</code>. Source of truth: <code>assets/icons/icons.md</code>.' },
    docs:        { num: '03', section: 'Project',       title: 'Docs.',        desc: 'Roadmap & architecture decisions',          deck: 'Roadmap, decisions, devlog, and backlog — the living record of how the Brand OS is built.' },
    logbook:     { num: '03', section: 'Project',       title: 'Logbook.',     desc: 'Session log & changes',                    deck: 'Daily activity log — one entry per session. Résumé of changes, analysis of patterns and risks, decisions made, actions taken.' },
    process:     { num: '03', section: 'Project',       title: 'Process.',     desc: 'Commands, rules, file architecture',        deck: 'Commands, rules, and file architecture — how this project is built and maintained.' },
  };

  function currentPage() {
    return location.pathname.split('/').pop().replace('.html', '') || 'index';
  }

  function renderSprite() {
    if (document.getElementById('icon-sprite')) return;
    var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('id', 'icon-sprite');
    s.setAttribute('style', 'display:none');
    s.setAttribute('aria-hidden', 'true');
    s.innerHTML =
      '<symbol id="arr-r" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M15 6l6 6-6 6"/></symbol>' +
      '<symbol id="arr-l" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M9 6l-6 6 6 6"/></symbol>';
    document.body.insertBefore(s, document.body.firstChild);
  }

  function renderSidebar() {
    var el = document.getElementById('sys-sidebar');
    if (!el) return;
    var current = currentPage();

    var html =
      '<a href="../index.html" class="nav-system-link">' + ARR_L + 'Brand OS</a>' +
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

  function renderHub() {
    var el = document.getElementById('hub-groups');
    if (!el) return;
    var html = '';
    GROUPS.forEach(function (group) {
      var count = group.items.length;
      html +=
        '<section class="hub-part">' +
          '<div class="hub-part-head">' +
            '<span class="hub-part-num">' + group.num + '</span>' +
            '<span class="hub-part-name">' + group.name + '.</span>' +
            '<span></span>' +
            '<span class="hub-part-meta">' + count + ' chapter' + (count !== 1 ? 's' : '') + '</span>' +
          '</div>' +
          '<ul class="hub-list">';
      group.items.forEach(function (item) {
        var page = PAGES[item.id] || {};
        html +=
          '<li>' +
            '<a href="' + item.href + '" class="hub-row">' +
              '<span class="hub-row-title">' + item.label + '</span>' +
              '<span class="hub-row-desc">' + (page.desc || '') + '</span>' +
              '<span class="hub-row-arrow">' + ARR_R + '</span>' +
            '</a>' +
          '</li>';
      });
      html += '</ul></section>';
    });
    el.innerHTML = html;
  }

  function renderHeader() {
    var el = document.getElementById('sys-header');
    if (!el) return;
    var data = PAGES[currentPage()];
    if (!data) return;

    el.innerHTML =
      '<a href="index.html" class="sys-back-page">' + ARR_L + 'Workbench</a>' +
      '<div class="sys-header-eyebrow">' +
        '<span>' + data.num + '</span>' +
        '<span class="sep">·</span>' +
        '<span>' + data.section + '</span>' +
      '</div>' +
      '<h1 class="sys-header-display">' + data.title + '</h1>' +
      '<p class="sys-header-deck">' + data.deck + '</p>';
  }

  function init() {
    renderSprite();
    renderSidebar();
    renderHeader();
    renderHub();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
