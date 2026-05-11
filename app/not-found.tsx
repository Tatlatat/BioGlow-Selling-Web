import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound(): React.ReactElement {
  return (
    <div className="container-tight py-24 text-center">
      <p className="font-serif text-7xl font-semibold text-brand-700">404</p>
      <h1 className="mt-4 font-serif text-3xl font-semibold text-brand-900">
        Không tìm thấy trang
      </h1>
      <p className="mt-3 text-ink-muted">
        Xin lỗi, trang bạn truy cập không tồn tại hoặc đã bị di chuyển.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/">Về trang chủ</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/san-pham">Xem sản phẩm</Link>
        </Button>
      </div>
    </div>
  );
}
