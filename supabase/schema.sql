-- 个人博客社交功能表结构
-- 在 Supabase SQL Editor 中执行，然后开启 RLS 并添加匿名插入/查询策略

-- 点赞表：每一行代表一次点赞（匿名，按浏览器 localStorage 去重）
CREATE TABLE IF NOT EXISTS likes (
  id BIGSERIAL PRIMARY KEY,
  content_type TEXT NOT NULL CHECK (content_type IN ('writing', 'notes')),
  content_id TEXT NOT NULL,
  title TEXT,
  url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 转发表：记录每次转发生成的唯一码
CREATE TABLE IF NOT EXISTS reposts (
  id BIGSERIAL PRIMARY KEY,
  content_type TEXT NOT NULL CHECK (content_type IN ('writing', 'notes')),
  content_id TEXT NOT NULL,
  title TEXT,
  url TEXT,
  code TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_likes_content ON likes (content_type, content_id);
CREATE INDEX IF NOT EXISTS idx_reposts_content ON reposts (content_type, content_id);
CREATE INDEX IF NOT EXISTS idx_reposts_code ON reposts (code);

-- RLS 策略：允许匿名用户读取和插入（不开启身份认证的个人博客场景）
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE reposts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS allow_anon_select_likes ON likes;
CREATE POLICY allow_anon_select_likes ON likes
  FOR SELECT USING (true);

DROP POLICY IF EXISTS allow_anon_insert_likes ON likes;
CREATE POLICY allow_anon_insert_likes ON likes
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS allow_anon_select_reposts ON reposts;
CREATE POLICY allow_anon_select_reposts ON reposts
  FOR SELECT USING (true);

DROP POLICY IF EXISTS allow_anon_insert_reposts ON reposts;
CREATE POLICY allow_anon_insert_reposts ON reposts
  FOR INSERT WITH CHECK (true);
