import { NextResponse } from "next/server";

const TG_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TG_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

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
  const productName = body.productName?.trim();
  const qty = Number(body.qty) > 0 ? Number(body.qty) : 1;

  if (!name || !phone || !address || !productName) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  const phoneDigits = phone.replace(/\D/g, "");
  if (phoneDigits.length < 9 || phoneDigits.length > 11) {
    return NextResponse.json({ error: "invalid_phone" }, { status: 400 });
  }
  if (name.length > 100 || address.length > 500 || (body.note?.length ?? 0) > 500) {
    return NextResponse.json({ error: "too_long" }, { status: 400 });
  }

  const text = [
    "🔔 ĐƠN HÀNG MỚI — BioGlowVN",
    "",
    `📦 Sản phẩm: ${productName} × ${qty}`,
    body.productSlug ? `🔖 Mã SP: ${body.productSlug}` : null,
    body.refCode ? `🆔 Mã đơn: ${body.refCode}` : null,
    "",
    `👤 Họ tên: ${name}`,
    `📱 SĐT: ${phone}`,
    `📍 Địa chỉ: ${address}`,
    body.note?.trim() ? `📝 Ghi chú: ${body.note.trim()}` : null,
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
