import { Award, BadgeCheck, FlaskConical, Leaf } from "lucide-react";

const badges = [
  { icon: Leaf, label: "Thành phần thiên nhiên" },
  { icon: FlaskConical, label: "Đạt chuẩn GMP" },
  { icon: BadgeCheck, label: "Tiêu chuẩn ISO" },
  { icon: Award, label: "Sản xuất tại Việt Nam" },
] as const;

export function QualityBadges(): React.ReactElement {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {badges.map((b) => (
        <div
          key={b.label}
          className="flex flex-col items-center gap-2 rounded-xl border border-brand-100 bg-brand-50 px-4 py-5 text-center"
        >
          <b.icon className="h-7 w-7 text-leaf-700" aria-hidden="true" />
          <span className="text-sm font-medium text-brand-900">{b.label}</span>
        </div>
      ))}
    </div>
  );
}
