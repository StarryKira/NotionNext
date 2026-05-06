import SmartLink from '@/components/SmartLink'
import { useGlobal } from '@/lib/global'
import { siteConfig } from '@/lib/config'
import { useRouter } from 'next/router'
import CONFIG from '../config'

/* ── Anthropic ✱ 真实 logo（来自 docs.claude.com 官方 SVG） ── */
function AnthropicMark() {
  return (
    <svg width='28' height='28' viewBox='0 0 26 28' fill='none'
      style={{ flexShrink: 0, color: 'var(--cd-brand)' }} aria-hidden='true'>
      <path
        fill='currentColor'
        d='M5.07306 17.7192L9.99106 14.9614L10.0721 14.7199L9.99106 14.5854H9.74786L8.92369 14.5352L6.11341 14.46L3.68143 14.3597L1.31701 14.2344L0.722529 14.109L0.168579 13.3694L0.222623 13.0059L0.722529 12.6675L1.43861 12.7301L3.0194 12.8429L5.39733 13.0059L7.11322 13.1062L9.66679 13.3694H10.0721L10.1262 13.2065L9.99106 13.1062L9.88297 13.0059L7.42397 11.3387L4.76231 9.58378L3.37068 8.56843L2.62758 8.05448L2.24927 7.57814L2.08714 6.52518L2.76269 5.77306L3.68143 5.83574L3.91112 5.89842L4.84338 6.61293L6.82949 8.15476L9.4236 10.0601L9.80191 10.3735L9.95424 10.2707L9.97755 10.198L9.80191 9.9097L8.39676 7.36504L6.89705 4.77024L6.2215 3.69221L6.04585 3.05291C5.97781 2.78463 5.93777 2.56267 5.93777 2.28826L6.70789 1.2353L7.14024 1.09741L8.18059 1.2353L8.61294 1.61136L9.26147 3.09052L10.3018 5.40954L11.9231 8.56843L12.396 9.50857L12.6527 10.3735L12.7473 10.6367H12.9094V10.4863L13.0445 8.70631L13.2877 6.52518L13.5309 3.71728L13.612 2.92756L14.0038 1.97488L14.7875 1.46093L15.3954 1.74925L15.8954 2.46376L15.8278 2.92756L15.5306 4.85799L14.9496 7.87899L14.5713 9.9097H14.7875L15.0442 9.64646L16.071 8.29265L17.7869 6.13659L18.5435 5.28419L19.4352 4.34404L20.0027 3.89277H21.0836L21.8672 5.07109L21.5159 6.28701L20.408 7.69096L19.4893 8.88181L18.172 10.6467L17.3545 12.0658L17.4278 12.1828L17.6248 12.166L20.5972 11.5267L22.205 11.2384L24.1235 10.9125L24.9882 11.3136L25.0828 11.7273L24.745 12.5672L22.6914 13.0686L20.2864 13.5575L16.7051 14.4005L16.6655 14.4324L16.7123 14.5018L18.3273 14.648L19.0164 14.6856H20.7053L23.8533 14.9238L24.6775 15.4628L25.1639 16.1272L25.0828 16.6411L23.8128 17.2804L22.1104 16.8793L18.1247 15.9266L16.7601 15.5882H16.5709V15.701L17.7058 16.8166L19.8 18.6969L22.4076 21.1288L22.5428 21.7304L22.205 22.2068L21.8537 22.1566L19.5568 20.4268L18.6651 19.6496L16.6655 17.9573H16.5304V18.1328L16.9897 18.8097L19.4352 22.4826L19.5568 23.6107L19.3812 23.9743L18.7462 24.1999L18.0571 24.0745L16.6114 22.0564L15.1387 19.8L13.9498 17.7693L13.8062 17.86L13.0986 25.4158L12.7743 25.8044L12.0177 26.0927L11.3827 25.6164L11.0449 24.8392L11.3827 23.2974L11.788 21.2917L12.1123 19.6997L12.4095 17.7192L12.5911 17.0575L12.575 17.0133L12.43 17.0376L10.9368 19.0855L8.66698 22.1566L6.87002 24.0745L6.43767 24.25L5.69457 23.8614L5.76212 23.172L6.18096 22.5578L8.66698 19.3989L10.1667 17.4309L11.1333 16.3012L11.1239 16.1378L11.0705 16.1332L4.46507 20.4393L3.28961 20.5897L2.7762 20.1134L2.84375 19.3362L3.08695 19.0855L5.07306 17.7192Z'
      />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width='15' height='15' viewBox='0 0 16 16' fill='none'
      stroke='currentColor' strokeWidth='1.6' aria-hidden='true'>
      <circle cx='6.5' cy='6.5' r='5' />
      <path d='M10.5 10.5l3.5 3.5' strokeLinecap='round' />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='currentColor' aria-hidden='true'>
      <path d='M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z' />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='currentColor' aria-hidden='true'>
      <path d='M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 1A5 5 0 1 1 8 3a5 5 0 0 1 0 10z M8 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 8 1zm0 13a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 8 14zm8-6a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1 0-1h1a.5.5 0 0 1 .5.5zM2 8a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1 0-1h1A.5.5 0 0 1 2 8zm11.66-5.66a.5.5 0 0 1 0 .708l-.707.707a.5.5 0 1 1-.708-.708l.708-.707a.5.5 0 0 1 .707 0zM4.046 11.954a.5.5 0 0 1 0 .708l-.708.707a.5.5 0 0 1-.707-.707l.707-.708a.5.5 0 0 1 .708 0zm9.617 1.414a.5.5 0 0 1-.707 0l-.708-.707a.5.5 0 0 1 .708-.708l.707.708a.5.5 0 0 1 0 .707zM4.046 4.046a.5.5 0 0 1-.708 0l-.707-.708a.5.5 0 1 1 .707-.707l.708.707a.5.5 0 0 1 0 .708z' />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg width='18' height='18' viewBox='0 0 16 16' fill='none'
      stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' aria-hidden='true'>
      <path d='M2 4h12M2 8h12M2 12h12' />
    </svg>
  )
}

