import Link from "next/link";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getCategory } from "@/data/categories";
import { type Product } from "@/data/products";
import { formatPriceVND } from "@/lib/utils";

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props): React.ReactElement {
  const category = getCategory(product.category);
  const primaryImage = product.images[0];

  return (
    <Link
      href={`/san-pham/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-brand-100 bg-white shadow-card transition hover:-translate-y-0.5 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
    >
      <div className="relative aspect-[4/3] w-full bg-brand-50">
        {primaryImage ? (
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-brand-200">
            <ImageOff className="h-10 w-10" />
            <span className="text-xs">Ảnh đang cập nhật</span>
          </div>
        )}
        <Badge variant="leaf" className="absolute left-3 top-3">
          {category.shortName}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-semibold text-brand-900 group-hover:text-warm-red">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-ink-muted">{product.subtitle}</p>
        <p className="mt-2 text-sm text-ink line-clamp-2">{product.shortDesc}</p>
        <div className="mt-auto pt-3 flex items-center justify-between">
          {product.price !== null ? (
            <span className="font-semibold text-warm-red text-lg">
              {formatPriceVND(product.price)}
            </span>
          ) : (
            <span className="text-sm text-ink-muted">Liên hệ</span>
          )}
          <span className="text-sm font-medium text-brand-700 group-hover:translate-x-0.5 transition-transform">
            Xem chi tiết →
          </span>
        </div>
      </div>
    </Link>
  );
}
