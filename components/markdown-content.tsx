import * as React from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  source: string;
};

type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "hr" }
  | { type: "image"; src: string; alt: string }
  | { type: "blockquote"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "p"; text: string };

const IMAGE_LINE_RE = /^!\[([^\]]*)\]\(([^)]+)\)\s*$/;
const ORDERED_RE = /^(\d+)\.\s+(.+)$/;

function parse(source: string): Block[] {
  const lines = source.split("\n");
  const blocks: Block[] = [];
  let ulBuffer: string[] | null = null;
  let olBuffer: string[] | null = null;
  let paraBuffer: string[] = [];

  const flushPara = (): void => {
    if (paraBuffer.length > 0) {
      blocks.push({ type: "p", text: paraBuffer.join(" ") });
      paraBuffer = [];
    }
  };
  const flushLists = (): void => {
    if (ulBuffer && ulBuffer.length > 0) {
      blocks.push({ type: "ul", items: ulBuffer });
      ulBuffer = null;
    }
    if (olBuffer && olBuffer.length > 0) {
      blocks.push({ type: "ol", items: olBuffer });
      olBuffer = null;
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (line === "") {
      flushPara();
      flushLists();
      continue;
    }
    if (line === "---") {
      flushPara();
      flushLists();
      blocks.push({ type: "hr" });
      continue;
    }
    if (line.startsWith("## ")) {
      flushPara();
      flushLists();
      blocks.push({ type: "h2", text: line.slice(3) });
      continue;
    }
    if (line.startsWith("### ")) {
      flushPara();
      flushLists();
      blocks.push({ type: "h3", text: line.slice(4) });
      continue;
    }
    const imgMatch = IMAGE_LINE_RE.exec(line);
    if (imgMatch) {
      flushPara();
      flushLists();
      const alt = imgMatch[1] ?? "";
      const src = imgMatch[2] ?? "";
      if (src) blocks.push({ type: "image", src, alt });
      continue;
    }
    if (line.startsWith("> ")) {
      flushPara();
      flushLists();
      blocks.push({ type: "blockquote", text: line.slice(2) });
      continue;
    }
    if (line.startsWith("- ")) {
      flushPara();
      if (olBuffer) {
        blocks.push({ type: "ol", items: olBuffer });
        olBuffer = null;
      }
      if (!ulBuffer) ulBuffer = [];
      ulBuffer.push(line.slice(2));
      continue;
    }
    const olMatch = ORDERED_RE.exec(line);
    if (olMatch) {
      flushPara();
      if (ulBuffer) {
        blocks.push({ type: "ul", items: ulBuffer });
        ulBuffer = null;
      }
      if (!olBuffer) olBuffer = [];
      olBuffer.push(olMatch[2] ?? "");
      continue;
    }
    flushLists();
    paraBuffer.push(line);
  }

  flushPara();
  flushLists();

  return blocks;
}

const INLINE_PATTERN =
  /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|`[^`]+`)/g;
const LINK_PATTERN = /^\[([^\]]+)\]\(([^)]+)\)$/;

function renderInline(text: string): React.ReactNode {
  const parts = text.split(INLINE_PATTERN).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-brand-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="rounded bg-brand-50 px-1.5 py-0.5 text-sm">
          {part.slice(1, -1)}
        </code>
      );
    }
    const linkMatch = LINK_PATTERN.exec(part);
    if (linkMatch) {
      const label = linkMatch[1] ?? "";
      const href = linkMatch[2] ?? "";
      const isInternal = href.startsWith("/") || href.startsWith("#");
      if (isInternal) {
        return (
          <Link
            key={i}
            href={href}
            className="text-brand-700 underline hover:text-warm-red"
          >
            {label}
          </Link>
        );
      }
      return (
        <a
          key={i}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-700 underline hover:text-warm-red"
        >
          {label}
        </a>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

export function MarkdownContent({ source }: Props): React.ReactElement {
  const blocks = parse(source);
  return (
    <div className="prose-shop max-w-3xl">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return <h2 key={i}>{block.text}</h2>;
          case "h3":
            return <h3 key={i}>{block.text}</h3>;
          case "hr":
            return <hr key={i} className="my-6 border-brand-100" />;
          case "image":
            return (
              <figure key={i} className="my-6">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-brand-50">
                  <Image
                    src={block.src}
                    alt={block.alt}
                    fill
                    sizes="(min-width: 1024px) 768px, 100vw"
                    quality={75}
                    className="object-cover"
                  />
                </div>
                {block.alt ? (
                  <figcaption className="mt-2 text-center text-xs text-ink-muted">
                    {block.alt}
                  </figcaption>
                ) : null}
              </figure>
            );
          case "blockquote":
            return (
              <blockquote
                key={i}
                className="my-4 border-l-4 border-brand-300 bg-brand-50/60 px-4 py-2 italic text-ink"
              >
                {renderInline(block.text)}
              </blockquote>
            );
          case "ul":
            return (
              <ul key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>{renderInline(item)}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="list-decimal pl-6 space-y-1">
                {block.items.map((item, j) => (
                  <li key={j}>{renderInline(item)}</li>
                ))}
              </ol>
            );
          case "p":
            return <p key={i}>{renderInline(block.text)}</p>;
        }
      })}
    </div>
  );
}
