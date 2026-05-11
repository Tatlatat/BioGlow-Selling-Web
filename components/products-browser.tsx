"use client";

import * as React from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CategoryFilter } from "@/components/category-filter";
import { ProductCard } from "@/components/product-card";
import { categories, isCategorySlug, type CategorySlug } from "@/data/categories";
import { type Product } from "@/data/products";

type Props = {
  products: readonly Product[];
};

function Inner({ products }: Props): React.ReactElement {
  const searchParams = useSearchParams();
  const param = searchParams.get("nhom");
  const selected: CategorySlug | null =
    param && isCategorySlug(param) ? param : null;

  const visible = selected
    ? products.filter((p) => p.category === selected)
    : products;
  const headerTitle = selected
    ? categories.find((c) => c.slug === selected)?.name ?? "Sản phẩm"
    : "Tất cả sản phẩm";

  return (
    <>
      <section className="bg-brand-50 border-b border-brand-100">
        <div className="container-tight py-10">
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-brand-900">
            {headerTitle}
          </h1>
          <p className="mt-2 text-ink-muted max-w-2xl">
            Tổng cộng {visible.length} sản phẩm — sản xuất tại Việt Nam, đạt chuẩn GMP/ISO.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-tight">
          <CategoryFilter basePath="/san-pham" />

          {visible.length === 0 ? (
            <p className="mt-10 rounded-lg bg-brand-50 p-6 text-center text-ink-muted">
              Hiện chưa có sản phẩm trong nhóm này. Vui lòng quay lại sau.
            </p>
          ) : (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visible.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export function ProductsBrowser({ products }: Props): React.ReactElement {
  return (
    <Suspense fallback={null}>
      <Inner products={products} />
    </Suspense>
  );
}
