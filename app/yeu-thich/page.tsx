import type { Metadata } from "next";
import { WishlistView } from "@/components/wishlist-view";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Sản phẩm yêu thích",
  description: `Danh sách sản phẩm bạn đã lưu tại ${siteConfig.name}.`,
  alternates: { canonical: "/yeu-thich" },
  robots: { index: false, follow: true }, // page client-only, không có content cố định
};

export default function WishlistPage(): React.ReactElement {
  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", url: "/" },
          { name: "Sản phẩm yêu thích", url: "/yeu-thich" },
        ]}
      />
      <section className="bg-brand-50 border-b border-brand-100">
        <div className="container-tight py-10">
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-brand-900">
            Sản phẩm yêu thích
          </h1>
          <p className="mt-2 text-ink-muted max-w-2xl">
            Các sản phẩm bạn đã lưu trên thiết bị này. Khi cần, nhắn Zalo để được
            tư vấn combo nhanh.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container-tight">
          <WishlistView />
        </div>
      </section>
    </div>
  );
}
