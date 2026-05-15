"use client";

import * as React from "react";
import { Heart } from "lucide-react";
import {
  isInWishlist,
  subscribeWishlist,
  toggleWishlist,
} from "@/lib/wishlist";
import { cn } from "@/lib/utils";

type Props = {
  slug: string;
  /** "card" = nhỏ trên góc ProductCard. "pdp" = lớn trong PDP cạnh CTA. */
  variant?: "card" | "pdp";
  className?: string;
};

export function WishlistButton({
  slug,
  variant = "card",
  className,
}: Props): React.ReactElement {
  const [active, setActive] = React.useState<boolean>(false);
  const [pulse, setPulse] = React.useState<boolean>(false);

  const refresh = React.useCallback(() => {
    setActive(isInWishlist(slug));
  }, [slug]);

  React.useEffect(() => {
    refresh();
    return subscribeWishlist(refresh);
  }, [refresh]);

  const handleClick = (e: React.MouseEvent): void => {
    // Ngăn nổi sự kiện lên Link cha của ProductCard
    e.preventDefault();
    e.stopPropagation();
    const nextActive = toggleWishlist(slug);
    setActive(nextActive);
    if (nextActive) {
      setPulse(true);
      window.setTimeout(() => setPulse(false), 400);
    }
  };

  if (variant === "pdp") {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={active}
        aria-label={active ? "Bỏ khỏi yêu thích" : "Lưu vào yêu thích"}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition",
          active
            ? "border-warm-red bg-warm-red/10 text-warm-red"
            : "border-brand-200 bg-white text-brand-700 hover:bg-brand-50",
          className,
        )}
      >
        <Heart
          className={cn("h-5 w-5 transition-transform", pulse && "scale-125")}
          strokeWidth={2}
          fill={active ? "currentColor" : "none"}
        />
        {active ? "Đã lưu" : "Lưu yêu thích"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={active}
      aria-label={active ? "Bỏ khỏi yêu thích" : "Lưu vào yêu thích"}
      className={cn(
        "absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-brand-100 bg-white/95 shadow-sm backdrop-blur transition hover:scale-110",
        active && "border-warm-red/40 bg-warm-red/10 text-warm-red",
        !active && "text-ink-muted hover:text-warm-red",
        className,
      )}
    >
      <Heart
        className={cn("h-4 w-4 transition-transform", pulse && "scale-125")}
        strokeWidth={2.2}
        fill={active ? "currentColor" : "none"}
      />
    </button>
  );
}
