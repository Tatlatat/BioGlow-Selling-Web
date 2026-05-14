"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
  tags: readonly string[];
};

export function BlogTagFilter({ tags }: Props): React.ReactElement | null {
  const searchParams = useSearchParams();
  const active = searchParams.get("tag")?.toLowerCase() ?? "";

  if (tags.length === 0) return null;

  return (
    <div className="mt-6 flex flex-wrap gap-2">
      <Link
        href="/blog"
        className={cn(
          "rounded-full border px-3 py-1 text-sm transition",
          active === ""
            ? "border-brand-700 bg-brand-700 text-white"
            : "border-brand-200 bg-white text-brand-700 hover:bg-brand-50",
        )}
      >
        Tất cả
      </Link>
      {tags.map((t) => {
        const isActive = active === t.toLowerCase();
        return (
          <Link
            key={t}
            href={`/blog?tag=${encodeURIComponent(t)}`}
            className={cn(
              "rounded-full border px-3 py-1 text-sm transition",
              isActive
                ? "border-brand-700 bg-brand-700 text-white"
                : "border-brand-200 bg-white text-brand-700 hover:bg-brand-50",
            )}
          >
            {t}
          </Link>
        );
      })}
    </div>
  );
}
