"use client";

import * as React from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): React.ReactElement {
  React.useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="vi">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          background: "linear-gradient(135deg, #fdf8f3 0%, #f5e9d8 100%)",
          fontFamily:
            "Be Vietnam Pro, ui-sans-serif, system-ui, -apple-system, sans-serif",
          color: "#3d2a1a",
        }}
      >
        <div style={{ maxWidth: 520, textAlign: "center" }}>
          <p
            style={{
              fontFamily: "Lora, ui-serif, Georgia, serif",
              fontSize: 80,
              fontWeight: 600,
              color: "#5a3f2a",
              margin: 0,
              lineHeight: 1,
            }}
          >
            500
          </p>
          <h1
            style={{
              fontFamily: "Lora, ui-serif, Georgia, serif",
              fontSize: 26,
              fontWeight: 600,
              marginTop: 16,
              marginBottom: 0,
            }}
          >
            Có lỗi xảy ra
          </h1>
          <p
            style={{
              marginTop: 12,
              fontSize: 16,
              lineHeight: 1.6,
              color: "#7a5230",
            }}
          >
            Hệ thống đang gặp sự cố tạm thời. Bạn vui lòng tải lại trang, hoặc nhắn
            Zalo để được hỗ trợ ngay.
          </p>
          <div
            style={{
              marginTop: 24,
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={reset}
              style={{
                padding: "10px 20px",
                borderRadius: 10,
                border: "none",
                background: "#5a3f2a",
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: 15,
              }}
            >
              Thử lại
            </button>
            <a
              href="/"
              style={{
                padding: "10px 20px",
                borderRadius: 10,
                border: "1px solid #5a3f2a",
                color: "#5a3f2a",
                fontWeight: 600,
                textDecoration: "none",
                fontSize: 15,
              }}
            >
              Về trang chủ
            </a>
            <a
              href="https://zalo.me/0373478587"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "10px 20px",
                borderRadius: 10,
                border: "none",
                background: "#c93b3b",
                color: "#fff",
                fontWeight: 600,
                textDecoration: "none",
                fontSize: 15,
              }}
            >
              Nhắn Zalo
            </a>
          </div>
          {error.digest ? (
            <p
              style={{
                marginTop: 24,
                fontSize: 12,
                color: "#a08568",
                fontFamily: "ui-monospace, monospace",
              }}
            >
              Mã lỗi: {error.digest}
            </p>
          ) : null}
        </div>
      </body>
    </html>
  );
}
