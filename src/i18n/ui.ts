/**
 * 轻量 i18n：界面文案字典
 *
 * 目前站点默认使用中文。英文词条已预留，
 * 若要真正启用双语，做法是：
 *   1. 在 src/utils/site.ts 增加 locale 配置
 *   2. 按 /en/... 目录组织页面，调用 useTranslations('en')
 *   3. 内容（文章/作品/思考）各自建对应语言的 Markdown
 * 界面结构无需改动，因为所有 UI 文案都已走这里。
 */

export const languages = {
  zh: '简体中文',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'zh';

const zh = {
  'nav.home': '主页',
  'nav.writing': '文章',
  'nav.works': '作品',
  'nav.notes': '思考',
  'nav.archive': '归档',
  'nav.about': '关于',
  'nav.search': '搜索',
  'nav.menu': '打开菜单',
  'nav.skip': '跳到主要内容',

  'home.featuredWorks': '精选作品',
  'home.latestArticles': '最近文章',
  'home.recentNotes': '最近思考',
  'home.recentDaily': '最近日计划',
  'home.now': '正在进行',
  'home.viewAll': '查看全部',
  'home.tab.works': '作品',
  'home.tab.writing': '文章',
  'home.tab.notes': '思考',
  'home.tab.archive': '归档',

  'writing.title': '文章',
  'writing.desc': '把想清楚的事写下来。包含技术、学习笔记、读书观影与长文专题。',
  'works.title': '作品',
  'works.desc': '做过的东西，以及做它们时学到的教训。',
  'notes.title': '思考',
  'notes.desc': '随笔、灵感碎片与摘录。短一点，及时一点。',
  'archive.title': '归档',
  'archive.desc': '按时间顺序排列的全部内容。',
  'daily.title': '日计划',
  'daily.desc': '每日任务、状态与复盘记录。',
  'about.title': '关于',
  'tags.title': '标签',
  'tags.desc': '按标签浏览全部内容。',
  'search.title': '搜索',
  'search.desc': '输入关键词，在全站内查找。',
  'search.placeholder': '搜索标题、摘要或标签…',
  'search.empty': '没有找到匹配的内容，换个词试试。',
  'search.hint': '输入关键词开始搜索',

  'now.reading': '在读',
  'now.learning': '在学',
  'now.building': '在做',
  'now.exploring': '在探索',

  'work.role': '职责',
  'work.tools': '工具',
  'work.links': '链接',
  'work.year': '年份',
  'work.type': '类型',

  'post.toc': '目录',
  'post.updated': '更新于',
  'post.readingTime': '分钟阅读',
  'post.prev': '上一篇',
  'post.next': '下一篇',
  'post.related': '相关阅读',
  'post.share': '分享',
  'post.comment': '评论',
  'post.commentNote':
    '评论通过 Giscus 加载，需要配置 GitHub 仓库。',
  'post.like': '赞',
  'post.repost': '转发',
  'post.repostCode': '转发码',
  'post.copied': '已复制',
  'post.share': '分享',

  'filter.all': '全部',
  'filter.category': '分类',
  'filter.type': '类型',
  'filter.year': '年份',

  'footer.rss': 'RSS',
  'footer.sitemap': '站点地图',
  'footer.email': '邮箱',
  'footer.rights': '保留所有权利',
  'footer.builtWith': '使用 Astro 构建',

  'theme.toggle': '切换深色/浅色模式',
  'error.404.title': '页面不存在',
  'error.404.desc': '这个地址下没有内容，也许它已经被移动或删除了。',
  'error.404.back': '回到首页',
} as const;

const en: Partial<Record<keyof typeof zh, string>> = {
  'nav.home': 'Home',
  'nav.writing': 'Writing',
  'nav.works': 'Works',
  'nav.notes': 'Notes',
  'nav.archive': 'Archive',
  'nav.about': 'About',
  'nav.search': 'Search',
  'nav.menu': 'Open menu',
  'nav.skip': 'Skip to main content',

  'home.featuredWorks': 'Selected works',
  'home.latestArticles': 'Latest writing',
  'home.recentNotes': 'Recent notes',
  'home.now': 'Now',
  'home.viewAll': 'View all',

  'writing.title': 'Writing',
  'works.title': 'Works',
  'notes.title': 'Notes',
  'archive.title': 'Archive',
  'about.title': 'About',
  'tags.title': 'Tags',
  'search.title': 'Search',
  'search.placeholder': 'Search title, summary or tags…',
  'search.empty': 'No results. Try another keyword.',
  'search.hint': 'Type a keyword to start searching',

  'post.toc': 'Contents',
  'post.readingTime': 'min read',
  'post.prev': 'Previous',
  'post.next': 'Next',
  'post.related': 'Related',
  'post.share': 'Share',
  'post.comment': 'Comments (coming soon)',
  'post.copied': 'Link copied',

  'filter.all': 'All',
  'filter.category': 'Category',
  'filter.type': 'Type',
  'filter.year': 'Year',

  'footer.rss': 'RSS',
  'footer.sitemap': 'Sitemap',
  'footer.email': 'Email',
  'footer.rights': 'All rights reserved',
  'footer.builtWith': 'Built with Astro',

  'theme.toggle': 'Toggle dark / light mode',
  'error.404.title': 'Page not found',
  'error.404.desc': 'Nothing lives at this address. It may have moved or been removed.',
  'error.404.back': 'Back to home',
};

const dictionaries = { zh, en };

export type UIKey = keyof typeof zh;

/** 取翻译函数；未命中的 key 回退到中文，再回退到 key 本身 */
export function useTranslations(lang: Lang = defaultLang) {
  return function t(key: UIKey): string {
    const dict = dictionaries[lang] as Record<string, string | undefined>;
    const fallback = dictionaries.zh as Record<string, string | undefined>;
    return dict[key] ?? fallback[key] ?? key;
  };
}
