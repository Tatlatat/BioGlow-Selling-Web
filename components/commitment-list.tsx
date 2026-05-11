import { Truck, ShieldCheck, MessageCircle, RefreshCw, type LucideIcon } from "lucide-react";

type Item = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const items: ReadonlyArray<Item> = [
  {
    icon: ShieldCheck,
    title: "Sản phẩm chính hãng",
    description:
      "100% sản phẩm có nguồn gốc rõ ràng, tem chống giả, sản xuất tại Việt Nam đạt chuẩn GMP/ISO.",
  },
  {
    icon: Truck,
    title: "Giao hàng toàn quốc",
    description:
      "Giao tận nơi đến mọi tỉnh thành, thanh toán khi nhận hàng (COD), kiểm tra rồi mới thanh toán.",
  },
  {
    icon: MessageCircle,
    title: "Tư vấn miễn phí",
    description:
      "Hỗ trợ tư vấn nhanh qua Zalo và điện thoại trong giờ hành chính mở rộng (8:00 - 22:00).",
  },
  {
    icon: RefreshCw,
    title: "Đổi trả 7 ngày",
    description:
      "Hỗ trợ đổi trả trong 7 ngày với sản phẩm còn nguyên seal, chưa qua sử dụng.",
  },
];

export function CommitmentList(): React.ReactElement {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.title}
          className="rounded-xl border border-brand-100 bg-white p-6 shadow-card"
        >
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-700">
            <item.icon className="h-6 w-6" aria-hidden="true" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-brand-900">{item.title}</h3>
          <p className="mt-1 text-sm text-ink-muted leading-relaxed">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
