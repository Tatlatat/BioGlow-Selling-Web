"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Loader2, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site-config";
import { buildTelLink, formatPriceVND } from "@/lib/utils";

type Props = {
  open: boolean;
  onClose: () => void;
  productName: string;
  productSlug: string;
  productPrice: number | null;
  qty: number;
  refCode?: string;
};

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const ERROR_MESSAGES: Record<string, string> = {
  missing_fields: "Vui lòng điền đầy đủ họ tên, số điện thoại và địa chỉ.",
  invalid_phone: "Số điện thoại chưa đúng định dạng. Vui lòng kiểm tra lại.",
  too_long: "Thông tin quá dài. Vui lòng rút gọn lại.",
  telegram_failed: "Hệ thống đang bận. Vui lòng thử lại hoặc gọi điện trực tiếp.",
  missing_config: "Hệ thống chưa sẵn sàng. Vui lòng gọi điện trực tiếp.",
  network: "Mất kết nối mạng. Vui lòng kiểm tra và thử lại.",
};

export function OrderFormModal({
  open,
  onClose,
  productName,
  productSlug,
  productPrice,
  qty,
  refCode,
}: Props): React.ReactElement | null {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [honeypot, setHoneypot] = useState<string>("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorKey, setErrorKey] = useState<string>("");
  const nameInputRef = useRef<HTMLInputElement>(null);
  const submittedRef = useRef<boolean>(false);
  const recoverySentRef = useRef<boolean>(false);
  const fieldsRef = useRef({
    name: "",
    phone: "",
    address: "",
    note: "",
    honeypot: "",
  });
  fieldsRef.current = { name, phone, address, note, honeypot };

  useEffect(() => {
    if (open) {
      setStatus("idle");
      setErrorKey("");
      submittedRef.current = false;
      recoverySentRef.current = false;
      window.setTimeout(() => nameInputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const maybeSendRecovery = (): void => {
    if (submittedRef.current || recoverySentRef.current) return;
    const f = fieldsRef.current;
    const hasName = f.name.trim().length > 0;
    const hasPhone = f.phone.trim().replace(/\D/g, "").length > 0;
    if (!hasName && !hasPhone) return;
    recoverySentRef.current = true;
    const payload = JSON.stringify({
      productName,
      productSlug,
      qty,
      refCode,
      customerName: f.name,
      phone: f.phone,
      address: f.address,
      note: f.note,
      honeypot: f.honeypot,
    });
    try {
      if (typeof navigator !== "undefined" && navigator.sendBeacon) {
        const blob = new Blob([payload], { type: "application/json" });
        navigator.sendBeacon("/api/lead-recovery", blob);
      } else {
        void fetch("/api/lead-recovery", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: payload,
          keepalive: true,
        });
      }
    } catch {
      /* fire and forget */
    }
  };

  const handleClose = (): void => {
    maybeSendRecovery();
    onClose();
  };

  useEffect(() => {
    if (!open) return;
    const onKeydown = (e: KeyboardEvent): void => {
      if (e.key === "Escape") handleClose();
    };
    const onUnload = (): void => maybeSendRecovery();
    const onVisibility = (): void => {
      if (document.visibilityState === "hidden") maybeSendRecovery();
    };
    window.addEventListener("keydown", onKeydown);
    window.addEventListener("pagehide", onUnload);
    window.addEventListener("beforeunload", onUnload);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("keydown", onKeydown);
      window.removeEventListener("pagehide", onUnload);
      window.removeEventListener("beforeunload", onUnload);
      document.removeEventListener("visibilitychange", onVisibility);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  const primaryPhone = siteConfig.contact.phones[0];
  const totalPrice = productPrice !== null ? productPrice * qty : null;

  const submit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setStatus("submitting");
    setErrorKey("");
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          productName,
          productSlug,
          qty,
          refCode,
          customerName: name,
          phone,
          address,
          note,
          honeypot,
        }),
      });
      const data: { ok?: boolean; error?: string } = await res
        .json()
        .catch(() => ({}));
      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorKey(data.error ?? "telegram_failed");
        return;
      }
      submittedRef.current = true;
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorKey("network");
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-form-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {status === "success" ? (
          <SuccessView
            onClose={onClose}
            productName={productName}
            qty={qty}
            refCode={refCode}
            phone={primaryPhone.display}
            phoneTel={buildTelLink(primaryPhone.tel)}
          />
        ) : (
          <>
            <div className="flex items-start justify-between border-b border-brand-100 px-5 py-4">
              <div>
                <h2 id="order-form-title" className="text-lg font-semibold text-brand-900">
                  Đặt hàng nhanh
                </h2>
                <p className="mt-1 text-sm text-ink-muted line-clamp-2">
                  {productName} × {qty}
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Đóng"
                className="-mr-2 -mt-2 p-2 text-ink-muted hover:text-brand-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {totalPrice !== null ? (
              <div className="bg-brand-50 px-5 py-3 flex items-center justify-between">
                <span className="text-sm text-ink-muted">Tạm tính</span>
                <span className="text-xl font-bold text-warm-red">
                  {formatPriceVND(totalPrice)}
                </span>
              </div>
            ) : null}

            <form onSubmit={submit} className="px-5 py-4 flex flex-col gap-3">
              <Field
                label="Họ và tên"
                required
                value={name}
                onChange={setName}
                inputRef={nameInputRef}
                placeholder="Nguyễn Văn A"
                autoComplete="name"
              />
              <Field
                label="Số điện thoại"
                required
                type="tel"
                inputMode="tel"
                value={phone}
                onChange={setPhone}
                placeholder="09xx xxx xxx"
                autoComplete="tel"
              />
              <Field
                label="Địa chỉ giao hàng"
                required
                value={address}
                onChange={setAddress}
                placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành"
                autoComplete="street-address"
                multiline
              />
              <Field
                label="Ghi chú (tuỳ chọn)"
                value={note}
                onChange={setNote}
                placeholder="Ví dụ: giao giờ hành chính, hỏi trước khi giao..."
                multiline
              />

              {/* honeypot for bots */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              {errorKey ? (
                <p className="text-sm text-warm-red bg-warm-red/5 border border-warm-red/20 rounded-md px-3 py-2">
                  {ERROR_MESSAGES[errorKey] ?? ERROR_MESSAGES.telegram_failed}
                </p>
              ) : null}

              <Button
                type="submit"
                variant="warm"
                size="xl"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Đang gửi…
                  </>
                ) : (
                  <>Xác nhận đặt hàng</>
                )}
              </Button>

              <p className="text-xs text-ink-muted leading-relaxed text-center">
                BioGlowVN sẽ gọi xác nhận trong vòng 30 phút (8:00 – 22:00).
                <br />
                Thanh toán khi nhận hàng (COD) trên toàn quốc.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
  inputMode?: "text" | "tel" | "email" | "numeric";
  placeholder?: string;
  autoComplete?: string;
  multiline?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
};

