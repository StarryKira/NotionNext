import SmartLink from '@/components/SmartLink'
import { useGlobal } from '@/lib/global'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

const pathMatches = (asPath, href) => {
  if (!href) return false
  const cleanPath = (asPath || '').split('?')[0]
  if (cleanPath === href) return true
  if (href !== '/' && cleanPath.startsWith(href)) {
    const next = cleanPath.charAt(href.length)
    return next === '' || next === '/' || next === '?'
  }
  return false
}

function groupByCategory(allNavPages) {
  const uncategorized = []
  const categories = {}
  const order = []
  ;(allNavPages || []).forEach(page => {
    const cat = page.category
    if (cat) {
      if (!categories[cat]) { categories[cat] = []; order.push(cat) }
      categories[cat].push(page)
    } else {
      uncategorized.push(page)
    }
  })
  return {
    groups: order.map(cat => ({ name: cat, posts: categories[cat] })),
    uncategorized
  }
}

function Chevron({ open }) {
  return (
    <svg className={`cd-caret${open ? ' open' : ''}`}
      viewBox='0 0 12 12' fill='none' stroke='currentColor' strokeWidth='1.5' aria-hidden='true'>
      <path d='M4.5 2.5l3 3.5-3 3.5' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}

function NavLink({ href, children, indent }) {
  const router = useRouter()
  const isActive = pathMatches(router.asPath, href)
  return (
    <SmartLink href={href}>
      <div className={`cd-nav-link${indent ? ' cd-nav-child' : ''}${isActive ? ' active' : ''}`}>
        {children}
      </div>
    </SmartLink>
  )
}

function CategoryGroup({ name, posts, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen)
  const router = useRouter()

  useEffect(() => {
    if (posts.some(p => pathMatches(router.asPath, p.href))) setOpen(true)
  }, [router.asPath, posts])

  return (
    <div>
      <div
        className='cd-nav-group-toggle'
        onClick={() => setOpen(v => !v)}
        role='button' tabIndex={0}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setOpen(v => !v)}>
        <span className='cd-toggle-label'>{name}</span>
        <Chevron open={open} />
      </div>
      {open && (
        <div>
          {posts.map(p => (
            <NavLink key={p.id || p.href || p.title} href={p.href}>
              {p.title}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Sidebar({ allNavPages }) {
  const { locale } = useGlobal()
  const { groups, uncategorized } = groupByCategory(allNavPages)

  return (
    <div className='cd-sidebar h-full overflow-y-auto'>
      {/* Section 1: quick navigation */}
      <div className='cd-nav-section'>{locale?.COMMON?.NAVIGATION || '导航'}</div>
      <NavLink href='/'>{locale?.NAV?.INDEX || '首页'}</NavLink>
      <NavLink href='/archive'>{locale?.NAV?.ARCHIVE || '归档'}</NavLink>
      <NavLink href='/category'>{locale?.NAV?.CATEGORY || '分类'}</NavLink>
      <NavLink href='/tag'>{locale?.NAV?.TAG || '标签'}</NavLink>

      {/* Section 2: posts grouped by category */}
      {groups.length > 0 && groups.map((g, i) => (
        <CategoryGroup key={g.name} name={g.name} posts={g.posts} defaultOpen={i === 0} />
      ))}

      {uncategorized.length > 0 && groups.length === 0 && (
        <>
          <div className='cd-nav-section'>{locale?.COMMON?.ARTICLES || '文章'}</div>
          {uncategorized.slice(0, 40).map(p => (
            <NavLink key={p.id} href={p.href}>{p.title}</NavLink>
          ))}
        </>
      )}
    </div>
  )
}
