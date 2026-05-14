import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type BlogPostStatus = "published" | "draft";
export type BlogCoverColor = "leaf" | "warm" | "gold" | "brand";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  /** Định dạng YYYY-MM-DD. */
  date: string;
  /** YYYY-MM-DD nếu khác `date` — dùng cho `dateModified` schema. */
  updated?: string;
  readingMinutes: number;
  /** Đường dẫn ảnh hero (vd `/blog/<slug>/hero.jpg`). Có ảnh thì ưu tiên hero, không thì rơi về coverColor. */
  hero?: string;
  /** Màu cover fallback khi không có hero. */
  coverColor?: BlogCoverColor;
  author?: string;
  keywords?: string[];
  tags?: string[];
  status: BlogPostStatus;
  content: string;
};

type FrontMatter = {
  title?: string;
  excerpt?: string;
  date?: string;
  updated?: string;
  readingMinutes?: number;
  hero?: string;
  coverColor?: BlogCoverColor;
  author?: string;
  keywords?: string[];
  tags?: string[];
  status?: BlogPostStatus;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function readPostFile(filePath: string, slug: string): BlogPost {
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  const data = parsed.data as FrontMatter;
  const content = parsed.content.trim();

  if (!data.title || !data.excerpt || !data.date) {
    throw new Error(
      `Bài blog "${slug}" thiếu trường bắt buộc trong frontmatter (title/excerpt/date).`,
    );
  }

  const readingMinutes =
    data.readingMinutes ?? Math.max(1, Math.round(content.split(/\s+/).length / 200));

  return {
    slug,
    title: data.title,
    excerpt: data.excerpt,
    date: data.date,
    updated: data.updated,
    readingMinutes,
    hero: data.hero,
    coverColor: data.coverColor ?? (data.hero ? undefined : "brand"),
    author: data.author,
    keywords: data.keywords,
    tags: data.tags,
    status: data.status ?? "published",
    content,
  };
}

function listSlugFiles(): Array<{ slug: string; filePath: string }> {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isFile() &&
        entry.name.endsWith(".md") &&
        !entry.name.startsWith("_") &&
        !entry.name.startsWith("."),
    )
    .map((entry) => ({
      slug: entry.name.replace(/\.md$/, ""),
      filePath: path.join(BLOG_DIR, entry.name),
    }));
}

function compareDateDesc(a: BlogPost, b: BlogPost): number {
  if (a.date === b.date) return a.slug.localeCompare(b.slug);
  return a.date < b.date ? 1 : -1;
}

export function getAllPosts(options?: { includeDrafts?: boolean }): BlogPost[] {
  const includeDrafts = options?.includeDrafts ?? false;
  const posts = listSlugFiles().map(({ slug, filePath }) =>
    readPostFile(filePath, slug),
  );
  return posts
    .filter((p) => includeDrafts || p.status === "published")
    .sort(compareDateDesc);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return undefined;
  try {
    return readPostFile(filePath, slug);
  } catch (err) {
    console.error(`getPostBySlug error for "${slug}":`, err);
    return undefined;
  }
}

export function getPostSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export function getAllTags(): string[] {
  const set = new Set<string>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags ?? []) set.add(tag);
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b, "vi"));
}
