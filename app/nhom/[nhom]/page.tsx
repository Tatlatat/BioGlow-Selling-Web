import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { CategoryIcon } from "@/components/category-icon";
import {
  categories,
  getCategory,
  isCategorySlug,
} from "@/data/categories";
import { getProductsByCategory } from "@/data/products";

type Params = Promise<{ nhom: string }>;

export function generateStaticParams(): Array<{ nhom: string }> {
  return categories.map((c) => ({ nhom: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { nhom } = await params;
  if (!isCategorySlug(nhom)) return { title: "Không tìm thấy nhóm" };
  const category = getCategory(nhom);
  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Params;
}): Promise<React.ReactElement> {
  const { nhom } = await params;
  if (!isCategorySlug(nhom)) notFound();

  const category = getCategory(nhom);
  const items = getProductsByCategory(category.slug);

  return (
    <div>
      <section className="bg-gradient-to-b from-brand-50 to-white border-b border-brand-100">
        <div className="container-tight py-12">
          <div className="flex items-start gap-4">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-brand-700 shadow-card">
              <CategoryIcon name={category.iconName} className="h-7 w-7" />
            </div>
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-brand-900">
                {category.name}
              </h1>
              <p className="mt-2 text-ink-muted max-w-2xl">{category.description}</p>
              <p className="mt-1 text-sm text-leaf-700 font-medium">{category.audience}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-tight">
          {items.length === 0 ? (
            <p className="rounded-lg bg-brand-50 p-6 text-center text-ink-muted">
              Hiện chưa có sản phẩm trong nhóm này. Vui lòng quay lại sau.{" "}
              <Link href="/san-pham" className="text-warm-red font-medium hover:underline">
                Xem tất cả sản phẩm →
              </Link>
            </p>
          ) : (
            <>
              <p className="mb-6 text-ink-muted">{items.length} sản phẩm</p>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
