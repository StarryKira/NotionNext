import SmartLink from '@/components/SmartLink'
import { useGlobal } from '@/lib/global'

export default function Breadcrumb({ post }) {
  const { locale } = useGlobal()
  if (!post) return null
  return (
    <nav className='cd-breadcrumb' aria-label='breadcrumb'>
      <SmartLink href='/'>{locale?.NAV?.INDEX || '首页'}</SmartLink>
      {post.category && (
        <>
          <span className='cd-breadcrumb-sep'>/</span>
          <SmartLink href={`/category/${encodeURIComponent(post.category)}`}>
            {post.category}
          </SmartLink>
        </>
      )}
      <span className='cd-breadcrumb-sep'>/</span>
      <span className='truncate max-w-[260px]' style={{ color: 'var(--cd-text)' }}>
        {post.title}
      </span>
    </nav>
  )
}
