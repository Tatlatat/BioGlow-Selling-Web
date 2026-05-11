import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        brand: "bg-brand-50 text-brand-700 border border-brand-200",
        leaf: "bg-leaf-50 text-leaf-700 border border-leaf-500/30",
        gold: "bg-gold/10 text-gold-600 border border-gold/30",
        warm: "bg-warm-red/10 text-warm-red border border-warm-red/30",
        neutral: "bg-stone-100 text-ink-muted border border-stone-200",
      },
    },
    defaultVariants: {
      variant: "brand",
    },
  }
);

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>;

function Badge({ className, variant, ...props }: BadgeProps): React.ReactElement {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
