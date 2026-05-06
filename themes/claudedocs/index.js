import NotionPage from '@/components/NotionPage'
import NotionIcon from '@/components/NotionIcon'
import Comment from '@/components/Comment'
import replaceSearchResult from '@/components/Mark'
import SmartLink from '@/components/SmartLink'
import { AdSlot } from '@/components/GoogleAdsense'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { isBrowser } from '@/lib/utils'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import Sidebar from './components/Sidebar'
import Catalog from './components/Catalog'
import PostCard from './components/PostCard'
import Breadcrumb from './components/Breadcrumb'
import Footer from './components/Footer'
import TopBar from './components/TopBar'
import AuthorCard from './components/AuthorCard'
import RightAside from './components/RightAside'
import ArticleHero from './components/ArticleHero'
import LeftAsideExtra from './components/LeftAsideExtra'
import CONFIG from './config'
import { Style } from './style'

const AlgoliaSearchModal = dynamic(
  () => import('@/components/AlgoliaSearchModal'),
  { ssr: false }
)

const ThemeGlobal = createContext()
export const useClaudeDocsGlobal = () => useContext(ThemeGlobal)

/* ─────────────────────────────────────────────
   LayoutBase — Claude Docs shell:
   topbar + tabs row + (sidebar | content | toc)
───────────────────────────────────────────── */
const LayoutBase = props => {
  const { children, post } = props
  const { onLoading, isDarkMode, toggleDarkMode } = useGlobal()
  const searchModal = useRef(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter()

  useEffect(() => { setMobileOpen(false) }, [router.asPath])

  /* ── iframe fallback: 仅当 iframe 完全没触发 load 事件时才视为失败 ──
     不去检查 contentDocument（跨域必抛 SecurityError，会误判 YouTube/CodeSandbox 等） */
  useEffect(() => {
    const setup = () => {
      const iframes = document.querySelectorAll(
        '#cd-content-scroll iframe.notion-asset-object-fit'
      )
      iframes.forEach(iframe => {
        if (iframe.dataset.cdChecked) return
        iframe.dataset.cdChecked = '1'

        let loaded = false
        const onLoad = () => { loaded = true }
        iframe.addEventListener('load', onLoad, { once: true })

        // 5 秒内若没有任何 load 事件触发 → 视为被 X-Frame-Options 拒绝
        setTimeout(() => {
          if (loaded || iframe.dataset.cdReplaced) return
          if (!iframe.parentNode || !iframe.src) return
          iframe.dataset.cdReplaced = '1'
          const url = iframe.src
          const fb = document.createElement('div')
          fb.className = 'cd-iframe-fallback'
          fb.innerHTML = `
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
              stroke-linejoin="round" aria-hidden="true" style="opacity:0.5">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <path d="M9 9h6v6H9z" />
            </svg>
            <span>此嵌入页面拒绝在此处显示</span>
            <a href="${url}" target="_blank" rel="noopener noreferrer">
              在新窗口打开 ↗
            </a>
          `
          iframe.parentNode.replaceChild(fb, iframe)
        }, 5000)
      })
    }
    const id = setTimeout(setup, 500)
    return () => clearTimeout(id)
  }, [router.asPath, post?.id])

  const hasToc = post?.toc?.length > 0
  const tocEnabled = siteConfig('CLAUDEDOCS_TOC_ENABLE', true, CONFIG)
  const showToc = tocEnabled && hasToc
  const isArticle = !!post

  const openSearch = () => searchModal.current?.openSearch()

  return (
    <ThemeGlobal.Provider value={{ searchModal }}>
      <div id='theme-claudedocs' className='h-screen flex flex-col overflow-hidden'>
        <Style />

        {/* Top bar (logo / center nav / search / dark toggle) */}
        <TopBar
          onSearch={openSearch}
          onMenuOpen={() => setMobileOpen(true)}
          onToggleDark={toggleDarkMode}
          isDark={isDarkMode}
        />

        {/* Mobile sidebar overlay */}
        {mobileOpen && (
          <>
            <div className='cd-mobile-overlay'
              onClick={() => setMobileOpen(false)} aria-hidden='true' />
            <aside className='cd-mobile-sidebar open'>
              <div className='cd-mobile-sidebar-header'>
                <span style={{ fontSize: 13, fontWeight: 600 }}>Menu</span>
                <button type='button' onClick={() => setMobileOpen(false)}
                  className='cd-topbar-iconbtn' aria-label='Close menu'>
                  <svg width='14' height='14' viewBox='0 0 16 16' fill='none'
                    stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' aria-hidden='true'>
                    <path d='M2 2l12 12M14 2L2 14' />
                  </svg>
                </button>
              </div>
              <div style={{ padding: '16px' }}>
                <AuthorCard />
              </div>
              <Sidebar {...props} />
            </aside>
          </>
        )}

        {/* Single scroll container; three-column shell inside */}
        <main id='cd-content-scroll' className='flex-1 overflow-y-auto overflow-x-hidden'>
          <div className='cd-shell'>
            {/* Left aside: author card + archive timeline + RSS */}
            <aside className='cd-left-aside'>
              <AuthorCard />
              <LeftAsideExtra
                allPages={props.allNavPages}
                posts={props.posts}
              />
            </aside>

            {/* Center content */}
            <div className='cd-center'>
              {onLoading ? (
                <div className='flex items-center justify-center'
                  style={{ minHeight: '60vh' }}>
                  <div className='cd-spinner' />
                </div>
              ) : children}
              <AdSlot type='native' />
              <Footer />
            </div>

            {/* Right aside: TOC on article (with TOC), else site stats */}
            <aside className='cd-right-aside cd-only-desktop-lg'>
              {showToc
                ? <Catalog post={post} />
                : <RightAside
                    posts={props.allNavPages || props.posts}
                    latestPosts={props.latestPosts}
                    categoryOptions={props.categoryOptions}
                    tagOptions={props.tagOptions}
                  />
              }
            </aside>
          </div>
        </main>

        <AlgoliaSearchModal cRef={searchModal} {...props} />
      </div>
    </ThemeGlobal.Provider>
  )
}

/* ─────────────────────────────────────────────
   LayoutIndex — blog home (hero + post list)
───────────────────────────────────────────── */
const LayoutIndex = props => {
  const { posts } = props
  const { locale, siteInfo } = useGlobal()

  return (
    <>
      <div className='cd-blog-hero'>
        <h1>{siteInfo?.title || locale?.NAV?.INDEX || 'Blog'}</h1>
        {siteInfo?.description && <p>{siteInfo.description}</p>}
      </div>

      <div className='cd-blog-section-label'>
        {locale?.COMMON?.LATEST_POSTS || '最新文章'}
      </div>

      <div className='cd-post-grid'>
        {posts?.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {(!posts || posts.length === 0) && (
        <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--cd-text-muted)' }}>
          {locale?.COMMON?.NO_RESULTS_FOUND || '暂无文章'}
        </div>
      )}
    </>
  )
}

/* ─────────────────────────────────────────────
   LayoutPostList — paginated list
───────────────────────────────────────────── */
const LayoutPostList = props => {
  const { posts, page, showNext, locale: l } = props
  const { locale } = useGlobal()
  const router = useRouter()
  const pageNum = Number(page) || 1

  return (
    <>
      <div className='cd-post-grid'>
        {posts?.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {(!posts || posts.length === 0) && (
        <div className='cd-empty-state'>
          {locale?.COMMON?.NO_RESULTS_FOUND || '暂无文章'}
        </div>
      )}

      <div className='cd-pagination'>
        {pageNum > 1 && (
          <SmartLink href={pageNum === 2 ? '/' : `/page/${pageNum - 1}`}>
            <div className='cd-pagination-btn'>
              <svg width='14' height='14' viewBox='0 0 16 16' fill='none' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                <path d='M10 4L6 8l4 4' />
              </svg>
              {locale?.PAGINATION?.PREV || '上一页'}
            </div>
          </SmartLink>
        )}
        {showNext && (
          <SmartLink href={`/page/${pageNum + 1}`}>
            <div className='cd-pagination-btn'>
              {locale?.PAGINATION?.NEXT || '下一页'}
              <svg width='14' height='14' viewBox='0 0 16 16' fill='none' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                <path d='M6 4l4 4-4 4' />
              </svg>
            </div>
          </SmartLink>
        )}
      </div>
    </>
  )
}

/* ─────────────────────────────────────────────
   LayoutSlug — article detail
───────────────────────────────────────────── */
const ArticleLockDynamic = dynamic(() => import('./components/ArticleLock'), { ssr: false })

const LayoutSlug = props => {
  const { post, lock, validPassword, prev, next } = props
  const { locale } = useGlobal()

  return (
    <>
      {lock && <ArticleLockDynamic validPassword={validPassword} />}

      {!lock && post && (
        <article className='cd-article'>
          {/* Hero (full-bleed cover with overlay) — only when cover exists */}
          <ArticleHero post={post} />

          {/* Inline title + meta — hidden when hero takes over */}
          {!post.pageCoverThumbnail && (
            <>
              <h1 style={{ marginBottom: 0 }}>{post.title}</h1>

              {post.type !== 'Page' && (
                <div className='cd-meta'>
                  {(post.date?.start_date || post.createdTime) && (
                    <span>{post.date?.start_date || post.createdTime}</span>
                  )}
                  {post.category && (
                    <SmartLink href={`/category/${encodeURIComponent(post.category)}`} className='cd-meta-tag'>
                      {post.category}
                    </SmartLink>
                  )}
                  {post.tags?.map(t => (
                    <SmartLink key={t} href={`/tag/${encodeURIComponent(t)}`} className='cd-meta-tag'>
                      #{t}
                    </SmartLink>
                  ))}
                </div>
              )}
            </>
          )}

          <div style={{ height: 16 }} />

          {/* Notion content */}
          <div id='article-wrapper'>
            <NotionPage post={post} />
          </div>

          <AdSlot type='in-article' />

          {/* Prev / Next */}
          {post.type === 'Post' && (prev || next) && (
            <nav className='cd-article-nav' aria-label='文章导航'>
              {prev ? (
                <SmartLink href={prev.href} className='cd-article-nav-item'>
                  <span className='cd-article-nav-label'>← {locale?.COMMON?.PREV_POST || '上一篇'}</span>
                  <span className='cd-article-nav-title'>{prev.title}</span>
                </SmartLink>
              ) : <div />}
              {next ? (
                <SmartLink href={next.href} className='cd-article-nav-item next'>
                  <span className='cd-article-nav-label'>{locale?.COMMON?.NEXT_POST || '下一篇'} →</span>
                  <span className='cd-article-nav-title'>{next.title}</span>
                </SmartLink>
              ) : <div />}
            </nav>
          )}

          {/* Comment */}
          <Comment frontMatter={post} />
        </article>
      )}
    </>
  )
}

/* ─────────────────────────────────────────────
   LayoutSearch — 搜索页（带输入框）
───────────────────────────────────────────── */
const LayoutSearch = props => {
  const { keyword, posts } = props
  const { locale } = useGlobal()
  const router = useRouter()
  const [input, setInput] = useState(keyword || '')

  useEffect(() => { setInput(keyword || '') }, [keyword])

  useEffect(() => {
    if (isBrowser && keyword) {
      replaceSearchResult({
        doms: document.getElementById('search-results'),
        search: keyword,
        target: { element: 'span', className: 'cd-search-highlight' }
      })
    }
  }, [keyword])

  const handleSubmit = (e) => {
    e.preventDefault()
    const q = input.trim()
    if (!q) return
    // Preserve current query (e.g. ?theme=claudedocs) so the theme stays consistent
    const { keyword: _, ...restQuery } = router.query
    router.push({
      pathname: `/search/${encodeURIComponent(q)}`,
      query: restQuery,
    })
  }

  return (
    <>
      <div className='cd-page-header'>
        <h1>
          {locale?.NAV?.SEARCH || '搜索'}
          {keyword && <span className='cd-search-keyword'>"{keyword}"</span>}
        </h1>
        {keyword && posts && <p>{posts.length} 篇结果</p>}
        {!keyword && <p>搜索文章标题、摘要、标签</p>}
      </div>

      {/* 搜索输入框 */}
      <form className='cd-search-form' role='search' onSubmit={handleSubmit}>
        <span className='cd-search-form-icon' aria-hidden='true'>
          <svg width='16' height='16' viewBox='0 0 16 16' fill='none' stroke='currentColor' strokeWidth='1.6'>
            <circle cx='6.5' cy='6.5' r='5' />
            <path d='M10.5 10.5l3.5 3.5' strokeLinecap='round' />
          </svg>
        </span>
        <input
          type='search'
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='输入关键词，按 Enter 搜索...'
          className='cd-search-form-input'
        />
        {input && (
          <button type='button' onClick={() => setInput('')}
            className='cd-search-form-clear' aria-label='清空'>
            <svg width='12' height='12' viewBox='0 0 16 16' fill='none' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round'>
              <path d='M2 2l12 12M14 2L2 14' />
            </svg>
          </button>
        )}
      </form>

      {/* 结果区 */}
      {keyword && (
        <>
          <div id='search-results' className='cd-post-grid'>
            {posts?.map(post => <PostCard key={post.id} post={post} />)}
          </div>
          {(!posts || posts.length === 0) && (
            <div className='cd-empty-state'>
              {locale?.COMMON?.NO_RESULTS_FOUND || '没有找到相关结果'}
            </div>
          )}
        </>
      )}

      {!keyword && (
        <div className='cd-empty-state'>请输入关键词开始搜索</div>
      )}
    </>
  )
}

/* ─────────────────────────────────────────────
   LayoutArchive
───────────────────────────────────────────── */
const LayoutArchive = props => {
  const { posts } = props
  const { locale } = useGlobal()

  const grouped = {}
  posts?.forEach(p => {
    const year = new Date(p.publishDate || p.createdTime).getFullYear()
    if (!grouped[year]) grouped[year] = []
    grouped[year].push(p)
  })
  const years = Object.keys(grouped).sort((a, b) => b - a)

  return (
    <>
      <div className='cd-page-header'>
        <h1>{locale?.NAV?.ARCHIVE || '归档'}</h1>
        <p>{posts?.length || 0} 篇文章</p>
      </div>
      {years.map(year => (
        <div key={year} className='cd-archive-year-group'>
          <h2 className='cd-archive-year'>{year}</h2>
          <div className='cd-post-grid'>
            {grouped[year].map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

/* ─────────────────────────────────────────────
   Layout404
───────────────────────────────────────────── */
const Layout404 = props => {
  const { post } = props
  const router = useRouter()
  const waiting = siteConfig('POST_WAITING_TIME_FOR_404') * 1000

  useEffect(() => {
    if (!post) {
      const t = setTimeout(() => {
        if (isBrowser) {
          const article = document.querySelector('#article-wrapper #notion-article')
          if (!article) router.push('/404').then(() => console.warn('404', router.asPath))
        }
      }, waiting)
      return () => clearTimeout(t)
    }
  }, [post, router, waiting])

  return (
    <div className='cd-404'>
      <div className='cd-404-num'>404</div>
      <p className='cd-404-msg'>页面不存在</p>
      <SmartLink href='/' className='cd-pagination-btn'>返回首页</SmartLink>
    </div>
  )
}

/* ─────────────────────────────────────────────
   LayoutCategoryIndex
───────────────────────────────────────────── */
const LayoutCategoryIndex = props => {
  const { categoryOptions } = props
  const { locale } = useGlobal()
  return (
    <>
      <div className='cd-page-header'>
        <h1>{locale?.COMMON?.CATEGORY || '分类'}</h1>
      </div>
      <div className='flex flex-wrap gap-3'>
        {categoryOptions?.map(cat => (
          <SmartLink
            key={cat.name}
            href={`/category/${encodeURIComponent(cat.name)}`}
            className='cd-chip'>
            <svg width='12' height='12' viewBox='0 0 16 16' fill='currentColor' opacity='0.6' aria-hidden='true'>
              <path d='M1.75 1h5.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-.75.75h-5.5A.75.75 0 0 1 1 3.25v-1.5A.75.75 0 0 1 1.75 1zm0 4.5h12.5a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-.75.75h-12.5a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 0 1 .75-.75z' />
            </svg>
            {cat.name}
            <span className='cd-chip-count'>{cat.count}</span>
          </SmartLink>
        ))}
      </div>
    </>
  )
}

/* ─────────────────────────────────────────────
   LayoutTagIndex
───────────────────────────────────────────── */
const LayoutTagIndex = props => {
  const { tagOptions } = props
  const { locale } = useGlobal()
  return (
    <>
      <div className='cd-page-header'>
        <h1>{locale?.COMMON?.TAGS || '标签'}</h1>
      </div>
      <div className='flex flex-wrap gap-3'>
        {tagOptions?.map(tag => (
          <SmartLink
            key={tag.name}
            href={`/tag/${encodeURIComponent(tag.name)}`}
            className='cd-chip'>
            <svg width='11' height='11' viewBox='0 0 16 16' fill='currentColor' opacity='0.6' aria-hidden='true'>
              <path d='M1 2.5A1.5 1.5 0 0 1 2.5 1h3.879a1.5 1.5 0 0 1 1.06.44l7.5 7.5a1.5 1.5 0 0 1 0 2.12l-3.879 3.88a1.5 1.5 0 0 1-2.12 0l-7.5-7.5A1.5 1.5 0 0 1 1 6.38V2.5zm4.5 2a1 1 0 1 0 0-2 1 1 0 0 0 0 2z' />
            </svg>
            #{tag.name}
            {tag.count && <span className='cd-chip-count'>{tag.count}</span>}
          </SmartLink>
        ))}
      </div>
    </>
  )
}

export {
  LayoutBase,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutArchive,
  LayoutSlug,
  Layout404,
  LayoutCategoryIndex,
  LayoutTagIndex,
  CONFIG as THEME_CONFIG,
}
