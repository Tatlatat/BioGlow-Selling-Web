"use client";

import { useEffect, useState } from "react";
import { Minus, Phone, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ZaloIcon } from "@/components/zalo-icon";
import { OrderFormModal } from "@/components/order-form-modal";
import { WishlistButton } from "@/components/wishlist-button";
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
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setRefCode(buildOrderRefCode(productSlug));
  }, [productSlug]);

  const primaryPhone = siteConfig.contact.phones[0];
  const telUrl = buildTelLink(primaryPhone.tel);
  const zaloUrl = buildZaloOrderLink(primaryPhone.tel);

  const decrease = (): void => setQty((q) => Math.max(MIN_QTY, q - 1));
  const increase = (): void => setQty((q) => Math.min(MAX_QTY, q + 1));
  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => setModalOpen(false);

  return (
    <>
      {/* Inline qty stepper + CTA block */}
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

        {/* Inline xl CTAs chỉ hiển thị trên desktop — mobile dùng sticky bottom bar bên dưới để tránh duplicate */}
        <div className="hidden lg:flex flex-col sm:flex-row gap-3">
          <Button variant="warm" size="xl" onClick={openModal}>
            <ShoppingBag className="h-5 w-5" />
            Đặt mua ngay
          </Button>
          <Button variant="outline" size="xl" asChild>
            <a href={telUrl}>
              <Phone className="h-5 w-5" />
              Gọi {primaryPhone.display}
            </a>
          </Button>
        </div>

        <WishlistButton slug={productSlug} variant="pdp" className="self-start" />

        <a
          href={zaloUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-brand-700 hover:text-brand-900 self-start"
        >
          <ZaloIcon className="h-4 w-4" />
          Tư vấn thêm qua Zalo trước khi đặt
        </a>
      </div>

      {/* Sticky bottom bar on mobile only — bg fully opaque để tránh content scroll qua bị nhìn xuyên */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-100 bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.06)] lg:hidden"
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

          <button
            type="button"
            onClick={openModal}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-warm-red px-3 py-3 text-sm font-semibold text-white shadow-sm active:scale-[0.98]"
          >
            <ShoppingBag className="h-5 w-5" />
            Đặt mua ngay
          </button>
          <a
            href={telUrl}
            aria-label={`Gọi ${primaryPhone.display}`}
            className="flex w-12 items-center justify-center rounded-lg border border-brand-300 text-brand-700"
          >
            <Phone className="h-5 w-5" />
          </a>
        </div>
      </div>

      <OrderFormModal
        open={modalOpen}
        onClose={closeModal}
        productName={productName}
        productSlug={productSlug}
        productPrice={productPrice}
        qty={qty}
        refCode={refCode}
      />
    </>
  );
}