function Field({
  label,
  value,
  onChange,
  required,
  type = "text",
  inputMode,
  placeholder,
  autoComplete,
  multiline,
  inputRef,
}: FieldProps): React.ReactElement {
  const base =
    "w-full rounded-lg border border-brand-200 bg-white px-3 py-2.5 text-base text-ink focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-brand-400";
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-brand-900">
        {label}
        {required ? <span className="text-warm-red"> *</span> : null}
      </span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          placeholder={placeholder}
          autoComplete={autoComplete}
          rows={2}
          className={`${base} resize-y min-h-[44px]`}
        />
      ) : (
        <input
          ref={inputRef}
          type={type}
          inputMode={inputMode}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={base}
        />
      )}
    </label>
  );
}

type SuccessProps = {
  onClose: () => void;
  productName: string;
  qty: number;
  refCode?: string;
  phone: string;
  phoneTel: string;
};

function SuccessView({
  onClose,
  productName,
  qty,
  refCode,
  phone,
  phoneTel,
}: SuccessProps): React.ReactElement {
  return (
    <div className="px-6 py-8 text-center flex flex-col items-center gap-3">
      <div className="h-14 w-14 rounded-full bg-leaf-50 text-leaf-700 flex items-center justify-center">
        <Check className="h-7 w-7" strokeWidth={3} />
      </div>
      <h2 className="text-xl font-semibold text-brand-900">
        Đã nhận đơn hàng!
      </h2>
      <p className="text-sm text-ink-muted">
        BioGlowVN sẽ gọi xác nhận trong vòng 30 phút (8:00 – 22:00).
      </p>
      <div className="w-full mt-2 rounded-lg bg-brand-50 px-4 py-3 text-sm text-left">
        <p className="text-ink-muted">Sản phẩm</p>
        <p className="font-medium text-brand-900">
          {productName} × {qty}
        </p>
        {refCode ? (
          <>
            <p className="text-ink-muted mt-2">Mã tham chiếu</p>
            <p className="font-mono text-brand-900">{refCode}</p>
          </>
        ) : null}
      </div>
      <a
        href={phoneTel}
        className="mt-1 inline-flex items-center gap-2 text-sm text-brand-700 hover:text-brand-900"
      >
        <Phone className="h-4 w-4" /> Gọi ngay nếu cần gấp: {phone}
      </a>
      <Button variant="outline" size="lg" onClick={onClose} className="mt-2 w-full">
        Đóng
      </Button>
    </div>
  );
}
