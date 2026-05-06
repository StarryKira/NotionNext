export const Style = () => (
  <style jsx global>{`
    /* ── Fonts ── */
    @font-face {
      font-family: 'Anthropic Serif Display';
      src: url('/themes/claude/fonts/AnthropicSerif-Display-Regular-Static.otf') format('opentype');
      font-weight: 400; font-style: normal; font-display: swap;
    }
    @font-face {
      font-family: 'Anthropic Serif Display';
      src: url('/themes/claude/fonts/AnthropicSerif-Display-Semibold-Static.otf') format('opentype');
      font-weight: 600; font-style: normal; font-display: swap;
    }
    @font-face {
      font-family: 'Anthropic Sans Text';
      src: url('/themes/claude/fonts/AnthropicSans-Text-Regular-Static.otf') format('opentype');
      font-weight: 400; font-style: normal; font-display: swap;
    }
    @font-face {
      font-family: 'Anthropic Sans Text';
      src: url('/themes/claude/fonts/AnthropicSans-Text-RegularItalic-Static.otf') format('opentype');
      font-weight: 400; font-style: italic; font-display: swap;
    }
    @font-face {
      font-family: 'Anthropic Sans Text';
      src: url('/themes/claude/fonts/AnthropicSans-Text-Medium-Static.otf') format('opentype');
      font-weight: 500; font-style: normal; font-display: swap;
    }
    @font-face {
      font-family: 'Anthropic Sans Text';
      src: url('/themes/claude/fonts/AnthropicSans-Text-Semibold-Static.otf') format('opentype');
      font-weight: 600; font-style: normal; font-display: swap;
    }

    /* ── CSS Variables — 严格按 docs.claude.com 实测 ── */
    #theme-claudedocs {
      --cd-font-sans: 'Anthropic Sans Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
      --cd-font-serif: 'Anthropic Serif Display', Georgia, 'Times New Roman', serif;
      --cd-font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;

      /* 偏冷的米白 — Claude Docs 实测背景 */
      --cd-bg:            #F9F8F4;
      --cd-bg-sidebar:    #F9F8F4;        /* 同色，仅靠分隔线区分 */
      --cd-bg-hover:      #EFEEE9;
      --cd-bg-active:     #E9E7DF;        /* sidebar 激活态浅灰底 */
      --cd-bg-code:       #EFEEE9;        /* 行内 code */
      --cd-bg-code-block: #FFFFFF;        /* 代码块白底 */
      --cd-bg-code-dark:  #1F1E1A;        /* 终端块深色版 */

      /* 文字：纯黑系，不是暖黑 */
      --cd-text:          #141413;
      --cd-text-muted:    #6B6962;
      --cd-text-faint:    #908F86;
      --cd-text-invert:   #FFFFFF;

      /* 边框比之前细 */
      --cd-border:        #E9E7DF;
      --cd-border-strong: #D9D7CF;

      /* 招牌橙 — 仅用于 logo 标识，不用于 UI */
      --cd-brand:         #C96442;

      /* 链接：黑色 + 下划线，不是橙 */
      --cd-link:          #141413;
      --cd-link-hover:    #C96442;

      /* Callout 颜色 */
      --cd-callout-info-bg:    #EBF1F7;
      --cd-callout-info-bd:    #C9D7E5;
      --cd-callout-tip-bg:     #E8F1EA;
      --cd-callout-tip-bd:     #B6D5BC;
      --cd-callout-warn-bg:    #FBF0DD;
      --cd-callout-warn-bd:    #E6CC95;

      --cd-radius:        8px;
      --cd-radius-lg:     10px;
    }

    /* Dark mode */
    .dark #theme-claudedocs, html[data-theme='dark'] #theme-claudedocs {
      --cd-bg:            #1A1A18;
      --cd-bg-sidebar:    #1A1A18;
      --cd-bg-hover:      #25241F;
      --cd-bg-active:     #2D2C26;
      --cd-bg-code:       #25241F;
      --cd-bg-code-block: #15140E;
      --cd-bg-code-dark:  #15140E;

      --cd-text:          #ECEAE2;
      --cd-text-muted:    #A8A59A;
      --cd-text-faint:    #6F6D63;

      --cd-border:        #2D2C26;
      --cd-border-strong: #45433C;

      --cd-link:          #ECEAE2;
      --cd-link-hover:    #D97757;

      --cd-callout-info-bg:    rgba(56, 121, 195, 0.10);
      --cd-callout-info-bd:    rgba(56, 121, 195, 0.30);
      --cd-callout-tip-bg:     rgba(56, 161, 105, 0.10);
      --cd-callout-tip-bd:     rgba(56, 161, 105, 0.30);
      --cd-callout-warn-bg:    rgba(218, 165, 32, 0.10);
      --cd-callout-warn-bd:    rgba(218, 165, 32, 0.30);
    }

    /* ── Base ── */
    #theme-claudedocs {
      font-family: var(--cd-font-sans);
      background: var(--cd-bg);
      color: var(--cd-text);
      font-size: 15px;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }
    #theme-claudedocs ::-webkit-scrollbar { width: 6px; height: 6px; }
    #theme-claudedocs ::-webkit-scrollbar-track { background: transparent; }
    #theme-claudedocs ::-webkit-scrollbar-thumb { background: var(--cd-border-strong); border-radius: 99px; }

    /* ────────────── Visibility helpers (replace Tailwind md:hidden) ────────────── */
    #theme-claudedocs .cd-only-desktop { display: flex !important; }
    #theme-claudedocs .cd-only-mobile { display: none !important; }
    #theme-claudedocs .cd-only-tablet-up { display: flex !important; }
    @media (max-width: 768px) {
      #theme-claudedocs .cd-only-desktop { display: none !important; }
      #theme-claudedocs .cd-only-mobile { display: flex !important; }
      #theme-claudedocs .cd-only-tablet-up { display: none !important; }
    }

    /* ────────────── TOP BAR + TABS ────────────── */
    #theme-claudedocs .cd-topbar {
      display: flex;
      align-items: center;
      gap: 24px;
      height: 64px;
      padding: 0 28px;
      border-bottom: 1px solid var(--cd-border);
      background: var(--cd-bg);
      position: sticky; top: 0; z-index: 30;
    }
    #theme-claudedocs .cd-topbar-logo {
      display: flex; align-items: center; gap: 10px;
      font-family: var(--cd-font-serif);
      font-weight: 600;
      font-size: 22px;
      color: var(--cd-text);
      text-decoration: none;
      letter-spacing: -0.01em;
      flex-shrink: 0;
    }
    #theme-claudedocs .cd-topbar-search {
      flex: 1;
      max-width: 380px;
      display: flex;
      align-items: center;
      gap: 8px;
      height: 36px;
      padding: 0 12px;
      background: var(--cd-bg);
      border: 1px solid var(--cd-border-strong);
      border-radius: 99px;
      font-size: 13px;
      color: var(--cd-text-muted);
      cursor: pointer;
      transition: border-color 0.12s;
    }
    #theme-claudedocs .cd-topbar-search:hover { border-color: var(--cd-text-faint); }
    #theme-claudedocs .cd-topbar-search-shortcut {
      margin-left: auto;
      font-family: var(--cd-font-mono);
      font-size: 11px;
      color: var(--cd-text-faint);
    }
    /* Inline search input (when Algolia not configured) */
    #theme-claudedocs .cd-topbar-search-input {
      flex: 1;
      border: none;
      outline: none;
      background: transparent;
      color: var(--cd-text);
      font-family: var(--cd-font-sans);
      font-size: 13.5px;
      padding: 0;
      width: 100%;
      min-width: 0;
    }
    #theme-claudedocs .cd-topbar-search-input::placeholder {
      color: var(--cd-text-muted);
    }
    #theme-claudedocs .cd-topbar-actions {
      display: flex; align-items: center; gap: 8px;
      flex-shrink: 0;
    }
    #theme-claudedocs .cd-topbar-iconbtn {
      width: 36px; height: 36px;
      display: flex; align-items: center; justify-content: center;
      border: none; background: transparent; cursor: pointer;
      color: var(--cd-text-muted);
      border-radius: 99px;
      transition: background 0.12s, color 0.12s;
    }
    #theme-claudedocs .cd-topbar-iconbtn:hover { background: var(--cd-bg-hover); color: var(--cd-text); }

    /* Top tabs row */
    #theme-claudedocs .cd-tabs {
      display: flex;
      gap: 28px;
      padding: 0 28px;
      height: 44px;
      align-items: center;
      border-bottom: 1px solid var(--cd-border);
      background: var(--cd-bg);
      overflow-x: auto;
      scrollbar-width: none;
    }
    #theme-claudedocs .cd-tabs::-webkit-scrollbar { display: none; }
    #theme-claudedocs .cd-tab {
      font-size: 13.5px;
      font-weight: 500;
      color: var(--cd-text-muted);
      text-decoration: none;
      padding: 12px 0;
      border-bottom: 2px solid transparent;
      white-space: nowrap;
      transition: color 0.12s, border-color 0.12s;
    }
    #theme-claudedocs .cd-tab:hover { color: var(--cd-text); }
    #theme-claudedocs .cd-tab.active {
      color: var(--cd-text);
      font-weight: 600;
      border-bottom-color: var(--cd-text);
    }

    /* ────────────── SIDEBAR ────────────── */
    #theme-claudedocs .cd-sidebar {
      background: var(--cd-bg-sidebar);
      padding: 24px 12px 24px 28px;
    }
    #theme-claudedocs .cd-nav-section {
      font-size: 13px;
      font-weight: 600;
      color: var(--cd-text);
      letter-spacing: 0;
      text-transform: none;
      padding: 14px 12px 6px;
    }
    #theme-claudedocs .cd-nav-section:first-child { padding-top: 0; }

    #theme-claudedocs .cd-nav-link {
      display: block;
      padding: 7px 12px;
      font-size: 13.5px;
      color: var(--cd-text-muted);
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.1s, color 0.1s;
      text-decoration: none;
      line-height: 1.4;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    #theme-claudedocs .cd-nav-link:hover { color: var(--cd-text); background: var(--cd-bg-hover); }
    #theme-claudedocs .cd-nav-link.active {
      color: var(--cd-text);
      background: var(--cd-bg-active);
      font-weight: 600;
    }
    #theme-claudedocs .cd-nav-child { padding-left: 24px; font-size: 13px; }

    /* sidebar 折叠组：标题更接近 nav-section */
    #theme-claudedocs .cd-nav-group-toggle {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 12px 6px;
      cursor: pointer;
      transition: color 0.1s;
    }
    #theme-claudedocs .cd-nav-group-toggle:hover .cd-toggle-label { color: var(--cd-text); }
    #theme-claudedocs .cd-nav-group-toggle .cd-toggle-label {
      font-size: 13px;
      font-weight: 600;
      color: var(--cd-text);
    }
    #theme-claudedocs .cd-caret {
      width: 12px; height: 12px;
      color: var(--cd-text-faint);
      transition: transform 0.18s;
      flex-shrink: 0;
    }
    #theme-claudedocs .cd-caret.open { transform: rotate(90deg); }

    /* ────────────── CONTENT ────────────── */

    /* Eyebrow label "GETTING STARTED" */
    #theme-claudedocs .cd-eyebrow {
      font-size: 12px;
      font-weight: 600;
      color: var(--cd-text-muted);
      letter-spacing: 0.06em;
      text-transform: uppercase;
      margin-bottom: 8px;
    }

    /* Headings */
    #theme-claudedocs .cd-article h1 {
      font-family: var(--cd-font-serif);
      font-size: 2.4rem;
      font-weight: 600;
      line-height: 1.15;
      letter-spacing: -0.02em;
      color: var(--cd-text);
      margin: 0 0 14px;
    }
    #theme-claudedocs .cd-article h2,
    #theme-claudedocs .cd-article .notion-h2 {
      font-family: var(--cd-font-serif);
      font-size: 1.65rem;
      font-weight: 600;
      letter-spacing: -0.015em;
      line-height: 1.25;
      color: var(--cd-text);
      margin: 2.4em 0 0.8em;
    }
    #theme-claudedocs .cd-article h3,
    #theme-claudedocs .cd-article .notion-h3 {
      font-family: var(--cd-font-sans);
      font-size: 1.05rem;
      font-weight: 600;
      letter-spacing: -0.005em;
      color: var(--cd-text);
      margin: 1.8em 0 0.5em;
    }

    /* Paragraphs */
    #theme-claudedocs .cd-article p,
    #theme-claudedocs .notion-text {
      color: var(--cd-text);
      line-height: 1.7;
      margin: 0.9em 0;
    }

    /* Links: black + underline; brand-orange hover */
    #theme-claudedocs .cd-article a:not(.cd-article-nav-item):not(.cd-meta-tag),
    #theme-claudedocs .notion-text a {
      color: var(--cd-link);
      text-decoration: underline;
      text-decoration-thickness: 1px;
      text-underline-offset: 3px;
      font-weight: 500;
    }
    #theme-claudedocs .cd-article a:hover { color: var(--cd-link-hover); }

    /* Hide Notion native title */
    #theme-claudedocs .notion-page { padding: 0 !important; }
    #theme-claudedocs .notion-title { display: none; }

    /* ── Breadcrumb ── */
    #theme-claudedocs .cd-breadcrumb {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12.5px;
      color: var(--cd-text-muted);
      margin-bottom: 16px;
    }
    #theme-claudedocs .cd-breadcrumb a { color: var(--cd-text-muted); text-decoration: none; }
    #theme-claudedocs .cd-breadcrumb a:hover { color: var(--cd-text); }
    #theme-claudedocs .cd-breadcrumb-sep { color: var(--cd-text-faint); }

    /* ── Article meta — minimalistic ── */
    #theme-claudedocs .cd-meta {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 14px;
      font-size: 13px;
      color: var(--cd-text-muted);
      margin: 16px 0 0;
    }
    #theme-claudedocs .cd-meta-tag {
      color: var(--cd-text-muted);
      text-decoration: none;
      transition: color 0.12s;
    }
    #theme-claudedocs .cd-meta-tag:hover { color: var(--cd-text); }

    /* ── Post cards (horizontal with cover) ── */
    #theme-claudedocs .cd-post-grid {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    #theme-claudedocs .cd-post-card {
      display: flex;
      gap: 16px;
      padding: 14px;
      border: 1px solid var(--cd-border);
      border-radius: var(--cd-radius-lg);
      background: var(--cd-bg);
      transition: border-color 0.15s, box-shadow 0.15s;
      cursor: pointer;
      text-decoration: none;
      align-items: stretch;
      min-height: 130px;
    }
    #theme-claudedocs .cd-post-card:hover {
      border-color: var(--cd-text-faint);
      box-shadow: 0 4px 16px rgba(20,20,19,0.05);
    }
    #theme-claudedocs .cd-post-card-cover {
      width: 200px;
      flex-shrink: 0;
      overflow: hidden;
      border-radius: var(--cd-radius);
      background: var(--cd-bg-hover);
    }
    #theme-claudedocs .cd-post-card-cover-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.4s ease;
    }
    #theme-claudedocs .cd-post-card:hover .cd-post-card-cover-img {
      transform: scale(1.05);
    }
    #theme-claudedocs .cd-post-card-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 6px;
      min-width: 0;
      padding: 4px 4px 4px 0;
    }
    #theme-claudedocs .cd-post-card-meta-top {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12.5px;
      color: var(--cd-text-faint);
    }
    #theme-claudedocs .cd-post-card-meta-top .cd-dot { opacity: 0.55; }
    #theme-claudedocs .cd-post-card-title {
      font-family: var(--cd-font-serif);
      font-size: 18px;
      font-weight: 600;
      letter-spacing: -0.01em;
      color: var(--cd-text);
      line-height: 1.3;
      margin: 2px 0;
      transition: color 0.15s;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    #theme-claudedocs .cd-post-card:hover .cd-post-card-title { color: var(--cd-link-hover); }
    #theme-claudedocs .cd-post-card-summary {
      font-size: 13px;
      color: var(--cd-text-muted);
      line-height: 1.55;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    #theme-claudedocs .cd-post-card-readmore {
      font-size: 12.5px;
      color: var(--cd-text-muted);
      margin-top: auto;
      transition: color 0.15s;
    }
    #theme-claudedocs .cd-post-card:hover .cd-post-card-readmore { color: var(--cd-link-hover); }
    @media (max-width: 768px) {
      #theme-claudedocs .cd-post-card { flex-direction: column; gap: 12px; padding: 12px; }
      #theme-claudedocs .cd-post-card-cover { width: 100%; height: 160px; }
    }

    /* ── TOC ── */
    #theme-claudedocs .cd-toc-title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12.5px;
      font-weight: 500;
      color: var(--cd-text-muted);
      margin-bottom: 14px;
    }
    #theme-claudedocs .cd-toc-item {
      display: block;
      padding: 5px 0;
      font-size: 13px;
      color: var(--cd-text-muted);
      text-decoration: none;
      transition: color 0.12s;
      line-height: 1.4;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      border-left: none;
      padding-left: 0;
    }
    #theme-claudedocs .cd-toc-item:hover { color: var(--cd-text); }
    #theme-claudedocs .cd-toc-item.active {
      color: var(--cd-text);
      font-weight: 600;
    }
    #theme-claudedocs .cd-toc-l2 { padding-left: 14px; font-size: 12.5px; }
    #theme-claudedocs .cd-toc-l3 { padding-left: 28px; font-size: 12px; }

    /* ── Article prev/next ── */
    #theme-claudedocs .cd-article-nav {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-top: 3rem;
      padding-top: 2rem;
      border-top: 1px solid var(--cd-border);
    }
    #theme-claudedocs .cd-article-nav-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 14px 16px;
      border: 1px solid var(--cd-border);
      border-radius: var(--cd-radius);
      text-decoration: none;
      transition: border-color 0.15s, background 0.15s;
    }
    #theme-claudedocs .cd-article-nav-item:hover {
      border-color: var(--cd-text-faint);
      background: var(--cd-bg-sidebar);
    }
    #theme-claudedocs .cd-article-nav-item.next { align-items: flex-end; }
    #theme-claudedocs .cd-article-nav-label {
      font-size: 11px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--cd-text-faint);
    }
    #theme-claudedocs .cd-article-nav-title {
      font-size: 13.5px;
      font-weight: 600;
      color: var(--cd-text);
    }

    /* ── Blog hero (home) ── */
    #theme-claudedocs .cd-blog-hero {
      padding: 24px 0 36px;
      border-bottom: 1px solid var(--cd-border);
      margin-bottom: 32px;
    }
    #theme-claudedocs .cd-blog-hero h1 {
      font-family: var(--cd-font-serif);
      font-size: 2.6rem;
      font-weight: 600;
      letter-spacing: -0.02em;
      line-height: 1.1;
      color: var(--cd-text);
      margin: 0 0 12px;
    }
    #theme-claudedocs .cd-blog-hero p {
      font-size: 16px;
      line-height: 1.6;
      color: var(--cd-text-muted);
      margin: 0;
      max-width: 540px;
    }
    #theme-claudedocs .cd-blog-section-label {
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--cd-text-muted);
      margin-bottom: 14px;
    }

    /* ── Page header ── */
    #theme-claudedocs .cd-page-header {
      margin-bottom: 2rem;
    }
    #theme-claudedocs .cd-page-header h1 {
      font-family: var(--cd-font-serif);
      font-size: 2.4rem;
      font-weight: 600;
      letter-spacing: -0.02em;
      color: var(--cd-text);
      margin: 0 0 10px;
    }
    #theme-claudedocs .cd-page-header p {
      font-size: 16px;
      color: var(--cd-text-muted);
      line-height: 1.55;
      margin: 0;
    }

    /* ── Pagination ── */
    #theme-claudedocs .cd-pagination {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-top: 2.5rem;
    }
    #theme-claudedocs .cd-pagination-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      border: 1px solid var(--cd-border);
      border-radius: 99px;
      font-size: 13px;
      color: var(--cd-text);
      cursor: pointer;
      transition: border-color 0.15s, background 0.15s;
      background: var(--cd-bg);
      text-decoration: none;
    }
    #theme-claudedocs .cd-pagination-btn:hover {
      border-color: var(--cd-text);
      background: var(--cd-bg-hover);
    }

    /* ── Mobile sidebar ── */
    #theme-claudedocs .cd-mobile-overlay {
      position: fixed; inset: 0;
      background: rgba(0,0,0,0.35);
      z-index: 40;
      backdrop-filter: blur(2px);
    }
    #theme-claudedocs .cd-mobile-sidebar {
      position: fixed; left: 0; top: 0; bottom: 0;
      width: 280px;
      z-index: 50;
      transform: translateX(-100%);
      transition: transform 0.22s ease;
      background: var(--cd-bg);
      display: flex;
      flex-direction: column;
      overflow-y: auto;
    }
    #theme-claudedocs .cd-mobile-sidebar.open { transform: translateX(0); }
    #theme-claudedocs .cd-mobile-sidebar-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      border-bottom: 1px solid var(--cd-border);
      flex-shrink: 0;
    }

    /* Desktop sidebar shell */
    #theme-claudedocs .cd-sidebar-desktop {
      background: var(--cd-bg-sidebar);
      overflow-y: auto;
    }

    /* TOC aside */
    #theme-claudedocs .cd-toc-aside {
      width: 220px;
      flex-shrink: 0;
      overflow: hidden;
      padding: 56px 24px 0;
      flex-direction: column;
      display: none;
    }
    @media (min-width: 1024px) {
      #theme-claudedocs .cd-toc-aside { display: flex; }
    }

    /* ── Spinner ── */
    #theme-claudedocs .cd-spinner {
      width: 28px; height: 28px;
      border: 2px solid var(--cd-border);
      border-top-color: var(--cd-text);
      border-radius: 50%;
      animation: cd-spin 0.7s linear infinite;
    }
    @keyframes cd-spin { to { transform: rotate(360deg); } }

    /* ── Tag / Category chips ── */
    #theme-claudedocs .cd-chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      border: 1px solid var(--cd-border);
      border-radius: 99px;
      font-size: 13px;
      color: var(--cd-text);
      text-decoration: none;
      transition: border-color 0.12s, background 0.12s;
      background: var(--cd-bg);
    }
    #theme-claudedocs .cd-chip:hover {
      border-color: var(--cd-text);
      background: var(--cd-bg-hover);
    }
    #theme-claudedocs .cd-chip-count {
      color: var(--cd-text-faint);
      font-size: 12px;
    }

    /* ── Mermaid: avoid double frame — let inner pre.mermaid be the only visual ── */
    /* 外层 .notion-code.language-mermaid 透明、无边框，让内层 pre.mermaid 单独提供框 */
    #theme-claudedocs .notion-code.language-mermaid {
      background: transparent !important;
      border: 0 !important;
      padding: 0 !important;
    }
    #theme-claudedocs pre.mermaid {
      background: transparent !important;
      border: 1px solid var(--cd-border) !important;
      border-radius: var(--cd-radius) !important;
      padding: 24px !important;
      text-align: center;
      overflow-x: auto;
      margin: 0 !important;
    }
    /* 节点矩形：暖米色背景 + 灰边（用主题已有变量，确保协调） */
    #theme-claudedocs pre.mermaid svg .node rect,
    #theme-claudedocs pre.mermaid svg .node circle,
    #theme-claudedocs pre.mermaid svg .node ellipse,
    #theme-claudedocs pre.mermaid svg .node polygon,
    #theme-claudedocs pre.mermaid svg .node path,
    #theme-claudedocs pre.mermaid svg rect.basic.label-container {
      fill: var(--cd-bg-hover) !important;
      stroke: var(--cd-border-strong) !important;
      stroke-width: 1.5px !important;
    }
    /* 节点内文字 */
    #theme-claudedocs pre.mermaid svg .node .label,
    #theme-claudedocs pre.mermaid svg .node text,
    #theme-claudedocs pre.mermaid svg .nodeLabel,
    #theme-claudedocs pre.mermaid svg foreignObject div {
      color: var(--cd-text) !important;
      fill: var(--cd-text) !important;
      font-family: var(--cd-font-sans) !important;
      font-size: 14px !important;
    }
    /* 连接线：muted 灰，不要纯黑 */
    #theme-claudedocs pre.mermaid svg .flowchart-link,
    #theme-claudedocs pre.mermaid svg .edgePath path,
    #theme-claudedocs pre.mermaid svg path.flowchart-link {
      stroke: var(--cd-text-muted) !important;
      stroke-width: 1.5px !important;
      fill: none !important;
    }
    /* 箭头标记 */
    #theme-claudedocs pre.mermaid svg marker path,
    #theme-claudedocs pre.mermaid svg defs marker path {
      fill: var(--cd-text-muted) !important;
      stroke: var(--cd-text-muted) !important;
    }
    /* 边标签 */
    #theme-claudedocs pre.mermaid svg .edgeLabel {
      background-color: var(--cd-bg) !important;
      color: var(--cd-text) !important;
    }
    /* Cluster (子图) 框 */
    #theme-claudedocs pre.mermaid svg .cluster rect {
      fill: transparent !important;
      stroke: var(--cd-border-strong) !important;
      stroke-dasharray: 4 4;
    }

    /* ── iframe 嵌入：加载失败 fallback（visual hint） ── */
    #theme-claudedocs iframe.notion-asset-object-fit {
      background:
        linear-gradient(var(--cd-bg-sidebar), var(--cd-bg-sidebar));
      position: relative;
    }
    /* 给 iframe 一个外层伪卡片 — 由 JS 添加的 cd-iframe-fallback 元素显示 */
    #theme-claudedocs .cd-iframe-fallback {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 32px 24px;
      background: var(--cd-bg-sidebar);
      border: 1px solid var(--cd-border);
      border-radius: var(--cd-radius);
      color: var(--cd-text-muted);
      font-size: 13.5px;
      text-align: center;
      margin: 1.5em 0;
    }
    #theme-claudedocs .cd-iframe-fallback a {
      color: var(--cd-text);
      text-decoration: underline;
      font-weight: 500;
    }
    #theme-claudedocs .cd-iframe-fallback a:hover { color: var(--cd-accent); }

    /* ── Notion content fixes ── */
    #theme-claudedocs .notion-asset-wrap {
      max-width: 100% !important;
      border-radius: var(--cd-radius);
      overflow: hidden;
      border: 1px solid var(--cd-border);
      background: var(--cd-bg);
    }
    /* iframe 本身就用 .notion-asset-object-fit 类 */
    #theme-claudedocs iframe.notion-asset-object-fit {
      max-width: 100% !important;
      width: 100% !important;
      border: 0;
      border-radius: var(--cd-radius);
      background: var(--cd-bg);
    }
    /* 非 iframe 的 wrapper（图片/svg） */
    #theme-claudedocs div.notion-asset-object-fit,
    #theme-claudedocs span.notion-asset-object-fit {
      max-width: 100% !important;
      border-radius: var(--cd-radius);
    }
    #theme-claudedocs .notion-asset-wrap img,
    #theme-claudedocs .notion-asset-wrap svg {
      max-width: 100% !important;
      height: auto !important;
      display: block;
    }

    /* Inline code */
    #theme-claudedocs :not(pre) > code,
    #theme-claudedocs .notion-text code {
      background: var(--cd-bg-code);
      color: var(--cd-text);
      padding: 1.5px 6px;
      border-radius: 4px;
      font-family: var(--cd-font-mono);
      font-size: 0.86em;
      border: 1px solid var(--cd-border);
    }

    /* ── Code blocks: prism's outer wrapper made fully transparent (no double frame) ── */
    #theme-claudedocs .code-toolbar {
      background: transparent !important;
      border: 0 !important;
      border-radius: 0 !important;
      box-shadow: none !important;
      padding: 0 !important;
      margin: 1.5em 0 !important;
      position: relative;
      overflow: visible;
    }
    /* code-toolbar's ::before/::after may be the macOS dots */
    #theme-claudedocs .code-toolbar::before,
    #theme-claudedocs .code-toolbar::after {
      display: none !important;
      content: none !important;
      background: none !important;
    }
    /* Hide the .pre-mac element (3-dot macOS window decoration) */
    #theme-claudedocs .pre-mac {
      display: none !important;
    }
    /* Toolbar buttons (copy, etc) — top-right */
    #theme-claudedocs .code-toolbar > .toolbar {
      top: 6px !important;
      right: 8px !important;
      opacity: 0;
      transition: opacity 0.15s;
    }
    #theme-claudedocs .code-toolbar:hover > .toolbar { opacity: 1; }
    #theme-claudedocs .code-toolbar > .toolbar > .toolbar-item > button,
    #theme-claudedocs .code-toolbar > .toolbar > .toolbar-item > a,
    #theme-claudedocs .code-toolbar > .toolbar > .toolbar-item > span {
      background: var(--cd-bg) !important;
      border: 1px solid var(--cd-border) !important;
      color: var(--cd-text-muted) !important;
      border-radius: 6px !important;
      padding: 3px 8px !important;
      font-size: 11px !important;
      box-shadow: none !important;
    }

    /* ── Code blocks: single frame on the .notion-code (pre) element ── */
    #theme-claudedocs .notion-code {
      background: var(--cd-bg-code-block) !important;
      border: 1px solid var(--cd-border) !important;
      border-radius: var(--cd-radius) !important;
      box-shadow: none !important;
      padding: 14px 16px !important;
      margin: 0 !important;
      position: relative;
      overflow-x: auto;
      font-family: var(--cd-font-mono) !important;
      font-size: 13.5px !important;
      line-height: 1.65 !important;
    }
    /* Kill claude theme's window-style decorations (.notion-code::before/::after dots) */
    #theme-claudedocs .notion-code::before,
    #theme-claudedocs .notion-code::after {
      display: none !important;
      content: none !important;
      background: none !important;
    }
    /* Kill any embedded ::before children (like the 3-dot terminal bar) */
    #theme-claudedocs .notion-code > *:first-child:not(pre):not(code) {
      display: none !important;
    }
    /* Custom thin scrollbar for code block */
    #theme-claudedocs .notion-code::-webkit-scrollbar {
      height: 6px;
    }
    #theme-claudedocs .notion-code::-webkit-scrollbar-thumb {
      background: var(--cd-border-strong);
      border-radius: 99px;
    }
    #theme-claudedocs .notion-code::-webkit-scrollbar-track { background: transparent; }
    /* Copy button */
    #theme-claudedocs .notion-code .notion-code-copy {
      top: 8px !important;
      right: 8px !important;
      opacity: 0;
      transition: opacity 0.15s;
    }
    #theme-claudedocs .notion-code:hover .notion-code-copy {
      opacity: 1;
    }
    #theme-claudedocs .notion-code .notion-code-copy-button {
      background: var(--cd-bg) !important;
      border: 1px solid var(--cd-border) !important;
      color: var(--cd-text-muted) !important;
      border-radius: 6px !important;
      padding: 4px !important;
    }
    #theme-claudedocs .notion-code .notion-code-copy-button:hover {
      color: var(--cd-text) !important;
      background: var(--cd-bg-hover) !important;
    }

    /* Prism token colors: GitHub Light style */
    #theme-claudedocs .notion-code .token.comment,
    #theme-claudedocs .notion-code .token.prolog,
    #theme-claudedocs .notion-code .token.doctype,
    #theme-claudedocs .notion-code .token.cdata { color: #6A737D; font-style: italic; }
    #theme-claudedocs .notion-code .token.punctuation { color: #24292E; }
    #theme-claudedocs .notion-code .token.property,
    #theme-claudedocs .notion-code .token.tag,
    #theme-claudedocs .notion-code .token.boolean,
    #theme-claudedocs .notion-code .token.number,
    #theme-claudedocs .notion-code .token.constant,
    #theme-claudedocs .notion-code .token.symbol { color: #005CC5; }
    #theme-claudedocs .notion-code .token.selector,
    #theme-claudedocs .notion-code .token.attr-name,
    #theme-claudedocs .notion-code .token.string,
    #theme-claudedocs .notion-code .token.char,
    #theme-claudedocs .notion-code .token.builtin,
    #theme-claudedocs .notion-code .token.inserted { color: #032F62; }
    #theme-claudedocs .notion-code .token.operator,
    #theme-claudedocs .notion-code .token.entity,
    #theme-claudedocs .notion-code .token.url,
    #theme-claudedocs .notion-code .token.atrule,
    #theme-claudedocs .notion-code .token.attr-value,
    #theme-claudedocs .notion-code .token.keyword { color: #D73A49; }
    #theme-claudedocs .notion-code .token.function,
    #theme-claudedocs .notion-code .token.class-name { color: #6F42C1; }
    /* Dark mode tokens */
    .dark #theme-claudedocs .notion-code .token.comment { color: #8B949E; }
    .dark #theme-claudedocs .notion-code .token.punctuation { color: #C9D1D9; }
    .dark #theme-claudedocs .notion-code .token.property,
    .dark #theme-claudedocs .notion-code .token.tag,
    .dark #theme-claudedocs .notion-code .token.boolean,
    .dark #theme-claudedocs .notion-code .token.number { color: #79C0FF; }
    .dark #theme-claudedocs .notion-code .token.string,
    .dark #theme-claudedocs .notion-code .token.attr-name,
    .dark #theme-claudedocs .notion-code .token.builtin { color: #A5D6FF; }
    .dark #theme-claudedocs .notion-code .token.keyword,
    .dark #theme-claudedocs .notion-code .token.operator { color: #FF7B72; }
    .dark #theme-claudedocs .notion-code .token.function { color: #D2A8FF; }

    /* Notion blockquote → Claude callout (info style) */
    #theme-claudedocs .notion-quote {
      border-left: none;
      background: var(--cd-callout-info-bg);
      border: 1px solid var(--cd-callout-info-bd);
      padding: 12px 16px;
      border-radius: var(--cd-radius);
      color: var(--cd-text);
      font-style: normal;
    }
    /* Notion callouts */
    #theme-claudedocs .notion-callout {
      background: var(--cd-bg-code) !important;
      border: 1px solid var(--cd-border) !important;
      border-radius: var(--cd-radius) !important;
      padding: 14px 16px !important;
      box-shadow: none !important;
    }

    /* Bullet/numbered lists */
    #theme-claudedocs .notion-list { color: var(--cd-text); }
    #theme-claudedocs .notion-list li { line-height: 1.7; }

    /* ── Tables (notion-simple-table + collection table) ── */
    #theme-claudedocs .notion-simple-table-wrap,
    #theme-claudedocs .notion-table {
      margin: 1.5em 0;
      border: 1px solid var(--cd-border);
      border-radius: var(--cd-radius);
      overflow: auto;
      background: var(--cd-bg);
    }
    #theme-claudedocs .notion-simple-table-wrap::-webkit-scrollbar,
    #theme-claudedocs .notion-table::-webkit-scrollbar { height: 6px; }

    #theme-claudedocs table.notion-simple-table {
      border-collapse: separate;
      border-spacing: 0;
      width: 100%;
      font-size: 13.5px;
      color: var(--cd-text);
      margin: 0 !important;
    }
    #theme-claudedocs table.notion-simple-table th,
    #theme-claudedocs table.notion-simple-table td {
      padding: 10px 14px !important;
      text-align: left;
      vertical-align: top;
      line-height: 1.55;
      border-right: 1px solid var(--cd-border);
      border-bottom: 1px solid var(--cd-border);
    }
    #theme-claudedocs table.notion-simple-table th:last-child,
    #theme-claudedocs table.notion-simple-table td:last-child {
      border-right: none;
    }
    #theme-claudedocs table.notion-simple-table tr:last-child td {
      border-bottom: none;
    }
    #theme-claudedocs table.notion-simple-table th,
    #theme-claudedocs table.notion-simple-table thead td {
      background: var(--cd-bg-sidebar);
      font-weight: 600;
      color: var(--cd-text);
      font-size: 13px;
    }
    /* Notion 没有 thead；首行特殊处理（用 :first-child） */
    #theme-claudedocs table.notion-simple-table tr:first-child td {
      background: var(--cd-bg-hover);
      font-weight: 600;
      color: var(--cd-text);
    }
    /* notion-collection (table view) */
    #theme-claudedocs .notion-collection-row {
      border-bottom: 1px solid var(--cd-border);
    }
    #theme-claudedocs .notion-collection-header,
    #theme-claudedocs .notion-collection-column-title {
      background: var(--cd-bg-sidebar);
      color: var(--cd-text);
      font-weight: 600;
      font-size: 13px;
    }

    /* Footer */
    #theme-claudedocs .cd-footer {
      font-size: 12.5px;
      color: var(--cd-text-faint);
      padding: 16px 12px;
    }
    #theme-claudedocs .cd-footer a { color: var(--cd-text-faint); text-decoration: none; }
    #theme-claudedocs .cd-footer a:hover { color: var(--cd-text); }

    /* ── Article lock ── */
    #theme-claudedocs .cd-lock {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 50vh;
      gap: 18px;
      padding: 32px 16px;
    }
    #theme-claudedocs .cd-lock-icon {
      color: var(--cd-text-muted);
      stroke: currentColor;
    }
    #theme-claudedocs .cd-lock-msg {
      font-size: 14px;
      color: var(--cd-text-muted);
      margin: 0;
    }
    #theme-claudedocs .cd-lock-form {
      display: flex;
      gap: 10px;
    }
    #theme-claudedocs .cd-lock-input {
      padding: 9px 14px;
      font-size: 14px;
      border: 1px solid var(--cd-border);
      border-radius: var(--cd-radius);
      background: var(--cd-bg);
      color: var(--cd-text);
      outline: none;
      transition: border-color 0.15s, box-shadow 0.15s;
      min-width: 200px;
      font-family: var(--cd-font-sans);
    }
    #theme-claudedocs .cd-lock-input:focus {
      border-color: var(--cd-text);
      box-shadow: 0 0 0 3px rgba(20, 19, 14, 0.06);
    }
    #theme-claudedocs .cd-lock-input.error {
      border-color: #DC2626;
      box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
    }
    #theme-claudedocs .cd-lock-btn {
      padding: 9px 18px;
      font-size: 14px;
      font-weight: 500;
      background: var(--cd-text);
      color: var(--cd-bg);
      border: 0;
      border-radius: var(--cd-radius);
      cursor: pointer;
      transition: background 0.15s;
      font-family: var(--cd-font-sans);
    }
    #theme-claudedocs .cd-lock-btn:hover { background: var(--cd-brand); }
    #theme-claudedocs .cd-lock-error {
      font-size: 13px;
      color: #DC2626;
      margin: 0;
    }

    /* ── Search page ── */
    #theme-claudedocs .cd-search-form {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 0 16px;
      height: 48px;
      background: var(--cd-bg);
      border: 1px solid var(--cd-border);
      border-radius: var(--cd-radius-lg);
      margin-bottom: 32px;
      transition: border-color 0.15s, box-shadow 0.15s;
    }
    #theme-claudedocs .cd-search-form:focus-within {
      border-color: var(--cd-text);
      box-shadow: 0 0 0 3px rgba(20, 19, 14, 0.06);
    }
    #theme-claudedocs .cd-search-form-icon {
      color: var(--cd-text-muted);
      display: flex;
      align-items: center;
      flex-shrink: 0;
    }
    #theme-claudedocs .cd-search-form-input {
      flex: 1;
      border: 0;
      outline: none;
      background: transparent;
      color: var(--cd-text);
      font-family: var(--cd-font-sans);
      font-size: 15px;
      padding: 0;
      min-width: 0;
    }
    #theme-claudedocs .cd-search-form-input::placeholder {
      color: var(--cd-text-faint);
    }
    #theme-claudedocs .cd-search-form-input::-webkit-search-cancel-button {
      display: none;
    }
    #theme-claudedocs .cd-search-form-clear {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border: 0;
      background: var(--cd-bg-hover);
      color: var(--cd-text-muted);
      border-radius: 50%;
      cursor: pointer;
      transition: background 0.12s, color 0.12s;
      flex-shrink: 0;
    }
    #theme-claudedocs .cd-search-form-clear:hover {
      background: var(--cd-border-strong);
      color: var(--cd-text);
    }

    #theme-claudedocs .cd-search-keyword {
      color: var(--cd-text-muted);
      font-size: 1.25rem;
      font-weight: 400;
      margin-left: 12px;
      font-family: var(--cd-font-sans);
    }
    #theme-claudedocs .cd-search-highlight {
      color: var(--cd-brand);
      font-weight: 500;
      border-bottom: 1px dashed var(--cd-brand);
      padding-bottom: 1px;
    }
    #theme-claudedocs .cd-empty-state {
      text-align: center;
      padding: 80px 0;
      color: var(--cd-text-muted);
      font-size: 14px;
    }

    /* Archive year groups */
    #theme-claudedocs .cd-archive-year-group {
      margin-bottom: 36px;
    }
    #theme-claudedocs .cd-archive-year {
      font-family: var(--cd-font-serif);
      font-size: 1.4rem;
      font-weight: 600;
      color: var(--cd-text-muted);
      margin: 0 0 16px;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--cd-border);
    }

    /* 404 */
    #theme-claudedocs .cd-404 {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 60vh;
      gap: 16px;
    }
    #theme-claudedocs .cd-404-num {
      font-family: var(--cd-font-serif);
      font-size: 5rem;
      font-weight: 600;
      color: var(--cd-text-faint);
      letter-spacing: -0.02em;
    }
    #theme-claudedocs .cd-404-msg {
      font-size: 14px;
      color: var(--cd-text-muted);
      margin: 0 0 8px;
    }

    /* ──────────────────────────────────────────
       NEW BLOG LAYOUT (xinrao-style three-column)
    ────────────────────────────────────────── */

    /* Top centered nav */
    #theme-claudedocs .cd-topnav {
      display: flex;
      gap: 28px;
      flex: 1;
      justify-content: center;
    }
    #theme-claudedocs .cd-topnav-link {
      font-size: 13.5px;
      font-weight: 500;
      color: var(--cd-text-muted);
      text-decoration: none;
      padding: 6px 2px;
      border-bottom: 2px solid transparent;
      transition: color 0.12s, border-color 0.12s;
      white-space: nowrap;
    }
    #theme-claudedocs .cd-topnav-link:hover { color: var(--cd-text); }
    #theme-claudedocs .cd-topnav-link.active {
      color: var(--cd-text);
      font-weight: 600;
      border-bottom-color: var(--cd-text);
    }

    /* Visibility helper for ≥1024px */
    #theme-claudedocs .cd-only-desktop-lg { display: flex !important; }
    @media (max-width: 1023px) {
      #theme-claudedocs .cd-only-desktop-lg { display: none !important; }
    }
    @media (max-width: 899px) {
      #theme-claudedocs .cd-left-aside { display: none !important; }
    }

    /* Three-column shell */
    #theme-claudedocs .cd-shell {
      display: flex;
      gap: 32px;
      max-width: 1280px;
      margin: 0 auto;
      padding: 32px 24px 48px;
      align-items: flex-start;
    }
    #theme-claudedocs .cd-left-aside {
      width: 260px;
      flex-shrink: 0;
      position: sticky;
      top: 32px;
      align-self: flex-start;
      max-height: calc(100vh - 96px);
      overflow-y: auto;
    }
    #theme-claudedocs .cd-center {
      flex: 1;
      min-width: 0;
      max-width: 760px;
    }
    #theme-claudedocs .cd-right-aside {
      width: 240px;
      flex-shrink: 0;
      position: sticky;
      top: 32px;
      align-self: flex-start;
      max-height: calc(100vh - 96px);
      overflow-y: auto;
      flex-direction: column;
    }

    /* AuthorCard */
    #theme-claudedocs .cd-author-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 24px 20px;
      background: var(--cd-bg);
      border: 1px solid var(--cd-border);
      border-radius: var(--cd-radius-lg);
      text-align: center;
    }
    #theme-claudedocs .cd-author-avatar {
      width: 88px;
      height: 88px;
      border-radius: 50%;
      overflow: hidden;
      margin-bottom: 14px;
      border: 2px solid var(--cd-border);
      background: var(--cd-bg-hover);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #theme-claudedocs .cd-author-avatar img {
      width: 100% !important;
      height: 100% !important;
      object-fit: cover;
    }
    #theme-claudedocs .cd-author-name {
      font-family: var(--cd-font-serif);
      font-size: 18px;
      font-weight: 600;
      color: var(--cd-text);
      letter-spacing: -0.01em;
      margin-bottom: 6px;
    }
    #theme-claudedocs .cd-author-bio {
      font-size: 12.5px;
      color: var(--cd-text-muted);
      line-height: 1.55;
      margin-bottom: 14px;
    }
    #theme-claudedocs .cd-author-social {
      display: flex;
      gap: 8px;
      justify-content: center;
      margin-bottom: 12px;
      flex-wrap: wrap;
    }
    #theme-claudedocs .cd-author-social a {
      width: 32px; height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--cd-border);
      border-radius: 50%;
      color: var(--cd-text-muted);
      transition: color 0.12s, border-color 0.12s, background 0.12s;
      text-decoration: none;
    }
    #theme-claudedocs .cd-author-social a:hover {
      color: var(--cd-text);
      border-color: var(--cd-text-faint);
      background: var(--cd-bg-hover);
    }
    #theme-claudedocs .cd-author-quote {
      font-family: var(--cd-font-serif);
      font-style: italic;
      font-size: 12.5px;
      color: var(--cd-text-faint);
      padding-top: 14px;
      border-top: 1px solid var(--cd-border);
      width: 100%;
      line-height: 1.5;
    }

    /* Left aside mini-sections (under AuthorCard) */
    #theme-claudedocs .cd-mini-section {
      margin-top: 14px;
      padding: 14px 16px;
    }
    #theme-claudedocs .cd-mini-section .cd-aside-title {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      color: var(--cd-text);
      font-size: 12px;
    }
    #theme-claudedocs .cd-mini-row {
      display: flex;
      gap: 10px;
      margin-bottom: 10px;
    }
    #theme-claudedocs .cd-mini-stat {
      flex: 1;
      text-align: center;
      padding: 8px 6px;
      background: var(--cd-bg-hover);
      border-radius: var(--cd-radius);
    }
    #theme-claudedocs .cd-mini-stat-num {
      font-family: var(--cd-font-serif);
      font-size: 18px;
      font-weight: 600;
      color: var(--cd-text);
      line-height: 1.2;
    }
    #theme-claudedocs .cd-mini-stat-label {
      font-size: 11px;
      color: var(--cd-text-muted);
      margin-top: 2px;
    }
    #theme-claudedocs .cd-rss-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 8px 12px;
      background: var(--cd-bg);
      border: 1px solid var(--cd-border);
      border-radius: var(--cd-radius);
      color: var(--cd-text-muted);
      font-size: 12.5px;
      font-weight: 500;
      text-decoration: none;
      transition: all 0.15s;
    }
    #theme-claudedocs .cd-rss-btn:hover {
      border-color: var(--cd-brand);
      color: var(--cd-brand);
    }

    /* Right aside sections */
    #theme-claudedocs .cd-aside-section {
      padding: 16px 18px;
      background: var(--cd-bg);
      border: 1px solid var(--cd-border);
      border-radius: var(--cd-radius-lg);
      margin-bottom: 14px;
    }
    #theme-claudedocs .cd-aside-title {
      font-size: 12.5px;
      font-weight: 600;
      color: var(--cd-text);
      margin-bottom: 14px;
      letter-spacing: 0.02em;
    }
    /* Stats grid */
    #theme-claudedocs .cd-stats-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      text-align: center;
    }
    #theme-claudedocs .cd-stat-num {
      font-family: var(--cd-font-serif);
      font-size: 22px;
      font-weight: 600;
      color: var(--cd-text);
      line-height: 1.1;
    }
    #theme-claudedocs .cd-stat-label {
      font-size: 11.5px;
      color: var(--cd-text-muted);
      margin-top: 4px;
    }
    /* Aside list (categories) */
    #theme-claudedocs .cd-aside-list-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
      font-size: 13px;
      color: var(--cd-text);
      text-decoration: none;
      border-bottom: 1px solid var(--cd-border);
      transition: color 0.12s;
    }
    #theme-claudedocs .cd-aside-list-item:last-child { border-bottom: none; }
    #theme-claudedocs .cd-aside-list-item:hover { color: var(--cd-link-hover); }
    #theme-claudedocs .cd-count-badge {
      font-size: 11.5px;
      color: var(--cd-text-faint);
      padding: 1px 8px;
      background: var(--cd-bg-code);
      border-radius: 99px;
    }
    /* Tag chip cloud */
    #theme-claudedocs .cd-tag-chip-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    #theme-claudedocs .cd-tag-chip {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      padding: 3px 10px;
      font-size: 12px;
      border: 1px solid;
      border-radius: 99px;
      text-decoration: none;
      transition: opacity 0.12s, transform 0.12s;
      font-weight: 500;
    }
    #theme-claudedocs .cd-tag-chip:hover { transform: translateY(-1px); }
    #theme-claudedocs .cd-tag-chip-count {
      font-size: 10.5px;
      opacity: 0.6;
      margin-left: 1px;
    }
    /* Recent posts list */
    #theme-claudedocs .cd-recent-item {
      display: block;
      padding: 9px 0;
      border-bottom: 1px solid var(--cd-border);
      text-decoration: none;
      transition: color 0.12s;
    }
    #theme-claudedocs .cd-recent-item:last-child { border-bottom: none; }
    #theme-claudedocs .cd-recent-title {
      font-size: 13px;
      color: var(--cd-text);
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      transition: color 0.12s;
    }
    #theme-claudedocs .cd-recent-item:hover .cd-recent-title { color: var(--cd-link-hover); }
    #theme-claudedocs .cd-recent-date {
      font-size: 11.5px;
      color: var(--cd-text-faint);
      margin-top: 3px;
    }

    /* Article hero (full-bleed cover) */
    #theme-claudedocs .cd-article-hero {
      position: relative;
      width: 100%;
      height: 320px;
      overflow: hidden;
      border-radius: var(--cd-radius-lg);
      margin-bottom: 32px;
      background: var(--cd-bg-hover);
    }
    #theme-claudedocs .cd-article-hero-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    #theme-claudedocs .cd-article-hero-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(20,20,19,0) 35%, rgba(20,20,19,0.7) 100%);
    }
    #theme-claudedocs .cd-article-hero-content {
      position: absolute;
      left: 32px;
      right: 32px;
      bottom: 24px;
      color: #FFFFFF;
    }
    #theme-claudedocs .cd-article-hero-cat {
      display: inline-block;
      padding: 3px 11px;
      background: rgba(255,255,255,0.18);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      border-radius: 99px;
      font-size: 12px;
      color: #FFFFFF !important;
      text-decoration: none !important;
      margin-bottom: 12px;
    }
    #theme-claudedocs .cd-article .cd-article-hero h1,
    #theme-claudedocs .cd-article-hero-title {
      font-family: var(--cd-font-serif);
      font-size: 2.3rem;
      font-weight: 600;
      color: #FFFFFF !important;
      line-height: 1.15;
      letter-spacing: -0.02em;
      margin: 0 0 10px !important;
    }
    #theme-claudedocs .cd-article-hero-meta {
      display: flex;
      gap: 14px;
      font-size: 13px;
      color: rgba(255,255,255,0.85);
      flex-wrap: wrap;
      align-items: center;
    }
    #theme-claudedocs .cd-article-hero-tag {
      color: rgba(255,255,255,0.85) !important;
      text-decoration: none !important;
      font-weight: 500;
    }
    #theme-claudedocs .cd-article-hero-tag:hover { color: #FFFFFF !important; }

    /* ── Responsive ── */
    @media (max-width: 768px) {
      #theme-claudedocs .cd-article h1 { font-size: 1.8rem; }
      #theme-claudedocs .cd-page-header h1 { font-size: 1.7rem; }
      #theme-claudedocs .cd-article-nav { grid-template-columns: 1fr; }
      #theme-claudedocs .cd-tabs { padding: 0 16px; gap: 20px; }
      #theme-claudedocs .cd-shell { padding: 16px 12px 32px; gap: 0; }
      #theme-claudedocs .cd-topnav { gap: 18px; }
      #theme-claudedocs .cd-topnav-link { font-size: 13px; }
      #theme-claudedocs .cd-article-hero { height: 220px; margin-bottom: 24px; }
      #theme-claudedocs .cd-article-hero-content { left: 18px; right: 18px; bottom: 18px; }
      #theme-claudedocs .cd-article-hero-title { font-size: 1.6rem !important; }
    }
  `}</style>
)
