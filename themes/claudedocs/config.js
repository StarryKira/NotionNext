const CONFIG = {
  CLAUDEDOCS_SIDEBAR_WIDTH: 272,
  CLAUDEDOCS_TOC_WIDTH: 220,
  CLAUDEDOCS_SHOW_CATEGORY: true,
  CLAUDEDOCS_SHOW_TAG: true,
  CLAUDEDOCS_SHOW_ARCHIVE: true,
  CLAUDEDOCS_TOC_ENABLE: process.env.NEXT_PUBLIC_CLAUDEDOCS_TOC_ENABLE !== 'false',
  CLAUDEDOCS_SHOW_LEVEL3: process.env.NEXT_PUBLIC_CLAUDEDOCS_SHOW_LEVEL3 !== 'false',
  CLAUDEDOCS_EXCLUSIVE_COLLAPSE: process.env.NEXT_PUBLIC_CLAUDEDOCS_EXCLUSIVE_COLLAPSE === 'true',

  // 自定义 logo 图片 URL（留空则使用默认 ✱ SVG，或回落到 Notion 站点图标）
  // 例如：'/avatar.svg' 或 'https://example.com/logo.png'
  CLAUDEDOCS_LOGO_URL: process.env.NEXT_PUBLIC_CLAUDEDOCS_LOGO_URL || '',

  // 作者卡片头像 URL（留空回落到 siteInfo.icon，再回落到 ✱ SVG）
  CLAUDEDOCS_AVATAR_URL: process.env.NEXT_PUBLIC_CLAUDEDOCS_AVATAR_URL || '',

  // 作者卡片底部引用语（可选）
  CLAUDEDOCS_AUTHOR_QUOTE: process.env.NEXT_PUBLIC_CLAUDEDOCS_AUTHOR_QUOTE || '',

  // 顶部导航是否显示「关于」链接
  CLAUDEDOCS_SHOW_ABOUT: process.env.NEXT_PUBLIC_CLAUDEDOCS_SHOW_ABOUT !== 'false',
}
export default CONFIG