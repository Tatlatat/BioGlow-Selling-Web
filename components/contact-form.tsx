"use client";

import * as React from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/data/site-config";

/**
 * Form gửi qua mailto: để không cần backend.
 * Khi cần nâng cấp lên Formspree/Resend, chỉ cần đổi handler ở đây.
 */
export function ContactForm(): React.ReactElement {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [message, setMessage] = React.useState("");

  const targetEmail = siteConfig.contact.email;

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!targetEmail) {
      const zaloMessage = `Tên: ${name}\nSĐT: ${phone}\nNội dung: ${message}`;
      const primaryZalo = siteConfig.contact.phones[0].tel;
      window.open(
        `https://zalo.me/${primaryZalo}?text=${encodeURIComponent(zaloMessage)}`,
        "_blank",
        "noopener,noreferrer"
      );
      return;
    }

    const subject = `[${siteConfig.name}] Liên hệ từ ${name || "khách hàng"}`;
    const body = `Tên: ${name}\nSĐT: ${phone}\n\nNội dung:\n${message}`;
    window.location.href = `mailto:${targetEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="name" className="text-sm font-medium text-brand-900">
          Họ và tên
        </label>
        <Input
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nguyễn Văn A"
          className="mt-1.5"
          autoComplete="name"
        />
      </div>
      <div>
        <label htmlFor="phone" className="text-sm font-medium text-brand-900">
          Số điện thoại
        </label>
        <Input
          id="phone"
          required
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="09xx xxx xxx"
          className="mt-1.5"
          autoComplete="tel"
          inputMode="tel"
        />
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-medium text-brand-900">
          Nội dung
        </label>
        <Textarea
          id="message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Mô tả ngắn nhu cầu của bạn..."
          className="mt-1.5"
        />
      </div>
      <Button type="submit" variant="warm" size="lg" className="self-start">
        <Send className="h-5 w-5" />
        Gửi tin nhắn
      </Button>
      <p className="text-xs text-ink-muted">
        Khi gửi, hệ thống sẽ mở {targetEmail ? "ứng dụng email" : "Zalo"} với nội dung đã
        điền sẵn để bạn xác nhận trước khi gửi đi.
      </p>
    </form>
  );
}
