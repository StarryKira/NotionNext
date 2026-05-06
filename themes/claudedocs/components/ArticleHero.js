import LazyImage from '@/components/LazyImage'
import SmartLink from '@/components/SmartLink'

export default function ArticleHero({ post }) {
  if (!post?.pageCoverThumbnail) return null
  const date = post.date?.start_date || post.createdTime

  return (
    <div className='cd-article-hero'>
      <LazyImage
        src={post.pageCoverThumbnail}
        alt={post.title}
        className='cd-article-hero-img'
      />
      <div className='cd-article-hero-overlay' />
      <div className='cd-article-hero-content'>
        {post.category && (
          <SmartLink
            href={`/category/${encodeURIComponent(post.category)}`}
            className='cd-article-hero-cat'>
            {post.category}
          </SmartLink>
        )}
        <h1 className='cd-article-hero-title'>{post.title}</h1>
        <div className='cd-article-hero-meta'>
          {date && <span>{date}</span>}
          {post.tags?.slice(0, 5).map(t => (
            <SmartLink
              key={t}
              href={`/tag/${encodeURIComponent(t)}`}
              className='cd-article-hero-tag'>
              #{t}
            </SmartLink>
          ))}
        </div>
      </div>
    </div>
  )
}
