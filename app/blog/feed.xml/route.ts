import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/data/site-config";

export const dynamic = "force-static";
export const revalidate = 3600; // re-build feed mỗi giờ (sau khi anh add bài mới)

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function wrapCdata(value: string): string {
  // Đảm bảo nội dung không vô tình chứa "]]>" → kết thúc CDATA sớm
  return `<![CDATA[${value.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;
}

function rfc822(date: string): string {
  return new Date(date).toUTCString();
}

export async function GET(): Promise<Response> {
  const posts = getAllPosts();
  const base = siteConfig.url.replace(/\/$/, "");
  const feedUrl = `${base}/blog/feed.xml`;
  const lastBuild = posts[0]?.updated ?? posts[0]?.date ?? new Date().toISOString();

  const items = posts
    .map((post) => {
      const url = `${base}/blog/${post.slug}`;
      const pubDate = rfc822(post.date);
      const categories = (post.tags ?? [])
        .map((t) => `    <category>${escapeXml(t)}</category>`)
        .join("\n");
      return `  <item>
    <title>${escapeXml(post.title)}</title>
    <link>${url}</link>
    <guid isPermaLink="true">${url}</guid>
    <pubDate>${pubDate}</pubDate>
    <description>${escapeXml(post.excerpt)}</description>
    <content:encoded>${wrapCdata(post.content)}</content:encoded>
    <author>noreply@bioglow.io.vn (${escapeXml(post.author ?? siteConfig.name)})</author>
${categories}
  </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
<channel>
  <title>${escapeXml(`${siteConfig.name} — Cẩm nang sức khoẻ và làm đẹp`)}</title>
  <link>${base}/blog</link>
  <description>${escapeXml(`Cẩm nang sức khoẻ, làm đẹp và chăm sóc cơ thể từ ${siteConfig.name}.`)}</description>
  <language>vi-VN</language>
  <lastBuildDate>${rfc822(lastBuild)}</lastBuildDate>
  <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
  <generator>BioGlowVN custom RSS generator</generator>
${items}
</channel>
</rss>`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
