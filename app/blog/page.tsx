import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Cẩm nang sức khoẻ và làm đẹp",
  description:
    "Các bài viết về sức khoẻ, làm đẹp và chăm sóc cơ thể từ BioGlowVN — chia sẻ kiến thức hữu ích, thực tế và dễ áp dụng.",
};

const coverColorMap = {
  leaf: "bg-leaf-50",
  warm: "bg-warm-red/10",
  gold: "bg-gold/10",
  brand: "bg-brand-50",
} as const;

export default function BlogIndexPage(): React.ReactElement {
  return (
    <div>
      <section className="bg-brand-50 border-b border-brand-100">
        <div className="container-tight py-12">
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-brand-900">
            Cẩm nang sức khoẻ và làm đẹp
          </h1>
          <p className="mt-2 text-ink-muted max-w-2xl">
            Kiến thức và lời khuyên thiết thực cho cuộc sống khoẻ mạnh và rạng rỡ.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-tight">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl border border-brand-100 bg-white shadow-card transition hover:-translate-y-0.5 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
              >
                <div
                  className={cn(
                    "aspect-[16/9] w-full",
                    coverColorMap[post.coverColor]
                  )}
                />
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <p className="text-xs text-ink-muted flex items-center gap-3">
                    <span>{formatDate(post.date)}</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {post.readingMinutes} phút đọc
                    </span>
                  </p>
                  <h2 className="font-serif text-xl font-semibold text-brand-900 group-hover:text-warm-red">
                    {post.title}
                  </h2>
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
