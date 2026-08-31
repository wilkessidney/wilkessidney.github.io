/** 日期与文本处理工具 */

/** 格式化为 2026 年 8 月 31 日 */
export function formatDate(date: Date): string {
  return `${date.getFullYear()} 年 ${date.getMonth() + 1} 月 ${date.getDate()} 日`;
}

/** 格式化为 2026-08-31 */
export function formatDateISO(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** 格式化为 08.31（归档与列表的短格式） */
export function formatDateShort(date: Date): string {
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${m}.${d}`;
}

/**
 * 估算中文阅读时长（分钟）
 * 中文按 400 字/分钟计，代码块与标点不计入
 */
export function calcReadingTime(body: string): number {
  const plain = body
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]*`/g, '')
    .replace(/[#*>_\-\[\]!()|]/g, '')
    .replace(/\s/g, '');
  const minutes = Math.round(plain.length / 400);
  return Math.max(1, minutes);
}

/** 把标签转成 URL 安全的片段 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^\p{Script=Han}\w\-]/gu, '')
    .replace(/-+/g, '-');
}

/** 按日期倒序排序（新在前） */
export function byDateDesc<
  T extends { data: { date: Date } },
>(items: T[]): T[] {
  return [...items].sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );
}

/** 取年份 */
export function yearOf(date: Date): number {
  return date.getFullYear();
}

/** 分组：把数组按 key 函数聚成 Map */
export function groupBy<T, K>(items: T[], keyFn: (item: T) => K): Map<K, T[]> {
  const map = new Map<K, T[]>();
  for (const item of items) {
    const key = keyFn(item);
    const bucket = map.get(key);
    if (bucket) bucket.push(item);
    else map.set(key, [item]);
  }
  return map;
}

/** 统计标签出现次数，返回按次数倒序的数组 */
export function countTags(items: { data: { tags?: string[] } }[]): {
  tag: string;
  count: number;
}[] {
  const counter = new Map<string, number>();
  for (const item of items) {
    for (const tag of item.data.tags ?? []) {
      counter.set(tag, (counter.get(tag) ?? 0) + 1);
    }
  }
  return [...counter.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, 'zh'));
}

/** 截断文本 */
export function truncate(text: string, length: number): string {
  return text.length > length ? `${text.slice(0, length)}…` : text;
}
