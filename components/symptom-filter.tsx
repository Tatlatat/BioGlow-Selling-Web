"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { SYMPTOMS, type SymptomSlug, getSymptom } from "@/lib/symptoms";
import { cn } from "@/lib/utils";

type Props = {
  /** Số SP mỗi symptom (đếm sẵn server-side). Hiển thị badge bên cạnh chip. */
  counts: Readonly<Record<SymptomSlug, number>>;
};

export function SymptomFilter({ counts }: Props): React.ReactElement {
  const searchParams = useSearchParams();
  const active = searchParams.get("symptom")?.toLowerCase() ?? "";
  const activeSymptom = active ? getSymptom(active as SymptomSlug) : null;

  // Mặc định mở khi có filter active (để user thấy mình đang lọc gì), đóng khi chưa lọc.
  const [open, setOpen] = React.useState<boolean>(Boolean(activeSymptom));

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
    <div className="rounded-xl border border-brand-100 bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="symptom-filter-panel"
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xs font-medium uppercase tracking-wide text-ink-muted">
            Tìm theo nhu cầu
          </span>
          {activeSymptom ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-700 px-2.5 py-0.5 text-xs font-medium text-white">
              <span aria-hidden="true">{activeSymptom.hint}</span>
              {activeSymptom.label}
            </span>
          ) : null}
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 flex-shrink-0 text-ink-muted transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open ? (
        <div
          id="symptom-filter-panel"
          className="flex flex-wrap gap-2 border-t border-brand-100 px-4 py-3"
        >
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
      ) : null}
    </div>
  );
}
