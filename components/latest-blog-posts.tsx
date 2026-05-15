import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";
import { getAllPosts, type BlogPost } from "@/lib/blog";
import { cn } from "@/lib/utils";

const coverColorMap = {
  leaf: "bg-leaf-50",
  warm: "bg-warm-red/10",
  gold: "bg-gold/10",
  brand: "bg-brand-50",
} as const;

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/**
 * Hiển thị 3 bài blog mới nhất trên homepage để dẫn user vào /blog (SEO + trust).
 * Render = null nếu chưa có bài nào (tránh đụng layout khi blog rỗng).
 */
export function LatestBlogPosts(): React.ReactElement | null {
  const posts: BlogPost[] = getAllPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section className="section bg-white">
      <div className="container-tight">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2 className="section-heading">Cẩm nang nổi bật</h2>
            <p className="section-subheading">
              Kiến thức sức khoẻ và lối sống dành cho người Việt, cập nhật thường xuyên.
            </p>
          </div>
          <Link
            href="/blog"
            className="text-warm-red font-medium hover:underline whitespace-nowrap"
          >
            Tất cả bài viết →
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                <h3 className="font-serif text-xl font-semibold text-brand-900 group-hover:text-warm-red">
                  {post.title}
                </h3>
                <p className="text-sm text-ink-muted line-clamp-3">{post.excerpt}</p>
                <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-warm-red">
                  Đọc bài viết <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
