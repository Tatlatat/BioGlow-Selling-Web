"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { categories, isCategorySlug, type CategorySlug } from "@/data/categories";
import { cn } from "@/lib/utils";

type Props = {
  basePath: string;
};

const ALL_KEY = "all";

export function CategoryFilter({ basePath }: Props): React.ReactElement {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get("nhom");
  const activeKey: CategorySlug | typeof ALL_KEY =
    active && isCategorySlug(active) ? active : ALL_KEY;

  const buildHref = (key: CategorySlug | typeof ALL_KEY): string => {
    if (key === ALL_KEY) return basePath;
    return `${basePath}?nhom=${key}`;
  };

  const items: ReadonlyArray<{ key: CategorySlug | typeof ALL_KEY; label: string }> = [
    { key: ALL_KEY, label: "Tất cả" },
    ...categories.map((c) => ({ key: c.slug, label: c.shortName })),
  ];

  return (
    <nav
      aria-label="Lọc theo nhóm sản phẩm"
      className="flex flex-wrap gap-2"
      data-pathname={pathname}
    >
      {items.map((item) => {
        const isActive = item.key === activeKey;
        return (
          <Link
            key={item.key}
            href={buildHref(item.key)}
            scroll={false}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition",
              isActive
                ? "border-brand-600 bg-brand-600 text-white"
                : "border-brand-200 bg-white text-brand-700 hover:bg-brand-50"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
