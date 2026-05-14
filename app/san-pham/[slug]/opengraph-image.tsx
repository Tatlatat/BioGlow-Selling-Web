import { ImageResponse } from "next/og";
import { getProductBySlug } from "@/data/products";
import { getCategory } from "@/data/categories";
import { siteConfig } from "@/data/site-config";

export const runtime = "edge";
export const alt = "BioGlowVN — Sản phẩm thiên nhiên";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Params = { slug: string };

function formatPrice(value: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
}

export default async function OgImage({
  params,
}: {
  params: Promise<Params>;
}): Promise<ImageResponse> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#5a3f2a",
            color: "#fff",
            fontSize: 64,
            fontWeight: 700,
          }}
        >
          {siteConfig.name}
        </div>
      ),
      size,
    );
  }

  const category = getCategory(product.category);
  const productImage = product.images[0]
    ? `${siteConfig.url}${product.images[0]}`
    : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(135deg, #fdf8f3 0%, #f5e9d8 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Left: product image */}
        <div
          style={{
            width: 520,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 48,
          }}
        >
          {productImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={productImage}
              alt=""
              width={420}
              height={420}
              style={{
                width: 420,
                height: 420,
                objectFit: "cover",
                borderRadius: 24,
                boxShadow: "0 20px 60px rgba(90, 63, 42, 0.25)",
              }}
            />
          ) : (
            <div
              style={{
                width: 420,
                height: 420,
                borderRadius: 24,
                backgroundColor: "#e9d8be",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 80,
                color: "#a67e54",
                fontWeight: 700,
              }}
            >
              {product.name.charAt(0)}
            </div>
          )}
        </div>

        {/* Right: text */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "48px 56px 48px 0",
            color: "#3d2a1a",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 22,
              fontWeight: 600,
              color: "#7a5230",
              marginBottom: 18,
            }}
          >
            <div
              style={{
                padding: "6px 16px",
                borderRadius: 999,
                backgroundColor: "#3f7f3f",
                color: "#fff",
                fontSize: 18,
              }}
            >
              {category.shortName}
            </div>
            <div>{siteConfig.name}</div>
          </div>

          <div
            style={{
              fontSize: product.name.length > 30 ? 52 : 62,
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: 16,
              display: "flex",
            }}
          >
            {product.name}
          </div>

          <div
            style={{
              fontSize: 26,
              color: "#7a5230",
              lineHeight: 1.35,
              marginBottom: 28,
              display: "flex",
            }}
          >
            {product.subtitle}
          </div>

          {product.price !== null ? (
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 14,
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  fontSize: 20,
                  color: "#7a5230",
                  display: "flex",
                }}
              >
                Giá chỉ
              </div>
              <div
                style={{
                  fontSize: 56,
                  fontWeight: 800,
                  color: "#c93b3b",
                  display: "flex",
                }}
              >
                {formatPrice(product.price)}
              </div>
            </div>
          ) : null}

          <div
            style={{
              display: "flex",
              gap: 24,
              fontSize: 22,
              color: "#3d2a1a",
              fontWeight: 500,
            }}
          >
            <div style={{ display: "flex" }}>✓ COD toàn quốc</div>
            <div style={{ display: "flex" }}>✓ Tư vấn miễn phí</div>
          </div>

          <div
            style={{
              marginTop: "auto",
              paddingTop: 32,
              fontSize: 22,
              color: "#7a5230",
              fontWeight: 600,
              display: "flex",
            }}
          >
            bioglow.io.vn
          </div>
        </div>
      </div>
    ),
    size,
  );
}
