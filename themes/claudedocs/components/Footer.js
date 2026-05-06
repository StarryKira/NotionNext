import { useGlobal } from '@/lib/global'
import { siteConfig } from '@/lib/config'

export default function Footer() {
  const { siteInfo } = useGlobal()
  const since = siteConfig('SINCE')
  const author = siteConfig('AUTHOR') || siteInfo?.author
  const year = new Date().getFullYear()
  const yearStr = since && since !== year ? `${since} – ${year}` : year

  return (
    <div className='cd-footer'>
      <span>© {yearStr} {author}</span>
      <span className='mx-2 opacity-40'>·</span>
      <span>Powered by{' '}
        <a href='https://github.com/tangly1024/NotionNext' target='_blank' rel='noopener noreferrer'>
          NotionNext
        </a>
      </span>
    </div>
  )
}
