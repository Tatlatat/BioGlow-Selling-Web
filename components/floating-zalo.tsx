"use client";

import { usePathname } from "next/navigation";
import { ZaloIcon } from "@/components/zalo-icon";
import { siteConfig } from "@/data/site-config";
import { buildZaloOrderLink } from "@/lib/utils";

export function FloatingZalo(): React.ReactElement | null {
  const pathname = usePathname();
  // PDP renders its own sticky bottom bar — avoid duplication on mobile.
  if (pathname?.startsWith("/san-pham/")) return null;

  const phone = siteConfig.contact.phones[0];
  const href = buildZaloOrderLink(phone.tel);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Liên hệ Zalo để được tư vấn"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-warm-red px-4 py-3 text-sm font-semibold text-white shadow-lg ring-1 ring-warm-red/40 transition active:scale-95 hover:bg-warm-red-dark lg:hidden"
    >
      <ZaloIcon className="h-6 w-6" />
      <span>Chat Zalo</span>
    </a>
  );
}
