import * as React from "react";

/**
 * Tối giản: render markdown đơn giản (## heading, ### heading, danh sách "- ").
 * Đủ cho nội dung blog của shop. Không dùng package ngoài để giữ bundle nhỏ.
 */
type Props = {
  source: string;
};

type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "hr" }
  | { type: "list"; items: string[] }
  | { type: "p"; text: string };

function parse(source: string): Block[] {
  const lines = source.split("\n");
  const blocks: Block[] = [];
  let listBuffer: string[] | null = null;
  let paraBuffer: string[] = [];

  const flushPara = (): void => {
    if (paraBuffer.length > 0) {
      blocks.push({ type: "p", text: paraBuffer.join(" ") });
      paraBuffer = [];
    }
  };
  const flushList = (): void => {
    if (listBuffer && listBuffer.length > 0) {
      blocks.push({ type: "list", items: listBuffer });
      listBuffer = null;
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (line === "") {
      flushPara();
      flushList();
      continue;
    }
    if (line === "---") {
      flushPara();
      flushList();
      blocks.push({ type: "hr" });
      continue;
    }
    if (line.startsWith("## ")) {
      flushPara();
      flushList();
      blocks.push({ type: "h2", text: line.slice(3) });
      continue;
    }
    if (line.startsWith("### ")) {
      flushPara();
      flushList();
      blocks.push({ type: "h3", text: line.slice(4) });
      continue;
    }
    if (line.startsWith("- ")) {
      flushPara();
      if (!listBuffer) listBuffer = [];
      listBuffer.push(line.slice(2));
      continue;
    }
    flushList();
    paraBuffer.push(line);
  }

  flushPara();
  flushList();

  return blocks;
}

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-brand-900">
          {part.slice(2, -2)}
        </strong>
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
          case "list":
            return (
              <ul key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>{renderInline(item)}</li>
                ))}
              </ul>
            );
          case "p":
            return <p key={i}>{renderInline(block.text)}</p>;
        }
      })}
    </div>
  );
}
