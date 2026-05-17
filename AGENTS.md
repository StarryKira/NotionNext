# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project Overview

NotionNext is a Next.js blog framework that uses Notion as a CMS. Content is fetched from a Notion database, normalized, cached, and rendered through a multi-theme system. It supports SSG, ISR, and full static export.

## Commands

```bash
# Development
yarn dev                  # Start dev server
yarn build                # Production build (sets BUILD_MODE=true)
yarn start                # Start production server (after build)
yarn export               # Static export + sitemap

# Code quality
yarn lint                 # ESLint check
yarn lint:fix             # Auto-fix ESLint issues
yarn type-check           # TypeScript type check (no emit)
yarn format               # Prettier format
yarn format:check         # Prettier check

# Testing
yarn test                 # Run all Jest tests
yarn test:watch           # Watch mode
yarn test:coverage        # With coverage report
yarn test -- --testPathPattern="<filename>"  # Run a single test file

# Utilities
yarn clean                # Clean cache and build artifacts
yarn pre-commit           # lint:fix + format + type-check (pre-commit gate)
```

**Package manager:** Yarn 1 only. Do not use `npm install` or `pnpm`. Always commit both `package.json` and `yarn.lock` when adding dependencies.

**Node version:** ≥20 <25 (use `nvm use` to match `.nvmrc`).

## Architecture

### Data Pipeline

All content comes from Notion. The pipeline:

1. **`lib/db/SiteDataApi.js`** — main entry: `fetchGlobalAllData({ pageId, from, locale })` iterates over comma-separated `NOTION_PAGE_ID` values (supports locale prefixes like `en:xxx,zh:yyy`)
2. **`lib/db/notion/`** — Notion-specific fetchers: `getAllPageIds`, `getPageProperties`, `getPostBlocks`, `getNotionConfig`, etc.
3. **`lib/cache/cache_manager.js`** — transparent fallback chain: Redis → Vercel KV → file → memory. Cache key: `site_${pageId}`
4. **`lib/utils/post.js`** — post-processing (sorting, filtering, pagination)

### Configuration Priority

`lib/config.js` exports `siteConfig(key, defaultVal, extendConfig)`:

1. Notion Config table (fetched at runtime via `getConfigMapFromConfigPage`)
2. Environment variables
3. `blog.config.js` / theme `config.js`

`blog.config.js` aggregates all `conf/*.config.js` files (comment, analytics, font, widget, post, notion property mappings, etc.).

**Key Notion config:** `conf/notion.config.js` defines `NOTION_PROPERTY_NAME` — the mapping between Notion database property names and internal field names (title, date, tags, category, slug, status). If a user's Notion database uses non-default property names, this is where to change the mapping.

### Theme System

- 24 themes live in `themes/<name>/`
- **Runtime selection order:** URL `?theme=` query param → Notion Config table → `NEXT_PUBLIC_THEME` env var → `blog.config.js` `THEME` field
- Each theme exports from its `index.js`: `LayoutBase`, `LayoutIndex`, `LayoutSlug`, `LayoutArchive`, `LayoutSearch`, `LayoutTag`, `LayoutCategory`, and a `THEME_CONFIG` object
- `themes/theme.js` handles dynamic import and dispatch to the correct layout
- `next.config.js` scans `/themes/` at build time via `scanSubdirectories()` to populate the `THEMES` list

When adding a new theme, create `themes/<name>/index.js` exporting the required layout components.

**`themes/claudedocs/`** — Codex Docs 风格主题（新开发）。三栏布局（侧边栏 272px | 内容区 | TOC 220px），使用 Anthropic 品牌字体和陶土橙配色，支持深色模式和移动端响应式。激活方式：`.env.local` 中设置 `NEXT_PUBLIC_THEME=claudedocs`，或 URL 参数 `?theme=claudedocs`。

### Routing (pages/)

- `index.js` → home (`LayoutIndex`)
- `[prefix]/[slug]/index.js` → article by slug (`LayoutSlug`), uses ISR (`getStaticPaths` + `getStaticProps`)
- `[prefix]/[slug]/[...suffix].js` → 3+ level nested routes
- `archive/`, `category/[category]/`, `tag/[tag]/`, `search/[keyword]/` → taxonomy/search views
- Static export mode: `prefetchAllBlockMaps()` pre-fetches all posts; ISR mode: `getPriorityPages()` fetches only high-priority posts at build time

### Multi-language / Multi-site

`NOTION_PAGE_ID` accepts comma-separated values with optional locale prefix: `pageId1,en:pageId2,zh:pageId3`. Locale routing is handled in `middleware.ts` and `lib/utils/pageId.js` (`extractLangId`, `extractLangPrefix`).

### Caching

- ISR revalidation interval: `NEXT_REVALIDATE_SECOND` (default in `blog.config.js`)
- Pseudo-static HTML URLs (`.html` suffix): toggled via `PSEUDO_STATIC` in config; rewrites handled in `next.config.js`
- Build-time session tracking in `lib/cache/build_session.js` — cleared before each build by `next.config.js` pre-build hook

### Key Files

| File | Purpose |
|------|---------|
| `blog.config.js` | Master config aggregator |
| `conf/notion.config.js` | Notion property name mapping |
| `lib/db/SiteDataApi.js` | Main data-fetch entry point |
| `lib/config.js` | `siteConfig()` with priority resolution |
| `lib/cache/cache_manager.js` | Unified cache facade |
| `themes/theme.js` | Theme dynamic import dispatcher |
| `middleware.ts` | i18n routing and locale detection |
| `next.config.js` | Theme scanning, rewrites, image config |

### TypeScript

The project mixes `.js` and `.ts/.tsx`. TypeScript rules are relaxed for `.js` files (most `@typescript-eslint` rules are off for JS). New server-side utilities go in `lib/` as TypeScript; React components may be `.js` or `.tsx`.

### Testing

Tests live in `__tests__/` at root and co-located `*.test.{js,ts}` files. Jest environment is `jsdom`. Path alias `@/` maps to project root. Coverage threshold is 70% across branches/functions/lines/statements.
