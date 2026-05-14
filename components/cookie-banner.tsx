"use client";

import * as React from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "bgvn-cookie-ack";

export function CookieBanner(): React.ReactElement | null {
  const [visible, setVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {
      return;
    }
    const t = window.setTimeout(() => setVisible(true), 1200);
    return () => window.clearTimeout(t);
  }, []);

  const dismiss = (): void => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Thông báo cookie"
      className="fixed inset-x-3 bottom-3 z-40 mx-auto max-w-2xl rounded-xl border border-brand-200 bg-white shadow-xl"
    >
      <div className="flex items-start gap-3 p-4">
        <Cookie className="h-5 w-5 shrink-0 text-brand-700 mt-0.5" />
        <div className="flex-1 text-sm text-ink leading-relaxed">
          Chúng tôi dùng một vài cookie kỹ thuật để website hoạt động bình thường (xử
          lý đơn, ghi nhớ tuỳ chọn). Hiện không dùng cookie phân tích hay quảng cáo.
          Xem{" "}
          <Link href="/chinh-sach-cookie" className="text-brand-700 underline">
            Chính sách Cookie
          </Link>
          {" "}và{" "}
          <Link href="/chinh-sach-bao-mat" className="text-brand-700 underline">
            Bảo mật
          </Link>
          .
        </div>
        <button
          type="button"
          onClick={dismiss}
          className="rounded-lg bg-brand-700 px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-800 shrink-0"
        >
          Đã hiểu
        </button>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Đóng"
          className="rounded-md p-1 text-ink-muted hover:bg-brand-50 shrink-0"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
