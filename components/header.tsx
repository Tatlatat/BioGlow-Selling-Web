"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ZaloIcon } from "@/components/zalo-icon";
import { siteConfig } from "@/data/site-config";
import { buildTelLink, buildZaloOrderLink, cn } from "@/lib/utils";

const navLinks: ReadonlyArray<{ href: string; label: string }> = [
  { href: "/", label: "Trang chủ" },
  { href: "/san-pham", label: "Sản phẩm" },
  { href: "/blog", label: "Cẩm nang" },
  { href: "/cau-hoi-thuong-gap", label: "Hỏi đáp" },
  { href: "/ve-bioglowvn", label: "Về chúng tôi" },
  { href: "/lien-he", label: "Liên hệ" },
];

export function Header(): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  const zaloUrl = buildZaloOrderLink(siteConfig.contact.zalo);
  const telUrl = buildTelLink(siteConfig.contact.phone);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-brand-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container-tight flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="font-serif text-2xl font-semibold tracking-tight text-brand-700">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-ink hover:bg-brand-50 hover:text-brand-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <a href={telUrl} className="text-brand-700">
              <Phone className="h-4 w-4" />
              {siteConfig.contact.phoneDisplay}
            </a>
          </Button>
          <Button variant="warm" size="sm" asChild>
            <a href={zaloUrl} target="_blank" rel="noopener noreferrer">
              <ZaloIcon className="h-4 w-4" />
              Tư vấn Zalo
            </a>
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? "Đóng menu" : "Mở menu"}
          aria-expanded={open}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md lg:hidden text-brand-700 hover:bg-brand-50"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          "lg:hidden overflow-hidden border-t border-brand-100 bg-white",
          open ? "max-h-[600px]" : "max-h-0"
        )}
      >
        <div className="container-tight py-3 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-base font-medium text-ink hover:bg-brand-50 hover:text-brand-700"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 flex gap-2">
            <Button variant="outline" size="sm" asChild className="flex-1">
              <a href={telUrl}>
                <Phone className="h-4 w-4" />
                Gọi điện
              </a>
            </Button>
            <Button variant="warm" size="sm" asChild className="flex-1">
              <a href={zaloUrl} target="_blank" rel="noopener noreferrer">
                <ZaloIcon className="h-4 w-4" />
                Zalo
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
