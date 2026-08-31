# 拾光集 · 个人博客站点

一个「个人知识库 + 作品集 + 思考记录」的混合型中文个人站点。基于 **Astro** 构建，纯静态输出，内容以本地 Markdown / JSON 文件管理，适合长期更新与沉淀。

- GitHub 暗色科技风（默认深色），支持浅色模式与 **7 色强调色切换**（记忆偏好，无刷新闪烁）
- 文章、作品、思考三种内容各有归宿，共享标签、归档与搜索
- 内置完整 **SEO（meta / OG / sitemap / RSS / JSON-LD）** 与 **GEO（llms.txt / robots.txt 放行 AI 爬虫）**，对搜索引擎与传统 AI 搜索（ChatGPT / Perplexity / Claude 等）友好

---

## 一、技术栈

| 能力 | 方案 |
| --- | --- |
| 框架 | Astro 7（静态输出） |
| 内容 | Content Collections（Markdown + 单文件 JSON） |
| 样式 | 原生 CSS + CSS 变量（设计令牌），无 UI 框架 |
| 代码高亮 | Shiki |
| RSS | `@astrojs/rss` |
| 站点地图 | `@astrojs/sitemap` |
| 结构化数据 | JSON-LD（WebSite / Article / BreadcrumbList） |
| GEO | `llms.txt` + `robots.txt` 放行 AI 爬虫 |
| 部署 | GitHub Pages（Actions 自动部署，纯静态） |

---

## 二、本地启动

要求 Node.js 18.20+（推荐 20+）。

```bash
# 1. 安装依赖
npm install

# 2. 本地开发（带热更新）
npm run dev

# 3. 构建为静态站点
npm run build

# 4. 本地预览构建产物
npm run preview
```

开发服务器默认地址：`http://localhost:4321`

> 若你的环境设置了 `NODE_OPTIONS=--use-system-ca` 导致 Node 启动异常，运行时加 `env -u NODE_OPTIONS npm run dev` 即可。

---

## 三、项目结构

```
个人博客/
├── astro.config.mjs          # 站点主配置（site 地址、sitemap、代码主题）
├── .github/workflows/        # ★ GitHub Pages 自动部署工作流
│   └── deploy.yml
├── src/
│   ├── content.config.ts      # 内容集合 schema（文章/作品/思考/资料）
│   ├── content/               # ★ 你的内容都在这里
│   │   ├── articles/          #   文章（.md）
│   │   ├── works/             #   作品（.md）
│   │   ├── notes/             #   思考（.md）
│   │   └── profile.json       #   关于我（单文件）
│   ├── layouts/
│   │   └── Layout.astro        # 全站骨架（页眉/页脚/主题/JSON-LD）
│   ├── components/            # 可复用组件（卡片、目录、页眉、OG 切换器等）
│   ├── pages/                 # 路由与页面
│   │   ├── index.astro        #   首页
│   │   ├── writing/           #   文章列表 + 详情 [id]
│   │   ├── works/             #   作品列表 + 详情 [id]
│   │   ├── notes/             #   思考时间线
│   │   ├── archive/           #   按年/月归档
│   │   ├── tags/              #   标签聚合
│   │   ├── about.astro        #   关于
│   │   ├── search.astro       #   全站搜索
│   │   ├── search-index.json.ts  # 构建期生成的搜索索引
│   │   ├── rss.xml.ts         #   RSS 订阅
│   │   └── 404.astro
│   ├── styles/global.css      # 设计令牌与全局样式（GitHub 风）
│   ├── utils/                 # site.ts（站点配置）、helpers.ts（工具函数）
│   └── i18n/ui.ts             # 界面文案（已预留中英文切换）
├── public/                    # 静态资源（favicon、OG 图、头像、robots、llms）
│   ├── og-default.png         #   默认社交分享图（1200×630 PNG）
│   ├── robots.txt             #   爬虫规则（含 AI 爬虫放行）
│   └── llms.txt               #   GEO 标准文件，供 AI 搜索引擎引用
├── dist/                      # 构建产物（勿手动修改）
└── .gitignore
```

---

## 四、如何新增内容

所有内容都在 `src/content/` 下，写完即发布，无需碰代码。

### 新增一篇文章

在 `src/content/articles/` 新建 `my-post.md`：

```markdown
---
title: 文章标题
date: 2026-09-01
updatedDate: 2026-09-02        # 可选
summary: 一句话摘要，会显示在列表与 SEO 描述里
category: 技术                  # 技术 | 学习笔记 | 读书观影 | 长文专题
tags: [Astro, 建站]
readingTime: 6                  # 可选，留空则按字数自动估算
featured: false                 # 是否精选（首页展示）
draft: false                    # true 则不在生产环境发布
---

正文用 Markdown 写。二级、三级标题会自动生成右侧目录。
```