const pathStartsWith = (asPath, prefix) => {
  if (!asPath) return false
  const clean = asPath.split('?')[0].split('#')[0]
  if (clean === prefix) return true
  if (prefix !== '/' && clean.startsWith(prefix)) {
    const next = clean.charAt(prefix.length)
    return next === '' || next === '/'
  }
  return false
}

export default function TopBar({ onSearch, onMenuOpen, onToggleDark, isDark }) {
  const { siteInfo, locale } = useGlobal()
  const router = useRouter()
  const siteName = siteInfo?.title || 'Blog'

  const hasAlgolia = !!siteConfig('ALGOLIA_APP_ID')

  /* Logo source: custom CLAUDEDOCS_LOGO_URL > default Anthropic ✱ */
  const customLogo = siteConfig('CLAUDEDOCS_LOGO_URL', '', CONFIG)
  const logoEl = customLogo
    ? <img src={customLogo} alt={siteName}
        style={{ width: 28, height: 28, objectFit: 'contain', flexShrink: 0, borderRadius: 4 }} />
    : <AnthropicMark />

  const handleSearchClick = () => {
    if (hasAlgolia && onSearch) {
      onSearch()
      return
    }
    // Preserve current query (e.g. ?theme=claudedocs) so theme stays consistent
    router.push({ pathname: '/search', query: router.query })
  }

  const showAbout = siteConfig('CLAUDEDOCS_SHOW_ABOUT', true, CONFIG)
  const navLinks = [
    { href: '/archive',  label: locale?.NAV?.ARCHIVE  || '归档' },
    { href: '/category', label: locale?.NAV?.CATEGORY || '分类' },
    { href: '/tag',      label: locale?.NAV?.TAG      || '标签' },
    showAbout && { href: '/about',    label: locale?.COMMON?.ABOUT || '关于' },
  ].filter(Boolean)

  return (
    <div className='cd-topbar'>
      {/* Mobile hamburger */}
      <button type='button' onClick={onMenuOpen}
        className='cd-topbar-iconbtn cd-only-mobile' aria-label='Open menu'>
        <MenuIcon />
      </button>

      {/* Logo */}
      <SmartLink href='/' className='cd-topbar-logo'>
        {logoEl}
        <span>{siteName}</span>
      </SmartLink>

      {/* Center nav */}
      <nav className='cd-topnav cd-only-tablet-up' aria-label='Main navigation'>
        {navLinks.map(link => (
          <SmartLink
            key={link.href}
            href={link.href}
            className={`cd-topnav-link${pathStartsWith(router.asPath, link.href) ? ' active' : ''}`}>
            {link.label}
          </SmartLink>
        ))}
      </nav>

      {/* Right actions */}
      <div className='cd-topbar-actions'>
        <button type='button' onClick={handleSearchClick}
          className='cd-topbar-iconbtn' aria-label='Search'>
          <SearchIcon />
        </button>
        <button type='button' onClick={onToggleDark}
          className='cd-topbar-iconbtn' aria-label='Toggle dark mode'>
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </div>
  )
}
