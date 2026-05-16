import { NextResponse } from "next/server";
import { getProductBySlug } from "@/data/products";
import {
  getClientIp,
  isSameOrigin,
  rateLimit,
  sanitizeLine,
} from "@/lib/api-guards";

const TG_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TG_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

const MAX_QTY = 99;
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60_000;

type LeadInput = {
  productName?: string;
  productSlug?: string;
  qty?: number;
  refCode?: string;
  customerName?: string;
  phone?: string;
  address?: string;
  note?: string;
  honeypot?: string;
};

export async function POST(req: Request): Promise<NextResponse> {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ ok: true });
  }

  const ip = getClientIp(req);
  const limit = rateLimit(`lead:${ip}`, RATE_LIMIT, RATE_WINDOW_MS);
  if (!limit.ok) {
    return NextResponse.json({ ok: true });
  }

  if (!TG_BOT_TOKEN || !TG_CHAT_ID) {
    return NextResponse.json({ ok: true });
  }

  let body: LeadInput;
  try {
    body = (await req.json()) as LeadInput;
  } catch {
    return NextResponse.json({ ok: true });
  }

  if (body.honeypot && body.honeypot.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = body.customerName?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const address = body.address?.trim() ?? "";
  const note = body.note?.trim() ?? "";

  if (!name && !phone) {
    return NextResponse.json({ ok: true });
  }

  if (name.length > 100 || address.length > 500 || note.length > 500) {
    return NextResponse.json({ ok: true });
  }

  const safeName = sanitizeLine(name, 100);
  const safePhone = sanitizeLine(phone, 20);
  const safeAddress = sanitizeLine(address, 500);
  const safeNote = sanitizeLine(note, 500);
  const safeRefCode = body.refCode ? sanitizeLine(body.refCode, 64) : "";

  const phoneDigits = safePhone.replace(/\D/g, "");
  const phoneValid =
    phoneDigits.length >= 9 && phoneDigits.length <= 11
      ? safePhone
      : `${safePhone} (chưa đủ số)`;

  const productSlug = body.productSlug?.trim();
  const product = productSlug ? getProductBySlug(productSlug) : undefined;
  const productName = product?.name;

  const qtyRaw = Number(body.qty);
  const qty =
    Number.isFinite(qtyRaw) && qtyRaw > 0
      ? Math.min(Math.floor(qtyRaw), MAX_QTY)
      : 1;

  const text = [
    "⚠️ KHÁCH BỎ DỞ ĐƠN — BioGlowVN",
    "",
    productName ? `📦 Sản phẩm đang xem: ${productName} × ${qty}` : null,
    product ? `🔖 Mã SP: ${product.slug}` : null,
    safeRefCode ? `🆔 Mã tham chiếu: ${safeRefCode}` : null,
    "",
    safeName ? `👤 Họ tên: ${safeName}` : "👤 Họ tên: (chưa điền)",
    safePhone ? `📱 SĐT: ${phoneValid}` : "📱 SĐT: (chưa điền)",
    safeAddress ? `📍 Địa chỉ: ${safeAddress}` : null,
    safeNote ? `📝 Ghi chú: ${safeNote}` : null,
    "",
    "👉 Gọi lại sớm trong 5 phút để chốt đơn.",
    `🕐 ${new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}`,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

  try {
    await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chat_id: TG_CHAT_ID,
        text,
        disable_web_page_preview: true,
      }),
    });
  } catch (err) {
    console.error("Lead recovery telegram error:", err);
  }

  return NextResponse.json({ ok: true });
}
