import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  accent: "leaf" | "warm" | "gold";
};

const accentMap: Record<Props["accent"], string> = {
  leaf: "bg-leaf-50 text-leaf-700",
  warm: "bg-warm-red/10 text-warm-red",
  gold: "bg-gold/10 text-gold-600",
};

export function AudienceCard({
  title,
  description,
  href,
  icon: Icon,
  accent,
}: Props): React.ReactElement {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-4 rounded-xl border border-brand-100 bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
    >
      <div
        className={cn(
          "inline-flex h-12 w-12 items-center justify-center rounded-full",
          accentMap[accent]
        )}
      >
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold text-brand-900">{title}</h3>
        <p className="text-ink-muted">{description}</p>
      </div>
      <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-warm-red group-hover:gap-2 transition-all">
        Xem sản phẩm phù hợp <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}
