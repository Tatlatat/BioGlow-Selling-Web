import type { Metadata } from "next";
import { ProductsBrowser } from "@/components/products-browser";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { products } from "@/data/products";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Tất cả sản phẩm",
  description: `Danh mục ${products.length}+ sản phẩm thiên nhiên tuyển chọn tại ${siteConfig.name}: dinh dưỡng hằng ngày, thực phẩm bảo vệ sức khoẻ, mỹ phẩm Orico và đồ thiết yếu. Tư vấn miễn phí qua Zalo · COD toàn quốc.`,
  keywords: [
    "sản phẩm thiên nhiên",
    "thực phẩm chức năng chính hãng",
    "TPCN Việt Nam",
    "mỹ phẩm thiên nhiên",
    "Vinalink",
    "Orico",
    "mua TPCN online",
    siteConfig.name,
  ],
  alternates: { canonical: "/san-pham" },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: `${siteConfig.url}/san-pham`,
    title: `Tất cả sản phẩm · ${siteConfig.name}`,
    description: `Danh mục sản phẩm thiên nhiên tuyển chọn tại ${siteConfig.name}.`,
    siteName: siteConfig.name,
  },
};

export default function ProductsPage(): React.ReactElement {
  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", url: "/" },
          { name: "Sản phẩm", url: "/san-pham" },
        ]}
      />
      <ProductsBrowser products={products} />
    </div>
  );
}