### 新增一个作品

在 `src/content/works/` 新建 `my-work.md`：

```markdown
---
title: 作品名
year: 2026
summary: 一句话简介
type: 项目案例                  # 项目案例 | 设计创作 | 实验项目 | 过程复盘
tags: [量化, 回测]
role: 独立设计与开发
tools: [Python, FastAPI]
links:
  - { label: "在线访问", url: "https://example.com" }
featured: true
order: 1                        # 列表排序，越小越靠前
---

## 背景
## 目标
## 过程
## 成果
## 个人职责
## 使用工具
## 复盘
```

### 新增一条思考

在 `src/content/notes/` 新建 `note.md`（不需要标题，正文即内容）：

```markdown
---
date: 2026-09-01
tags: [想法]
pinned: false                  # true 则时间线置顶
---

今天想到一个有趣的点：……
```

### 修改「关于我」

编辑 `src/content/profile.json`，字段包括姓名、简介、正在进行（now）、经历、技能、兴趣、社交链接、简历地址。该文件被首页 Hero、页脚、关于页共用。

---

## 五、修改站点信息

打开 `src/utils/site.ts`：

- `SITE.title` / `SITE.description` / `SITE.author`：站点标题、描述、作者
- `SITE.url`：站点正式地址（已设为 `https://wilkessidney.github.io`，影响 sitemap / RSS / OG / JSON-LD）
- `SITE.ogImage`：默认分享图（`public/og-default.png`）
- `NAV_LINKS`：顶部导航项

主题与配色在 `src/styles/global.css` 顶部的设计令牌里（`--bg` / `--card` / `--text` / `--accent` 等）。强调色切换器提供 7 色，用户选择记忆在 `localStorage`。

---

## 六、部署到 GitHub Pages

本仓库已内置 `.github/workflows/deploy.yml`，**推送到 `main` 分支即自动构建并部署到 GitHub Pages**。

### 1. 创建仓库（User Page 约束）

若用于个人主页（`https://wilkessidney.github.io`），**仓库名必须严格为 `wilkessidney.github.io`**（User Page 部署在根路径，无需 `base`）。

```bash
# 在当前仓库目录关联远程（仓库名按需替换）
git remote add origin https://github.com/wilkessidney/wilkessidney.github.io.git
git push -u origin main
```

### 2. 开启 Pages

仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。

### 3. 完成

首次 push 后，Actions 会自动运行：构建 → 上传 → 部署。完成后访问 `https://wilkessidney.github.io`。
之后每次 push 到 `main` 都会自动重新部署。

> 部署地址已在 `astro.config.mjs` 的 `site` 与 `src/utils/site.ts` 的 `SITE.url` 中写死为 `https://wilkessidney.github.io`，无需改动。若要换域名，两处同步修改后重新 push。

---

## 七、SEO 与 GEO 已内置

| 维度 | 已实现 |
| --- | --- |
| 传统 SEO | 每页 title/description/canonical、Open Graph、Twitter Card、`@astrojs/sitemap`、`@astrojs/rss`、JSON-LD（WebSite / Article / BreadcrumbList） |
| GEO（生成式引擎优化） | `llms.txt` 列出站点与内容入口；`robots.txt` 放行 GPTBot / CCBot / Google-Extended / PerplexityBot / ClaudeBot；纯静态语义化 HTML 利于 AI 抓取引用 |
| 社交分享 | `public/og-default.png`（1200×630，跨平台兼容；SVG 在部分平台抓取会失效，故用 PNG） |

如需**每篇文章独立 OG 图**（带标题），可加构建期生成脚本（当前为统一站点级图）。

---

## 八、可选增强（占位已留好）

- **评论**：文章详情页预留了评论区位置。推荐接入 [Giscus](https://giscus.app)（基于 GitHub Discussions，零后端）或 [Waline](https://waline.js.org)。
- **MDX**：如需在文章里写组件，安装 `@astrojs/mdx` 并在 `astro.config.mjs` 加入集成，再把 `.md` 改成 `.mdx`。
- **中英文切换**：界面文案已全部走 `src/i18n/ui.ts`，按文件顶部注释即可启用 `/en/` 双语。
- **分析**：在 `Layout.astro` 的 `<head>` 注入统计脚本（如 Plausible / umami），无 Cookie 跟踪更贴合站点气质。

---

## 九、内容模型速查

| 类型 | 文件位置 | 关键字段 |
| --- | --- | --- |
| Article | `src/content/articles/*.md` | title, slug, date, summary, category, tags, readingTime, featured |
| Work | `src/content/works/*.md` | title, year, summary, type, role, tools, links, featured, order |
| Note | `src/content/notes/*.md` | date, tags, image(可选)，正文即内容 |
| Profile | `src/content/profile.json` | name, bio, now, timeline, skills, socialLinks |
