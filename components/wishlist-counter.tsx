"use client";

import * as React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { getWishlistSlugs, subscribeWishlist } from "@/lib/wishlist";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export function WishlistCounter({ className }: Props): React.ReactElement | null {
  const [count, setCount] = React.useState<number>(0);
  const [mounted, setMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    setMounted(true);
    const refresh = (): void => setCount(getWishlistSlugs().length);
    refresh();
    return subscribeWishlist(refresh);
  }, []);

  // Tránh hydration mismatch — SSR render rỗng, client render khi mount
  if (!mounted || count === 0) {
    return (
      <Link
        href="/yeu-thich"
        aria-label="Sản phẩm yêu thích"
        className={cn(
          "relative inline-flex h-10 w-10 items-center justify-center rounded-md text-brand-700 hover:bg-brand-50",
          className,
        )}
      >
        <Heart className="h-5 w-5" />
      </Link>
    );
  }

  return (
    <Link
      href="/yeu-thich"
      aria-label={`Sản phẩm yêu thích (${count})`}
      className={cn(
        "relative inline-flex h-10 w-10 items-center justify-center rounded-md text-brand-700 hover:bg-brand-50",
        className,
      )}
    >
      <Heart className="h-5 w-5" fill="currentColor" />
      <span className="absolute -right-0.5 -top-0.5 inline-flex min-w-[18px] items-center justify-center rounded-full bg-warm-red px-1 text-[10px] font-bold text-white">
        {count}
      </span>
    </Link>
  );
}
