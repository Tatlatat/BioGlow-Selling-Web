"use client";

import { useEffect, useMemo, useState } from "react";
import { Minus, Phone, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ZaloIcon } from "@/components/zalo-icon";
import { siteConfig } from "@/data/site-config";
import {
  buildOrderRefCode,
  buildTelLink,
  buildZaloOrderLink,
  formatPriceVND,
} from "@/lib/utils";

type Props = {
  productName: string;
  productSlug: string;
  productPrice: number | null;
};

const MIN_QTY = 1;
const MAX_QTY = 10;

export function ProductOrderActions({
  productName,
  productSlug,
  productPrice,
}: Props): React.ReactElement {
  const [qty, setQty] = useState<number>(1);
  const [refCode, setRefCode] = useState<string | undefined>(undefined);

  useEffect(() => {
    setRefCode(buildOrderRefCode(productSlug));
  }, [productSlug]);

  const primaryPhone = siteConfig.contact.phones[0];
  const telUrl = buildTelLink(primaryPhone.tel);

  const zaloUrl = useMemo(
    () =>
      buildZaloOrderLink(primaryPhone.tel, {
        productName,
        productSlug,
        qty,
        refCode,
      }),
    [primaryPhone.tel, productName, productSlug, qty, refCode],
  );

  const decrease = (): void => setQty((q) => Math.max(MIN_QTY, q - 1));
  const increase = (): void => setQty((q) => Math.min(MAX_QTY, q + 1));

  return (
    <>
      {/* Inline qty stepper + CTA block (shown on PDP body) */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="text-sm text-ink-muted">Số lượng:</span>
          <div className="inline-flex items-center rounded-lg border border-brand-200 bg-white">
            <button
              type="button"
              onClick={decrease}
              disabled={qty <= MIN_QTY}
              aria-label="Giảm số lượng"
              className="flex h-11 w-11 items-center justify-center text-brand-700 disabled:text-ink-muted/50"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span
              className="min-w-[2.5rem] text-center text-lg font-semibold text-brand-900"
              aria-live="polite"
            >
              {qty}
            </span>
            <button
              type="button"
              onClick={increase}
              disabled={qty >= MAX_QTY}
              aria-label="Tăng số lượng"
              className="flex h-11 w-11 items-center justify-center text-brand-700 disabled:text-ink-muted/50"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="warm" size="xl" asChild>
            <a href={zaloUrl} target="_blank" rel="noopener noreferrer">
              <ZaloIcon className="h-5 w-5" />
              Đặt qua Zalo
            </a>
          </Button>
          <Button variant="outline" size="xl" asChild>
            <a href={telUrl}>
              <Phone className="h-5 w-5" />
              Gọi {primaryPhone.display}
            </a>
          </Button>
        </div>
      </div>

      {/* Sticky bottom bar on mobile only */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-100 bg-white/95 backdrop-blur shadow-[0_-4px_12px_rgba(0,0,0,0.06)] lg:hidden"
        role="region"
        aria-label="Đặt hàng nhanh"
      >
        <div className="flex items-stretch gap-2 px-3 py-2">
          {productPrice !== null ? (
            <div className="flex flex-col justify-center min-w-0 flex-shrink">
              <span className="text-[11px] uppercase tracking-wide text-ink-muted">
                {qty > 1 ? `${qty} hộp` : "Giá"}
              </span>
              <span className="truncate text-base font-bold text-warm-red">
                {formatPriceVND(productPrice * qty)}
              </span>
            </div>
          ) : null}

          <a
            href={zaloUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-warm-red px-3 py-3 text-sm font-semibold text-white shadow-sm active:scale-[0.98]"
          >
            <ZaloIcon className="h-5 w-5" />
            Đặt qua Zalo
          </a>
          <a
            href={telUrl}
            aria-label={`Gọi ${primaryPhone.display}`}
            className="flex w-12 items-center justify-center rounded-lg border border-brand-300 text-brand-700"
          >
            <Phone className="h-5 w-5" />
          </a>
        </div>
      </div>
    </>
  );
}
