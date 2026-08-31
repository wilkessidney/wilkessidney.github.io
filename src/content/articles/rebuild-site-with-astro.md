---
title: 用 Astro 重建我的个人站点
date: 2026-08-28
updatedDate: 2026-08-30
summary: 为什么在众多框架里最终选了 Astro，以及这个站点的内容模型是如何设计的——文章、作品、思考三种内容各归其位。
category: 技术
tags: [Astro, 建站, 静态站点]
readingTime: 6
featured: true
draft: false
---

把个人站点从「又一个半成品」变成「真的会一直用」的东西，花了我不少时间。这次用 Astro 重建，核心诉求只有三个：**内容用本地 Markdown 管、构建出来是纯静态、长期维护成本低**。

## 为什么是 Astro

我看过 Next.js、Hugo、Eleventy。Next.js 太重，对于一个不需要后端交互的站点来说是杀鸡用牛刀；Hugo 快但模板语法让我每次都得查文档；Eleventy 灵活却要自己拼太多积木。

Astro 的「内容集合（Content Collections）」正好命中痛点：用 TypeScript schema 给每类内容定义字段，写文章时如果漏了必填项，构建直接报错。对长期维护来说，这种约束比自由更友好。

```ts
const articles = defineCollection({
  loader: glob({ base: './src/content/articles', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum(['技术', '学习笔记', '读书观影', '长文专题']),
  }),
});
```

## 三种内容，三种节奏

这个站点不是单一的「博客」，而是混血：

- **文章**：成篇长文，要排版、要目录、要上下篇；
- **作品**：项目复盘，有背景、职责、工具、链接；
- **思考**：随笔碎片，三两句话即可，贵在即时。

它们共用同一套标签与归档机制，但写作门槛完全不同。思考区降低了「想写点什么」的心理成本——不用凑成一篇文章才能发布。

## 一点体会

> 建站工具选错了会一直绊脚，但选对了也只是开始。真正难的，是之后十年里持续往里面填东西。

工具负责让这件事「不难开始」，剩下的交给习惯。
