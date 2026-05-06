import SmartLink from '@/components/SmartLink'
import { useGlobal } from '@/lib/global'

const TAG_PALETTE = [
  '#C96442', // brand orange
  '#3879C3', // blue
  '#1F883D', // green
  '#9333EA', // purple
  '#D97706', // amber
  '#0891B2', // cyan
  '#DC2626', // red
  '#65A30D', // lime
  '#7C3AED', // violet
  '#0F766E', // teal
]

const colorFor = (i, color) => {
  // If Notion provided a color name, map common ones; otherwise rotate palette
  const map = {
    red: '#DC2626', orange: '#D97706', yellow: '#CA8A04',
    green: '#1F883D', blue: '#3879C3', purple: '#9333EA',
    pink: '#DB2777', brown: '#92400E', gray: '#6B7280', default: '#6B7280'
  }
  if (color && map[color]) return map[color]
  return TAG_PALETTE[i % TAG_PALETTE.length]
}

const sortByCount = arr => [...(arr || [])].sort((a, b) => (b.count || 0) - (a.count || 0))

export default function RightAside({ posts, latestPosts, categoryOptions, tagOptions }) {
  const { locale } = useGlobal()

  const postCount = posts?.length || 0
  const catCount = categoryOptions?.length || 0
  const tagCount = tagOptions?.length || 0

  const topCats = sortByCount(categoryOptions).slice(0, 5)
  const topTags = sortByCount(tagOptions).slice(0, 14)
  const recent = (latestPosts || []).slice(0, 7)

  return (
    <>
      {/* 站点统计 */}
      <div className='cd-aside-section'>
        <div className='cd-aside-title'>站点统计</div>
        <div className='cd-stats-grid'>
          <div>
            <div className='cd-stat-num'>{postCount}</div>
            <div className='cd-stat-label'>文章</div>
          </div>
          <div>
            <div className='cd-stat-num'>{catCount}</div>
            <div className='cd-stat-label'>分类</div>
          </div>
          <div>
            <div className='cd-stat-num'>{tagCount}</div>
            <div className='cd-stat-label'>标签</div>
          </div>
        </div>
      </div>

      {/* 热门分类 */}
      {topCats.length > 0 && (
        <div className='cd-aside-section'>
          <div className='cd-aside-title'>热门分类</div>
          <div>
            {topCats.map(cat => (
              <SmartLink
                key={cat.name}
                href={`/category/${encodeURIComponent(cat.name)}`}
                className='cd-aside-list-item'>
                <span>{cat.name}</span>
                <span className='cd-count-badge'>{cat.count || 0}</span>
              </SmartLink>
            ))}
          </div>
        </div>
      )}

      {/* 热门标签 */}
      {topTags.length > 0 && (
        <div className='cd-aside-section'>
          <div className='cd-aside-title'>热门标签</div>
          <div className='cd-tag-chip-row'>
            {topTags.map((tag, i) => {
              const color = colorFor(i, tag.color)
              return (
                <SmartLink
                  key={tag.name}
                  href={`/tag/${encodeURIComponent(tag.name)}`}
                  className='cd-tag-chip'
                  style={{ color, borderColor: color + '40' }}>
                  #{tag.name}
                  {tag.count ? <span className='cd-tag-chip-count'>{tag.count}</span> : null}
                </SmartLink>
              )
            })}
          </div>
        </div>
      )}

      {/* 最近文章 */}
      {recent.length > 0 && (
        <div className='cd-aside-section'>
          <div className='cd-aside-title'>最近文章</div>
          <div>
            {recent.map(p => (
              <SmartLink key={p.id} href={p.href} className='cd-recent-item'>
                <div className='cd-recent-title'>{p.title}</div>
                <div className='cd-recent-date'>
                  {p.date?.start_date || p.lastEditedDate || ''}
                </div>
              </SmartLink>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
