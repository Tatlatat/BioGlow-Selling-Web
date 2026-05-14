import { NextResponse } from "next/server";

const TG_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TG_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

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

  const phoneDigits = phone.replace(/\D/g, "");
  const phoneValid =
    phoneDigits.length >= 9 && phoneDigits.length <= 11 ? phone : `${phone} (chưa đủ số)`;

  const text = [
    "⚠️ KHÁCH BỎ DỞ ĐƠN — BioGlowVN",
    "",
    body.productName ? `📦 Sản phẩm đang xem: ${body.productName} × ${body.qty ?? 1}` : null,
    body.productSlug ? `🔖 Mã SP: ${body.productSlug}` : null,
    body.refCode ? `🆔 Mã tham chiếu: ${body.refCode}` : null,
    "",
    name ? `👤 Họ tên: ${name}` : "👤 Họ tên: (chưa điền)",
    phone ? `📱 SĐT: ${phoneValid}` : "📱 SĐT: (chưa điền)",
    address ? `📍 Địa chỉ: ${address}` : null,
    note ? `📝 Ghi chú: ${note}` : null,
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
