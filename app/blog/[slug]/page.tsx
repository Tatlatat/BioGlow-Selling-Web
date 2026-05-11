import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ArrowLeft } from "lucide-react";
import { MarkdownContent } from "@/components/markdown-content";
import { ZaloCallButtons } from "@/components/zalo-call-buttons";
import { blogPosts, getBlogPost } from "@/data/blog";
import { cn } from "@/lib/utils";

type Params = Promise<{ slug: string }>;

export function generateStaticParams(): Array<{ slug: string }> {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Không tìm thấy bài viết" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

const coverColorMap = {
  leaf: "bg-leaf-50",
  warm: "bg-warm-red/10",
  gold: "bg-gold/10",
  brand: "bg-brand-50",
} as const;

export default async function BlogPostPage({
  params,
}: {
  params: Params;
}): Promise<React.ReactElement> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <article>
      <div className={cn("h-48 sm:h-64", coverColorMap[post.coverColor])} />

      <section className="section pt-10">
        <div className="container-tight max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-brand-700 hover:text-warm-red"
          >
            <ArrowLeft className="h-4 w-4" />
            Tất cả bài viết
          </Link>

          <h1 className="mt-5 font-serif text-3xl sm:text-4xl font-semibold text-brand-900 leading-tight">
            {post.title}
          </h1>
          <p className="mt-3 text-ink-muted flex items-center gap-3 text-sm">
            <span>{formatDate(post.date)}</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" /> {post.readingMinutes} phút đọc
            </span>
          </p>

          <p className="mt-6 text-lg text-ink-muted">{post.excerpt}</p>

          <div className="mt-10">
            <MarkdownContent source={post.content} />
          </div>

          <div className="mt-12 rounded-xl bg-brand-50 p-6 border border-brand-100">
            <h3 className="font-serif text-xl font-semibold text-brand-900">
              Quan tâm đến sản phẩm phù hợp?
            </h3>
            <p className="mt-2 text-ink-muted">
              Nhắn Zalo để được tư vấn miễn phí, không áp lực mua hàng.
            </p>
            <div className="mt-5">
              <ZaloCallButtons />
            </div>
          </div>
        </div>
      </section>
    </article>
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
