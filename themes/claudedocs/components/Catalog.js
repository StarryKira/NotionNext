import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { uuidToId } from 'notion-utils'
import throttle from 'lodash.throttle'

export default function Catalog({ post }) {
  const [active, setActive] = useState(null)
  const activeRef = useRef(null)
  const clickLock = useRef(false)
  const listRef = useRef(null)

  const toc = useMemo(() => {
    if (!post?.toc) return []
    return post.toc.filter(item => item.indentLevel < 3)
  }, [post?.toc])

  useEffect(() => {
    activeRef.current = active
  }, [active])

  useEffect(() => {
    if (!toc.length) return
    const container = document.querySelector('#cd-content-scroll')
    if (!container) return

    const spy = throttle(() => {
      if (clickLock.current) return
      const headings = document.querySelectorAll('.notion-h[data-id]')
      if (!headings.length) return
      const containerTop = container.getBoundingClientRect().top
      let current = null
      headings.forEach(el => {
        const top = el.getBoundingClientRect().top - containerTop
        if (top <= 40) current = el.getAttribute('data-id')
      })
      if (!current && headings.length) current = headings[0].getAttribute('data-id')
      if (current !== activeRef.current) setActive(current)
    }, 80)

    container.addEventListener('scroll', spy, { passive: true })
    setTimeout(spy, 400)
    return () => {
      container.removeEventListener('scroll', spy)
      spy.cancel?.()
    }
  }, [toc])

  const handleClick = useCallback((e, id) => {
    e.preventDefault()
    clickLock.current = true
    const target = document.querySelector(`[data-id="${id}"]`)
    const container = document.querySelector('#cd-content-scroll')
    if (target && container) {
      const rect = target.getBoundingClientRect()
      const cRect = container.getBoundingClientRect()
      container.scrollBy({ top: rect.top - cRect.top - 24, behavior: 'smooth' })
    }
    setTimeout(() => {
      setActive(id)
      clickLock.current = false
    }, 400)
  }, [])

  if (!toc.length) return null

  return (
    <div className='flex flex-col h-full pt-2'>
      <div className='cd-toc-title'>On this page</div>
      <div ref={listRef} className='overflow-y-auto flex-1'>
        {toc.map(item => {
          const id = uuidToId(item.id)
          const isActive = active === id
          const levelClass = item.indentLevel === 0 ? '' : item.indentLevel === 1 ? ' cd-toc-l2' : ' cd-toc-l3'
          return (
            <a
              key={id}
              href={`#${id}`}
              onClick={e => handleClick(e, id)}
              className={`cd-toc-item${levelClass}${isActive ? ' active' : ''}`}
              title={item.text}>
              {item.text}
            </a>
          )
        })}
      </div>
    </div>
  )
}
