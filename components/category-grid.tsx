import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CategoryIcon } from "@/components/category-icon";
import { categories } from "@/data/categories";
import { countByCategory } from "@/data/products";
import { cn } from "@/lib/utils";

export function CategoryGrid(): React.ReactElement {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/nhom/${category.slug}`}
          className={cn(
            "group relative flex flex-col gap-3 rounded-xl border border-brand-100 bg-gradient-to-br p-6 transition hover:-translate-y-0.5 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600",
            category.gradient
          )}
        >
          <div className="flex items-start justify-between">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-700 shadow-card">
              <CategoryIcon name={category.iconName} className="h-6 w-6" />
            </div>
            <ArrowUpRight className="h-5 w-5 text-brand-600 opacity-60 group-hover:opacity-100 transition" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-brand-900">{category.name}</h3>
            <p className="mt-1 text-sm text-ink-muted">{category.audience}</p>
          </div>

          <p className="text-sm text-ink line-clamp-2">{category.description}</p>

          <span className="mt-auto text-xs font-medium text-brand-700">
            {countByCategory(category.slug)} sản phẩm
          </span>
        </Link>
      ))}
    </div>
  );
}
