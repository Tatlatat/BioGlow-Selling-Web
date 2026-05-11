import type { Metadata } from "next";
import { ProductsBrowser } from "@/components/products-browser";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Tất cả sản phẩm",
  description:
    "Danh mục sản phẩm thiên nhiên tuyển chọn tại BioGlowVN: dinh dưỡng, thiết yếu, hỗ trợ sức khoẻ và mỹ phẩm.",
};

export default function ProductsPage(): React.ReactElement {
  return (
    <div>
      <ProductsBrowser products={products} />
    </div>
  );
}
