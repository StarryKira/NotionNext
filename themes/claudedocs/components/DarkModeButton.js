import { useGlobal } from '@/lib/global'
import { useEffect, useState } from 'react'

export default function DarkModeButton() {
  const { isDarkMode, toggleDarkMode } = useGlobal()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <button
      type='button'
      onClick={toggleDarkMode}
      className='flex items-center gap-2 px-3 py-2 w-full rounded hover:bg-[var(--cd-bg-hover)] transition-colors text-sm text-[var(--cd-text-muted)]'
      aria-label={isDarkMode ? '切换为浅色模式' : '切换为深色模式'}>
      {isDarkMode ? (
        <svg width='14' height='14' viewBox='0 0 16 16' fill='currentColor' aria-hidden='true'>
          <path d='M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 1A5 5 0 1 1 8 3a5 5 0 0 1 0 10z M8 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 8 1zm0 13a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 8 14zm8-6a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1 0-1h1a.5.5 0 0 1 .5.5zM2 8a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1 0-1h1A.5.5 0 0 1 2 8z' />
        </svg>
      ) : (
        <svg width='14' height='14' viewBox='0 0 16 16' fill='currentColor' aria-hidden='true'>
          <path d='M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z' />
        </svg>
      )}
      <span>{isDarkMode ? '浅色模式' : '深色模式'}</span>
    </button>
  )
}
