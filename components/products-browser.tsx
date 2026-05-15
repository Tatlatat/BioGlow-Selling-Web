"use client";

import * as React from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CategoryFilter } from "@/components/category-filter";
import { SymptomFilter } from "@/components/symptom-filter";
import { ProductCard } from "@/components/product-card";
import { categories, isCategorySlug, type CategorySlug } from "@/data/categories";
import { type Product } from "@/data/products";
import {
  countProductsBySymptom,
  filterProductsBySymptom,
  getSymptom,
  isSymptomSlug,
} from "@/lib/symptoms";

type Props = {
  products: readonly Product[];
};

function Inner({ products }: Props): React.ReactElement {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("nhom");
  const symptomParam = searchParams.get("symptom");

  const selectedCategory: CategorySlug | null =
    categoryParam && isCategorySlug(categoryParam) ? categoryParam : null;
  const selectedSymptom = symptomParam && isSymptomSlug(symptomParam)
    ? symptomParam
    : null;

  // Filter chain: category → symptom
  let visible: Product[] = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : [...products];
  if (selectedSymptom) {
    visible = filterProductsBySymptom(visible, selectedSymptom);
  }

  // Counts cho symptom filter — trên scope đã lọc theo category (nếu có)
  const symptomCounts = React.useMemo(() => {
    const scope = selectedCategory
      ? products.filter((p) => p.category === selectedCategory)
      : products;
    return countProductsBySymptom(scope);
  }, [products, selectedCategory]);

  let headerTitle = "Tất cả sản phẩm";
  if (selectedCategory) {
    headerTitle =
      categories.find((c) => c.slug === selectedCategory)?.name ?? "Sản phẩm";
  }
  if (selectedSymptom) {
    const s = getSymptom(selectedSymptom);
    headerTitle = selectedCategory
      ? `${headerTitle} cho ${s.label.toLowerCase()}`
      : s.label;
  }

  return (
    <>
      <section className="bg-brand-50 border-b border-brand-100">
        <div className="container-tight py-10">
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-brand-900">
            {headerTitle}
          </h1>
          <p className="mt-2 text-ink-muted max-w-2xl">
            {visible.length > 0
              ? `${visible.length} sản phẩm — sản xuất tại Việt Nam, đạt chuẩn GMP/ISO.`
              : "Hiện chưa có SP phù hợp với bộ lọc — thử bỏ một bộ lọc."}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-tight space-y-6">
          <CategoryFilter basePath="/san-pham" />
          <SymptomFilter counts={symptomCounts} />

          {visible.length === 0 ? (
            <p className="rounded-lg bg-brand-50 p-6 text-center text-ink-muted">
              Hiện chưa có sản phẩm phù hợp. Vui lòng thử nhóm/nhu cầu khác hoặc{" "}
              <a
                href="/san-pham"
                className="font-medium text-brand-700 hover:text-warm-red"
              >
                xem tất cả →
              </a>
            </p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
