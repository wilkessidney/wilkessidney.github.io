/** 站点级配置：部署前请修改这里 */
export const SITE = {
  /** 站点标题，出现在浏览器标签与页眉 */
  title: '拾光集',
  /** 默认描述，用于 SEO 与 RSS */
  description:
    '一个关于量化研究、全栈开发与思考记录的个人站点。写下来，才算是真的想过。',
  /** 站点的正式地址，用于 sitemap / RSS / OG / JSON-LD，必须以 https:// 开头且不带尾斜杠 */
  url: 'https://wilkessidney.github.io',
  /** 默认语言，同时作为 i18n 回退语言 */
  lang: 'zh-CN',
  /** 作者名，用于 meta 与 RSS */
  author: '拾光',
  /** 默认社交分享图（PNG，放在 public/ 下，跨平台社交抓取兼容） */
  ogImage: '/og-default.png',
  /** 备案信息（可选，留空则不显示） */
  icp: '',
  /** 站点起始年份，用于页脚版权 */
  since: 2026,
} as const;

/** 导航配置：新增顶级页面时在这里加一项 */
export const NAV_LINKS = [
  { label: '作品', href: '/works' },
  { label: '文章', href: '/writing' },
  { label: '思考', href: '/notes' },
  { label: '归档', href: '/daily' },
  { label: '关于', href: '/about' },
] as const;
