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
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;

type OrderInput = {
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
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const ip = getClientIp(req);
  const limit = rateLimit(`order:${ip}`, RATE_LIMIT, RATE_WINDOW_MS);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "rate_limited" },
      {
        status: 429,
        headers: { "retry-after": String(limit.retryAfterSec) },
      },
    );
  }

  if (!TG_BOT_TOKEN || !TG_CHAT_ID) {
    return NextResponse.json({ error: "missing_config" }, { status: 500 });
  }

  let body: OrderInput;
  try {
    body = (await req.json()) as OrderInput;
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  // Spam trap — if the honeypot field is filled, silently succeed.
  if (body.honeypot && body.honeypot.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = body.customerName?.trim();
  const phone = body.phone?.trim();
  const address = body.address?.trim();
  if (!name || !phone || !address) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  const phoneDigits = phone.replace(/\D/g, "");
  if (phoneDigits.length < 9 || phoneDigits.length > 11) {
    return NextResponse.json({ error: "invalid_phone" }, { status: 400 });
  }
  if (name.length > 100 || address.length > 500 || (body.note?.length ?? 0) > 500) {
    return NextResponse.json({ error: "too_long" }, { status: 400 });
  }

  const productSlug = body.productSlug?.trim();
  if (!productSlug) {
    return NextResponse.json({ error: "missing_product" }, { status: 400 });
  }
  const product = getProductBySlug(productSlug);
  if (!product) {
    return NextResponse.json({ error: "unknown_product" }, { status: 400 });
  }
  const productName = product.name;

  const qtyRaw = Number(body.qty);
  const qty = Number.isFinite(qtyRaw) && qtyRaw > 0 ? Math.min(Math.floor(qtyRaw), MAX_QTY) : 1;

  const safeName = sanitizeLine(name, 100);
  const safePhone = sanitizeLine(phone, 20);
  const safeAddress = sanitizeLine(address, 500);
  const safeNote = body.note ? sanitizeLine(body.note, 500) : "";
  const safeRefCode = body.refCode ? sanitizeLine(body.refCode, 64) : "";

  const text = [
    "🔔 ĐƠN HÀNG MỚI — BioGlowVN",
    "",
    `📦 Sản phẩm: ${productName} × ${qty}`,
    `🔖 Mã SP: ${product.slug}`,
    safeRefCode ? `🆔 Mã đơn: ${safeRefCode}` : null,
    "",
    `👤 Họ tên: ${safeName}`,
    `📱 SĐT: ${safePhone}`,
    `📍 Địa chỉ: ${safeAddress}`,
    safeNote ? `📝 Ghi chú: ${safeNote}` : null,
    "",
    `🕐 ${new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}`,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

  const tgRes = await fetch(
    `https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chat_id: TG_CHAT_ID,
        text,
        disable_web_page_preview: true,
      }),
    },
  );

  if (!tgRes.ok) {
    const errText = await tgRes.text().catch(() => "");
    console.error("Telegram error:", tgRes.status, errText);
    return NextResponse.json({ error: "telegram_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
