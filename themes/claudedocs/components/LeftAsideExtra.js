import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'

/* Build year → count map from posts */
function groupByYear(posts) {
  const map = new Map()
  for (const p of posts || []) {
    const date = p.publishDate || p.date?.start_date || p.createdTime
    if (!date) continue
    const year = String(new Date(date).getFullYear())
    if (Number.isNaN(Number(year))) continue
    map.set(year, (map.get(year) || 0) + 1)
  }
  return Array.from(map.entries()).sort(([a], [b]) => Number(b) - Number(a))
}

function RssIcon() {
  return (
    <svg width='14' height='14' viewBox='0 0 16 16' fill='currentColor' aria-hidden='true'>
      <path d='M2 14a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm.5-7.5a.5.5 0 0 1 0-1A8.5 8.5 0 0 1 11 14a.5.5 0 0 1-1 0A7.5 7.5 0 0 0 2.5 6.5zm0-3a.5.5 0 0 1 0-1A11.5 11.5 0 0 1 14 14a.5.5 0 0 1-1 0A10.5 10.5 0 0 0 2.5 3.5z' />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width='13' height='13' viewBox='0 0 16 16' fill='none'
      stroke='currentColor' strokeWidth='1.5' aria-hidden='true'>
      <circle cx='8' cy='8' r='6.5' />
      <path d='M8 4.5V8l2.5 1.5' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}

export default function LeftAsideExtra({ allPages, posts }) {
  const source = (allPages && allPages.length ? allPages : posts) || []
  const years = groupByYear(source).slice(0, 6)
  const totalPosts = source.length
  const since = siteConfig('SINCE')
  const enableRss = siteConfig('ENABLE_RSS') !== false

  return (
    <>
      {/* Archive timeline */}
      {years.length > 0 && (
        <div className='cd-aside-section cd-mini-section'>
          <div className='cd-aside-title'>
            <ClockIcon />
            <span style={{ marginLeft: 6 }}>归档时间线</span>
          </div>
          <div>
            {years.map(([year, count]) => (
              <SmartLink
                key={year}
                href={`/archive`}
                className='cd-aside-list-item'>
                <span style={{ fontFamily: 'var(--cd-font-serif)', fontWeight: 500 }}>{year}</span>
                <span className='cd-count-badge'>{count}</span>
              </SmartLink>
            ))}
          </div>
        </div>
      )}

      {/* Quick stats / RSS */}
      <div className='cd-aside-section cd-mini-section'>
        <div className='cd-mini-row'>
          <div className='cd-mini-stat'>
            <div className='cd-mini-stat-num'>{totalPosts}</div>
            <div className='cd-mini-stat-label'>篇文章</div>
          </div>
          {since && (
            <div className='cd-mini-stat'>
              <div className='cd-mini-stat-num'>{new Date().getFullYear() - Number(since)}+</div>
              <div className='cd-mini-stat-label'>年坚持</div>
            </div>
          )}
        </div>
        {enableRss && (
          <a href='/atom.xml' target='_blank' rel='noopener noreferrer'
            className='cd-rss-btn'>
            <RssIcon />
            <span>订阅 RSS</span>
          </a>
        )}
      </div>
    </>
  )
}
