import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

/**
 * 构建期生成全站搜索索引（静态输出时会被预渲染为 /search-index.json）。
 * 前端 search.astro 拉取后做客户端过滤，不依赖任何后端。
 */
export const GET: APIRoute = async () => {
  const articles = await getCollection('articles', ({ data }) => !data.draft);
  const works = await getCollection('works');
  const notes = await getCollection('notes');

  const index = [
    ...articles.map((a) => ({
      type: '文章',
      title: a.data.title,
      url: `/writing/${a.id}`,
      summary: a.data.summary,
      tags: a.data.tags,
      date: a.data.date.toISOString().slice(0, 10),
    })),
    ...works.map((w) => ({
      type: '作品',
      title: w.data.title,
      url: `/works/${w.id}`,
      summary: w.data.summary,
      tags: w.data.tags,
      date: String(w.data.year),
    })),
    ...notes.map((n) => ({
      type: '思考',
      title: (n.body || '').replace(/\s+/g, ' ').slice(0, 40) || '一条思考',
      url: '/notes',
      summary: (n.body || '').replace(/\s+/g, ' ').slice(0, 80),
      tags: n.data.tags,
      date: n.data.date.toISOString().slice(0, 10),
    })),
  ];

  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
};
