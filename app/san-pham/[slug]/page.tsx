import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ProductGallery } from "@/components/product-gallery";
import { ProductCard } from "@/components/product-card";
import { ProductOrderActions } from "@/components/product-order-actions";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { getCategory } from "@/data/categories";
import {
  getProductBySlug,
  getRelatedProducts,
  products,
  type Product,
} from "@/data/products";
import { siteConfig } from "@/data/site-config";
import { formatPriceVND } from "@/lib/utils";

type Params = Promise<{ slug: string }>;

export function generateStaticParams(): Array<{ slug: string }> {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Không tìm thấy sản phẩm" };

  const category = getCategory(product.category);
  const keywords = [
    product.name,
    `${product.name} chính hãng`,
    `${product.name} giá bao nhiêu`,
    `${product.name} mua ở đâu`,
    `cách dùng ${product.name}`,
    `${product.name} có tốt không`,
    product.subtitle,
    category.name,
    ...(product.tags ?? []),
    siteConfig.name,
  ].filter((s): s is string => Boolean(s));

  const ogTitle = `${product.name} — ${product.subtitle}`;
  const description = `${product.shortDesc} Tư vấn miễn phí qua Zalo · Giao hàng toàn quốc · COD.`;

  return {
    title: product.name,
    description,
    keywords,
    alternates: { canonical: `/san-pham/${product.slug}` },
    openGraph: {
      type: "website",
      locale: "vi_VN",
      url: `${siteConfig.url}/san-pham/${product.slug}`,
      title: ogTitle,
      description,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Params;
}): Promise<React.ReactElement> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = getRelatedProducts(product, 4);

  const jsonLd = buildProductJsonLd(product);

  return (
    <article className="pb-24 lg:pb-0">
      {/* JSON-LD for Google rich result */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", url: "/" },
          { name: "Sản phẩm", url: "/san-pham" },
          { name: category.shortName, url: `/nhom/${category.slug}` },
          { name: product.name, url: `/san-pham/${product.slug}` },
        ]}
      />

      <section className="bg-brand-50 border-b border-brand-100">
        <div className="container-tight py-4 text-sm text-ink-muted">
          <nav className="flex items-center gap-2 flex-wrap" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand-700">
              Trang chủ
            </Link>
            <span>/</span>
            <Link href="/san-pham" className="hover:text-brand-700">
              Sản phẩm
            </Link>
            <span>/</span>
            <Link
              href={`/nhom/${category.slug}`}
              className="hover:text-brand-700"
            >
              {category.shortName}
            </Link>
            <span>/</span>
            <span className="text-brand-700">{product.name}</span>
          </nav>
        </div>
      </section>

      <section className="section">
        <div className="container-tight grid gap-10 lg:grid-cols-2 lg:gap-12">
          <ProductGallery images={product.images} alt={product.name} />

          <div className="flex flex-col gap-5">
            <Badge variant="leaf">{category.name}</Badge>
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-brand-900">
                {product.name}
              </h1>
              <p className="mt-2 text-lg text-ink-muted">{product.subtitle}</p>
            </div>

            <div className="rounded-xl bg-brand-50 px-5 py-4">
              {product.price !== null ? (
                <>
                  <p className="text-sm text-ink-muted">Giá tham khảo</p>
                  <p className="text-3xl font-semibold text-warm-red">
                    {formatPriceVND(product.price)}
                  </p>
                </>
              ) : (
                <p className="text-xl font-semibold text-warm-red">Liên hệ để biết giá</p>
              )}
            </div>

            <p className="prose-shop">{product.shortDesc}</p>

            <ProductOrderActions
              productName={product.name}
              productSlug={product.slug}
              productPrice={product.price}
            />

            <ul className="grid gap-2 text-sm text-ink-muted">
              <li>· Giao hàng toàn quốc — thanh toán khi nhận (COD)</li>
              <li>· Đổi trả trong 7 ngày nếu còn nguyên seal</li>
              <li>· Tư vấn miễn phí 8:00 - 22:00 hằng ngày</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section bg-brand-50">
        <div className="container-tight">
          <Tabs defaultValue="mo-ta">
            <TabsList>
              <TabsTrigger value="mo-ta">Mô tả chi tiết</TabsTrigger>
              {product.ingredients ? (
                <TabsTrigger value="thanh-phan">Thành phần</TabsTrigger>
              ) : null}
              {product.usage ? (
                <TabsTrigger value="cach-dung">Cách dùng</TabsTrigger>
              ) : null}
              {product.warning ? (
                <TabsTrigger value="luu-y">Lưu ý</TabsTrigger>
              ) : null}
            </TabsList>

            <div className="mt-6 rounded-xl bg-white p-6 shadow-card">
              <TabsContent value="mo-ta">
                <div className="prose-shop max-w-3xl">
                  {product.longDesc.split("\n").map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </TabsContent>

              {product.ingredients ? (
                <TabsContent value="thanh-phan">
                  <div className="prose-shop max-w-3xl">
                    <p>{product.ingredients}</p>
                  </div>
                </TabsContent>
              ) : null}

              {product.usage ? (
                <TabsContent value="cach-dung">
                  <div className="prose-shop max-w-3xl">
                    <p>{product.usage}</p>
                  </div>
                </TabsContent>
              ) : null}

              {product.warning ? (
                <TabsContent value="luu-y">
                  <div className="prose-shop max-w-3xl rounded-lg bg-warm-red/5 p-4 border border-warm-red/20">
                    <p className="text-warm-red font-medium">⚠ Lưu ý quan trọng</p>
                    <p className="mt-1">{product.warning}</p>
                  </div>
                </TabsContent>
              ) : null}
            </div>
          </Tabs>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="section">
          <div className="container-tight">
            <h2 className="section-heading">Sản phẩm cùng nhóm</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <div className="container-tight pb-6">
        <p className="text-[11px] leading-relaxed text-ink-muted/80">
          Ảnh sản phẩm trên website mang tính minh hoạ; bao bì và màu sắc thực tế có
          thể thay đổi theo lô sản xuất. Quý khách vui lòng nhắn Zalo để được xem ảnh
          sản phẩm thực tế trước khi đặt hàng.
        </p>
      </div>
    </article>
  );
}

function buildProductJsonLd(product: Product): Record<string, unknown> {
  const category = getCategory(product.category);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${siteConfig.url}/san-pham/${product.slug}`,
    name: product.name,
    description: product.shortDesc,
    image: product.images.map((src) => `${siteConfig.url}${src}`),
    sku: product.slug,
    category: category.name,
    brand: { "@type": "Brand", name: siteConfig.name },
    ...(product.price !== null
      ? {
          offers: {
            "@type": "Offer",
            url: `${siteConfig.url}/san-pham/${product.slug}`,
            priceCurrency: "VND",
            price: product.price,
            priceValidUntil: new Date(
              new Date().getFullYear() + 1,
              11,
              31
            ).toISOString().split("T")[0],
            availability: "https://schema.org/InStock",
            itemCondition: "https://schema.org/NewCondition",
            seller: {
              "@type": "Organization",
              name: siteConfig.name,
              url: siteConfig.url,
            },
          },
        }
      : {}),
  };
}
