import LazyImage from '@/components/LazyImage'
import SmartLink from '@/components/SmartLink'

export default function PostCard({ post }) {
  if (!post) return null
  const date = post.date?.start_date || post.createdTime
  const cover = post.pageCoverThumbnail
  const hasCover = !!cover

  return (
    <SmartLink
      href={post.href}
      className={`cd-post-card${hasCover ? ' has-cover' : ''}`}>
      {hasCover && (
        <div className='cd-post-card-cover'>
          <LazyImage
            src={cover}
            alt={post.title}
            className='cd-post-card-cover-img'
          />
        </div>
      )}
      <div className='cd-post-card-body'>
        <div className='cd-post-card-meta-top'>
          {date && <span>{date}</span>}
          {post.category && (
            <>
              <span className='cd-dot'>·</span>
              <span>{post.category}</span>
            </>
          )}
        </div>
        <div className='cd-post-card-title'>{post.title}</div>
        {post.summary && (
          <div className='cd-post-card-summary'>{post.summary}</div>
        )}
        <div className='cd-post-card-readmore'>阅读全文 →</div>
      </div>
    </SmartLink>
  )
}
