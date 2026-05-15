import { ShieldCheck, Truck, RotateCcw, MessageCircle } from "lucide-react";

type Item = {
  icon: typeof ShieldCheck;
  title: string;
  subtitle: string;
};

const items: ReadonlyArray<Item> = [
  {
    icon: ShieldCheck,
    title: "Hàng chính hãng",
    subtitle: "Phân phối từ Vinalink Group",
  },
  {
    icon: Truck,
    title: "Giao toàn quốc",
    subtitle: "Thanh toán khi nhận (COD)",
  },
  {
    icon: RotateCcw,
    title: "Đổi trả 7 ngày",
    subtitle: "Nếu sản phẩm còn nguyên seal",
  },
  {
    icon: MessageCircle,
    title: "Tư vấn miễn phí",
    subtitle: "8:00 - 22:00 hằng ngày",
  },
];

export function UspBar(): React.ReactElement {
  return (
    <section className="bg-white border-y border-brand-100">
      <div className="container-tight py-5">
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.title} className="flex items-start gap-3">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-leaf-50 text-leaf-700">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-brand-900">{item.title}</p>
                  <p className="text-xs text-ink-muted leading-snug">{item.subtitle}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
