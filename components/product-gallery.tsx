"use client";

import * as React from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  images: readonly string[];
  alt: string;
};

const IMAGE_QUALITY = 70;
const WATERMARK_TEXT = "BioGlowVN • bioglowvn.com";

function WatermarkOverlay(): React.ReactElement {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full select-none opacity-[0.16]"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="bgvn-wm"
          patternUnits="userSpaceOnUse"
          width="320"
          height="180"
          patternTransform="rotate(-28)"
        >
          <text
            x="0"
            y="60"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            fontSize="22"
            fontWeight="700"
            fill="#ffffff"
            stroke="#000000"
            strokeWidth="0.5"
          >
            {WATERMARK_TEXT}
          </text>
          <text
            x="60"
            y="140"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            fontSize="18"
            fontWeight="600"
            fill="#ffffff"
            stroke="#000000"
            strokeWidth="0.4"
          >
            {WATERMARK_TEXT}
          </text>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bgvn-wm)" />
    </svg>
  );
}

function useContentProtection(): boolean {
  const [blurred, setBlurred] = React.useState(false);

  React.useEffect(() => {
    let flashTimer: number | undefined;

    const flashBlur = (): void => {
      setBlurred(true);
      if (flashTimer) window.clearTimeout(flashTimer);
      flashTimer = window.setTimeout(() => setBlurred(false), 1500);
    };

    const checkDevtools = (): void => {
      const widthDiff = window.outerWidth - window.innerWidth;
      const heightDiff = window.outerHeight - window.innerHeight;
      const threshold = 160;
      const open = widthDiff > threshold || heightDiff > threshold;
      setBlurred((prev) => (open ? true : prev && flashTimer ? prev : false));
    };

    const interval = window.setInterval(checkDevtools, 800);
    checkDevtools();

    const onKeydown = (e: KeyboardEvent): void => {
      if (e.key === "PrintScreen") {
        flashBlur();
        return;
      }
      const k = e.key.toLowerCase();
      const ctrlOrMeta = e.ctrlKey || e.metaKey;
      const devShortcut =
        e.key === "F12" ||
        (ctrlOrMeta && e.shiftKey && (k === "i" || k === "j" || k === "c")) ||
        (e.altKey && e.metaKey && (k === "i" || k === "j" || k === "c"));
      const saveShortcut = ctrlOrMeta && k === "s";
      if (devShortcut || saveShortcut) {
        e.preventDefault();
        flashBlur();
      }
    };
    window.addEventListener("keydown", onKeydown);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("keydown", onKeydown);
      if (flashTimer) window.clearTimeout(flashTimer);
    };
  }, []);

  return blurred;
}

const PROTECTION_CSS =
  "select-none [-webkit-user-select:none] [-webkit-touch-callout:none] [-webkit-user-drag:none]";

export function ProductGallery({ images, alt }: Props): React.ReactElement {
  const [active, setActive] = React.useState(0);
  const current = images[active];
  const blurred = useContentProtection();

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

  const preventContext = (e: React.MouseEvent | React.TouchEvent): void => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col gap-3">
      <div
        className={cn(
          "relative aspect-square w-full overflow-hidden rounded-xl border border-brand-100 bg-brand-50 transition-[filter] duration-150",
          PROTECTION_CSS,
          blurred && "blur-2xl",
        )}
        onContextMenu={preventContext}
        onDragStart={preventContext}
      >
        {current ? (
          <>
            <Image
              src={current}
              alt={alt}
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              quality={IMAGE_QUALITY}
              className="pointer-events-none object-cover"
              draggable={false}
              priority
            />
            <WatermarkOverlay />
            <div
              className="absolute inset-0 z-10"
              aria-hidden="true"
              onContextMenu={preventContext}
              onDragStart={preventContext}
            />
          </>
        ) : null}
      </div>

      {images.length > 1 ? (
        <div className="grid grid-cols-5 gap-2">
          {images.map((src, idx) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(idx)}
              onContextMenu={preventContext}
              className={cn(
                "relative aspect-square overflow-hidden rounded-lg border bg-brand-50 transition",
                PROTECTION_CSS,
                idx === active
                  ? "border-brand-600 ring-2 ring-brand-600/40"
                  : "border-brand-100 hover:border-brand-200",
              )}
              aria-label={`Xem ảnh ${idx + 1}`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="120px"
                quality={IMAGE_QUALITY}
                className="pointer-events-none object-cover"
                draggable={false}
              />
            </button>
          ))}
        </div>
      ) : null}

      <p className="text-xs leading-relaxed text-ink-muted">
        Ảnh mang tính minh hoạ, đã tối ưu độ phân giải. Bao bì và màu sắc thực tế có thể
        thay đổi theo lô sản xuất — vui lòng nhắn Zalo để xem ảnh sản phẩm thực tế
        trước khi đặt hàng.
      </p>
    </div>
  );
}
