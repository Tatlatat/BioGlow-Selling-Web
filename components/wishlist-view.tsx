"use client";

import * as React from "react";
import Link from "next/link";
import { Heart, Trash2 } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { ZaloIcon } from "@/components/zalo-icon";
import { products, type Product } from "@/data/products";
import { siteConfig } from "@/data/site-config";
import {
  clearWishlist,
  getWishlist,
  subscribeWishlist,
} from "@/lib/wishlist";
import { buildZaloOrderLink } from "@/lib/utils";

export function WishlistView(): React.ReactElement {
  const [mounted, setMounted] = React.useState<boolean>(false);
  const [items, setItems] = React.useState<Product[]>([]);

  const refresh = React.useCallback(() => {
    const slugs = getWishlist().map((e) => e.slug);
    const map = new Map(products.map((p) => [p.slug, p]));
    setItems(slugs.map((s) => map.get(s)).filter((p): p is Product => Boolean(p)));
  }, []);

  React.useEffect(() => {
    setMounted(true);
    refresh();
    return subscribeWishlist(refresh);
  }, [refresh]);

  if (!mounted) {
    return (
      <div className="rounded-xl bg-brand-50 p-12 text-center text-ink-muted">
        Đang tải danh sách yêu thích…
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-brand-100 bg-white p-12 text-center">
        <Heart className="mx-auto h-12 w-12 text-brand-200" strokeWidth={1.5} />
        <h2 className="mt-4 font-serif text-xl font-semibold text-brand-900">
          Chưa có sản phẩm nào
        </h2>
        <p className="mt-2 text-ink-muted">
          Bấm icon ♡ trên sản phẩm bất kỳ để lưu vào đây.
        </p>
        <Button asChild className="mt-6">
          <Link href="/san-pham">Khám phá sản phẩm</Link>
        </Button>
      </div>
    );
  }

  const primaryPhone = siteConfig.contact.phones[0];
  const zaloUrl = buildZaloOrderLink(primaryPhone.tel);

  const handleClearAll = (): void => {
    if (typeof window !== "undefined" && window.confirm("Xoá tất cả sản phẩm yêu thích?")) {
      clearWishlist();
    }
  };

  return (
    <div className="space-y-6">
      {/* Action bar */}
      <div className="flex flex-col gap-3 rounded-xl border border-brand-100 bg-brand-50 p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink">
          <strong className="text-brand-900">{items.length}</strong> sản phẩm đã lưu
        </p>
        <div className="flex flex-wrap gap-2">
          <Button variant="warm" size="sm" asChild>
            <a href={zaloUrl} target="_blank" rel="noopener noreferrer">
              <ZaloIcon className="h-4 w-4" />
              Hỏi tư vấn combo qua Zalo
            </a>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearAll}
            className="text-warm-red border-warm-red/40 hover:bg-warm-red/5"
          >
            <Trash2 className="h-4 w-4" />
            Xoá tất cả
          </Button>
        </div>
      </div>

      {/* Hint với danh sách tên SP để khách copy nếu cần */}
      <details className="rounded-xl border border-brand-100 bg-white p-4">
        <summary className="cursor-pointer text-sm font-medium text-brand-700">
          📋 Xem nhanh danh sách (copy gửi Zalo)
        </summary>
        <ul className="mt-3 space-y-1 text-sm text-ink">
          {items.map((p, i) => (
            <li key={p.slug}>
              {i + 1}. {p.name}
              {p.subtitle ? ` — ${p.subtitle}` : null}
            </li>
          ))}
        </ul>
      </details>

      {/* Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
