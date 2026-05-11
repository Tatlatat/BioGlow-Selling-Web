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

export function buildZaloOrderLink(phone: string, productName?: string): string {
  const base = `https://zalo.me/${phone.replace(/\D/g, "")}`;
  if (!productName) return base;
  const message = `Xin chào, tôi muốn được tư vấn về sản phẩm: ${productName}`;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function buildTelLink(phone: string): string {
  return `tel:${phone.replace(/\s+/g, "")}`;
}
