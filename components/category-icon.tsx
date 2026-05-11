import * as React from "react";
import { Leaf, Sparkles, HeartPulse, Droplets, type LucideIcon } from "lucide-react";
import { type Category } from "@/data/categories";

const iconMap: Record<Category["iconName"], LucideIcon> = {
  Leaf,
  Sparkles,
  HeartPulse,
  Droplets,
};

type Props = {
  name: Category["iconName"];
  className?: string;
};

export function CategoryIcon({ name, className }: Props): React.ReactElement {
  const Icon = iconMap[name];
  return <Icon className={className} aria-hidden="true" />;
}
