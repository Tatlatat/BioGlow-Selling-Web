"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SYMPTOMS, type SymptomSlug } from "@/lib/symptoms";
import { cn } from "@/lib/utils";

type Props = {
  /** Số SP mỗi symptom (đếm sẵn server-side). Hiển thị badge bên cạnh chip. */
  counts: Readonly<Record<SymptomSlug, number>>;
};

export function SymptomFilter({ counts }: Props): React.ReactElement {
  const searchParams = useSearchParams();
  const active = searchParams.get("symptom")?.toLowerCase() ?? "";

  const buildHref = (slug: SymptomSlug | null): string => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) {
      params.set("symptom", slug);
    } else {
      params.delete("symptom");
    }
    const qs = params.toString();
    return qs ? `/san-pham?${qs}` : "/san-pham";
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-medium uppercase tracking-wide text-ink-muted">
        Tìm theo nhu cầu
      </p>
      <div className="flex flex-wrap gap-2">
        <Link
          href={buildHref(null)}
          className={cn(
            "rounded-full border px-3.5 py-1.5 text-sm transition",
            active === ""
              ? "border-brand-700 bg-brand-700 text-white shadow-sm"
              : "border-brand-200 bg-white text-brand-700 hover:bg-brand-50",
          )}
        >
          Tất cả
        </Link>
        {SYMPTOMS.map((s) => {
          const isActive = active === s.slug;
          const count = counts[s.slug] ?? 0;
          return (
            <Link
              key={s.slug}
              href={buildHref(s.slug)}
              title={s.description}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm transition",
                isActive
                  ? "border-brand-700 bg-brand-700 text-white shadow-sm"
                  : "border-brand-200 bg-white text-brand-700 hover:bg-brand-50",
                count === 0 && !isActive && "opacity-50",
              )}
            >
              <span aria-hidden="true">{s.hint}</span>
              <span>{s.label}</span>
              <span
                className={cn(
                  "rounded-full px-1.5 text-[11px] font-semibold",
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-brand-50 text-brand-700",
                )}
              >
                {count}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
