import { useState } from 'react'
import { useGlobal } from '@/lib/global'

export default function ArticleLock({ validPassword }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const { locale } = useGlobal()

  const handleSubmit = () => {
    const ok = validPassword(value)
    if (ok === false) {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <div className='cd-lock'>
      <svg className='cd-lock-icon' width='40' height='40' viewBox='0 0 24 24'
        fill='none' strokeWidth='1.5' aria-hidden='true'>
        <rect x='3' y='11' width='18' height='11' rx='2' ry='2' />
        <path d='M7 11V7a5 5 0 0 1 10 0v4' />
      </svg>
      <p className='cd-lock-msg'>此文章已加密</p>
      <div className='cd-lock-form'>
        <input
          type='password'
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          placeholder='请输入密码'
          className={`cd-lock-input${error ? ' error' : ''}`}
          autoFocus
        />
        <button type='button' onClick={handleSubmit} className='cd-lock-btn'>
          确认
        </button>
      </div>
      {error && <p className='cd-lock-error'>密码错误</p>}
    </div>
  )
}
