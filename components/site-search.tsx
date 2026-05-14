"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import Fuse, { type IFuseOptions } from "fuse.js";
import { Search, X } from "lucide-react";
import { products, type Product } from "@/data/products";
import { formatPriceVND } from "@/lib/utils";

const fuseOptions: IFuseOptions<Product> = {
  keys: [
    { name: "name", weight: 0.5 },
    { name: "subtitle", weight: 0.25 },
    { name: "tags", weight: 0.15 },
    { name: "shortDesc", weight: 0.1 },
  ],
  threshold: 0.4,
  ignoreLocation: true,
  includeScore: false,
};

const MAX_RESULTS = 6;

export function SiteSearch(): React.ReactElement {
  const [query, setQuery] = React.useState<string>("");
  const [openOverlay, setOpenOverlay] = React.useState<boolean>(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const fuse = React.useMemo(
    () => new Fuse<Product>(products as Product[], fuseOptions),
    [],
  );

  const trimmed = query.trim();
  const results = React.useMemo(() => {
    if (trimmed.length < 2) return [] as Product[];
    return fuse
      .search(trimmed)
      .slice(0, MAX_RESULTS)
      .map((r) => r.item);
  }, [trimmed, fuse]);

  React.useEffect(() => {
    if (openOverlay) {
      window.setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [openOverlay]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape" && openOverlay) {
        setOpenOverlay(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openOverlay]);

  const closeOverlay = (): void => {
    setOpenOverlay(false);
    setQuery("");
  };

  return (
    <>
      {/* Mobile + desktop trigger button (icon only) */}
      <button
        type="button"
        onClick={() => setOpenOverlay(true)}
        aria-label="Tìm sản phẩm"
        className="inline-flex h-10 w-10 items-center justify-center rounded-md text-brand-700 hover:bg-brand-50"
      >
        <Search className="h-5 w-5" />
      </button>

      {/* Full-screen overlay (mobile + desktop) */}
      {openOverlay ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Tìm kiếm sản phẩm"
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm p-4 pt-[10vh] sm:pt-[15vh]"
          onClick={closeOverlay}
        >
          <div
            className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-brand-100 px-4 py-3">
              <Search className="h-5 w-5 text-brand-500 shrink-0" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm tên sản phẩm, ví dụ: kem chống nắng, vitamin C…"
                className="flex-1 bg-transparent text-base outline-none placeholder:text-ink-muted text-ink"
                aria-label="Từ khoá tìm kiếm"
                autoComplete="off"
              />
              <button
                type="button"
                onClick={closeOverlay}
                aria-label="Đóng tìm kiếm"
                className="rounded-md p-1.5 text-ink-muted hover:bg-brand-50 hover:text-brand-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {trimmed.length < 2 ? (
                <p className="px-5 py-8 text-center text-sm text-ink-muted">
                  Gõ ít nhất 2 ký tự để tìm sản phẩm.
                </p>
              ) : results.length === 0 ? (
                <div className="px-5 py-8 text-center">
                  <p className="text-sm text-ink-muted">
                    Không tìm thấy &ldquo;{trimmed}&rdquo;.
                  </p>
                  <Link
                    href="/san-pham"
                    onClick={closeOverlay}
                    className="mt-3 inline-block text-sm font-medium text-brand-700 hover:text-warm-red"
                  >
                    Xem tất cả sản phẩm →
                  </Link>
                </div>
              ) : (
                <ul className="py-2">
                  {results.map((p) => {
                    const img = p.images[0];
                    return (
                      <li key={p.slug}>
                        <Link
                          href={`/san-pham/${p.slug}`}
                          onClick={closeOverlay}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-brand-50"
                        >
                          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-brand-50">
                            {img ? (
                              <Image
                                src={img}
                                alt=""
                                fill
                                sizes="48px"
                                quality={60}
                                className="object-cover"
                              />
                            ) : null}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-brand-900">
                              {p.name}
                            </p>
                            <p className="truncate text-xs text-ink-muted">
                              {p.subtitle}
                            </p>
                          </div>
                          {p.price !== null ? (
                            <p className="shrink-0 text-sm font-semibold text-warm-red">
                              {formatPriceVND(p.price)}
                            </p>
                          ) : null}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
