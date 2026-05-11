"use client";

import * as React from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  images: readonly string[];
  alt: string;
};

export function ProductGallery({ images, alt }: Props): React.ReactElement {
  const [active, setActive] = React.useState(0);
  const current = images[active];

  if (images.length === 0) {
    return (
      <div className="flex aspect-square w-full items-center justify-center rounded-xl border border-brand-100 bg-brand-50 text-brand-200">
        <div className="flex flex-col items-center gap-2">
          <ImageOff className="h-12 w-12" />
          <span className="text-sm">Ảnh đang cập nhật</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-brand-100 bg-brand-50">
        {current ? (
          <Image
            src={current}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        ) : null}
      </div>

      {images.length > 1 ? (
        <div className="grid grid-cols-5 gap-2">
          {images.map((src, idx) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(idx)}
              className={cn(
                "relative aspect-square overflow-hidden rounded-lg border bg-brand-50 transition",
                idx === active
                  ? "border-brand-600 ring-2 ring-brand-600/40"
                  : "border-brand-100 hover:border-brand-200"
              )}
              aria-label={`Xem ảnh ${idx + 1}`}
            >
              <Image src={src} alt="" fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
