import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatPriceVND(value: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
}

// Zalo's deeplink (zalo.me/PHONE) ignores query parameters — unlike
// WhatsApp's wa.me/?text=. So the link only opens a chat; the order
// message has to be copied to clipboard for the customer to paste.
export function buildZaloOrderLink(phone: string): string {
  return `https://zalo.me/${phone.replace(/\D/g, "")}`;
}

export type ZaloOrderMessageOptions = {
  productName: string;
  productSlug?: string;
  qty?: number;
  refCode?: string;
};

export function buildZaloOrderMessage(
  options: ZaloOrderMessageOptions,
): string {
  const qty = options.qty && options.qty > 0 ? options.qty : 1;
  const lines: string[] = [
    "Xin chào BioGlowVN,",
    `Tôi muốn đặt sản phẩm: ${options.productName} × ${qty}`,
  ];
  if (options.productSlug) lines.push(`Mã SP: ${options.productSlug}`);
  lines.push("", "Họ tên: ", "Số điện thoại: ", "Địa chỉ giao hàng: ");
  if (options.refCode) {
    lines.push("", `(Mã tham chiếu: ${options.refCode})`);
  }
  return lines.join("\n");
}

export function buildOrderRefCode(slug: string): string {
  const d = new Date();
  const yyyymmdd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  const slugPart = (hash & 0xff).toString(16).toUpperCase().padStart(2, "0");
  const rnd = Math.floor(Math.random() * 0xfff)
    .toString(16)
    .toUpperCase()
    .padStart(3, "0");
  return `BG-${yyyymmdd}-${slugPart}${rnd}`;
}

export function buildTelLink(phone: string): string {
  return `tel:${phone.replace(/\s+/g, "")}`;
}
