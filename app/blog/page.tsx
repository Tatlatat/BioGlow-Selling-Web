import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { BlogTagFilter } from "@/components/blog-tag-filter";
import { getAllPosts, getAllTags, type BlogPost } from "@/lib/blog";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Cẩm nang sức khoẻ và làm đẹp",
  description: `Cẩm nang sức khoẻ, làm đẹp và chăm sóc cơ thể từ ${siteConfig.name} — kiến thức hữu ích, thực tế, dễ áp dụng cho người Việt.`,
  keywords: [
    "cẩm nang sức khoẻ",
    "blog sức khoẻ",
    "chăm sóc da",
    "dinh dưỡng",
    "thực phẩm chức năng",
    "review TPCN",
    siteConfig.name,
  ],
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: `${siteConfig.url}/blog`,
    title: `Cẩm nang sức khoẻ và làm đẹp · ${siteConfig.name}`,
    description: `Cẩm nang sức khoẻ, làm đẹp từ ${siteConfig.name}.`,
    siteName: siteConfig.name,
  },
};

const coverColorMap = {
  leaf: "bg-leaf-50",
  warm: "bg-warm-red/10",
  gold: "bg-gold/10",
  brand: "bg-brand-50",
} as const;

type SearchParams = Promise<{ tag?: string }>;

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<React.ReactElement> {
  const { tag } = await searchParams;
  const allPosts = getAllPosts();
  const allTags = getAllTags();

  const tagLower = tag?.toLowerCase();
  const posts: BlogPost[] = tagLower
    ? allPosts.filter((p) =>
        (p.tags ?? []).some((t) => t.toLowerCase() === tagLower),
      )
    : allPosts;

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", url: "/" },
          { name: "Cẩm nang", url: "/blog" },
        ]}
      />
      <section className="bg-brand-50 border-b border-brand-100">
        <div className="container-tight py-12">
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-brand-900">
            Cẩm nang sức khoẻ và làm đẹp
          </h1>
          <p className="mt-2 text-ink-muted max-w-2xl">
            Kiến thức và lời khuyên thiết thực cho cuộc sống khoẻ mạnh và rạng rỡ.
          </p>
          <BlogTagFilter tags={allTags} />
        </div>
      </section>

      <section className="section">
        <div className="container-tight">
          {posts.length === 0 ? (
            <div className="rounded-xl border border-brand-100 bg-brand-50 px-6 py-12 text-center">
              <p className="text-ink-muted">
                Chưa có bài viết nào với chủ đề{" "}
                {tag ? <strong>&ldquo;{tag}&rdquo;</strong> : "này"}.
              </p>
              <Link
                href="/blog"
                className="mt-3 inline-block text-sm font-medium text-brand-700 hover:text-warm-red"
              >
                ← Xem tất cả bài viết
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-brand-100 bg-white shadow-card transition hover:-translate-y-0.5 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
                >
                  {post.hero ? (
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-brand-50">
                      <Image
                        src={post.hero}
                        alt={post.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        quality={70}
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div
                      className={cn(
                        "aspect-[16/9] w-full",
                        coverColorMap[post.coverColor ?? "brand"],
                      )}
                    />
                  )}
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <p className="text-xs text-ink-muted flex items-center gap-3 flex-wrap">
                      <span>{formatDate(post.date)}</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {post.readingMinutes} phút đọc
                      </span>
                    </p>
                    <h2 className="font-serif text-xl font-semibold text-brand-900 group-hover:text-warm-red">
                      {post.title}
                    </h2>
                    <p className="text-sm text-ink-muted line-clamp-3">{post.excerpt}</p>
                    {post.tags && post.tags.length > 0 ? (
                      <ul className="flex flex-wrap gap-1.5">
                        {post.tags.slice(0, 3).map((t) => (
                          <li
                            key={t}
                            className="rounded-full bg-brand-50 px-2 py-0.5 text-[11px] text-brand-700"
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-warm-red">
                      Đọc bài viết <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
