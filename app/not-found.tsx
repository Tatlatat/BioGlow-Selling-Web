import Link from "next/link";
import { Home, Search, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ZaloIcon } from "@/components/zalo-icon";
import { ProductCard } from "@/components/product-card";
import { getFeaturedProducts } from "@/data/products";
import { siteConfig } from "@/data/site-config";
import { buildTelLink, buildZaloOrderLink } from "@/lib/utils";

export default function NotFound(): React.ReactElement {
  const featured = getFeaturedProducts().slice(0, 4);
  const primaryPhone = siteConfig.contact.phones[0];
  const telUrl = buildTelLink(primaryPhone.tel);
  const zaloUrl = buildZaloOrderLink(primaryPhone.tel);

  return (
    <div className="container-tight py-16 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-serif text-7xl sm:text-8xl font-semibold text-brand-700">
          404
        </p>
        <h1 className="mt-4 font-serif text-2xl sm:text-3xl font-semibold text-brand-900">
          Không tìm thấy trang
        </h1>
        <p className="mt-3 text-ink-muted leading-relaxed">
          Có thể đường dẫn đã thay đổi hoặc trang đã bị di chuyển. Bạn thử lại bằng
          các cách dưới đây nhé.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/">
              <Home className="h-4 w-4" />
              Về trang chủ
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/san-pham">
              <Search className="h-4 w-4" />
              Xem tất cả sản phẩm
            </Link>
          </Button>
          <Button variant="warm" asChild>
            <a href={zaloUrl} target="_blank" rel="noopener noreferrer">
              <ZaloIcon className="h-4 w-4" />
              Hỏi qua Zalo
            </a>
          </Button>
        </div>

        <a
          href={telUrl}
          className="mt-4 inline-flex items-center gap-1.5 text-sm text-brand-700 hover:text-brand-900"
        >
          <Phone className="h-4 w-4" /> Gọi {primaryPhone.display}
        </a>
      </div>

      {featured.length > 0 ? (
        <section className="mt-16">
          <h2 className="section-heading text-center">Sản phẩm nổi bật</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
