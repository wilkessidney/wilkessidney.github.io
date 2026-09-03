import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * 文章集合
 * 文件位置：src/content/articles/*.md
 * slug 由文件名自动生成，可在 frontmatter 用 slug 字段覆盖
 */
const articles = defineCollection({
  loader: glob({ base: './src/content/articles', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    summary: z.string(),
    cover: z.string().optional(),
    /** 分类：技术 / 学习笔记 / 读书观影 / 长文专题 */
    category: z.enum(['技术', '学习笔记', '读书观影', '长文专题']),
    tags: z.array(z.string()).default([]),
    readingTime: z.number().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

/**
 * 作品集合
 * 文件位置：src/content/works/*.md
 */
const works = defineCollection({
  loader: glob({ base: './src/content/works', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    year: z.number(),
    summary: z.string(),
    cover: z.string().optional(),
    /** 类型：项目案例 / 设计创作 / 实验项目 / 过程复盘 */
    type: z.enum(['项目案例', '设计创作', '实验项目', '过程复盘']),
    tags: z.array(z.string()).default([]),
    role: z.string().default('独立完成'),
    tools: z.array(z.string()).default([]),
    links: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(99),
  }),
});

/**
 * 思考（短内容）集合
 * 文件位置：src/content/notes/*.md
 * 正文即内容，frontmatter 只保留日期、标签与可选配图
 */
const notes = defineCollection({
  loader: glob({ base: './src/content/notes', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    pinned: z.boolean().default(false),
  }),
});

/**
 * 日计划（归档）集合
 * 文件位置：src/content/daily/*.md
 * 用于记录每日任务、状态与复盘
 */
const daily = defineCollection({
  loader: glob({ base: './src/content/daily', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    date: z.coerce.date(),
    /** 当日状态：规划中 / 进行中 / 已完成 / 复盘 */
    status: z.enum(['规划中', '进行中', '已完成', '复盘']).default('进行中'),
    /** 重点任务清单 */
    tasks: z.array(z.object({
      text: z.string(),
      done: z.boolean().default(false),
    })).default([]),
    /** 一句话总结 */
    summary: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

/**
 * 个人资料：单文件 JSON（用 glob 加载，整份 JSON 作为一条数据）
 * 文件位置：src/content/profile.json
 * 注意：file() 加载器会把顶层对象当成「多条记录」，因此这里改用 glob。
 */
const profile = defineCollection({
  loader: glob({ base: './src/content', pattern: 'profile.json' }),
  schema: z.object({
    name: z.string(),
    nickname: z.string().optional(),
    title: z.string(),
    bio: z.string(),
    longBio: z.array(z.string()).default([]),
    avatar: z.string().default('/images/avatar.svg'),
    email: z.string().optional(),
    location: z.string().optional(),
    /** 正在进行：当前阅读 / 学习 / 制作 / 探索 */
    now: z.object({
      reading: z.array(z.string()).default([]),
      learning: z.array(z.string()).default([]),
      building: z.array(z.string()).default([]),
      exploring: z.array(z.string()).default([]),
    }).default({ reading: [], learning: [], building: [], exploring: [] }),
    /** 经历时间线 */
    timeline: z.array(z.object({
      period: z.string(),
      title: z.string(),
      org: z.string().optional(),
      description: z.string().optional(),
    })).default([]),
    /** 技能分组 */
    skills: z.array(z.object({
      group: z.string(),
      items: z.array(z.string()),
    })).default([]),
    interests: z.array(z.string()).default([]),
    socialLinks: z.array(z.object({
      label: z.string(),
      url: z.string(),
    })).default([]),
    resumeUrl: z.string().optional(),
  }),
});

export const collections = { articles, works, notes, daily, profile };
